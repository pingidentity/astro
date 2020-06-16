window.__DEV__ = true;

jest.dontMock("../Validators");

describe("Validators", function () {
    var Validators = require("../Validators");

    describe("isValidEmail", function () {
        it("returns true for valid email addresses", function () {
            expect(Validators.isValidEmail("gmitchell@pingidentity.com")).toBe(true);
            expect(Validators.isValidEmail("gmitchell+test@pingidentity.com")).toBe(true);
            expect(Validators.isValidEmail("gmitchell-another_test@pingidentity.com")).toBe(true);
            expect(Validators.isValidEmail("graham.mitchell@pingidentity.com")).toBe(true);
            expect(Validators.isValidEmail("graham.mitchell@pingidentity.com.and.some.other.stuff")).toBe(true);
            expect(Validators.isValidEmail("gmitchell@pingidentity.anewtldwith18chars")).toBe(true);
            expect(Validators.isValidEmail("GMITCHELL@PingIdentity.Anewtldwith18chars")).toBe(true);
            expect(Validators.isValidEmail("p1sqe+ort+2016-09-16-13-35-44.572@pingidentity.com")).toBe(true);
        });

        it("returns false for invalid email addresses", function () {
            expect(Validators.isValidEmail("gmitchell@pingidentity.anewtldthatistoolong")).toBe(false);
            expect(Validators.isValidEmail("thisisnotavalidemail")).toBe(false);
            expect(Validators.isValidEmail("emailwithinvalidchars!#$@pingidentity.com")).toBe(false);
            expect(Validators.isValidEmail("")).toBe(false);
        });
    });

    describe("isValidDomainName", function () {
        it("returns true for valid domain names", function () {
            expect(Validators.isValidDomainName("www.somedomain.co")).toBe(true);
            expect(Validators.isValidDomainName("www2.www3.somedomain.co")).toBe(true);
            expect(Validators.isValidDomainName("somedomain.co")).toBe(true);
            expect(Validators.isValidDomainName("somedomain.travelersinsurance")).toBe(true);
            expect(Validators.isValidDomainName("123456789101112.travelersinsurance")).toBe(true);
            expect(Validators.isValidDomainName("so.travelersinsurance")).toBe(true);
            expect(Validators.isValidDomainName("SOMEDOMAIN.TRAVELERSINSURANCE")).toBe(true);
        });

        it("returns false for invalid domain names", function () {
            expect(Validators.isValidDomainName("www.somedomain.")).toBe(false);
            expect(Validators.isValidDomainName("www.somedomain.123")).toBe(false);
            expect(Validators.isValidDomainName("www.")).toBe(false);
            expect(Validators.isValidDomainName("")).toBe(false);
            expect(Validators.isValidDomainName("somedomain.travelersinsurance123")).toBe(false);
        });
    });

    it("isValidIp", function () {
        expect(Validators.isValidIp("1.2.3.4")).toBe(true);
        expect(Validators.isValidIp("1.2.3")).toBe(false);
        expect(Validators.isValidIp("1.2.3.4/16")).toBe(false);
        expect(Validators.isValidIp("test")).toBe(false);
        expect(Validators.isValidIp("")).toBe(false);
    });

    it("isValidCIDR", function () {
        expect(Validators.isValidCidr("1.2.3.4/14")).toBe(true);
        expect(Validators.isValidCidr("1.2.3.4")).toBe(false);
        expect(Validators.isValidCidr("1.2.3.4/")).toBe(false);
        expect(Validators.isValidCidr("a.2.3.4/16")).toBe(false);
        expect(Validators.isValidCidr("")).toBe(false);
    });

    it("isDigitsOnly", function () {
        expect(Validators.isDigitsOnly("1")).toBe(true);
        expect(Validators.isDigitsOnly("123")).toBe(true);
        expect(Validators.isDigitsOnly("Password1")).toBe(false);
        expect(Validators.isDigitsOnly("1 2 3")).toBe(false);
        expect(Validators.isDigitsOnly("")).toBe(false);
    });

    describe("isValidEmail", function () {
        it("returns true for valid email addresses", function () {
            expect(Validators.isValidEmail("gmitchell@pingidentity.com")).toBe(true);
            expect(Validators.isValidEmail("gmitchell+test@pingidentity.com")).toBe(true);
            expect(Validators.isValidEmail("gmitchell-another_test@pingidentity.com")).toBe(true);
            expect(Validators.isValidEmail("graham.mitchell@pingidentity.com")).toBe(true);
            expect(Validators.isValidEmail("graham.mitchell@pingidentity.com.and.some.other.stuff")).toBe(true);
            expect(Validators.isValidEmail("gmitchell@pingidentity.anewtldwith18chars")).toBe(true);
        });

        it("returns false for invalid email addresses", function () {
            expect(Validators.isValidEmail("gmitchell@pingidentity.anewtldthatistoolong")).toBe(false);
            expect(Validators.isValidEmail("thisisnotavalidemail")).toBe(false);
            expect(Validators.isValidEmail("emailwithinvalidchars!#$@pingidentity.com")).toBe(false);
            expect(Validators.isValidEmail("")).toBe(false);
        });
    });

    describe("isValidUrl", function () {
        it("returns true for valid URLs", function () {
            expect(Validators.isValidUrl("http://pingidentity.com/mypage")).toBe(true);
            expect(Validators.isValidUrl("http://pingidentity.com/my/other/page.html")).toBe(true);
            expect(Validators.isValidUrl("ftp://ftp.pingidentity.com/somefile.zip")).toBe(true);
            expect(Validators.isValidUrl("https://www.google.ca/#q=honey+badgers")).toBe(true);
            expect(Validators.isValidUrl("https://www.google.ca/search?somequerystring")).toBe(true);
            expect(Validators.isValidUrl("somearbitraryprotocol://www.google.ca/")).toBe(true);
        });

        it("returns false for invalid URLs", function () {
            expect(Validators.isValidUrl("pingidentity.com")).toBe(false);
            expect(Validators.isValidUrl("http:/pingidentity.com")).toBe(false);
            expect(Validators.isValidUrl("gmitchell@pingidentity.com")).toBe(false);
            expect(Validators.isValidUrl("")).toBe(false);
        });
    });

    describe("isValidPhoneNumber", function () {
        it("returns true for valid phone numbers", function () {
            expect(Validators.isValidPhoneNumber("")).toBe(true);
            expect(Validators.isValidPhoneNumber(" ")).toBe(true);
            expect(Validators.isValidPhoneNumber("1234567890")).toBe(true);
            expect(Validators.isValidPhoneNumber("1111111111111111")).toBe(true);
            expect(Validators.isValidPhoneNumber("(123)456789")).toBe(true);
            expect(Validators.isValidPhoneNumber("123-456-7890")).toBe(true);
            expect(Validators.isValidPhoneNumber("123 456 7890")).toBe(true);
            expect(Validators.isValidPhoneNumber("(555) 555-5555")).toBe(true);
        });

        it("returns false for invalid phone numbers", function () {
            expect(Validators.isValidPhoneNumber("abc")).toBe(false);
            expect(Validators.isValidPhoneNumber("@123-456-7890")).toBe(false);
            expect(Validators.isValidPhoneNumber("!@#$%##")).toBe(false);
        });
    });

    describe("isValidHexColorCharacter", function () {
        it("returns true for valid hex colors", function () {
            expect(Validators.isValidHexColorCharacter("")).toBe(true);
            expect(Validators.isValidHexColorCharacter("#")).toBe(true);
            expect(Validators.isValidHexColorCharacter("#FFF")).toBe(true);
            expect(Validators.isValidHexColorCharacter("#456")).toBe(true);
            expect(Validators.isValidHexColorCharacter("#AFBCAB")).toBe(true);
            expect(Validators.isValidHexColorCharacter("#32FF00")).toBe(true);
            expect(Validators.isValidHexColorCharacter("AA33FF110000")).toBe(true);
        });

        it("returns false for invalid hex colors", function () {
            expect(Validators.isValidHexColorCharacter(" ")).toBe(false);
            expect(Validators.isValidHexColorCharacter("ZZZ")).toBe(false);
            expect(Validators.isValidHexColorCharacter("#ZZZ")).toBe(false);
            expect(Validators.isValidHexColorCharacter("FF00TT")).toBe(false);
            expect(Validators.isValidHexColorCharacter("#FF00TT")).toBe(false);
            expect(Validators.isValidHexColorCharacter("#AA BB CC")).toBe(false);
            expect(Validators.isValidHexColorCharacter("!@#$%^&*")).toBe(false);
        });
    });

    describe("isValidFileSize", function () {

        it("returns false if file is to big", function () {
            const fileSizeInBytes = 3000;
            const maxFileSizeKb = 1;
            expect(Validators.isValidFileSize(fileSizeInBytes, maxFileSizeKb)).toBe(false);
        });

        it("returns true if file is not to big", function () {
            const fileSizeInBytes = 1000;
            const maxFileSizeKb = 1;
            expect(Validators.isValidFileSize(fileSizeInBytes, maxFileSizeKb)).toBe(true);
        });

        it("returns false if the file is empty", () => {
            const fileSizeInBytes = 0;
            const maxFileSizeKb = 1;
            expect(Validators.isValidFileSize(fileSizeInBytes, maxFileSizeKb)).toBe(false);
        });
    });

    describe("isValidMimeType", function () {

        it("returns false if mime type is wrong", function () {
            const type = "image/jpg";
            const accept = "image/png";
            expect(Validators.isValidMimeType(type, accept)).toBe(false);
        });

        it("returns true if mime type matches", function () {
            const type = "image/jpg";
            const accept = "image/jpg";
            expect(Validators.isValidMimeType(type, accept)).toBe(true);
        });
    });

    describe("readFile", function () {


        it("reads the file", function () {
            const fileContents = ["some text"];
            const file = new File(fileContents, { type: "text" });
            const readSuccessFunc = jest.fn();
            const errorFunc = jest.fn();
            Validators.readFile(file, readSuccessFunc, errorFunc);
            setTimeout(()=>expect(readSuccessFunc).toHaveBeenCalled());
            setTimeout(()=>expect(errorFunc).not.toHaveBeenCalled());
        });
    });
});
