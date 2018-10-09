window.__DEV__ = true;

jest.dontMock("../Utils");

describe("Utils", function () {
    var Utils = require("../Utils");

    describe("diffProps", function () {
        it("only compares the props in the list", function () {
            expect(Utils.diffProps({ a: 1, b: 2 }, { a: 1, b: 3 }, ["a"])).toBe(false);
            expect(Utils.diffProps({ a: 1, b: 2 }, { a: 1, b: 3 }, ["a", "b"])).toBe(true);
        });
    });

    describe("isHtmlFileApiSupported", function () {
        it("returns true if File, FileList, FileReader are defined", function () {
            global.File = true;
            global.FileList = true;
            global.FileReader = true;

            expect(Utils.isHtmlFileApiSupported()).toBeTruthy();
        });

        it("returns false if any of File, FileList, FileReader are undefined", function () {
            global.File = undefined;

            expect(Utils.isHtmlFileApiSupported()).toBeFalsy();
        });
    });

    describe("stripFakePath", function () {
        it("strips the leading C:\\fakepath\\ from the filename of file upload elements", function () {
            expect(Utils.stripFakePath("C:\\fakepath\\someFileName.jpg")).toEqual("someFileName.jpg");
            expect(Utils.stripFakePath("c:\\fakepath\\someOtherFileName.txt")).toEqual("someOtherFileName.txt");
            expect(Utils.stripFakePath("someOtherFileName.txt")).toEqual("someOtherFileName.txt");
        });
    });

    describe("deprecateWarn", function () {
        it("uses deprecateWarn", function () {
            var log = jest.genMockFunction();
            Utils.deprecateWarn("click", "onClick", log);

            expect(log).toBeCalledWith(
                "Deprecated: use onClick instead of click. Support for click will be removed in next version");
        });
    });

    describe("deprecateMessage", function () {
        it("uses deprecateMessage", function () {
            var message = Utils.deprecateMessage("click", "onClick");

            expect(message).toBe(
                "Deprecated: use onClick instead of click. Support for click will be removed in next version");
        });

        it("includes optional default value change message", function () {
            var message = Utils.deprecateMessage("prop", "newProp", "old", "new");

            expect(message).toBe(
                "Deprecated: use newProp instead of prop. " +
                "The default for newProp will be new instead of old. " +
                "Support for prop will be removed in next version");
        });
    });

    describe("isProduction", function () {
        afterEach(function () {
            delete process.env.NODE_ENV;
        });
        it("returns false if not production build", function () {
            process.env.NODE_ENV = "";

            expect(process.env.NODE_ENV).not.toBe("production");
            expect(Utils.isProduction()).toBe(false);
        });

        it("returns true if on production build", function () {
            process.env.NODE_ENV = "production";

            expect(process.env.NODE_ENV).toBe("production");
            expect(Utils.isProduction()).toBe(true);
        });
    });

    describe("triggerFileDownload", function () {
        it("uses the correct function to save the blob file in IE", function () {
            // mocks for the navigator and Blob globals
            global.navigator = {};
            global.navigator.msSaveBlob = jest.genMockFunction();
            global.Blob = jest.genMockFunction().mockImplementation(function (blobData) {
                return blobData;
            });

            var fakeBlob = ["someFakeFileContent"];
            var fakeFilename = "someFileName.txt";

            Utils.triggerFileDownload(fakeFilename, fakeBlob, "text/plain");
            expect(global.navigator.msSaveBlob).toBeCalled();

            global.navigator.msSaveBlob = undefined; // clearing the object in the next test is not working as expected
        });

        it("uses the correct function to save the blob file in other browsers", function () {
            var fakeBlob = ["someFakeFileContent"];
            var fakeFilename = "someFileName.txt";

            global.navigator = {};
            global.Blob = jest.genMockFunction().mockImplementation(function (blobData) {
                return blobData;
            });

            var createObjectURL = jest.genMockFn();
            global.URL = {};
            global.URL.createObjectURL = createObjectURL;

            var click = jest.genMockFn();
            document.createElement = jest.genMockFn();
            document.createElement.mockReturnValue({
                download: {},
                click: click
            });
            document.body.appendChild = jest.genMockFn();

            Utils.triggerFileDownload(fakeFilename, fakeBlob, "text/plain");
            expect(createObjectURL).toBeCalled();
            expect(click).toBeCalled();
            expect(document.body.appendChild).toBeCalled();
        });

        it("uses correct function to save the blob file in other browsers if a.download isn't supported", function () {
            var url = "http://pingidentity.com/url";
            var fakeBlob = ["someFakeFileContent"];
            var fakeFilename = "someFileName.txt";

            global.navigator = { };
            global.window = global.window || { location: { href: "" } };
            global.Blob = jest.genMockFunction().mockImplementation(function (blobData) {
                return blobData;
            });

            var createObjectURL = jest.genMockFn().mockReturnValue(url);
            global.URL = {};
            global.URL.createObjectURL = createObjectURL;

            var click = jest.genMockFn();
            document.createElement = jest.genMockFn();
            document.createElement.mockReturnValue({
                click: click
            });
            document.body.appendChild = jest.genMockFn();

            Utils.triggerFileDownload(fakeFilename, fakeBlob, "text/plain");
            expect(createObjectURL).toBeCalled();

            // The following test cannot yet be performed since jsdom does not support setting these properties
            // https://github.com/facebook/jest/issues/890
            // expect(global.window.location.href).toBe(url);
        });
    });

    //TODO: remove in new version when deprecated function removed
    describe("formatDate", function () {
        expect(Utils.formatDate(1444860746000)).toBe("2015-10-14");
        expect(Utils.formatDate(0)).toBe("1970-01-01");
        expect(Utils.formatDate(2525465544000)).toBe("2050-01-10");

        it("logs deprecated warning", function () {
            console.warn = jest.genMockFunction();

            Utils.formatDate(0);
            expect(console.warn).toBeCalledWith(
                "This function is deprecated and will be removed in future versions. " +
                "Use formatDate in DateUtils instead.");
        });
    });

    describe("browserTest", function () {
        //user agents from http://useragentstring.com/pages/useragentstring.php
        var browsers = [
            {
                type: "chrome",
                version: 41,
                ua: "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko)\
                Chrome/41.0.2228.0 Safari/537.36"
            },
            {
                type: "firefox",
                version: 40,
                ua: "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1"
            },
            {
                type: "safari",
                version: 7,
                ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3)\
                AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A"
            },
            {
                type: "ie",
                version: 11,
                ua: "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
            },
            {
                type: "ie",
                version: 10,
                ua: "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1;\
                .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0"
            },
            {
                type: "ie",
                version: 9,
                ua: "Mozilla/5.0 (Windows; U; MSIE 9.0; WIndows NT 9.0; en-US))"
            },
            {
                type: "edge",
                version: 12,
                ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)\
                Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
            }
        ];
        browsers.forEach( function (browser) {
            //Basic browser type and version check
            it("detects " + browser.type + " and " + browser.version, function () {
                window.navigator.__defineGetter__("userAgent", function () {
                    return browser.ua;
                });
                expect(Utils.browserType()).toBe(browser.type);
                expect(Utils.browserVersion()).toBe(browser.version);
                expect(Utils.browser()).toBe(browser.type + " " + browser.version);
            });

            //loop through all isBrowser() functions
            var isBrowsers = ["Chrome", "Firefox", "Safari", "IE"];
            isBrowsers.forEach( function (isBrowser) {
                var expectation = browser.type === isBrowser.toLowerCase() ? true : false;
                if (browser.type === "edge" && isBrowser === "IE") {
                    expectation = true;
                }
                var isBrowser = "is" + isBrowser;
                it ("expect " + browser.type + " " + isBrowser + "() to be " + expectation, function () {
                    window.navigator.__defineGetter__("userAgent", function () {
                        return browser.ua;
                    });
                    expect(Utils[isBrowser]()).toBe(expectation);
                });
            });

            it("test " + browser.type + " " + browser.version + " isIE9()", function () {
                if (browser.type === "ie" && browser.version <= 9) {
                    expect(Utils.isIE9()).toBe(true);
                }
                else {
                    expect(Utils.isIE9()).toBe(false);
                }
            });
        });

        it("detects iphone 5 is mobile", function () {
            window.navigator.__defineGetter__("userAgent", function () {
                return "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) \
                AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3";
            });
            expect(Utils.isMobile()).toBe(true);
        });

        it("detects android is mobile", function () {
            window.navigator.__defineGetter__("userAgent", function () {
                return "Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) \
                AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>";
            });
            expect(Utils.isMobile()).toBe(true);
        });

        it("detects desktop is not mobile", function () {
            window.navigator.__defineGetter__("userAgent", function () {
                return "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 \
                (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36";
            });
            expect(Utils.isMobile()).toBe(false);
        });

        it("correctly detects handheld devices (phones and tablets)", function () {
            // PC
            window.navigator.__defineGetter__("userAgent", function () {
                return "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 \
                    Safari/537.36";
            });
            expect(Utils.isHandheldDevice()).toBe(false);

            // Android Phone - Nexus 5x
            window.navigator.__defineGetter__("userAgent", function () {
                return "mozilla/5.0 (Linux; Android 6.0.1; Nexus 5x build/mtc19t applewebkit/537.36 (KHTML, \
                    like Gecko) Chrome/51.0.2702.81 Mobile Safari/537.36";
            });
            expect(Utils.isHandheldDevice()).toBe(true);

            // Android Tablet - Nexus 10
            window.navigator.__defineGetter__("userAgent", function () {
                return "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 10 Build/KOT49H) AppleWebKit/537.36 (KHTML, like \
                    Gecko) Chrome/33.0.1750.93 Safari/537.36";
            });
            expect(Utils.isHandheldDevice()).toBe(true);

            // iPhone 5
            window.navigator.__defineGetter__("userAgent", function () {
                return "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) \
                    Version/6.0 Mobile/10A5376e Safari/8536.25";
            });
            expect(Utils.isHandheldDevice()).toBe(true);

            // iPad
            window.navigator.__defineGetter__("userAgent", function () {
                return "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) \
                    Version/6.0 Mobile/10A5376e Safari/8536.25";
            });
            expect(Utils.isHandheldDevice()).toBe(true);
        });

        it("converts hex colors to rgb colors", function () {
            [
                { hex: "#000000", r: 0, g: 0, b: 0 },
                { hex: "#FFFFFF", r: 255, g: 255, b: 255 },
                { hex: "#FF0000", r: 255, g: 0, b: 0 },
                { hex: "#00FF00", r: 0, g: 255, b: 0 },
                { hex: "#0000FF", r: 0, g: 0, b: 255 },
                { hex: "#990000", r: 153, g: 0, b: 0 },
                { hex: "#009900", r: 0, g: 153, b: 0 },
                { hex: "#000099", r: 0, g: 0, b: 153 },

            ].map(color => {
                let alpha;

                alpha = 1;
                expect(Utils.HexToRgba(color.hex, alpha)).toBe(`rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);

                alpha = 0.5;
                expect(Utils.HexToRgba(color.hex, alpha)).toBe(`rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
            });
        });
    });
});
