// Array of country objects for the flag dropdown.
// Each contains a name, country code (ISO 3166-1 alpha-2 and numeric) and dial code.
// Originally from https://github.com/mledoze/countries

// then with a couple of manual re-arrangements to be alphabetical
// then changed Kazakhstan from +76 to +7
// and Vatican City from +379 to +39 (see issue 50)
// and Caribean Netherlands from +5997 to +599
// and Curacao from +5999 to +599
// Removed:  Kosovo, Pitcairn Islands, South Georgia

// UPDATE Sept 12th 2015
// List of regions that have iso2 country codes, which I have chosen to omit:
// (based on this information: https://en.wikipedia.org/wiki/List_of_country_calling_codes)
// AQ - Antarctica - all different country codes depending on which "base"
// BV - Bouvet Island - no calling code
// GS - South Georgia and the South Sandwich Islands - "inhospitable collection of islands" -
//      same flag and calling code as Falkland Islands
// HM - Heard Island and McDonald Islands - no calling code
// PN - Pitcairn - tiny population (56), same calling code as New Zealand
// TF - French Southern Territories - no calling code
// UM - United States Minor Outlying Islands - no calling code

// UPDATE the criteria of supported countries or territories (see issue 297)
// Have an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
// Have a country calling code: https://en.wikipedia.org/wiki/List_of_country_calling_codes
// Have a flag
// Must be supported by libphonenumber: https://github.com/googlei18n/libphonenumber

// Update: converted objects to arrays to save bytes!
// Update: added "priority" for countries with the same dialCode as others
// Update: added array of area codes for countries with the same dialCode as others
// Update: added ISO 3166 numeric country codes from http://www.iso.org/iso/country_codes

// So each country array has the following information:
// [
//    Country name,
//    [iso2 code, isoNum code]
//    International dial code,
//    Order (if >1 country with same dial code),
//    Area codes (if >1 country with same dial code)
// ]
var allCountries = [
    [
        "Afghanistan (‫افغانستان‬‎)",
        ["af", "004"],
        "93"
    ],
    [
        "Albania (Shqipëri)",
        ["al", "008"],
        "355"
    ],
    [
        "Algeria (‫الجزائر‬‎)",
        ["dz", "012"],
        "213"
    ],
    [
        "American Samoa",
        ["as", "016"],
        "1684"
    ],
    [
        "Andorra",
        ["ad", "020"],
        "376"
    ],
    [
        "Angola",
        ["ao", "024"],
        "244"
    ],
    [
        "Anguilla",
        ["ai", "660"],
        "1264"
    ],
    [
        "Antigua and Barbuda",
        ["ag", "028"],
        "1268"
    ],
    [
        "Argentina",
        ["ar", "032"],
        "54"
    ],
    [
        "Armenia (Հայաստան)",
        ["am", "051"],
        "374"
    ],
    [
        "Aruba",
        ["aw", "533"],
        "297"
    ],
    [
        "Australia",
        ["au", "036"],
        "61",
        0
    ],
    [
        "Austria (Österreich)",
        ["at", "040"],
        "43"
    ],
    [
        "Azerbaijan (Azərbaycan)",
        ["az", "031"],
        "994"
    ],
    [
        "Bahamas",
        ["bs", "044"],
        "1242"
    ],
    [
        "Bahrain (‫البحرين‬‎)",
        ["bh", "048"],
        "973"
    ],
    [
        "Bangladesh (বাংলাদেশ)",
        ["bd", "050"],
        "880"
    ],
    [
        "Barbados",
        ["bb", "052"],
        "1246"
    ],
    [
        "Belarus (Беларусь)",
        ["by", "112"],
        "375"
    ],
    [
        "Belgium (België)",
        ["be", "056"],
        "32"
    ],
    [
        "Belize",
        ["bz", "084"],
        "501"
    ],
    [
        "Benin (Bénin)",
        ["bj", "204"],
        "229"
    ],
    [
        "Bermuda",
        ["bm", "060"],
        "1441"
    ],
    [
        "Bhutan (འབྲུག)",
        ["bt", "064"],
        "975"
    ],
    [
        "Bolivia",
        ["bo", "068"],
        "591"
    ],
    [
        "Bosnia and Herzegovina (Босна и Херцеговина)",
        ["ba", "070"],
        "387"
    ],
    [
        "Botswana",
        ["bw", "072"],
        "267"
    ],
    [
        "Brazil (Brasil)",
        ["br", "076"],
        "55"
    ],
    [
        "British Indian Ocean Territory",
        ["io", "086"],
        "246"
    ],
    [
        "British Virgin Islands",
        ["vg", "092"],
        "1284"
    ],
    [
        "Brunei",
        ["bn", "096"],
        "673"
    ],
    [
        "Bulgaria (България)",
        ["bg", "100"],
        "359"
    ],
    [
        "Burkina Faso",
        ["bf", "854"],
        "226"
    ],
    [
        "Burundi (Uburundi)",
        ["bi", "108"],
        "257"
    ],
    [
        "Cambodia (កម្ពុជា)",
        ["kh", "116"],
        "855"
    ],
    [
        "Cameroon (Cameroun)",
        ["cm", "120"],
        "237"
    ],
    [
        "Canada",
        ["ca", "124"],
        "1",
        1,
        [
            "204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437",
            "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705",
            "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"
        ]
    ],
    [
        "Cape Verde (Kabu Verdi)",
        ["cv", "132"],
        "238"
    ],
    [
        "Caribbean Netherlands",
        ["bq", "535"],
        "599",
        1
    ],
    [
        "Cayman Islands",
        ["ky", "136"],
        "1345"
    ],
    [
        "Central African Republic (République centrafricaine)",
        ["cf", "140"],
        "236"
    ],
    [
        "Chad (Tchad)",
        ["td", "148"],
        "235"
    ],
    [
        "Chile",
        ["cl", "152"],
        "56"
    ],
    [
        "China (中国)",
        ["cn", "156"],
        "86"
    ],
    [
        "Christmas Island",
        ["cx", "162"],
        "61",
        2
    ],
    [
        "Cocos (Keeling) Islands",
        ["cc", "166"],
        "61",
        1
    ],
    [
        "Colombia",
        ["co", "170"],
        "57"
    ],
    [
        "Comoros (‫جزر القمر‬‎)",
        ["km", "174"],
        "269"
    ],
    [
        "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
        ["cd", "180"],
        "243"
    ],
    [
        "Congo (Republic) (Congo-Brazzaville)",
        ["cg", "178"],
        "242"
    ],
    [
        "Cook Islands",
        ["ck", "184"],
        "682"
    ],
    [
        "Costa Rica",
        ["cr", "188"],
        "506"
    ],
    [
        "Côte d’Ivoire",
        ["ci", "384"],
        "225"
    ],
    [
        "Croatia (Hrvatska)",
        ["hr", "191"],
        "385"
    ],
    [
        "Cuba",
        ["cu", "192"],
        "53"
    ],
    [
        "Curaçao",
        ["cw", "531"],
        "599",
        0
    ],
    [
        "Cyprus (Κύπρος)",
        ["cy", "196"],
        "357"
    ],
    [
        "Czech Republic (Česká republika)",
        ["cz", "203"],
        "420"
    ],
    [
        "Denmark (Danmark)",
        ["dk", "208"],
        "45"
    ],
    [
        "Djibouti",
        ["dj", "262"],
        "253"
    ],
    [
        "Dominica",
        ["dm", "212"],
        "1767"
    ],
    [
        "Dominican Republic (República Dominicana)",
        ["do", "214"],
        "1",
        2,
        ["809", "829", "849"]
    ],
    [
        "Ecuador",
        ["ec", "218"],
        "593"
    ],
    [
        "Egypt (‫مصر‬‎)",
        ["eg", "818"],
        "20"
    ],
    [
        "El Salvador",
        ["sv", "222"],
        "503"
    ],
    [
        "Equatorial Guinea (Guinea Ecuatorial)",
        ["gq", "226"],
        "240"
    ],
    [
        "Eritrea",
        ["er", "232"],
        "291"
    ],
    [
        "Estonia (Eesti)",
        ["ee", "233"],
        "372"
    ],
    [
        "Ethiopia",
        ["et", "231"],
        "251"
    ],
    [
        "Falkland Islands (Islas Malvinas)",
        ["fk", "238"],
        "500"
    ],
    [
        "Faroe Islands (Føroyar)",
        ["fo", "234"],
        "298"
    ],
    [
        "Fiji",
        ["fj", "242"],
        "679"
    ],
    [
        "Finland (Suomi)",
        ["fi", "246"],
        "358",
        0
    ],
    [
        "France",
        ["fr", "250"],
        "33"
    ],
    [
        "French Guiana (Guyane française)",
        ["gf", "254"],
        "594"
    ],
    [
        "French Polynesia (Polynésie française)",
        ["pf", "258"],
        "689"
    ],
    [
        "Gabon",
        ["ga", "266"],
        "241"
    ],
    [
        "Gambia",
        ["gm", "270"],
        "220"
    ],
    [
        "Georgia (საქართველო)",
        ["ge", "268"],
        "995"
    ],
    [
        "Germany (Deutschland)",
        ["de", "276"],
        "49"
    ],
    [
        "Ghana (Gaana)",
        ["gh", "288"],
        "233"
    ],
    [
        "Gibraltar",
        ["gi", "292"],
        "350"
    ],
    [
        "Greece (Ελλάδα)",
        ["gr", "300"],
        "30"
    ],
    [
        "Greenland (Kalaallit Nunaat)",
        ["gl", "304"],
        "299"
    ],
    [
        "Grenada",
        ["gd", "308"],
        "1473"
    ],
    [
        "Guadeloupe",
        ["gp", "312"],
        "590",
        0
    ],
    [
        "Guam",
        ["gu", "316"],
        "1671"
    ],
    [
        "Guatemala",
        ["gt", "320"],
        "502"
    ],
    [
        "Guernsey",
        ["gg", "831"],
        "44",
        1
    ],
    [
        "Guinea (Guinée)",
        ["gn", "324"],
        "224"
    ],
    [
        "Guinea-Bissau (Guiné Bissau)",
        ["gw", "624"],
        "245"
    ],
    [
        "Guyana",
        ["gy", "328"],
        "592"
    ],
    [
        "Haiti",
        ["ht", "332"],
        "509"
    ],
    [
        "Honduras",
        ["hn", "340"],
        "504"
    ],
    [
        "Hong Kong (香港)",
        ["hk", "344"],
        "852"
    ],
    [
        "Hungary (Magyarország)",
        ["hu", "348"],
        "36"
    ],
    [
        "Iceland (Ísland)",
        ["is", "352"],
        "354"
    ],
    [
        "India (भारत)",
        ["in", "356"],
        "91"
    ],
    [
        "Indonesia",
        ["id", "360"],
        "62"
    ],
    [
        "Iran (‫ایران‬‎)",
        ["ir", "364"],
        "98"
    ],
    [
        "Iraq (‫العراق‬‎)",
        ["iq", "368"],
        "964"
    ],
    [
        "Ireland",
        ["ie", "372"],
        "353"
    ],
    [
        "Isle of Man",
        ["im", "833"],
        "44",
        2
    ],
    [
        "Israel (‫ישראל‬‎)",
        ["il", "376"],
        "972"
    ],
    [
        "Italy (Italia)",
        ["it", "380"],
        "39",
        0
    ],
    [
        "Jamaica",
        ["jm", "388"],
        "1876"
    ],
    [
        "Japan (日本)",
        ["jp", "392"],
        "81"
    ],
    [
        "Jersey",
        ["je", "832"],
        "44",
        3
    ],
    [
        "Jordan (‫الأردن‬‎)",
        ["jo", "400"],
        "962"
    ],
    [
        "Kazakhstan (Казахстан)",
        ["kz", "398"],
        "7",
        1
    ],
    [
        "Kenya",
        ["ke", "404"],
        "254"
    ],
    [
        "Kiribati",
        ["ki", "296"],
        "686"
    ],
    [
        "Kuwait (‫الكويت‬‎)",
        ["kw", "414"],
        "965"
    ],
    [
        "Kyrgyzstan (Кыргызстан)",
        ["kg", "417"],
        "996"
    ],
    [
        "Laos (ລາວ)",
        ["la", "418"],
        "856"
    ],
    [
        "Latvia (Latvija)",
        ["lv", "428"],
        "371"
    ],
    [
        "Lebanon (‫لبنان‬‎)",
        ["lb", "422"],
        "961"
    ],
    [
        "Lesotho",
        ["ls", "426"],
        "266"
    ],
    [
        "Liberia",
        ["lr", "430"],
        "231"
    ],
    [
        "Libya (‫ليبيا‬‎)",
        ["ly", "434"],
        "218"
    ],
    [
        "Liechtenstein",
        ["li", "438"],
        "423"
    ],
    [
        "Lithuania (Lietuva)",
        ["lt", "440"],
        "370"
    ],
    [
        "Luxembourg",
        ["lu", "442"],
        "352"
    ],
    [
        "Macau (澳門)",
        ["mo", "446"],
        "853"
    ],
    [
        "Macedonia (FYROM) (Македонија)",
        ["mk", "807"],
        "389"
    ],
    [
        "Madagascar (Madagasikara)",
        ["mg", "450"],
        "261"
    ],
    [
        "Malawi",
        ["mw", "454"],
        "265"
    ],
    [
        "Malaysia",
        ["my", "458"],
        "60"
    ],
    [
        "Maldives",
        ["mv", "462"],
        "960"
    ],
    [
        "Mali",
        ["ml", "466"],
        "223"
    ],
    [
        "Malta",
        ["mt", "470"],
        "356"
    ],
    [
        "Marshall Islands",
        ["mh", "584"],
        "692"
    ],
    [
        "Martinique",
        ["mq", "474"],
        "596"
    ],
    [
        "Mauritania (‫موريتانيا‬‎)",
        ["mr", "478"],
        "222"
    ],
    [
        "Mauritius (Moris)",
        ["mu", "480"],
        "230"
    ],
    [
        "Mayotte",
        ["yt", "175"],
        "262",
        1
    ],
    [
        "Mexico (México)",
        ["mx", "484"],
        "52"
    ],
    [
        "Micronesia",
        ["fm", "583"],
        "691"
    ],
    [
        "Moldova (Republica Moldova)",
        ["md", "498"],
        "373"
    ],
    [
        "Monaco",
        ["mc", "492"],
        "377"
    ],
    [
        "Mongolia (Монгол)",
        ["mn", "496"],
        "976"
    ],
    [
        "Montenegro (Crna Gora)",
        ["me", "499"],
        "382"
    ],
    [
        "Montserrat",
        ["ms", "500"],
        "1664"
    ],
    [
        "Morocco (‫المغرب‬‎)",
        ["ma", "504"],
        "212",
        0
    ],
    [
        "Mozambique (Moçambique)",
        ["mz", "508"],
        "258"
    ],
    [
        "Myanmar (Burma) (မြန်မာ)",
        ["mm", "104"],
        "95"
    ],
    [
        "Namibia (Namibië)",
        ["na", "516"],
        "264"
    ],
    [
        "Nauru",
        ["nr", "520"],
        "674"
    ],
    [
        "Nepal (नेपाल)",
        ["np", "524"],
        "977"
    ],
    [
        "Netherlands (Nederland)",
        ["nl", "528"],
        "31"
    ],
    [
        "New Caledonia (Nouvelle-Calédonie)",
        ["nc", "540"],
        "687"
    ],
    [
        "New Zealand",
        ["nz", "554"],
        "64"
    ],
    [
        "Nicaragua",
        ["ni", "558"],
        "505"
    ],
    [
        "Niger (Nijar)",
        ["ne", "562"],
        "227"
    ],
    [
        "Nigeria",
        ["ng", "566"],
        "234"
    ],
    [
        "Niue",
        ["nu", "570"],
        "683"
    ],
    [
        "Norfolk Island",
        ["nf", "574"],
        "672"
    ],
    [
        "North Korea (조선 민주주의 인민 공화국)",
        ["kp", "408"],
        "850"
    ],
    [
        "Northern Mariana Islands",
        ["mp", "580"],
        "1670"
    ],
    [
        "Norway (Norge)",
        ["no", "578"],
        "47",
        0
    ],
    [
        "Oman (‫عُمان‬‎)",
        ["om", "512"],
        "968"
    ],
    [
        "Pakistan (‫پاکستان‬‎)",
        ["pk", "586"],
        "92"
    ],
    [
        "Palau",
        ["pw", "585"],
        "680"
    ],
    [
        "Palestine (‫فلسطين‬‎)",
        ["ps", "275"],
        "970"
    ],
    [
        "Panama (Panamá)",
        ["pa", "591"],
        "507"
    ],
    [
        "Papua New Guinea",
        ["pg", "598"],
        "675"
    ],
    [
        "Paraguay",
        ["py", "600"],
        "595"
    ],
    [
        "Peru (Perú)",
        ["pe", "604"],
        "51"
    ],
    [
        "Philippines",
        ["ph", "608"],
        "63"
    ],
    [
        "Poland (Polska)",
        ["pl", "616"],
        "48"
    ],
    [
        "Portugal",
        ["pt", "620"],
        "351"
    ],
    [
        "Puerto Rico",
        ["pr", "630"],
        "1",
        3,
        ["787", "939"]
    ],
    [
        "Qatar (‫قطر‬‎)",
        ["qa", "634"],
        "974"
    ],
    [
        "Réunion (La Réunion)",
        ["re", "638"],
        "262",
        0
    ],
    [
        "Romania (România)",
        ["ro", "642"],
        "40"
    ],
    [
        "Russia (Россия)",
        ["ru", "643"],
        "7",
        0
    ],
    [
        "Rwanda",
        ["rw", "646"],
        "250"
    ],
    [
        "Saint Barthélemy (Saint-Barthélemy)",
        ["bl", "652"],
        "590",
        1
    ],
    [
        "Saint Helena",
        ["sh", "654"],
        "290"
    ],
    [
        "Saint Kitts and Nevis",
        ["kn", "659"],
        "1869"
    ],
    [
        "Saint Lucia",
        ["lc", "662"],
        "1758"
    ],
    [
        "Saint Martin (Saint-Martin (partie française))",
        ["mf", "663"],
        "590",
        2
    ],
    [
        "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
        ["pm", "666"],
        "508"
    ],
    [
        "Saint Vincent and the Grenadines",
        ["vc", "670"],
        "1784"
    ],
    [
        "Samoa",
        ["ws", "882"],
        "685"
    ],
    [
        "San Marino",
        ["sm", "674"],
        "378"
    ],
    [
        "São Tomé and Príncipe (São Tomé e Príncipe)",
        ["st", "678"],
        "239"
    ],
    [
        "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
        ["sa", "682"],
        "966"
    ],
    [
        "Senegal (Sénégal)",
        ["sn", "686"],
        "221"
    ],
    [
        "Serbia (Србија)",
        ["rs", "688"],
        "381"
    ],
    [
        "Seychelles",
        ["sc", "690"],
        "248"
    ],
    [
        "Sierra Leone",
        ["sl", "694"],
        "232"
    ],
    [
        "Singapore",
        ["sg", "702"],
        "65"
    ],
    [
        "Sint Maarten",
        ["sx", "534"],
        "1721"
    ],
    [
        "Slovakia (Slovensko)",
        ["sk", "703"],
        "421"
    ],
    [
        "Slovenia (Slovenija)",
        ["si", "705"],
        "386"
    ],
    [
        "Solomon Islands",
        ["sb", "090"],
        "677"
    ],
    [
        "Somalia (Soomaaliya)",
        ["so", "706"],
        "252"
    ],
    [
        "South Africa",
        ["za", "710"],
        "27"
    ],
    [
        "South Korea (대한민국)",
        ["kr", "410"],
        "82"
    ],
    [
        "South Sudan (‫جنوب السودان‬‎)",
        ["ss", "728"],
        "211"
    ],
    [
        "Spain (España)",
        ["es", "724"],
        "34"
    ],
    [
        "Sri Lanka (ශ්‍රී ලංකාව)",
        ["lk", "144"],
        "94"
    ],
    [
        "Sudan (‫السودان‬‎)",
        ["sd", "729"],
        "249"
    ],
    [
        "Suriname",
        ["sr", "740"],
        "597"
    ],
    [
        "Svalbard and Jan Mayen",
        ["sj", "744"],
        "47",
        1
    ],
    [
        "Swaziland",
        ["sz", "748"],
        "268"
    ],
    [
        "Sweden (Sverige)",
        ["se", "752"],
        "46"
    ],
    [
        "Switzerland (Schweiz)",
        ["ch", "756"],
        "41"
    ],
    [
        "Syria (‫سوريا‬‎)",
        ["sy", "760"],
        "963"
    ],
    [
        "Taiwan (台灣)",
        ["tw", "158"],
        "886"
    ],
    [
        "Tajikistan",
        ["tj", "762"],
        "992"
    ],
    [
        "Tanzania",
        ["tz", "834"],
        "255"
    ],
    [
        "Thailand (ไทย)",
        ["th", "764"],
        "66"
    ],
    [
        "Timor-Leste",
        ["tl", "626"],
        "670"
    ],
    [
        "Togo",
        ["tg", "768"],
        "228"
    ],
    [
        "Tokelau",
        ["tk", "772"],
        "690"
    ],
    [
        "Tonga",
        ["to", "776"],
        "676"
    ],
    [
        "Trinidad and Tobago",
        ["tt", "780"],
        "1868"
    ],
    [
        "Tunisia (‫تونس‬‎)",
        ["tn", "788"],
        "216"
    ],
    [
        "Turkey (Türkiye)",
        ["tr", "792"],
        "90"
    ],
    [
        "Turkmenistan",
        ["tm", "795"],
        "993"
    ],
    [
        "Turks and Caicos Islands",
        ["tc", "796"],
        "1649"
    ],
    [
        "Tuvalu",
        ["tv", "798"],
        "688"
    ],
    [
        "U.S. Virgin Islands",
        ["vi", "850"],
        "1340"
    ],
    [
        "Uganda",
        ["ug", "800"],
        "256"
    ],
    [
        "Ukraine (Україна)",
        ["ua", "804"],
        "380"
    ],
    [
        "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
        ["ae", "784"],
        "971"
    ],
    [
        "United Kingdom",
        ["gb", "826"],
        "44",
        0
    ],
    [
        "United States",
        ["us", "840"],
        "1",
        0
    ],
    [
        "Uruguay",
        ["uy", "858"],
        "598"
    ],
    [
        "Uzbekistan (Oʻzbekiston)",
        ["uz", "860"],
        "998"
    ],
    [
        "Vanuatu",
        ["vu", "548"],
        "678"
    ],
    [
        "Vatican City (Città del Vaticano)",
        ["va", "336"],
        "39",
        1
    ],
    [
        "Venezuela",
        ["ve", "862"],
        "58"
    ],
    [
        "Vietnam (Việt Nam)",
        ["vn", "704"],
        "84"
    ],
    [
        "Wallis and Futuna",
        ["wf", "876"],
        "681"
    ],
    [
        "Western Sahara (‫الصحراء الغربية‬‎)",
        ["eh", "732"],
        "212",
        1
    ],
    [
        "Yemen (‫اليمن‬‎)",
        ["ye", "887"],
        "967"
    ],
    [
        "Zambia",
        ["zm", "894"],
        "260"
    ],
    [
        "Zimbabwe",
        ["zw", "716"],
        "263"
    ],
    [
        "Åland Islands",
        ["ax", "248"],
        "358",
        1
    ]
];

// loop over all of the countries above
for (var i = 0; i < allCountries.length; i += 1) {
    var c = allCountries[i];
    allCountries[i] = {
        name: c[0],
        iso2: c[1][0],
        isoNum: c[1][1],
        dialCode: c[2],
        priority: c[3] || 0,
        areaCodes: c[4] || null
    };
}

module.exports = allCountries;
