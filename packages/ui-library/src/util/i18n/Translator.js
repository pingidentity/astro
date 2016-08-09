/*eslint-disable valid-jsdoc*/

"use strict";

/**
* @module util/i18n/Translator
* @desc The Translator provides ultil functions support for translation.
*/

module.exports = {
    isUseInternationalization: true,
    defaultLanguage: "en_us",
    languages: {},
    currentLanguage: "en_us",

    /**
     * @desc this function to set current language of translator
     *
     * @param {string} lang
     *     Language code, this code use to define the path and language file name.
     */
    setLanguage: function (lang) {
        this.currentLanguage = lang;
        this.importLanguage(this.currentLanguage);
    },

    /**
     * @desc this function to get string based on current language
     *
     * @param {string} key
     *     Key in language file.
     * @returns {string}
     *     Translated string
     */
    translate: function (key) {
        var useI18N = this.isUseInternationalization;
        var strings = useI18N ? this.importLanguage(this.currentLanguage)
            : this.importLanguage(this.defaultLanguage);
        return strings[key] ? strings[key] : this.languages[this.defaultLanguage][key];
    },

    /**
     * @desc this function to load language based on current language
     *
     * @param {string} languageCode
     *    String in language file.
     * @returns {object}
     *    return an object contains list key-value pairs.
     */
    importLanguage: function (languageCode) {
        var languageCode = languageCode.toLowerCase();
        if (this.languages[languageCode] === undefined) {
            try {
                this.languages[languageCode] = require("./lang/"+languageCode+".json");
            } catch (e) {
                this.languages[languageCode] = require("./lang/"+
                    this.defaultLanguage.toLowerCase() +".json");
            }
        }
        return this.languages[languageCode];
    }
};