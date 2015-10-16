window.__DEV__ = true;

jest.dontMock('../Utils');
jest.dontMock('moment');

describe('Utils', function () {
    var Utils = require('../Utils');

    describe('stripFakePath', function () {
        it('strips the leading C:\\fakepath\\ from the filename of file upload elements', function () {
            expect(Utils.stripFakePath('C:\\fakepath\\someFileName.jpg')).toEqual('someFileName.jpg');
            expect(Utils.stripFakePath('c:\\fakepath\\someOtherFileName.txt')).toEqual('someOtherFileName.txt');
            expect(Utils.stripFakePath('someOtherFileName.txt')).toEqual('someOtherFileName.txt');
        });
    });

    describe('triggerFileDownload', function () {
        // mocks for the navigator and Blob globals
        global.navigator = {};
        global.navigator.msSaveBlob = jest.genMockFunction();
        global.Blob = jest.genMockFunction().mockImplementation(function (blobData) {
            return blobData;
        });

        var fakeBlob = ['someFakeFileContent'];
        var fakeFilename = 'someFileName.txt';

        Utils.triggerFileDownload(fakeFilename, fakeBlob, 'text/plain');

        it('uses the correct function to save the blob file in IE', function () {
            expect(global.navigator.msSaveBlob).toBeCalled();
        });
    });

    describe('formatDate', function () {
        expect(Utils.formatDate(1444860746000)).toBe('2015-10-14');
        expect(Utils.formatDate(0)).toBe('1970-01-01');
        expect(Utils.formatDate(2525465544000)).toBe('2050-01-10');
    });
});
