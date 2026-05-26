const fs = require('fs');
const path = require('path');

// Real scraped contact data updates
const updates = {
  "anlanger": { name: "Bestattung Anlanger KG", city: "Bad Ischl", citySlug: "bad-ischl", bundesland: "oberoesterreich", plz: "4820", street: "Bad Ischl", phone: "+43 6132 23234", email: "bestattung@anlanger.com", locations: [{city:"Bad Ischl",plz:"4820"},{city:"Bad Goisern",plz:"4822"},{city:"Hallstatt",plz:"4830"},{city:"Obertraun",plz:"4831"},{city:"Strobl",plz:"5350"}], description: "Bestattung Anlanger KG – Bestattungsunternehmen im Salzkammergut mit Standorten in Bad Ischl, Bad Goisern, Hallstatt, Obertraun und Strobl." },
  "aumann": { name: "Bestattung Aumann", city: "Zistersdorf", citySlug: "zistersdorf", bundesland: "niederoesterreich", plz: "2225", street: "Kaiserstrasse 24", phone: "+43 2532 2367", email: "office@bestattung-aumann.at", locations: [{city:"Zistersdorf",plz:"2225",street:"Kaiserstrasse 24"},{city:"Neusiedl/Zaya",plz:"2183"}], description: "Bestattung Barbara Aumann in Zistersdorf und Neusiedl/Zaya – Bestattungsunternehmen im Weinviertel, Niederösterreich." },
  "bachler": { name: "Bestattung Bachler", city: "Abtenau", citySlug: "abtenau", bundesland: "salzburg", plz: "5441", street: "Markt 84", phone: "+43 664 6437531", email: "bestattung-bachler@sbg.at", description: "Bestattung Bachler in Abtenau – Bestattungsunternehmen im Salzburger Land." },
  "baumann": { name: "Bestattung Baumann", city: "Pinsdorf", citySlug: "pinsdorf", bundesland: "oberoesterreich", plz: "4812", street: "Steinbichlstr. 52", phone: "+43 7612 67376", email: "office@bestattung-baumann.at", description: "Bestattung Baumann in Pinsdorf – Bestattungsunternehmen im Bezirk Gmunden, Oberösterreich." },
  "baumgartner": { name: "Bestattung Baumgartner", city: "Obdach", citySlug: "obdach", bundesland: "steiermark", plz: "8742", street: "St. Anna-Weg 7", phone: "+43 664 2606438", email: "bestattung.baumgartner@obdach.at", description: "Bestattung Baumgartner in Obdach – Bestatter in der Obersteiermark." },
  "beer": { name: "Bestattung Beer", city: "Neuhofen an der Ybbs", citySlug: "neuhofen-ybbs", bundesland: "niederoesterreich", plz: "3364", street: "Ulmerfelder Straße 13", phone: "+43 7475 52104", email: "office@trauerhilfe-beer.at", description: "Bestattung Beer in Neuhofen an der Ybbs – Trauerhilfe und Bestattungsunternehmen im Mostviertel." },
  "bergmeister": { name: "Bestattung Bergmeister", city: "Lienz", citySlug: "lienz", bundesland: "tirol", plz: "9900", street: "Beda Weber-Gasse 14", phone: "+43 4852 62090", email: "info@bestattung-bergmeister.at", description: "Bestattung Bergmeister in Lienz – Bestattungsunternehmen in Osttirol." },
  "beyer": { name: "Bestattung Beyer", city: "Peuerbach", citySlug: "peuerbach", bundesland: "oberoesterreich", plz: "4722", street: "Peuerbach", phone: "+43 699 11039133", email: "office@bestattung-beyer.at", description: "Bestattung Beyer in Peuerbach – Bestattungsunternehmen im Bezirk Grieskirchen, Oberösterreich." },
  "biack": { name: "Bestattung Biack GmbH", city: "Tulln", citySlug: "tulln", bundesland: "niederoesterreich", plz: "3430", street: "Rudolfstraße 10", phone: "+43 2272 62490", email: "bestattung@biack.at", description: "Bestattung Biack GmbH in Tulln an der Donau – Bestattungsunternehmen im Bezirk Tulln, Niederösterreich." },
  "biebl": { name: "Bestattung Biebl", city: "Sandl", citySlug: "sandl", bundesland: "oberoesterreich", plz: "4251", street: "Sandl 20", phone: "+43 664 2223543", email: "info@trauerberatung.at", description: "Bestattung Biebl in Sandl – Trauerberatung und Bestattungsunternehmen im Mühlviertel, Oberösterreich." },
  "birbamer": { name: "Bestattung Birbamer", city: "Berndorf", citySlug: "berndorf", bundesland: "niederoesterreich", plz: "2560", street: "Hainfelderstraße 22", phone: "+43 2672 82510", email: "birbamer@bestattungsunternehmen.at", locations: [{city:"Berndorf",plz:"2560",street:"Hainfelderstraße 22"},{city:"Pernitz",plz:"2763",street:"Franz Hoferstraße 3"}], description: "Bestattung Birbamer in Berndorf und Pernitz – Bestattungsunternehmen im Bezirk Baden, Niederösterreich." },
  "brixner": { name: "Bestattung Brixner", city: "Mauthausen", citySlug: "mauthausen", bundesland: "oberoesterreich", plz: "4310", street: "Marktstraße 1", phone: "+43 7238 2178", email: "bestattung@brixner.at", locations: [{city:"Mauthausen",plz:"4310",street:"Marktstraße 1"},{city:"Ried in der Riedmark",plz:"4312"},{city:"Katsdorf",plz:"4223"}], description: "Bestattung Brixner in Mauthausen, Ried in der Riedmark und Katsdorf – Bestatter im Bezirk Perg." },
  "bruckner": { name: "Bestattung H. Bruckner GmbH", city: "Wolfern", citySlug: "wolfern", bundesland: "oberoesterreich", plz: "4493", street: "Leihmannsdorf 15", phone: "+43 650 7117789", email: "office@bestattung-bruckner.at", description: "Bestattung H. Bruckner GmbH in Wolfern – Bestattungsunternehmen im Bezirk Steyr-Land, Oberösterreich." },
  "brunflicker": { name: "Bestattung Brunflicker-Glatz GmbH", city: "Winzendorf", citySlug: "winzendorf", bundesland: "niederoesterreich", plz: "2722", street: "Römerweg 235", phone: "+43 2638 23266", email: "office@bestattung-brunflicker-glatz.at", description: "Bestattung Brunflicker-Glatz GmbH in Winzendorf – Bestatter im Bezirk Wiener Neustadt." },
  "brunhuber": { name: "Bestattung Brunhuber", city: "Pasching", citySlug: "pasching", bundesland: "oberoesterreich", plz: "4061", street: "Thurnhartinger Straße 10", phone: "+43 7221 88036", email: "office@bestattung-brunhuber.at", description: "Bestattung Brunhuber in Pasching – Bestattungsunternehmen im Bezirk Linz-Land, Oberösterreich." },
  "butter": { name: "Bestattung Butter", city: "Trieben", citySlug: "trieben", bundesland: "steiermark", plz: "8784", street: "Alte Tauernstraße 7", phone: "+43 664 2333234", email: "bestattungbutter@aon.at", locations: [{city:"Trieben",plz:"8784",street:"Alte Tauernstraße 7"},{city:"Admont",plz:"8911",street:"Hauptstraße 20"},{city:"Gaishorn am See",plz:"8782",street:"Furth 23"}], description: "Bestattung Butter in Trieben, Admont und Gaishorn – Bestatter im Bezirk Liezen, Steiermark." },
  "cepko": { name: "Bestattung Cepko", city: "Altenmarkt", citySlug: "altenmarkt", bundesland: "niederoesterreich", plz: "2571", street: "Hauptstraße 62", phone: "+43 2673 2238", email: "bestattung@cepko.at", locations: [{city:"Altenmarkt",plz:"2571",street:"Hauptstraße 62"},{city:"Alland",plz:"2534",street:"Hauptstraße 153"}], description: "Bestattung Cepko in Altenmarkt und Alland – Bestatter im Bezirk Baden, Niederösterreich." },
  "dellemann": { name: "Bestattung Dellemann", city: "Landeck", citySlug: "landeck", bundesland: "tirol", plz: "6500", street: "Urtlweg 1b", phone: "+43 5442 62373", email: "info@bestattung-dellemann.at", locations: [{city:"Landeck",plz:"6500",street:"Urtlweg 1b"},{city:"Zams",plz:"6511",street:"Engere Weg 23"}], description: "Bestattung Dellemann in Landeck und Zams – Bestattungsunternehmen im Bezirk Landeck, Tirol." },
  "dirnberger": { name: "Bestattung Dirnberger GmbH", city: "Zeltweg", citySlug: "zeltweg", bundesland: "steiermark", plz: "8740", street: "Bahnhofstraße 75", phone: "+43 3577 24535", email: "office@bestattung-dirnberger.at", description: "Bestattung Dirnberger GmbH in Zeltweg – Bestatter im Bezirk Murtal, Steiermark." },
  "dobretsberger": { name: "Bestattung Dobretsberger", city: "Linz", citySlug: "linz", bundesland: "oberoesterreich", plz: "4020", street: "Landstraße 35", phone: "+43 732 779688", email: "bestattung@dobretsberger.at", locations: [{city:"Linz",plz:"4020",street:"Landstraße 35"},{city:"Linz",plz:"4020",street:"Muldenstraße 31"}], description: "Bestattung Dobretsberger in Linz – Bestattungsunternehmen mit zwei Standorten in der Landeshauptstadt." },
  "drabek": { name: "Bestattung Drabek", city: "Gänserndorf", citySlug: "gaenserndorf", bundesland: "niederoesterreich", plz: "2230", street: "Bahnstraße 26", phone: "+43 2282 2388", email: "bestattung.drabek@aon.at", description: "Bestattung Drabek in Gänserndorf – Bestatter im Weinviertel, Niederösterreich." },
  "dussmann": { name: "Bestattung Dussmann", city: "St. Andrä-Wördern", citySlug: "st-andrae-woerdern", bundesland: "niederoesterreich", plz: "3423", street: "Greifensteinerstraße 9", phone: "+43 2242 32379", email: "office@bestattung-dussmann.at", description: "Bestattung Dussmann in St. Andrä-Wördern – Bestatter im Bezirk Tulln, Niederösterreich." },
  "ebenbichler": { name: "Bestattung Ebenbichler", city: "Absam", citySlug: "absam", bundesland: "tirol", plz: "6067", street: "Dörferstrasse 54", phone: "+43 5223 43453", email: "office@bestattung-ebenbichler.at", description: "Bestattung Ebenbichler (Julia Matausch) in Absam – Bestatter im Bezirk Innsbruck-Land, Tirol." },
  "ebner-hohn": { name: "Bestattung Ebner Hohn", city: "Grein", citySlug: "grein", bundesland: "oberoesterreich", plz: "4360", street: "Hauptstraße 37", phone: "+43 7268 7708", email: "ebner.bestattung@gmx.at", description: "Bestattung Ebner Hohn in Grein – Bestatter im Strudengau, Oberösterreich." },
  "ecker": { name: "Bestattung Ecker GmbH", city: "Steinhaus", citySlug: "steinhaus", bundesland: "oberoesterreich", plz: "4641", street: "Schlossstraße 30", phone: "+43 7242 27102", email: "office@bestattung-ecker.at", description: "Bestattung Ecker GmbH in Steinhaus – Bestatter im Bezirk Wels-Land, Oberösterreich." },
  "edelboeck": { name: "Bestattung Edelböck", city: "Rennersdorf", citySlug: "rennersdorf", bundesland: "niederoesterreich", plz: "3200", street: "Römerweg 5", phone: "+43 676 6274367", email: "bestattung.edelboeck@gmx.at", description: "Bestattung Edelböck in Rennersdorf – Bestatter in Niederösterreich." },
  "eden": { name: "Eden Bestattung GmbH", city: "Weiz", citySlug: "weiz", bundesland: "steiermark", plz: "8160", street: "Weizberg 6", phone: "+43 3172 44441", email: "info@eden.co.at", description: "Eden Bestattung GmbH in Weiz – Bestattungsunternehmen in der Oststeiermark." },
  "eder": { name: "Bestattung Eder", city: "Munderfing", citySlug: "munderfing", bundesland: "oberoesterreich", plz: "5222", street: "Gewerbegebiet Nord 32", phone: "+43 7742 2210", email: "bestattung.eder@munderfing.jetzt", description: "Bestattung Eder in Munderfing – Bestatter im Bezirk Braunau, Oberösterreich." },
  "ehrenreich": { name: "Bestattung Ehrenreich", city: "Unzmarkt", citySlug: "unzmarkt", bundesland: "steiermark", plz: "8800", street: "Kirchengasse 24", phone: "+43 3583 2208", email: "ehrenreich@ainet.at", description: "Bestattung Ehrenreich in Unzmarkt – Bestatter im Bezirk Murtal, Steiermark." },
  "eichberger": { name: "Bestattung Eichberger GmbH", city: "Ried im Innkreis", citySlug: "ried-im-innkreis", bundesland: "oberoesterreich", plz: "4910", street: "Kasernstraße 1", phone: "+43 7752 83083", email: "ried@bestattung-eichberger.at", description: "Bestattung Eichberger GmbH in Ried im Innkreis – Bestatter im Innviertel, Oberösterreich." },
  "eiterbichler": { name: "Bestattung Eiterbichler GmbH & CoKG", city: "Zipf", citySlug: "zipf", bundesland: "oberoesterreich", plz: "4871", street: "Redl 17", phone: "+43 800 232301", email: "bestattung@eiterbichler.at", description: "Bestattung Eiterbichler in Zipf – Bestatter im Bezirk Vöcklabruck, Oberösterreich." },
  "engl": { name: "Bestattung Engl Franz", city: "Ebensee", citySlug: "ebensee", bundesland: "oberoesterreich", plz: "4802", street: "Langbathstraße 52", phone: "+43 664 4506501", email: "office@bestattung-engl.at", description: "Bestattung Engl Franz in Ebensee – Bestatter im Salzkammergut, Oberösterreich." },
  "ertl": { name: "Bestattung Ertl", city: "Weissensee", citySlug: "weissensee", bundesland: "kaernten", plz: "9762", street: "Neusach 26", phone: "+43 4713 2229", email: "office@bestattung-weissensee.at", description: "Bestattung Ertl (Bestattung Weissensee) in Neusach – Bestatter am Weissensee, Kärnten." },
  "esterbauer": { name: "Bestattung Esterbauer", city: "Geretsberg", citySlug: "geretsberg", bundesland: "oberoesterreich", plz: "5132", street: "Webersdorf 20", phone: "+43 7748 7118", email: "office@bestattung-esterbauer.at", description: "Bestattung Esterbauer in Geretsberg – Bestatter im Bezirk Braunau, Oberösterreich." },
  "falk": { name: "Bestattung Falk", city: "Bad Schallerbach", citySlug: "bad-schallerbach", bundesland: "oberoesterreich", plz: "4701", street: "Schönauer Straße 51", phone: "+43 664 5438002", email: "office@bestattung-falk.at", description: "Bestattung Falk in Bad Schallerbach – Bestatter im Bezirk Grieskirchen, Oberösterreich." },
  "fiausch": { name: "Bestattung Fiausch", city: "Kalwang", citySlug: "kalwang", bundesland: "steiermark", plz: "8775", street: "Marktstraße 69", phone: "+43 3846 8203", email: "fiausch@hotmail.com", description: "Bestattung Fiausch in Kalwang – Bestatter im Bezirk Leoben, Steiermark." },
  "fischer": { name: "Bestattung Fischer OG", city: "Weitra", citySlug: "weitra", bundesland: "niederoesterreich", plz: "3970", street: "Rathausplatz 54", phone: "+43 2856 2333", email: "office@bestattung-fischer.at", description: "Bestattung Fischer OG in Weitra – Bestatter im Waldviertel, Niederösterreich." },
  "fleischhacker": { name: "Bestattung Fleischhacker", city: "Preding", citySlug: "preding", bundesland: "steiermark", plz: "8504", street: "Grazer Straße 15", phone: "+43 3185 2334", email: "office@bestattung-fleischhacker.at", description: "Bestattung Fleischhacker in Preding – Bestatter im Bezirk Deutschlandsberg, Steiermark." },
  "forstenpointner": { name: "Bestattung Forstenpointner", city: "Ach", citySlug: "ach", bundesland: "oberoesterreich", plz: "5122", street: "Buchenweg 6", phone: "+43 7727 35237", email: "forstenpointner@aon.at", description: "Bestattung Forstenpointner in Ach – Bestatter im Bezirk Braunau, Oberösterreich." },
  "frittum": { name: "Bestattung Frittum", city: "Großmugl", citySlug: "grossmugl", bundesland: "niederoesterreich", plz: "2002", street: "Marktplatz 23", phone: "+43 2268 61262", email: "", locations: [{city:"Großmugl",plz:"2002",street:"Marktplatz 23"},{city:"Langenzersdorf",plz:"2103",street:"Wiener Strasse 4-6"},{city:"Obermallebarn",plz:"2011",street:"Obermallebarn 57"},{city:"Wullersdorf",plz:"2041",street:"Bahnstrasse 255"}], description: "Bestattung Frittum mit Standorten in Großmugl, Langenzersdorf, Obermallebarn und Wullersdorf – Bestatter im Weinviertel." },
  "fuchs": { name: "Fuchs Bestattungen e.U.", city: "Traismauer", citySlug: "traismauer", bundesland: "niederoesterreich", plz: "3133", street: "Wiesengasse 7, Tür 2", phone: "+43 2783 6364", email: "info@fuchsbestattungen.at", description: "Fuchs Bestattungen e.U. in Traismauer – Bestatter im Bezirk St. Pölten-Land, Niederösterreich." },
  "faehrmann": { name: "Der Fährmann – Bestattung und Trauerrituale KG", city: "Tarrenz", citySlug: "tarrenz", bundesland: "tirol", plz: "6464", street: "Griesegg 38", phone: "+43 664 1959960", email: "office@der-faehrmann.at", description: "Der Fährmann (Helmut Schöpf) – Bestattung und Trauerrituale in Tarrenz, Tirol." },
  "gabriel": { name: "Bestattung Gabriel", city: "Pöllau", citySlug: "poellau", bundesland: "steiermark", plz: "8225", street: "Hauptplatz 8", phone: "+43 3335 2335", email: "office@bestattung-gabriel.at", description: "Bestattung Gabriel (D & E Gabriel KG) in Pöllau – Bestatter im Bezirk Hartberg-Fürstenfeld, Steiermark." },
  "gadenstaetter": { name: "Bestattung Gadenstätter GmbH & Co KG", city: "Saalfelden", citySlug: "saalfelden", bundesland: "salzburg", plz: "5760", street: "Lofererstraße 54a", phone: "+43 6582 72355", email: "office@bestattung.at", description: "Bestattung Gadenstätter in Saalfelden – Bestatter im Pinzgau, Salzburg." },
  "gangoly": { name: "Bestattung Gangoly", city: "Oberwart", citySlug: "oberwart", bundesland: "burgenland", plz: "7400", street: "Steinamangerer Straße 24", phone: "+43 3352 32433", email: "office@ing-gangoly.at", locations: [{city:"Oberwart",plz:"7400",street:"Steinamangerer Straße 24"},{city:"Rechnitz",plz:"7471",street:"Hauptplatz 1"},{city:"Bernstein",plz:"7434",street:"Hauptstraße 65"},{city:"Großpetersdorf",plz:"7503",street:"Sackgasse 7"}], description: "Bestattung Gangoly in Oberwart mit Standorten in Rechnitz, Bernstein und Großpetersdorf – Bestatter im Südburgenland." },
  "gansch": { name: "Bestattung Tamara Gansch", city: "Kilb", citySlug: "kilb", bundesland: "niederoesterreich", plz: "3233", street: "Kirchenweg 4A", phone: "+43 650 5056550", email: "tamaragansch@gmx.at", description: "Bestattung Tamara Gansch in Kilb – Bestatter im Bezirk Melk, Niederösterreich." },
  "geiger": { name: "Bestattung Geiger GmbH", city: "Sieghartskirchen", citySlug: "sieghartskirchen", bundesland: "niederoesterreich", plz: "3443", street: "Koglerstraße 7", phone: "+43 2274 2229", email: "office@bestattung-geiger.at", description: "Bestattung Geiger GmbH in Sieghartskirchen – Bestatter im Bezirk Tulln, Niederösterreich." },
  "ginner": { name: "Bestattung Ginner", city: "Bürmoos", citySlug: "buermoos", bundesland: "salzburg", plz: "5111", street: "Friedhofstrasse 6", phone: "+43 664 5074440", email: "office@bestattung-helminger.at", description: "Bestattung Ginner in Bürmoos – Bestatter im Flachgau, Salzburg." },
  "gloss": { name: "Bestattung Gloss", city: "Poysdorf", citySlug: "poysdorf", bundesland: "niederoesterreich", plz: "2170", street: "Wiener Strasse 19", phone: "+43 2552 2251", email: "office@ing-gloss.at", description: "Bestattung Gloss in Poysdorf – Bestatter im Weinviertel, Niederösterreich." },
  "glueck": { name: "Bestattung Herbert Glück", city: "Traisen", citySlug: "traisen", bundesland: "niederoesterreich", plz: "3160", street: "Traisen", phone: "+43 2762 62077", email: "office@bestattung-glueck.at", locations: [{city:"Traisen",plz:"3160"},{city:"St. Georgen am Steinfelde",plz:"3151"}], description: "Bestattung Herbert Glück in Traisen und St. Georgen am Steinfelde – Bestatter im Bezirk Lilienfeld, Niederösterreich." },
  "greiderer": { name: "Bestattung Greiderer", city: "Kufstein", citySlug: "kufstein", bundesland: "tirol", plz: "6330", street: "Anton-Karg-Straße 6", phone: "+43 5372 62249", email: "info@greiderer-bestattungen.at", description: "Bestattung Greiderer in Kufstein – Bestatter im Bezirk Kufstein, Tirol." },
};

Object.assign(updates, {
  "grossalber": { name: "Bestattung Grossalber", city: "Grossraming", plz: "4463", street: "Neustiftgraben 47", phone: "+43 664 1384512", email: "kontakt@bestattung-grossalber.at" },
  "grossschaedl": { name: "Bestattung Grossschaedl", city: "Eggersdorf bei Graz", plz: "8063", street: "Eggersdorf bei Graz und Graz Umgebung", phone: "+43 3117 5117", locations: [{city:"Eggersdorf bei Graz",phone:"+43 3117 5117"},{city:"Gleisdorf",phone:"+43 3112 42990"},{city:"Markt Hartmannsdorf",phone:"+43 3114 30400"},{city:"Deutsch Kaltenbrunn",phone:"+43 3382 73100"},{city:"Ilz",phone:"+43 3385 73090"}] },
  "gruber": { name: "Bestattung Gruber", city: "Scharten", plz: "4612", street: "Scharten 12", phone: "+43 7272 5212", email: "gruber@bestatterinfo.com" },
  "gruenzweig": { name: "Gruenzweig Bestattung GmbH", city: "Stadl-Paura", plz: "4651", street: "Baeckergasse 23", phone: "+43 664 3526196", email: "office@bestattung-gruenzweig.at" },
  "gschwandtner": { name: "Bestattung Gschwandtner", city: "Hollersbach im Pinzgau", plz: "5731", street: "Hollersbach 9", phone: "+43 664 2828013", email: "office@bestattung-gschwandtner.at", locations: [{city:"Hollersbach im Pinzgau",plz:"5731",street:"Hollersbach 9"},{city:"Zell am See - Schuettdorf",plz:"5700",street:"Brucker Bundesstrasse 37"}] },
  "haderer": { name: "Bestattung Haderer", city: "Oberpullendorf", plz: "7350", street: "Eisenstaedterstrasse 27", phone: "+43 2612 43221", email: "office@bestattung-haderer.at" },
  "hagler": { name: "Bestattung Susanne Hagler GmbH & Co KG", city: "St. Valentin", plz: "4300", street: "Kirchenstrasse 5", phone: "+43 7435 52117", email: "office@bestattungstockinger.at" },
  "haider": { name: "Bestattung Haider", city: "Liezen", plz: "8940", street: "Schoenaustrasse 2", phone: "+43 3612 22130", email: "office@bestattung-haider.at", locations: [{city:"Liezen",plz:"8940",street:"Schoenaustrasse 2",email:"office@bestattung-haider.at",phone:"+43 3612 22130"},{city:"Bad Aussee",plz:"8990",street:"Kammerhofgasse 259",email:"aussee@bestattung-haider.at",phone:"+43 3622 52707"},{city:"Admont",plz:"8911",street:"Hauptstrasse 11",email:"admont@bestattung-haider.at",phone:"+43 3612 22130"},{city:"St. Gallen",plz:"8933",street:"Weissenbach an der Enns 110",email:"office@bestattung-haider.at",phone:"+43 3612 22130"}] },
  "hartl": { name: "Bestattung Hartl", city: "Rohrbach", plz: "4150", street: "Pfarrgasse 4", phone: "+43 664 7860235", email: "office@bestattung-hartl.at", locations: [{city:"Rohrbach",plz:"4150",street:"Pfarrgasse 4"},{city:"Lembach",plz:"4132",street:"Linzerstrasse 1"},{city:"Altenfelden",plz:"4121",street:"Marktplatz 9"}] },
  "haselboeck": { name: "Bestattung Haselboeck", city: "Wolkersdorf", plz: "2120", street: "Haasgasse 4", phone: "+43 2245 3554", email: "office@bestattung-haselboeck.at" },
  "hauser": { name: "Bestattung Gerhard Hauser", city: "Attnang-Puchheim", plz: "4800", street: "Mitterweg 67", phone: "+43 664 4015500", email: "office@bestattung-hauser.at" },
  "heidegger": { name: "Bestattung Heidegger", city: "Steinach am Brenner", plz: "6150", street: "Brennerstrasse 69", phone: "+43 5275 5211", email: "office@bestattung-heidegger.at" },
  "helminger": { name: "Bestattung Helminger GmbH", city: "Buermoos", plz: "5111", street: "Friedhofstrasse 6", phone: "+43 664 5074440", email: "office@bestattung-helminger.at" },
  "hemetsberger": { name: "Bestattung Hemetsberger", city: "Koestendorf", plz: "5203", street: "Untere Dorfstrasse 9", phone: "+43 6216 6509", email: "kontakt@bestattung-hemetsberger.at" },
  "herzog": { name: "Bestattung Herzog", phone: "+43 7684 7051" },
  "heschl": { name: "Bestattung Karl Heschl", city: "Guessing", plz: "7540", street: "Guessing", phone: "+43 3326 527670", email: "codo.heschl@aon.at", locations: [{city:"Guessing",plz:"7540"},{city:"Olbendorf",plz:"7534",street:"Bergen 714"},{city:"Stegersbach",plz:"7551",street:"Kirchengasse 20"}] },
  "hiesleitner": { name: "Bestattung Hiesleitner", city: "Herzogenburg", plz: "3130", street: "Wienerstrasse 1", phone: "+43 664 3355065", email: "office@bestattung-hiesleitner.at" },
  "hilzensauer": { name: "Bestattung Huber-Hilzensauer", city: "Althofen", plz: "9330", street: "Eisenstrasse 55", phone: "+43 4262 2375", email: "bestattung@huber-hilzensauer.at", locations: [{city:"Althofen",plz:"9330",street:"Eisenstrasse 55",phone:"+43 4262 2375"},{city:"Weitensfeld",plz:"9344",street:"Bahnweg 2",phone:"+43 4265 239"}] },
  "hitzinger": { name: "Bestattung Andreas Hitzinger", city: "Neusiedl am See", plz: "7100", street: "Gartenweg 26", phone: "+43 2167 2595", email: "hitzinger@gmx.at", locations: [{city:"Neusiedl am See",plz:"7100",street:"Gartenweg 26"},{city:"Andau",plz:"7163",street:"Buehlengasse 8"}] },
  "hochreiter": { name: "Bestattung Hochreiter KG", city: "Hofamt Priel", plz: "3681", street: "Rosenbichl 1", phone: "+43 676 9399301", email: "office@bestattung-hochreiter.at", locations: [{city:"Hofamt Priel",plz:"3681",street:"Rosenbichl 1"},{city:"Ybbs",plz:"3370",street:"Hauptplatz 1"}] },
  "hofbauer": { name: "Bestattung Hofbauer Julian", city: "Gfoehl", plz: "3542", street: "Hauptplatz 6", phone: "+43 2716 6340", email: "bestattung.hofbauer@aon.at" },
  "hofstaetter": { name: "Bestattung Hofstaetter", city: "Neulengbach", plz: "3040", street: "Wiener Strasse 16", phone: "+43 2772 55526", email: "info@ehofstaetter.at", locations: [{city:"Neulengbach",plz:"3040",street:"Wiener Strasse 16"},{city:"Pressbaum",plz:"3021",street:"Hauptstrasse 6"}] },
  "holzapfel": { name: "Bestattung Holzapfel", city: "St. Stefan ob Stainz", plz: "8511", street: "Niedergrail 149", phone: "+43 680 1262465", email: "office@bestattung-holzapfel.at" },
  "holzinger": { name: "Bestattung Holzinger", city: "Gallneukirchen", plz: "4210", street: "Fabrikstrasse 7", phone: "+43 664 2528002", email: "office@bestattung-holzinger.at" },
  "hoppenberger": { name: "Bestattung Hoppenberger", city: "Mattighofen", plz: "5230", street: "Stadtplatz 45", phone: "+43 7742 2315", email: "info@bestattung-hoppenberger.at" },
  "huber-sturm": { name: "Bestattung Huber Sturm", city: "St. Johann in Tirol", plz: "6380", street: "Salzburgerstrasse 27", phone: "+43 5352 62115", email: "bestattung@hubersturm.at" },
  "hubinger": { name: "Bestattung Siegfried Hubinger", city: "Wartberg an der Krems", plz: "4552", street: "Wartberg an der Krems", phone: "+43 7587 7174", email: "bestattung.hubinger@aon.at" },
  "hoefler": { name: "Hoefler Bestattungen", city: "Heitersheim", citySlug: "heitersheim", bundesland: "deutschland", plz: "79423", street: "Johanniterstrasse 67", phone: "+49 7634 595466", email: "info@hoefler-bestattungen.de" },
  "hoerhan": { name: "Bestattung Alexander Hoerhan", city: "Oberndorf an der Melk", plz: "3281", street: "Hauptstrasse 2", phone: "+43 664 4005050", email: "office@bestattung-hoerhan.at" },
  "huettner": { name: "Bestattung Huettner", city: "St. Johann in Tirol", plz: "6380", street: "Dechant-Wieshoferstrasse 33", phone: "+43 5352 21601", email: "info@bestattung-huettner.at" },
  "inghofer": { name: "Bestattung Robert Inghofer", city: "Heidenreichstein", plz: "3860", street: "Klein Pertholz 18", phone: "+43 2862 52550", email: "buero@bestattung-inghofer.at" },
  "irran": { name: "Bestattung Ulrich Irran", city: "Aspach", plz: "5252", street: "Hoehnharter Strasse 43", phone: "+43 676 5163798", email: "irran@gmx.at" },
  "jung": { name: "Bestattung Jung GmbH", city: "Salzburg", plz: "5020", street: "Innsbrucker Bundesstrasse 42/44", phone: "+43 662 4321310", email: "office@bestattung-salzburg.at" },
  "kada": { name: "Bestattung Kada", city: "Leibnitz", plz: "8430", street: "Schmiedgasse 34", phone: "+43 3452 824600", email: "office@bestattungkada.at" },
  "kainer": { name: "Bestattung Ing. Robert Kainer", city: "Grosshoeflein", plz: "7051", street: "Meistergasse 10", phone: "+43 664 9105410", email: "office@bestattung-kainer.at", locations: [{city:"Grosshoeflein",plz:"7051",street:"Meistergasse 10"},{city:"Siegendorf",plz:"7011",street:"Rathausplatz 11"}] },
  "kallaus": { name: "Bestattung Kallaus", city: "Laa an der Thaya", plz: "2136", street: "Thayapark 36", phone: "+43 2522 2316", email: "office@bestattung-kallaus.at" },
  "kamhuber": { name: "Bestattung Kamhuber", city: "Zellerndorf", plz: "2051", street: "Zellerndorf 324", phone: "+43 2945 2237", email: "bestattung@kamhuber.at" },
  "karner": { name: "Bestattung Karner", city: "Frankenfels", plz: "3213", street: "Hofstadtgegend 38", phone: "+43 676 4533033", email: "buero@bestattung-karner.at" },
  "kessler": { name: "Bestattung Kessler", phone: "+43 2769 8343", email: "office@e-kessler.at" },
  "kihr": { name: "Bestattung Kihr", city: "Telfs", plz: "6410", street: "Georgenweg 3a", phone: "+43 5262 62407", email: "office@bestattung-kihr.at" },
  "killian": { name: "Bestattung Killian", city: "Leobersdorf", plz: "2544", street: "Dornauerstrasse 1A", phone: "+43 2256 62205", email: "bestattung.killian@aon.at" },
  "kinberger": { name: "Bestattung Kinberger", city: "Wolfsegg am Hausruck", plz: "4902", street: "Rossmarkt 5", phone: "+43 7676 7334", email: "office@kinberger.at" },
  "kinelly": { name: "Bestattung Kinally", city: "Markt Allhau", plz: "7411", street: "Wolfauerstrasse 23", phone: "+43 664 1921582", email: "office@kinelly.at", locations: [{city:"Markt Allhau",plz:"7411",street:"Wolfauerstrasse 23",phone:"+43 664 1921582"},{city:"Pinkafeld",plz:"7423",street:"Hauptstrasse 26",phone:"+43 664 1921582"},{city:"Litzelsdorf",plz:"7532",street:"Anger 2",phone:"+43 676 880703195"},{city:"Stinatz",plz:"7552",street:"Gartenstrasse",phone:"+43 664 3465819"},{city:"Grafenschachen",plz:"7423",street:"Grafenschachen",phone:"+43 664 4509029"},{city:"Olbendorf",plz:"7534",street:"Bergen 714",phone:"+43 664 1921582"}] },
  "kirnbauer": { name: "Bestattung Ing. Manfred Kirnbauer", city: "Oberschuetzen", plz: "7432", street: "Herrengasse 14", phone: "+43 3353 7551", email: "office@bestattung-kirnbauer.at" },
  "klaffenboeck": { name: "Bestattung Klaffenboeck e.U.", city: "Neukirchen am Walde", plz: "4724", street: "Ertl 17", phone: "+43 664 3548243", email: "office@bestattung-klaffenboeck.at" },
  "knoll": { name: "Bestattung Ferdinand Knoll", city: "Perg", plz: "4320", street: "Hauptplatz 1a", phone: "+43 7262 54500", email: "office@bestattung-knoll.at" },
  "koch": { name: "Bestattung Koch GmbH", city: "Eisenstadt", plz: "7000", street: "Neusiedler Strasse 49", phone: "+43 2682 62658", email: "office@bestattung-koch.at" },
  "kogler": { name: "Bestattung Kogler", city: "Mittersill", plz: "5730", street: "Klausgasse 10", phone: "+43 664 3376205", email: "office@bestattung-pinzgau.at", locations: [{city:"Mittersill",plz:"5730",street:"Klausgasse 10"},{city:"Zell am See",plz:"5700",street:"Brucker Bundesstrasse 5"},{city:"Kaprun",plz:"5710",street:"Augasse 12"}] },
  "koller": { name: "Bestattung Koller-Adlmann OG", city: "Weiz", plz: "8160", street: "Marburger Strasse 23", phone: "+43 3172 2931", email: "office@bestattung-weiz.at" },
  "kominek": { name: "Bestattung Kominek", city: "Feuersbrunn", plz: "3483", street: "Kellergasse 1-2", phone: "+43 2738 22770", email: "bestattung.kominek@aon.at" },
  "konrad": { name: "Bestattung Konrad", city: "St. Stefan im Rosental", plz: "8083", street: "Gleichenbergerstrasse 7", phone: "+43 3116 8349", email: "office@bestattung-konrad.at" },
  "kos": { name: "Bestattung Kos", city: "Wolfsberg", plz: "9400", street: "Wolfsberg", phone: "+43 650 2429898", locations: [{city:"Wolfsberg"},{city:"St. Andrae"},{city:"Griffen"},{city:"Bad St. Leonhard"}] },
  "krammer": { name: "Bestattung Hermann Krammer", city: "Zistersdorf", plz: "2225", street: "Umfahrungsstrasse 1c", phone: "+43 2532 2305", email: "info@bestattung-krammer.at", locations: [{city:"Zistersdorf",plz:"2225",street:"Umfahrungsstrasse 1c",phone:"+43 2532 2305",email:"info@bestattung-krammer.at"},{city:"Grosskrut",plz:"2143",street:"Poysdorfer Strasse 39",phone:"+43 2556 50185",email:"grosskrut@bestattung-krammer.at"}] },
  "krennmayr": { name: "Bestattung Krennmayr", city: "Kirchdorf an der Krems", plz: "4560", street: "Hausmanningerstrasse 4", phone: "+43 7582 61333", email: "office@krennmayr.com" },
  "krisai": { name: "Bestattung Krisai", city: "Braunau am Inn", plz: "5280", street: "Linzerstrasse 18", phone: "+43 664 1005571", email: "krisai@manhartseder.at" },
  "krug": { name: "Bestattung Krug", city: "Grafenschachen", plz: "7423", street: "Grafenschachen 34", phone: "+43 3352 32433", email: "office@ing-gangoly.at" },
  "kroell": { name: "Bestattung Franz Kroell", city: "Mayrhofen", plz: "6290", street: "Laubichl 146", phone: "+43 5285 64500", email: "office@bestattung-kroell.at" },
  "kunz": { name: "Bestattung Kunz GmbH", city: "Pitten", plz: "2823", street: "Lobengasse 593", phone: "+43 2627 82291", email: "office@bestattung-kunz.at" },
  "koeck": { name: "Bestattung Koeck & Koeck GmbH", city: "Vitis", plz: "3902", street: "Seewiesenstrasse 24", phone: "+43 680 2001143", email: "bestattung-waldviertel@hotmail.com" },
  "kuenzl": { name: "Bestattung Kuenzl", city: "Drasenhofen", plz: "2165", street: "Betriebsgebiet Ost 2", phone: "+43 2554 88006", email: "bestattung@kuenzl.at", locations: [{city:"Drasenhofen",plz:"2165",street:"Betriebsgebiet Ost 2",phone:"+43 2554 88006"},{city:"Ernstbrunn",plz:"2115",street:"Industriestrasse 1",phone:"+43 2576 2347"}] },
  "lechner": { name: "Bestattung Othmar Lechner GmbH", city: "Schwaz", plz: "6130", street: "Husslstrasse 40", phone: "+43 50 1717140", email: "info@bestattung-lechner.at" },
  "leiner": { name: "Bestattung Leiner e.U.", city: "Jennersdorf", plz: "8380", street: "Raxer Strasse 8", phone: "+43 664 1009979", email: "info@bestattung-leiner.at", locations: [{city:"Jennersdorf",plz:"8380",street:"Raxer Strasse 8"},{city:"Eisenberg an der Raab",plz:"8383",street:"Kirchenzipf 19"},{city:"Minihof-Liebau",plz:"8384",street:"Minihof-Liebau 38"}] },
  "leitner": { name: "Bestattungsinstitut Leitner", city: "Laakirchen", plz: "4663", street: "Dr. Wimberger Strasse 13", phone: "+43 7613 3393", email: "info@bestattung-leitner.at" },
  "leitzinger": { name: "Bestattung Leitzinger", city: "Petzenkirchen", plz: "3252", street: "Bergmannplatz 1", phone: "+43 680 3013688", email: "bestattung@leitzinger.net" },
  "lesiak": { name: "Bestattung Lesiak", city: "Sankt Gilgen", plz: "5340", street: "Claus-von-Gagern-Weg 19", phone: "+43 6227 2381", email: "bestattung@lesiak.co.at", locations: [{city:"Sankt Gilgen",plz:"5340",street:"Claus-von-Gagern-Weg 19"},{city:"Seekirchen",plz:"5201",street:"Hauptstrasse 18"},{city:"Bad Ischl",plz:"4820",street:"Dr. Mayer-Strasse 1"},{city:"Mondsee",plz:"5310",street:"Rainerstrasse 6"}] },
  "linser": { name: "TrauerHilfe Bestattung Linser", city: "Woergl", plz: "6300", street: "Wildschoenauer Strasse 41", phone: "+43 50 1717150", email: "bestattung@linser.co.at" },
  "linz-ag": { name: "Bestattung Linz AG", city: "Linz", plz: "4021", street: "Wiener Strasse 151", phone: "+43 732 34004000", email: "info@linzag.at" },
  "longo": { name: "Bestattung Longo", city: "Lechaschau", plz: "6600", street: "Lechtaler Strasse 32a", phone: "+43 5672 62577", email: "bestattung@longo.at" },
  "lugbauer": { name: "Bestattung Lugbauer", city: "Scheibbs", plz: "3270", street: "Flecknertorgasse 12", phone: "+43 7482 42448", email: "office@bestattung-lugbauer.at" },
  "luger": { name: "Bestattung Luger", phone: "+43 664 3806954", email: "office@bestattung-luger.at" },
  "luttenberger": { name: "Bestattung Luttenberger", city: "Kapfenstein", plz: "8353", street: "Kapfenstein 92", phone: "+43 3157 22910", email: "info@bestattung-luttenberger.at", locations: [{city:"Kapfenstein",plz:"8353",street:"Kapfenstein 92"},{city:"Bad Gleichenberg",plz:"8344",street:"Gnaserstrasse 5"},{city:"Stainz bei Straden",plz:"8345",street:"Dirnbach"}] },
  "luxenberger": { name: "Bestattung Rainer Wolfgang Luxenberger", city: "Spittal an der Drau", plz: "9800", street: "Spittal an der Drau", phone: "+43 4732 2251", locations: [{city:"Spittal an der Drau",plz:"9800"},{city:"Gmuend",plz:"9853",street:"Hintere Gasse 31"}] },
  "loebersorg": { name: "Bestattung Loebersorg", city: "Hollenstein an der Ybbs", plz: "3343", street: "Berg 7", phone: "+43 7445 300", email: "bestattung@loebersorg.at" },
  "loeckinger": { name: "Bestattung Loeckinger", city: "Enzenkirchen", plz: "4761", street: "Hauptstrasse 44", phone: "+43 664 2238445", email: "office@der-bestatter.at" },
  "mayer": { name: "Bestattung Mayer", city: "Sigharting", plz: "4771", street: "Hauptstrasse 6", phone: "+43 664 3327233", email: "office@bestattung-mayer.at" },
  "mayrhofer": { name: "Bestattung Josef Mayrhofer", city: "Schildorn", plz: "4920", street: "Dorfplatz 4", phone: "+43 7754 8010", email: "ratundhilfe@bestattung-mayrhofer.at" },
  "moertenhuber": { name: "Bestattung Ing. Manfred Moertenhuber", city: "Kremsmuenster", plz: "4550", street: "Marktplatz 6", phone: "+43 7583 8438", email: "office@bestattung-moertenhuber.at", locations: [{city:"Kremsmuenster",plz:"4550",street:"Marktplatz 6",phone:"+43 7583 8438"},{city:"Bad Hall",plz:"4540",street:"Linzer Strasse 23",phone:"+43 7258 2081"}] },
  "moertl": { name: "Bestattung Moertl", city: "Koetschach-Mauthen", plz: "9640", street: "Koetschach 15", phone: "+43 4715 225", email: "artur.moertl@aon.at", locations: [{city:"Koetschach-Mauthen",plz:"9640",street:"Koetschach 15"},{city:"Oberdrauburg",plz:"9781"}] },
  "muellner": { name: "Bestattung Muellner", city: "Hainburg an der Donau", plz: "2410", street: "Hofmeisterstrasse 9", phone: "+43 2165 62555", locations: [{city:"Hainburg an der Donau",plz:"2410",street:"Hofmeisterstrasse 9",phone:"+43 2165 62555"},{city:"Kittsee",plz:"2421",street:"Obere Hauptstrasse 3",phone:"+43 2143 2282"}] },
  "narobe": { name: "Bestattung Narobe", city: "Tamsweg", plz: "5580", street: "Jakob-Ferner-Strasse 3", phone: "+43 6474 2511", email: "narobe@sbg.at" },
  "neugebauer": { name: "Bestattung Neugebauer GmbH", city: "Bruck an der Leitha", plz: "2460", street: "Pachfurther Strasse 3", phone: "+43 2162 62470", email: "neugebauer.sorgner@gmail.com", locations: [{city:"Bruck an der Leitha",plz:"2460",street:"Pachfurther Strasse 3"},{city:"Mannersdorf am Leithagebirge",plz:"2452",street:"Jaegerzeile 12"}] },
  "neumayr": { name: "Bestattung Neumayr", city: "Eferding", plz: "4070", street: "Schaumburgerstrasse 14", phone: "+43 7272 70539", locations: [{city:"Eferding",plz:"4070",street:"Schaumburgerstrasse 14",phone:"+43 7272 70539"},{city:"Alkoven",plz:"4072",phone:"+43 7274 6229"},{city:"Haibach",street:"Schaumburgerstrasse 14",phone:"+43 7272 70539"}] },
  "neurauter": { name: "Bestattungsinstitut Ing. Dr. Karl Neurauter", city: "Zirl", plz: "6170", street: "Auergasse 8a", phone: "+43 5238 52490", email: "neurauter@bestattungsinstitut.at" },
  "neuwirth": { name: "Bestattung Neuwirth", city: "Gunskirchen", plz: "4623", street: "Holzgassen 2", phone: "+43 7246 6295", email: "office@bestattung-neuwirth.at" },
  "noesslboeck": { name: "Bestattung Noesslboeck GmbH", city: "Rohrbach-Berg", plz: "4150", street: "Stadtplatz 10", phone: "+43 7289 4312", email: "office@bestattung-rohrbach.at" },
  "obereder": { name: "Bestattung Obereder", city: "Koenigswiesen", plz: "4280", street: "Markt 27", phone: "+43 7955 6249", email: "office@obereder.at" },
  "oberhuber": { name: "Bestattung Oberhuber", city: "Neuhofen an der Krems", plz: "4501", street: "Julianabergstrasse 4", phone: "+43 7227 4308", email: "office@oberhuber.at", locations: [{city:"Neuhofen an der Krems",plz:"4501",street:"Julianabergstrasse 4",email:"office@oberhuber.at",phone:"+43 7227 4308"},{city:"St. Florian",plz:"4490",street:"Marktplatz 1",email:"st.florian@oberhuber.at",phone:"+43 7224 40984"}] },
  "obermueller": { name: "Bestattung Obermueller", city: "Neumarkt im Muehlkreis", plz: "4212", street: "Salzstrasse 13", phone: "+43 7941 82160", email: "office@bestattung-obermueller.at", locations: [{city:"Neumarkt im Muehlkreis",plz:"4212",street:"Salzstrasse 13"},{city:"Freistadt",plz:"4240",street:"Linzer Strasse 50"}] },
  "offenthaler": { name: "Bestattung Offenthaler", city: "Waldhausen", plz: "4391", street: "Froschau 48", phone: "+43 7260 4314", email: "office@offenthaler.at" },
  "ostermann": { name: "Bestattung Ostermann", city: "Wiesmath", plz: "2811", street: "Weisses Kreuz 1", phone: "+43 2645 2240", email: "office@bestattung-ostermann.at", locations: [{city:"Wiesmath",plz:"2811",street:"Weisses Kreuz 1"},{city:"Kirchschlag",plz:"2860"},{city:"Bad Schoenau",plz:"2853"},{city:"Lichtenegg",plz:"2813"},{city:"Schwarzenbach",plz:"2803"}] },
  "oswald": { name: "Bestattung Oswald", city: "Guessing", plz: "7540", street: "Rotkreuzbergstrasse 4", phone: "+43 3322 42263", email: "bestattung.oswald@aon.at", locations: [{city:"Guessing",plz:"7540",street:"Rotkreuzbergstrasse 4"},{city:"Stegersbach",plz:"7551",street:"Hauptplatz 6"}] },
  "pacher": { name: "Bestattung Pacher", city: "Flattach", plz: "9831", street: "Ausserfragant 26", phone: "+43 4785 248", email: "franz.pacher.be@speed.at" },
  "patzalt": { name: "Bestattung Rafaela Patzalt", city: "Wallsee", plz: "3313", street: "Augustusstrasse 2", phone: "+43 7433 2280", email: "office@bestattung-patzalt.at" },
  "pauschenwein": { name: "Bestattung Pauschenwein", city: "Wiesen", plz: "7203", street: "Siedlungsgasse 2a", phone: "+43 664 4041375", email: "bestattung@pauschenwein.at" },
  "pax": { name: "Bestattung Pax", phone: "+43 1 7690000", email: "office@bestattung-pax.at" },
  "pein": { name: "Bestattung Anna Pein", city: "Gnas", plz: "8342", street: "Obergnas 37", phone: "+43 3151 2527", email: "anna.pein@bestattungpein.at" },
  "peinhopf": { name: "Bestattung Peinhopf GmbH", city: "Schwanberg", plz: "8541", street: "Schulweg 4", phone: "+43 3467 8347", email: "office@bestattung-peinhopf.at" },
  "pernold": { name: "Bestattung Pernold GmbH", city: "Mistelbach", plz: "2130", street: "Liechtensteinstrasse 2-4", phone: "+43 2572 2413", email: "bestattung.pernold@aon.at" },
  "pichler": { name: "Bestattung Pichler", city: "Gmunden", plz: "4810", street: "Burgfriedweg 1", phone: "+43 7612 74931", email: "office@bestattung-pichler.at" },
  "piller": { name: "Bestattung Piller & Grafl GmbH", city: "Mattersburg", plz: "7210", street: "Hauptstrasse 2", phone: "+43 664 3087616", email: "office@bestattung-mattersburg.at" },
  "pillinger": { name: "Bestattung Pillinger", city: "St. Georgen im Attergau", plz: "4880", street: "Johann Beer Strasse 2", email: "office@bestattung-pillinger.at" },
  "pils": { name: "Bestattung Pils", city: "Purgstall", plz: "3251", street: "Jubilaeumsstrasse 4", phone: "+43 664 4365144", email: "patrick@bestattung-pils.at" },
  "pinter": { name: "Pinter GmbH Bestattung", city: "Deutschlandsberg", plz: "8530", street: "Nelkengasse 1-3", phone: "+43 3462 2907", email: "info@pinter-bestattung.at", locations: [{city:"Deutschlandsberg",plz:"8530",street:"Nelkengasse 1-3",email:"info@pinter-bestattung.at"},{city:"Eibiswald",plz:"8553",street:"Krumbach 12",email:"waldfriedhof@almruh.at",phone:"+43 664 5312552"}] },
  "ploberger": { name: "Bestattung Ploberger", city: "Voecklabruck", plz: "4840", street: "Vorstadt 7", phone: "+43 7672 24421", email: "info@bestattung-ploberger.com", locations: [{city:"Voecklabruck",plz:"4840",street:"Vorstadt 7"},{city:"Lenzing",plz:"4860",street:"Atterseestrasse 44"},{city:"Gampern",plz:"4851",street:"Haunolding 14"}] },
  "predota": { name: "Bestattung Predota", city: "Pischelsdorf", plz: "8212", street: "Pischelsdorf 177", phone: "+43 3113 2341", email: "office@predota.co.at" },
  "pressnitz": { name: "Bestattung Pressnitz", city: "Neumarkt", plz: "8820", street: "Gewerbepark Bhf 9", phone: "+43 664 1285689", email: "office@pressnitz-bestattung.at" },
  "prielinger": { name: "Bestattung Prielinger", city: "Pettenbach", plz: "4643", street: "Friedhofweg 2", phone: "+43 664 1842822", email: "office@btg-prielinger.at" },
  "priesching": { name: "Bestattung Priesching", phone: "+43 664 3522880", email: "info@priesching.at" },
  "puttinger": { name: "Bestattung Puttinger", city: "Mehrnbach", plz: "4941", street: "Sieber 8", phone: "+43 7752 71136", email: "office@bestattung-puttinger.at" },
  "racz": { name: "Bestattung Racz GmbH", city: "Deutschkreutz", plz: "7301", street: "Karrnergasse 5", phone: "+43 2613 80339", email: "bestattung-racz@kabelplus.at" },
  "radaschitz": { name: "Bestattung Radaschitz", city: "Riegersburg", plz: "8333", street: "Riegersburg 172", phone: "+43 3153 20090", email: "bestattung@radaschitz.at", locations: [{city:"Riegersburg",plz:"8333",street:"Riegersburg 172"},{city:"Feldbach",plz:"8330",street:"Pfarrgasse 1"}] },
  "radlherr": { name: "Bestattung Radlherr", city: "Boeheimkirchen", plz: "3071", street: "Hainfelder Strasse 39", phone: "+43 664 1951628", email: "office@radlherr.com", locations: [{city:"Boeheimkirchen",plz:"3071",street:"Hainfelder Strasse 39"},{city:"Kapelln",plz:"3141",street:"Hauptstrasse 14"}] },
  "radner": { name: "Bestattung Radner", city: "Vorchdorf", plz: "4655", street: "Schulstrasse 18", phone: "+43 7614 6377", email: "tischlereiradner@tele2.at" },
  "rakaseder": { name: "Bestattung Rakaseder-Galos GmbH", city: "Schaerding", plz: "4780", street: "Friedhofweg 1", phone: "+43 7712 3211", email: "info@bestattung-schaerding.com" },
  "redlich": { name: "Bestattung Redlich", city: "Obersiebenbrunn", plz: "2283", street: "Josef Porsch Strasse 38", phone: "+43 2286 2264", email: "obersiebenbrunn@bestattung-redlich.at", locations: [{city:"Obersiebenbrunn",plz:"2283",street:"Josef Porsch Strasse 38",phone:"+43 2286 2264",email:"obersiebenbrunn@bestattung-redlich.at"},{city:"Matzen",plz:"2243",street:"Josefsplatz 4",phone:"+43 2289 2242",email:"matzen@bestattung-redlich.at"},{city:"Gaenserndorf",plz:"2230",street:"Friedhofgasse 28",phone:"+43 2282 60800",email:"gaenserndorf@bestattung-redlich.at"}] },
  "reisecker": { name: "Bestattung Reisecker", city: "Raab", plz: "4760", street: "Obere Bruendlsiedlung Nr. 11", phone: "+43 7762 3284", email: "info@rip.at", locations: [{city:"Raab",plz:"4760",street:"Obere Bruendlsiedlung Nr. 11"},{city:"St. Willibald",plz:"4762",street:"St. Willibald Nr. 40"},{city:"Peuerbach",plz:"4722",street:"Hauptstrasse Nr. 5"}] },
  "reiterer": { name: "Bestattung Reiterer", phone: "+43 3465 2352", email: "bestattung@reiterer-kg.at" },
  "resch": { name: "Bestattung Resch Michael", city: "Steinakirchen am Forst", plz: "3261", street: "Pechert 10", phone: "+43 7488 71246", email: "office@resch-bestattung.at" },
  "roithner": { name: "Roithner Bestattung", city: "Traun", plz: "4050", street: "Tischlerstrasse 24", phone: "+43 7229 72423", email: "bestattung-r-roithner@liwest.at" },
  "ruecker": { name: "Bestattung Ruecker", city: "Pulkau", plz: "3741", street: "Hauptplatz 4", phone: "+43 664 1030594", email: "bestattung-ruecker-retz@gmx.at", locations: [{city:"Pulkau",plz:"3741",street:"Hauptplatz 4",phone:"+43 664 1030594"},{city:"Retz",plz:"2070",street:"Znaimerstrasse 33",phone:"+43 2942 2286"}] },
  "sammer": { name: "Bestattung Sammer", city: "Eisenstadt", plz: "7000", street: "Wienerstrasse 16", phone: "+43 2682 62677", email: "sammer@bestattung-eisenstadt.at" },
  "schachner": { name: "Bestattung Schachner", city: "Woerschach", plz: "8942", street: "Torfwerk 312", phone: "+43 3682 22384", email: "office@bestattung-schachner.at" },
  "schauptmayr": { name: "Bestattung Schauptmayr", city: "Aschach an der Donau", plz: "4082", street: "Gruenauerstrasse 19", phone: "+43 7273 6450" },
  "scheibenreif": { name: "Bestattung Scheibenreif", city: "Wuerflach", plz: "2732", street: "Klammgasse 36", phone: "+43 2620 2450", email: "bestattung@scheibenreif.com" },
  "schimboeck": { name: "Bestattung Schimboeck", city: "Weistrach", plz: "3351", street: "Dorf 19", phone: "+43 7477 42368", email: "office@schimboeck.at" },
  "schinnerl": { name: "Bestattung Rudolf Schinnerl", city: "Schwertberg", plz: "4311", street: "Bahnhofstrasse 2", phone: "+43 7262 61208", email: "bestattung@moebelhandwerk.at" },
  "schloemicher": { name: "Bestattung Schloemicher", city: "Bad Mitterndorf", plz: "8983", street: "Bad Mitterndorf 111", phone: "+43 664 2144257", email: "office@bestattung-schloemicher.at" },
  "schoditsch": { name: "Bestattung Schoditsch", city: "Markt Neuhodis", plz: "7464", street: "Sonnengasse 32", phone: "+43 664 9088549", email: "tischlerei-schoditsch@1044.net" },
  "schoosleitner": { name: "Bestattung Schoosleitner", city: "Seekirchen", plz: "5201", street: "Hauptstrasse 38", phone: "+43 6212 20143", email: "bestattung@schoosleitner.at", locations: [{city:"Seekirchen",plz:"5201",street:"Hauptstrasse 38",phone:"+43 6212 20143"},{city:"Thalgau",plz:"5303",street:"Irlachstrasse 5c",phone:"+43 6235 6713"},{city:"Mondsee",plz:"5310",street:"Steinerbachstrasse 8b Top B1",phone:"+43 6232 94100"}] },
  "schreiner": { name: "Bestattung Schreiner", city: "Fehring", plz: "8350", street: "Fuerstenfelderstrasse 4", phone: "+43 3155 2226", email: "bestattung@bestattung-hold.at" },
  "schrottenbaum": { name: "Der Bestatter Johannes Schrottenbaum", city: "Schwaz", plz: "6130", street: "St. Martin 32", phone: "+43 5242 22275", email: "office@derbestatter.at" },
  "schweighofer": { name: "Bestattung Schweighofer", city: "Vorau", plz: "8250", street: "Dreimuehlenweg 361", phone: "+43 3337 3636", email: "info@bestattung-schweighofer.at" },
  "schoenbiechler": { name: "Bestattung Schoenbichler", city: "Hainfeld", plz: "3170", street: "Hauptstrasse 45", phone: "+43 2764 67138", email: "office@bestattung-schoenbichler.at" },
  "sekora": { name: "Bestattung Sekora KG", city: "Muehldorf", plz: "3622", street: "Trandorf, Dorfstrasse 2", phone: "+43 2713 8440", email: "bestattung@sekora.at" },
  "spatzenegger": { name: "Bestattung Spatzenegger", city: "Friedburg", plz: "5211", street: "Kuehbichl 7", phone: "+43 7746 2251", email: "n.spatzenegger@gmx.at" },
  "sporer": { name: "Bestattungsinstitut Sporer", city: "Braunau am Inn", plz: "5280", street: "Friedhofstrasse 33a", phone: "+43 7722 65465", email: "bestattung.sporer@gmx.at" },
  "steiger": { name: "Bestattung Steiger", city: "Oberpullendorf", plz: "7350", street: "Rosengasse 17", phone: "+43 2612 42315", email: "office@bestattung-steiger.at" },
  "sterzl": { name: "Bestattung Sterzl", city: "Altenmarkt im Pongau", plz: "5541", street: "Obere Marktstrasse 14", phone: "+43 664 1042722", locations: [{city:"Altenmarkt im Pongau",plz:"5541",street:"Obere Marktstrasse 14",phone:"+43 664 1042722"},{city:"Werfen",plz:"5450",street:"Markt 47",phone:"+43 6412 4266"}] },
  "stockinger": { name: "Bestattung Stockinger", city: "St. Valentin", plz: "4300", street: "Kirchenstrasse 5", phone: "+43 7435 52117", email: "office@bestattungstockinger.at" },
  "stolz": { name: "Bestattung Stolz", city: "Murau", plz: "8850", street: "Am Hammer 11a", phone: "+43 3532 44990", email: "office@bestattung-stolz.at" },
  "stranz": { name: "Bestattung Stranz", city: "St. Valentin-Landschach", plz: "2630", street: "Dammstrasse 2", phone: "+43 2630 38292", email: "office@bestattung-stranz.at" },
  "stuchly": { name: "Bestattung Stuchly KG", city: "Thueringen", plz: "6712", street: "Faschinastrasse 10", phone: "+43 664 9105574", email: "office@bestattung-stuchly.at" },
  "sturm": { name: "Bestattung Sturm", city: "Unken", plz: "5091", street: "Niederland 154", phone: "+43 50 1717188" },
  "stoegerer": { name: "Bestattung Stoegerer", city: "Pinggau", plz: "8243", street: "Am Sonnenhang 4", phone: "+43 676 3505545", email: "office@bestattungen.co.at", locations: [{city:"Pinggau",plz:"8243",street:"Am Sonnenhang 4",phone:"+43 676 3505545",email:"office@bestattungen.co.at"},{city:"Pinkafeld",plz:"7423",street:"Hauptstrasse 19",phone:"+43 3357 20401",email:"pinkafeld@bestattungen.co.at"}] },
  "summer": { name: "Bestattung Summer", city: "Wallern im Burgenland", plz: "7151", street: "Bahnstrasse 44", phone: "+43 2174 26022", email: "office@bestattung-summer.at" },
  "tempora": { name: "Bestattung Tempora Amstetten", city: "Amstetten", plz: "3300", street: "Ybbsstrasse 1", phone: "+43 7472 6097016", email: "info@tempora.at" },
  "teufel": { name: "Bestattung Hans Teufel", city: "Wien", plz: "1210", street: "Stammersdorfer Strasse 218", phone: "+43 1 2923661", email: "bestattung@hans-teufel.at", locations: [{city:"Wien",plz:"1210",street:"Stammersdorfer Strasse 218",phone:"+43 1 2923661"},{city:"Gross-Enzersdorf",plz:"2301",street:"Prinz-Eugen-Strasse 2",phone:"+43 2249 2377"},{city:"Wien",plz:"1130",street:"Hietzinger Kai 5/9",phone:"+43 1 2923661-411"}] },
  "teuschl": { name: "Bestattung Willibald Teuschl KG", city: "Bad Traunstein", plz: "3632", street: "Spielberg 17", phone: "+43 2878 6245", email: "office@teuschl.co.at" },
  "thalhammer": { name: "Bestattung Thalhammer", city: "Feldkirchen an der Donau", plz: "4101", street: "Weingasse 10", phone: "+43 699 13860994", email: "office@bestattung-thalhammer.at" },
  "thaller": { name: "Bestattung Thaller", city: "Hofkirchen im Muehlkreis", plz: "4142", street: "Markt 21", phone: "+43 7285 2280", email: "bestattung@thaller.at", locations: [{city:"Hofkirchen im Muehlkreis",plz:"4142",street:"Markt 21"},{city:"Altenfelden",plz:"4121",street:"Marktplatz 1"}] },
  "thennemayer": { name: "Bestattung Thennemayer", city: "Oberwoelbling", plz: "3124", street: "Wachaustrasse 11", phone: "+43 676 4778663", email: "info@bestattung-thennemayer.at", locations: [{city:"Oberwoelbling",plz:"3124",street:"Wachaustrasse 11"},{city:"Huerm",plz:"3383",street:"Wiesengasse 10"}] },
  "toelly": { name: "Bestattung Toelly", city: "Oberwart", plz: "7400", street: "Hyrtlgasse 1", phone: "+43 3352 32358", locations: [{city:"Oberwart",plz:"7400",street:"Hyrtlgasse 1"},{city:"Stadtschlaining",plz:"7461",street:"Rochusplatz 4"},{city:"Grosspetersdorf",plz:"7503",street:"Hauptplatz 8"},{city:"Bad Tatzmannsdorf",plz:"7431",street:"Hofgasse 3"},{city:"Kemeten",plz:"7531",street:"Kirchenwinkel 34"},{city:"Schachendorf",plz:"7472",street:"Schachendorf 4"}] },
  "unterberger": { name: "Bestattung Unterberger", city: "Gresten", plz: "3264", street: "Oberer Markt 2", phone: "+43 7487 4009", email: "office@bestattung-unterberger.at" },
  "unterscheider": { name: "Bestattung Unterscheider", city: "Afritz am See", plz: "9542", street: "Schulstrasse 99", phone: "+43 4247 2150", email: "office@unterscheider-bestattung.at" },
  "urschler": { name: "Bestattung Ilse Urschler GmbH", city: "Fuerstenfeld", plz: "8280", street: "Buchwaldstrasse 5", phone: "+43 3382 55885", email: "office@bestattung-urschler.at", locations: [{city:"Fuerstenfeld",plz:"8280",street:"Buchwaldstrasse 5",phone:"+43 3382 55885"},{city:"Ilz",plz:"8262",street:"Ilz 45",phone:"+43 3385 72191"},{city:"Neudau",plz:"8292",street:"Hauptstrasse 36",phone:"+43 3383 20023"},{city:"Rudersdorf",plz:"7571",street:"Theresiensiedlung 2/2",phone:"+43 3382 55885"}] },
  "vockenhuber": { name: "Vockenhuber Bestattung", city: "Altmunster", plz: "4813", street: "Marktstrasse 6", phone: "+43 7612 20404", email: "info@vockenhuber-bestattung.at" },
  "vorreiter": { name: "Bestattung Vorreiter", city: "Friesach", plz: "9360", street: "Fuerstenhofgasse 2", phone: "+43 4268 2314", email: "office@bestattung-vorreiter.at" },
  "wallmann": { name: "Bestattung Buchsteiner Wallmann", city: "Salzburg", plz: "5020", street: "Fuerbergstrasse 19", phone: "+43 662 640678", email: "office@salzburger-bestattung.at" },
  "walter": { name: "Bestattung Walter", city: "Galtuer", plz: "6563", street: "Galtuer Nr. 50", phone: "+43 5443 8312", email: "walter@trauerhilfe.at" },
  "walzer": { name: "Walzer Bestattung", city: "Grossweikersdorf", plz: "3701", street: "Industriestrasse 1", phone: "+43 2955 70278", email: "info@bestattung-walzer.at" },
  "wazlawik": { name: "Bestattung Wazlawik - Reischl e.U.", city: "Schwarzach im Pongau", plz: "5620", street: "Salzburgerstrasse 55", phone: "+43 6415 4205", email: "office@bestattung-wazlawik.at" },
  "wedl": { name: "Bestattung Klaus Wedl", city: "Eisenstadt", plz: "7000", street: "Wiener Strasse 8", phone: "+43 2682 62677", email: "wedl@direkt.at" },
  "weiskircher": { name: "Bestattung Weiskircher", city: "Hoetzelsdorf", plz: "3753", street: "Goggitsch 21", phone: "+43 2912 2246", email: "bestattung@wgo.at" },
  "wiesner": { name: "Bestattungen Martin Wiesner", city: "Ort im Innkreis", plz: "4974", street: "Ort im Innkreis 73", phone: "+43 7751 6041", email: "office@wiesner-moebel.at" },
  "wilfinger": { name: "Bestattung Fritz Wilfinger KG", city: "Hartberg", plz: "8230", street: "Michaeligasse 8", phone: "+43 3332 62261", email: "office@bestattung-wilfinger.at" },
  "wimmer": { name: "Bestattung Josef Wimmer", city: "Weng im Innkreis", plz: "4952", street: "Hauptstrasse 20", phone: "+43 7723 5095", email: "info@bestattung-wimmer.at" },
  "wittmann": { name: "Bestattung Ing. Michael Wittmann", city: "Zwettl", plz: "3910", street: "Babenbergergasse 6", phone: "+43 2822 52381", email: "info@bestattung-zwettl.at" },
  "wolf": { name: "Bestattung Wolf GmbH", city: "Kalsdorf bei Graz", plz: "8401", street: "Ortsried 7", phone: "+43 3135 54666", email: "office@bestattung-wolf.com" },
  "wuschko": { name: "Bestattung Wuschko", city: "Ulrichsberg", plz: "4161", street: "Falkensteinstrasse 6", phone: "+43 7288 2294", email: "bestattung@wuschko.com" },
  "woegenstein": { name: "Bestattung Allentsteig", city: "Allentsteig", plz: "3804", street: "Hauptstrasse 24/3", phone: "+43 2824 2908", email: "info@bestattung-allentsteig.at" },
  "woeginger": { name: "Bestattung Peter Woeginger", city: "Ybbs", plz: "3370", street: "Klosterhofstrasse 13", phone: "+43 676 4194715", email: "peter.woeginger@gmx.com" },
  "ziegler": { name: "Bestattung Andreas Ziegler", city: "Hirschbach im Muehlkreis", plz: "4242", street: "Hofreith 1", phone: "+43 664 5740956", email: "office@bestattung-ziegler.at" },
});

function readField(entry, field) {
  const match = entry.match(new RegExp(`${field}: "([^"]*)"`));
  return match ? match[1] : "";
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/ae/g, "a")
    .replace(/oe/g, "o")
    .replace(/ue/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inferBundesland(plz, city) {
  const code = String(plz || "");
  const place = String(city || "").toLowerCase();
  if (code.startsWith("1")) return "wien";
  if (/^(2|3)/.test(code)) return "niederoesterreich";
  if (code.startsWith("4")) return "oberoesterreich";
  if (/^(5230|5252|5280|5211)/.test(code)) return "oberoesterreich";
  if (code.startsWith("5")) return "salzburg";
  if (code.startsWith("67")) return "vorarlberg";
  if (/^(6|99)/.test(code)) return "tirol";
  if (code.startsWith("7")) return "burgenland";
  if (code.startsWith("8")) return "steiermark";
  if (code.startsWith("9")) return "kaernten";
  if (place.includes("heitersheim")) return "deutschland";
  return "niederoesterreich";
}

function buildDescription(data) {
  return `${data.name} in ${data.city} - Bestattungsunternehmen.`;
}

function q(value) {
  return JSON.stringify(value || "");
}

// Read the file
const filePath = path.join(__dirname, 'bestatter.js');
let content = fs.readFileSync(filePath, 'utf8');

let count = 0;
for (const [id, data] of Object.entries(updates)) {
  // Find the line with this id
  const regex = new RegExp(`\\{ id: "${id}",[^\\n]*\\}`);
  const match = content.match(regex);
  if (!match) { console.log(`NOT FOUND: ${id}`); continue; }

  const current = match[0];
  const merged = {
    name: data.name || readField(current, "name"),
    city: data.city || readField(current, "city"),
    citySlug: data.citySlug || (data.city ? slugify(data.city) : readField(current, "citySlug")),
    bundesland: data.bundesland || (data.plz ? inferBundesland(data.plz, data.city) : readField(current, "bundesland")),
    plz: data.plz || readField(current, "plz"),
    street: data.street || readField(current, "street"),
    phone: data.phone || readField(current, "phone"),
    email: data.email || readField(current, "email"),
    services: data.services || ["Erdbestattung", "Feuerbestattung", "Ueberfuehrungen", "Trauerfeier"],
    locations: data.locations,
    description: data.description,
  };
  merged.description = merged.description || buildDescription(merged);

  const locStr = data.locations ? `, locations: ${JSON.stringify(data.locations)}` : '';
  const emailStr = merged.email ? `, email: ${q(merged.email)}` : '';
  const svcs = data.services || ["Erdbestattung", "Feuerbestattung", "Überführungen", "Trauerfeier"];
  
  const newEntry = `{ id: "${id}", slug: "${id}", name: ${q(merged.name)}, city: ${q(merged.city)}, citySlug: ${q(merged.citySlug)}, bundesland: ${q(merged.bundesland)}, plz: ${q(merged.plz)}, street: ${q(merged.street)}, phone: ${q(merged.phone)}${emailStr}, services: ${JSON.stringify(svcs)}${locStr}, description: ${q(merged.description)} }`;
  
  content = content.replace(regex, newEntry);
  count++;
}

fs.writeFileSync(filePath, content);
console.log(`Updated ${count} of ${Object.keys(updates).length} entries`);
