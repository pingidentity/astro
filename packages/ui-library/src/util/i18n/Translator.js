/**
* @module util/i18n/translator
*/

"use strict";

module.exports = (function () {
    var translator = {};
    translator.languages = {};
    translator.isUseInternationalization = true;
    translator.defaultLanguage = "en_us";
    translator.currentLanguage = translator.defaultLanguage;

    /**
     * @desc this function to set current language of translator
     * @param {string} lang language code, this code use to define the path and language file name.
     */
    translator.setLanguage = function (lang) {
        translator.currentLanguage = lang;
        importLanguage(translator.currentLanguage);
    };

    /**
     * @desc this function to get string based on current language
     * @param {key} key string in language file.
     * @returns {string} translated string
     */
    translator.translate = function (key) {
        var useI18N = translator.isUseInternationalization;
        var strings = useI18N ? importLanguage(translator.currentLanguage) : importLanguage(translator.defaultLanguage);
        return strings[key] ? strings[key] : translator.languages[translator.currentLanguage][key];
    };

    function importLanguage (languageCode) {
        languageCode = languageCode.toLowerCase();
        if (translator.languages[languageCode] === undefined) {
            try {
                translator.languages[languageCode] = require("./lang/"+languageCode+".json");
            } catch (e) {
                translator.languages[languageCode] = require("./lang/"+
                    translator.defaultLanguage.toLowerCase() +".json");
            }
        }
        return translator.languages[languageCode];
    }

    return translator;
}());