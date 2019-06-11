const CustomDomainTemplatePage = require("../../pages/templates/CustomDomainTemplatePage.js");

describe("Custom Branding", function () {


    beforeAll(function () {
        CustomDomainTemplatePage.openCustomDomainDemoPage();
    });


    afterAll(function (done) {
        CustomDomainTemplatePage.end(done);
    });

});