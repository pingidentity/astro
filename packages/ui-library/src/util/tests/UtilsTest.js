window.__DEV__ = true;

jest.dontMock("../Utils");

describe("Utils", function () {
    var Utils = require("../Utils");

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
        });

        it("uses the correct function to save the blob file in other browsers",
            function () {
                var fakeBlob = ["someFakeFileContent"];
                var fakeFilename = "someFileName.txt";

                global.navigator = { };
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

        it("uses the correct function to save the blob file in other browsers if a.download isn't supported",
            function () {
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
                expect(global.window.location.href).toBe(url);
            });
    });

    describe("formatDate", function () {
        expect(Utils.formatDate(1444860746000)).toBe("2015-10-14");
        expect(Utils.formatDate(0)).toBe("1970-01-01");
        expect(Utils.formatDate(2525465544000)).toBe("2050-01-10");
    });
});
