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
//    Order (if >1 country with same dial code),
//    Area codes (if >1 country with same dial code)
// ]

import metadata from "libphonenumber-js/metadata.min.json";

const { countries } = metadata;

const allCountries = [
    [
        "Afghanistan (‫افغانستان‬‎)",
        ["af", "004"]
    ],
    [
        "Albania (Shqipëri)",
        ["al", "008"]
    ],
    [
        "Algeria (‫الجزائر‬‎)",
        ["dz", "012"]
    ],
    [
        "American Samoa",
        ["as", "016"]
    ],
    [
        "Andorra",
        ["ad", "020"]
    ],
    [
        "Angola",
        ["ao", "024"]
    ],
    [
        "Anguilla",
        ["ai", "660"]
    ],
    [
        "Antigua and Barbuda",
        ["ag", "028"]
    ],
    [
        "Argentina",
        ["ar", "032"]
    ],
    [
        "Armenia (Հայաստան)",
        ["am", "051"]
    ],
    [
        "Aruba",
        ["aw", "533"]
    ],
    [
        "Australia",
        ["au", "036"],
        0
    ],
    [
        "Austria (Österreich)",
        ["at", "040"],
    ],
    [
        "Azerbaijan (Azərbaycan)",
        ["az", "031"],
    ],
    [
        "Bahamas",
        ["bs", "044"],
    ],
    [
        "Bahrain (‫البحرين‬‎)",
        ["bh", "048"],
    ],
    [
        "Bangladesh (বাংলাদেশ)",
        ["bd", "050"],
    ],
    [
        "Barbados",
        ["bb", "052"],
    ],
    [
        "Belarus (Беларусь)",
        ["by", "112"],
    ],
    [
        "Belgium (België)",
        ["be", "056"],
    ],
    [
        "Belize",
        ["bz", "084"],
    ],
    [
        "Benin (Bénin)",
        ["bj", "204"],
    ],
    [
        "Bermuda",
        ["bm", "060"],
    ],
    [
        "Bhutan (འབྲུག)",
        ["bt", "064"],
    ],
    [
        "Bolivia",
        ["bo", "068"],
    ],
    [
        "Bosnia and Herzegovina (Босна и Херцеговина)",
        ["ba", "070"],
    ],
    [
        "Botswana",
        ["bw", "072"],
    ],
    [
        "Brazil (Brasil)",
        ["br", "076"],
    ],
    [
        "British Indian Ocean Territory",
        ["io", "086"],
    ],
    [
        "British Virgin Islands",
        ["vg", "092"],
    ],
    [
        "Brunei",
        ["bn", "096"],
    ],
    [
        "Bulgaria (България)",
        ["bg", "100"],
    ],
    [
        "Burkina Faso",
        ["bf", "854"],
    ],
    [
        "Burundi (Uburundi)",
        ["bi", "108"],
    ],
    [
        "Cambodia (កម្ពុជា)",
        ["kh", "116"],
    ],
    [
        "Cameroon (Cameroun)",
        ["cm", "120"],
    ],
    [
        "Canada",
        ["ca", "124"],
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
    ],
    [
        "Caribbean Netherlands",
        ["bq", "535"],
        1
    ],
    [
        "Cayman Islands",
        ["ky", "136"],
    ],
    [
        "Central African Republic (République centrafricaine)",
        ["cf", "140"],
    ],
    [
        "Chad (Tchad)",
        ["td", "148"],
    ],
    [
        "Chile",
        ["cl", "152"],
    ],
    [
        "China (中国)",
        ["cn", "156"],
    ],
    [
        "Christmas Island",
        ["cx", "162"],
        2
    ],
    [
        "Cocos (Keeling) Islands",
        ["cc", "166"],
        1
    ],
    [
        "Colombia",
        ["co", "170"],
    ],
    [
        "Comoros (‫جزر القمر‬‎)",
        ["km", "174"],
    ],
    [
        "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)",
        ["cd", "180"],
    ],
    [
        "Congo (Republic) (Congo-Brazzaville)",
        ["cg", "178"],
    ],
    [
        "Cook Islands",
        ["ck", "184"],
    ],
    [
        "Costa Rica",
        ["cr", "188"],
    ],
    [
        "Côte d’Ivoire",
        ["ci", "384"],
    ],
    [
        "Croatia (Hrvatska)",
        ["hr", "191"],
    ],
    [
        "Cuba",
        ["cu", "192"],
    ],
    [
        "Curaçao",
        ["cw", "531"],
        0
    ],
    [
        "Cyprus (Κύπρος)",
        ["cy", "196"],
    ],
    [
        "Czech Republic (Česká republika)",
        ["cz", "203"],
    ],
    [
        "Denmark (Danmark)",
        ["dk", "208"],
    ],
    [
        "Djibouti",
        ["dj", "262"],
    ],
    [
        "Dominica",
        ["dm", "212"],
    ],
    [
        "Dominican Republic (República Dominicana)",
        ["do", "214"],
        2,
        ["809", "829", "849"]
    ],
    [
        "Ecuador",
        ["ec", "218"],
    ],
    [
        "Egypt (‫مصر‬‎)",
        ["eg", "818"],
    ],
    [
        "El Salvador",
        ["sv", "222"],
    ],
    [
        "Equatorial Guinea (Guinea Ecuatorial)",
        ["gq", "226"],
    ],
    [
        "Eritrea",
        ["er", "232"],
    ],
    [
        "Estonia (Eesti)",
        ["ee", "233"],
    ],
    [
        "Ethiopia",
        ["et", "231"],
    ],
    [
        "Falkland Islands (Islas Malvinas)",
        ["fk", "238"],
    ],
    [
        "Faroe Islands (Føroyar)",
        ["fo", "234"],
    ],
    [
        "Fiji",
        ["fj", "242"],
    ],
    [
        "Finland (Suomi)",
        ["fi", "246"],
        0
    ],
    [
        "France",
        ["fr", "250"],
    ],
    [
        "French Guiana (Guyane française)",
        ["gf", "254"],
    ],
    [
        "French Polynesia (Polynésie française)",
        ["pf", "258"],
    ],
    [
        "Gabon",
        ["ga", "266"],
    ],
    [
        "Gambia",
        ["gm", "270"],
    ],
    [
        "Georgia (საქართველო)",
        ["ge", "268"],
    ],
    [
        "Germany (Deutschland)",
        ["de", "276"],
    ],
    [
        "Ghana (Gaana)",
        ["gh", "288"],
    ],
    [
        "Gibraltar",
        ["gi", "292"],
    ],
    [
        "Greece (Ελλάδα)",
        ["gr", "300"],
    ],
    [
        "Greenland (Kalaallit Nunaat)",
        ["gl", "304"],
    ],
    [
        "Grenada",
        ["gd", "308"],
    ],
    [
        "Guadeloupe",
        ["gp", "312"],
        0
    ],
    [
        "Guam",
        ["gu", "316"],
    ],
    [
        "Guatemala",
        ["gt", "320"],
    ],
    [
        "Guernsey",
        ["gg", "831"],
        1
    ],
    [
        "Guinea (Guinée)",
        ["gn", "324"],
    ],
    [
        "Guinea-Bissau (Guiné Bissau)",
        ["gw", "624"],
    ],
    [
        "Guyana",
        ["gy", "328"],
    ],
    [
        "Haiti",
        ["ht", "332"],
    ],
    [
        "Honduras",
        ["hn", "340"],
    ],
    [
        "Hong Kong (香港)",
        ["hk", "344"],
    ],
    [
        "Hungary (Magyarország)",
        ["hu", "348"],
    ],
    [
        "Iceland (Ísland)",
        ["is", "352"],
    ],
    [
        "India (भारत)",
        ["in", "356"],
    ],
    [
        "Indonesia",
        ["id", "360"],
    ],
    [
        "Iran (‫ایران‬‎)",
        ["ir", "364"],
    ],
    [
        "Iraq (‫العراق‬‎)",
        ["iq", "368"],
    ],
    [
        "Ireland",
        ["ie", "372"],
    ],
    [
        "Isle of Man",
        ["im", "833"],
        2
    ],
    [
        "Israel (‫ישראל‬‎)",
        ["il", "376"],
    ],
    [
        "Italy (Italia)",
        ["it", "380"],
        0
    ],
    [
        "Jamaica",
        ["jm", "388"],
    ],
    [
        "Japan (日本)",
        ["jp", "392"],
    ],
    [
        "Jersey",
        ["je", "832"],
        3
    ],
    [
        "Jordan (‫الأردن‬‎)",
        ["jo", "400"],
    ],
    [
        "Kazakhstan (Казахстан)",
        ["kz", "398"],
        1
    ],
    [
        "Kenya",
        ["ke", "404"],
    ],
    [
        "Kiribati",
        ["ki", "296"],
    ],
    [
        "Kuwait (‫الكويت‬‎)",
        ["kw", "414"],
    ],
    [
        "Kyrgyzstan (Кыргызстан)",
        ["kg", "417"],
    ],
    [
        "Laos (ລາວ)",
        ["la", "418"],
    ],
    [
        "Latvia (Latvija)",
        ["lv", "428"],
    ],
    [
        "Lebanon (‫لبنان‬‎)",
        ["lb", "422"],
    ],
    [
        "Lesotho",
        ["ls", "426"],
    ],
    [
        "Liberia",
        ["lr", "430"],
    ],
    [
        "Libya (‫ليبيا‬‎)",
        ["ly", "434"],
    ],
    [
        "Liechtenstein",
        ["li", "438"],
    ],
    [
        "Lithuania (Lietuva)",
        ["lt", "440"],
    ],
    [
        "Luxembourg",
        ["lu", "442"],
    ],
    [
        "Macau (澳門)",
        ["mo", "446"],
    ],
    [
        "Macedonia (FYROM) (Македонија)",
        ["mk", "807"],
    ],
    [
        "Madagascar (Madagasikara)",
        ["mg", "450"],
    ],
    [
        "Malawi",
        ["mw", "454"],
    ],
    [
        "Malaysia",
        ["my", "458"],
    ],
    [
        "Maldives",
        ["mv", "462"],
    ],
    [
        "Mali",
        ["ml", "466"],
    ],
    [
        "Malta",
        ["mt", "470"],
    ],
    [
        "Marshall Islands",
        ["mh", "584"],
    ],
    [
        "Martinique",
        ["mq", "474"],
    ],
    [
        "Mauritania (‫موريتانيا‬‎)",
        ["mr", "478"],
    ],
    [
        "Mauritius (Moris)",
        ["mu", "480"],
    ],
    [
        "Mayotte",
        ["yt", "175"],
        1
    ],
    [
        "Mexico (México)",
        ["mx", "484"],
    ],
    [
        "Micronesia",
        ["fm", "583"],
    ],
    [
        "Moldova (Republica Moldova)",
        ["md", "498"],
    ],
    [
        "Monaco",
        ["mc", "492"],
    ],
    [
        "Mongolia (Монгол)",
        ["mn", "496"],
    ],
    [
        "Montenegro (Crna Gora)",
        ["me", "499"],
    ],
    [
        "Montserrat",
        ["ms", "500"],
    ],
    [
        "Morocco (‫المغرب‬‎)",
        ["ma", "504"],
        0
    ],
    [
        "Mozambique (Moçambique)",
        ["mz", "508"],
    ],
    [
        "Myanmar (Burma) (မြန်မာ)",
        ["mm", "104"],
    ],
    [
        "Namibia (Namibië)",
        ["na", "516"],
    ],
    [
        "Nauru",
        ["nr", "520"],
    ],
    [
        "Nepal (नेपाल)",
        ["np", "524"],
    ],
    [
        "Netherlands (Nederland)",
        ["nl", "528"],
    ],
    [
        "New Caledonia (Nouvelle-Calédonie)",
        ["nc", "540"],
    ],
    [
        "New Zealand",
        ["nz", "554"],
    ],
    [
        "Nicaragua",
        ["ni", "558"],
    ],
    [
        "Niger (Nijar)",
        ["ne", "562"],
    ],
    [
        "Nigeria",
        ["ng", "566"],
    ],
    [
        "Niue",
        ["nu", "570"],
    ],
    [
        "Norfolk Island",
        ["nf", "574"],
    ],
    [
        "North Korea (조선 민주주의 인민 공화국)",
        ["kp", "408"],
    ],
    [
        "Northern Mariana Islands",
        ["mp", "580"],
    ],
    [
        "Norway (Norge)",
        ["no", "578"],
        0
    ],
    [
        "Oman (‫عُمان‬‎)",
        ["om", "512"],
    ],
    [
        "Pakistan (‫پاکستان‬‎)",
        ["pk", "586"],
    ],
    [
        "Palau",
        ["pw", "585"],
    ],
    [
        "Palestine (‫فلسطين‬‎)",
        ["ps", "275"],
    ],
    [
        "Panama (Panamá)",
        ["pa", "591"],
    ],
    [
        "Papua New Guinea",
        ["pg", "598"],
    ],
    [
        "Paraguay",
        ["py", "600"],
    ],
    [
        "Peru (Perú)",
        ["pe", "604"],
    ],
    [
        "Philippines",
        ["ph", "608"],
    ],
    [
        "Poland (Polska)",
        ["pl", "616"],
    ],
    [
        "Portugal",
        ["pt", "620"],
    ],
    [
        "Puerto Rico",
        ["pr", "630"],
        3,
        ["787", "939"]
    ],
    [
        "Qatar (‫قطر‬‎)",
        ["qa", "634"],
    ],
    [
        "Réunion (La Réunion)",
        ["re", "638"],
        0
    ],
    [
        "Romania (România)",
        ["ro", "642"],
    ],
    [
        "Russia (Россия)",
        ["ru", "643"],
        0
    ],
    [
        "Rwanda",
        ["rw", "646"],
    ],
    [
        "Saint Barthélemy (Saint-Barthélemy)",
        ["bl", "652"],
        1
    ],
    [
        "Saint Helena",
        ["sh", "654"],
    ],
    [
        "Saint Kitts and Nevis",
        ["kn", "659"],
    ],
    [
        "Saint Lucia",
        ["lc", "662"],
    ],
    [
        "Saint Martin (Saint-Martin (partie française))",
        ["mf", "663"],
        2
    ],
    [
        "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)",
        ["pm", "666"],
    ],
    [
        "Saint Vincent and the Grenadines",
        ["vc", "670"],
    ],
    [
        "Samoa",
        ["ws", "882"],
    ],
    [
        "San Marino",
        ["sm", "674"],
    ],
    [
        "São Tomé and Príncipe (São Tomé e Príncipe)",
        ["st", "678"],
    ],
    [
        "Saudi Arabia (‫المملكة العربية السعودية‬‎)",
        ["sa", "682"],
    ],
    [
        "Senegal (Sénégal)",
        ["sn", "686"],
    ],
    [
        "Serbia (Србија)",
        ["rs", "688"],
    ],
    [
        "Seychelles",
        ["sc", "690"],
    ],
    [
        "Sierra Leone",
        ["sl", "694"],
    ],
    [
        "Singapore",
        ["sg", "702"],
    ],
    [
        "Sint Maarten",
        ["sx", "534"],
    ],
    [
        "Slovakia (Slovensko)",
        ["sk", "703"],
    ],
    [
        "Slovenia (Slovenija)",
        ["si", "705"],
    ],
    [
        "Solomon Islands",
        ["sb", "090"],
    ],
    [
        "Somalia (Soomaaliya)",
        ["so", "706"],
    ],
    [
        "South Africa",
        ["za", "710"],
    ],
    [
        "South Korea (대한민국)",
        ["kr", "410"],
    ],
    [
        "South Sudan (‫جنوب السودان‬‎)",
        ["ss", "728"],
    ],
    [
        "Spain (España)",
        ["es", "724"],
    ],
    [
        "Sri Lanka (ශ්‍රී ලංකාව)",
        ["lk", "144"],
    ],
    [
        "Sudan (‫السودان‬‎)",
        ["sd", "729"],
    ],
    [
        "Suriname",
        ["sr", "740"],
    ],
    [
        "Svalbard and Jan Mayen",
        ["sj", "744"],
        1
    ],
    [
        "Swaziland",
        ["sz", "748"],
    ],
    [
        "Sweden (Sverige)",
        ["se", "752"],
    ],
    [
        "Switzerland (Schweiz)",
        ["ch", "756"],
    ],
    [
        "Syria (‫سوريا‬‎)",
        ["sy", "760"],
    ],
    [
        "Taiwan (台灣)",
        ["tw", "158"],
    ],
    [
        "Tajikistan",
        ["tj", "762"],
    ],
    [
        "Tanzania",
        ["tz", "834"],
    ],
    [
        "Thailand (ไทย)",
        ["th", "764"],
    ],
    [
        "Timor-Leste",
        ["tl", "626"],
    ],
    [
        "Togo",
        ["tg", "768"],
    ],
    [
        "Tokelau",
        ["tk", "772"],
    ],
    [
        "Tonga",
        ["to", "776"],
    ],
    [
        "Trinidad and Tobago",
        ["tt", "780"],
    ],
    [
        "Tunisia (‫تونس‬‎)",
        ["tn", "788"],
    ],
    [
        "Turkey (Türkiye)",
        ["tr", "792"],
    ],
    [
        "Turkmenistan",
        ["tm", "795"],
    ],
    [
        "Turks and Caicos Islands",
        ["tc", "796"],
    ],
    [
        "Tuvalu",
        ["tv", "798"],
    ],
    [
        "U.S. Virgin Islands",
        ["vi", "850"],
    ],
    [
        "Uganda",
        ["ug", "800"],
    ],
    [
        "Ukraine (Україна)",
        ["ua", "804"],
    ],
    [
        "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)",
        ["ae", "784"],
    ],
    [
        "United Kingdom",
        ["gb", "826"],
        0
    ],
    [
        "United States",
        ["us", "840"],
        0
    ],
    [
        "Uruguay",
        ["uy", "858"],
    ],
    [
        "Uzbekistan (Oʻzbekiston)",
        ["uz", "860"],
    ],
    [
        "Vanuatu",
        ["vu", "548"],
    ],
    [
        "Vatican City (Città del Vaticano)",
        ["va", "336"],
        1
    ],
    [
        "Venezuela",
        ["ve", "862"],
    ],
    [
        "Vietnam (Việt Nam)",
        ["vn", "704"],
    ],
    [
        "Wallis and Futuna",
        ["wf", "876"],
    ],
    [
        "Western Sahara (‫الصحراء الغربية‬‎)",
        ["eh", "732"],
        1
    ],
    [
        "Yemen (‫اليمن‬‎)",
        ["ye", "887"],
    ],
    [
        "Zambia",
        ["zm", "894"],
    ],
    [
        "Zimbabwe",
        ["zw", "716"],
    ],
    [
        "Åland Islands",
        ["ax", "248"],
        1
    ]
];

export default allCountries.map(([
    name,
    [iso2, isoNum],
    priority = 0,
    areaCodes = null
]) => ({
    name,
    iso2,
    isoNum,
    // Get dial code from ISO2 country code
    dialCode: countries[iso2.toUpperCase()][0],
    priority,
    areaCodes
}));
