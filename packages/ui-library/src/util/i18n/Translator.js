/*eslint-disable valid-jsdoc*/

"use strict";

/**
* @module util/i18n/Translator
* @desc The Translator provides ultil functions support for translation.
*/

module.exports = {
    isUseInternationalization: true,
    defaultLanguage: "en_us",
    languages: {
        /*eslint-disable camelcase*/
        de_de: require("./lang/de_de.json"),
        fr_fr: require("./lang/fr_fr.json"),
        es_es: require("./lang/es_es.json"),
        en_us: require("./lang/en_us.json"),
        it_it: require("./lang/it_it.json"),
        ja_jp: require("./lang/ja_jp.json"),
        ko_kr: require("./lang/ko_kr.json"),
        ln_ln: require("./lang/ln_ln.json"),
        pt_pt: require("./lang/pt_pt.json"),
        ru_ru: require("./lang/ru_ru.json"),
        th_th: require("./lang/th_th.json"),
        zh_cn: require("./lang/zh_cn.json")
        /*eslint-enable camelcase*/
    },
    currentLanguage: "en_us",

    /**
     * @desc this function to set current language of translator
     *
     * @param {string} lang
     *     Language code, this code use to define the path and language file name.
     */
    setLanguage: function (lang) {
        this.currentLanguage = lang;
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
            return this.languages[this.defaultLanguage];
        } else {
            return this.languages[languageCode];
        }
    }
};