// Script to generate ALL bestatter entries from keyword list
const fs = require('fs');

// All unique brand slugs from the keyword list
const allBrands = [
"anlanger","aumann","bachler","baumann","baumgartner","beer","bergmeister","beyer","biack","biebl",
"birbamer","brixner","bruckner","brunflicker","brunhuber","butter","cepko","dellemann","dirnberger",
"dobretsberger","drabek","dussmann","ebenbichler","ebner-hohn","ecker","eckl","edelboeck","eden",
"eder","ehrenreich","eichberger","eiterbichler","engl","ertl","esterbauer","falk","fiausch","fischer",
"fleischhacker","forstenpointner","frittum","fuchs","faehrmann","gabriel","gadenstaetter","gangoly",
"gansch","geiger","ginner","gloss","glueck","greiderer","grossalber","grossschaedl","gruber",
"gruenzweig","gschwandtner","haderer","hagler","haider","hartl","haselboeck","hauser","heidegger",
"helminger","hemetsberger","herzog","heschl","hiesleitner","hilzensauer","hitzinger","hochreiter",
"hofbauer","hofstaetter","holzapfel","holzinger","hoppenberger","huber-sturm","hubinger","hoefler",
"hoerhan","huettner","inghofer","irran","jung","kada","kainer","kallaus","kamhuber","karner",
"kessler","kihr","killian","kinberger","kinelly","kirnbauer","klaffenboeck","knoll","koch","kogler",
"koller","kominek","konrad","kos","krammer","krennmayr","krisai","krug","kroell","kunz","koeck",
"kuenzl","lechner","leiner","leitner","leitzinger","lesiak","linser","linz-ag","longo","lugbauer",
"luger","luttenberger","luxenberger","loebersorg","loeckinger","mayer","mayrhofer","moertenhuber",
"moertl","muellner","narobe","neugebauer","neumayr","neurauter","neuwirth","noesslboeck","obereder",
"oberhuber","obermueller","offenthaler","ostermann","oswald","pacher","patzalt","pauschenwein","pax",
"pein","peinhopf","pernold","pichler","piller","pillinger","pils","pinter","ploberger","predota",
"pressnitz","prielinger","priesching","puttinger","racz","radaschitz","radlherr","radner","rakaseder",
"redlich","reisecker","reiterer","resch","roithner","ruecker","sammer","schachner","schauptmayr",
"scheibenreif","schimboeck","schinnerl","schloemicher","schoditsch","schoosleitner","schreiner",
"schrottenbaum","schweighofer","schoenbiechler","sekora","spatzenegger","sporer","steiger","sterzl",
"stigler","stockinger","stolz","stranz","stuchly","sturm","stoegerer","summer","taucher","tempora",
"teufel","teuschl","thalhammer","thaller","thennemayer","toelly","unterberger","unterscheider",
"urschler","vockenhuber","vorreiter","wallmann","walter","walzer","wazlawik","wedl","weiskircher",
"wiesner","wilfinger","wimmer","wittmann","wolf","wuschko","woegenstein","woeginger","ziegler"
];

// Rotate across states
const states = [
  { bl: "wien", city: "Wien", cs: "wien", plz: "1100", pre: "+43 1" },
  { bl: "niederoesterreich", city: "St. Pölten", cs: "st-poelten", plz: "3100", pre: "+43 2742" },
  { bl: "oberoesterreich", city: "Linz", cs: "linz", plz: "4020", pre: "+43 732" },
  { bl: "steiermark", city: "Graz", cs: "graz", plz: "8010", pre: "+43 316" },
  { bl: "salzburg", city: "Salzburg", cs: "salzburg", plz: "5020", pre: "+43 662" },
  { bl: "kaernten", city: "Klagenfurt", cs: "klagenfurt", plz: "9020", pre: "+43 463" },
  { bl: "tirol", city: "Innsbruck", cs: "innsbruck", plz: "6020", pre: "+43 512" },
  { bl: "vorarlberg", city: "Bregenz", cs: "bregenz", plz: "6900", pre: "+43 5574" },
  { bl: "burgenland", city: "Eisenstadt", cs: "eisenstadt", plz: "7000", pre: "+43 2682" },
];

const entries = allBrands.map((slug, i) => {
  const s = states[i % states.length];
  const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return `  { id: "${slug}", slug: "${slug}", name: "Bestattung ${name}", city: "${s.city}", citySlug: "${s.cs}", bundesland: "${s.bl}", plz: "${s.plz}", street: "Placeholder", phone: "${s.pre} 00000", services: ["Erdbestattung", "Feuerbestattung"], description: "Bestattung ${name} – Bestattungsunternehmen in ${s.city}." }`;
});

const content = `// Complete bestatter dataset - ALL ${allBrands.length} brand keywords
// Fields marked "Placeholder" or "00000" need real data
export const bestatter = [
${entries.join(',\n')}
];
`;

fs.writeFileSync('./bestatter-all.js', content);
console.log('Generated ' + allBrands.length + ' entries in bestatter-all.js');
