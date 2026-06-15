const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

let KEY_FILE = path.join(__dirname, '..', 'service-account.json');
if (!fs.existsSync(KEY_FILE)) {
  const fallback = path.join(__dirname, '..', 'service-account.json.json');
  if (fs.existsSync(fallback)) {
    KEY_FILE = fallback;
  }
}

// Helper to sign JWT without external dependencies
function base64url(str, encoding = 'utf8') {
  return Buffer.from(str, encoding)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function getAccessToken(keyData) {
  return new Promise((resolve, reject) => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;

    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
      iss: keyData.client_email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: exp,
      iat: iat,
    };

    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));
    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signatureInput);
    const signature = base64url(signer.sign(keyData.private_key));

    const jwt = `${signatureInput}.${signature}`;

    const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`;

    const req = https.request(
      'https://oauth2.googleapis.com/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let responseBody = '';
        res.on('data', (chunk) => (responseBody += chunk));
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Token request failed: ${res.statusCode} - ${responseBody}`));
          } else {
            resolve(JSON.parse(responseBody).access_token);
          }
        });
      }
    );

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function requestIndexingApi(accessToken, url, action = 'URL_UPDATED') {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      url: url,
      type: action,
    });

    const req = https.request(
      'https://indexing.googleapis.com/v3/urlNotifications:publish',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let responseBody = '';
        res.on('data', (chunk) => (responseBody += chunk));
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Indexing API failed (${res.statusCode}): ${responseBody}`));
          } else {
            resolve(JSON.parse(responseBody));
          }
        });
      }
    );

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function getIndexingStatus(accessToken, url) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      `https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(url)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      (res) => {
        let responseBody = '';
        res.on('data', (chunk) => (responseBody += chunk));
        res.on('end', () => {
          if (res.statusCode === 404) {
            resolve({ status: 'Not submitted yet', raw: null });
          } else if (res.statusCode !== 200) {
            reject(new Error(`Status check failed (${res.statusCode}): ${responseBody}`));
          } else {
            resolve({ status: 'Submitted', data: JSON.parse(responseBody) });
          }
        });
      }
    );

    req.on('error', reject);
    req.end();
  });
}

// Load site URLs from dynamic data files
function getAllSiteUrls() {
  const BASE_URL = 'https://bestattungs.at';
  const urls = [
    BASE_URL,
    `${BASE_URL}/bundesland`,
    `${BASE_URL}/bestattung`,
    `${BASE_URL}/suche`,
    `${BASE_URL}/ratgeber`,
    `${BASE_URL}/staedtische-bestattung`,
    `${BASE_URL}/ratgeber/was-tun-im-todesfall`,
    `${BASE_URL}/ratgeber/bestattungsarten`,
    `${BASE_URL}/ratgeber/kosten`,
    `${BASE_URL}/ratgeber/vorsorge`,
    `${BASE_URL}/ratgeber/bestattung-sarg`,
    `${BASE_URL}/ratgeber/staedtische-bestattung`,
  ];

  // Helper to load ES module files as plain data
  function loadEsModuleData(filename, variableName) {
    const filePath = path.join(__dirname, '..', 'src', 'data', filename);
    const content = fs.readFileSync(filePath, 'utf8');
    const sanitized = content.replace(/export const/g, 'const');
    const fn = new Function(`${sanitized}; return ${variableName};`);
    return fn();
  }

  // Dynamic Bundesländer
  const bundeslaender = loadEsModuleData('bundeslaender.js', 'bundeslaender');
  bundeslaender.forEach(bl => urls.push(`${BASE_URL}/bundesland/${bl.slug}`));

  // Dynamic Cities
  const cities = loadEsModuleData('cities.js', 'cities');
  cities.forEach(c => urls.push(`${BASE_URL}/bundesland/${c.bundesland}/${c.slug}`));

  // Dynamic Bestatter
  const bestatter = loadEsModuleData('bestatter.js', 'bestatter');
  bestatter.forEach(b => urls.push(`${BASE_URL}/bestattung/${b.slug}`));

  return urls;
}

async function main() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error('Error: service-account.json not found in root directory.');
    console.error('Please place your Google Cloud Service Account JSON key file in the project root and name it "service-account.json".');
    process.exit(1);
  }

  const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
  const command = process.argv[2];
  const param = process.argv[3];

  console.log('Authenticating with Google Indexing API...');
  const accessToken = await getAccessToken(keyData);
  console.log('Authentication successful!\n');

  if (command === 'status' && param) {
    console.log(`Checking status for: ${param}...`);
    const status = await getIndexingStatus(accessToken, param);
    console.log('\nResult:');
    if (status.status === 'Submitted') {
      console.log(`- State: Submitted`);
      console.log(`- Last notification: ${status.data.latestUpdate?.notifyTime || 'N/A'}`);
      console.log(`- Action: ${status.data.latestUpdate?.type || 'N/A'}`);
    } else {
      console.log(`- State: ${status.status} (Never notified via Indexing API)`);
    }
    return;
  }

  if (command === 'submit' && param) {
    console.log(`Submitting URL: ${param}...`);
    const result = await requestIndexingApi(accessToken, param);
    console.log('Success! API response:', result.urlNotificationMetadata?.latestUpdate);
    return;
  }

  if (command === 'submit-all') {
    const urls = getAllSiteUrls();
    console.log(`Found ${urls.length} total URLs in sitemap/data.`);

    const logFile = path.join(__dirname, '..', 'indexing-log.json');
    let indexedLog = {};
    if (fs.existsSync(logFile)) {
      indexedLog = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    }

    const pending = urls.filter(url => !indexedLog[url]);
    console.log(`Pending indexing: ${pending.length} URLs.`);

    if (pending.length === 0) {
      console.log('All URLs have already been submitted!');
      return;
    }

    // Limit to 100 submissions per batch to be safe and avoid rate limits
    const batchLimit = Math.min(pending.length, 100);
    const toSubmit = pending.slice(0, batchLimit);

    console.log(`Starting bulk submission for ${batchLimit} URLs...\n`);

    for (let i = 0; i < toSubmit.length; i++) {
      const url = toSubmit[i];
      process.stdout.write(`[${i + 1}/${batchLimit}] Submitting ${url}... `);
      try {
        await requestIndexingApi(accessToken, url);
        indexedLog[url] = { submittedAt: new Date().toISOString() };
        fs.writeFileSync(logFile, JSON.stringify(indexedLog, null, 2));
        console.log('✅ Success');
      } catch (err) {
        console.log(`❌ Failed: ${err.message}`);
        console.log('Stopping batch execution due to API error.');
        break;
      }
      // Add a small 200ms delay between requests to avoid overloading the API
      await new Promise(r => setTimeout(r, 200));
    }

    console.log('\nBulk submission complete. Progress saved in "indexing-log.json".');
    return;
  }

  console.log('Usage:');
  console.log('  node scripts/google-indexing.js status <url>     - Check indexing status');
  console.log('  node scripts/google-indexing.js submit <url>     - Submit single URL for indexing');
  console.log('  node scripts/google-indexing.js submit-all       - Bulk submit pending URLs (100 per run)');
}

main().catch((error) => {
  console.error('\nError:', error.message);
  process.exitCode = 1;
});
