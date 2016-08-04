window.__DEV__ = true;

jest.dontMock("../Translator.js");
jest.setMock("../lang/en_us.json", {
    english: "English"
});
jest.setMock("../lang/vi_vn.json", {
    english: "It is not English"
});
describe("Translator", function () {
    var Translator = require("../Translator.js");

    it("Set language correctly", function () {
        Translator.importLanguage = jest.genMockFunction();
        Translator.setLanguage("vi_vn");
        expect(Translator.defaultLanguage).toBe("en_us");
        expect(Translator.currentLanguage).toBe("vi_vn");
        expect(Translator.importLanguage).toBeCalledWith("vi_vn");
    });

    it("Translate correctly", function () {
        Translator.isUseInternationalization = true;
        Translator.importLanguage = jest.genMockFunction()
            .mockReturnValue({ myKey1: "translated1", myKey2: "translated2" });
        Translator.setLanguage("vi_vn");
        expect(Translator.currentLanguage).toBe("vi_vn");
        expect(Translator.translate("myKey2")).toBe("translated2");
        expect(Translator.importLanguage).toBeCalledWith("vi_vn");
    });

    it("Translate to default language if there is no key", function () {
        Translator.languages = { en_us: { mykey3: "value" } }; // eslint-disable-line 
        Translator.isUseInternationalization = true;
        Translator.importLanguage = jest.genMockFunction()
            .mockReturnValue({ myKey1: "translated1", myKey2: "translated2" });
        Translator.setLanguage("vi_vn");
        expect(Translator.currentLanguage).toBe("vi_vn");
        expect(Translator.translate("mykey3")).toBe("value");
        expect(Translator.importLanguage).toBeCalledWith("vi_vn");
    });

    it("Not translate when flag turn off", function () {
        Translator.isUseInternationalization = false;
        Translator.importLanguage = jest.genMockFunction()
            .mockReturnValue({ myKey1: "translated1", myKey2: "translated2" });
        Translator.setLanguage("vi_vn");
        expect(Translator.currentLanguage).toBe("vi_vn");
        expect(Translator.translate("myKey2")).toBe("translated2");
        expect(Translator.importLanguage).toBeCalledWith("en_us");
    });

    it("Import language file correctly", function () {
        Translator = require("../Translator.js");
        Translator.languages = {};
        var imported = Translator.importLanguage("vi_vn");
        expect(Translator.languages["vi_vn"]).not.toBe(null);
        expect(imported.english).toBe("It is not English");
    });

    it("Import language file correctly", function () {
        Translator = require("../Translator.js");
        Translator.languages = { vi_vn: {} }; // eslint-disable-line
        Translator.importLanguage("vi_vn");
        expect(Translator.languages["vi_vn"]).not.toBe({});
    });

    it("Import default language file if there is not input language file", function () {
        Translator = require("../Translator.js");
        var imported = Translator.importLanguage("UNSUPPORTEDLANGUAGE");
        expect(imported.english).toBe("English");
    });



});
