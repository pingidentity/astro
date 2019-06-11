const HomePage = require ("../HomePage.js");
const CustomDomainDemoPage = Object.create(HomePage, {

    /**
     * @desc this function is to open template Custom Branding
     */
    openCustomBrandingDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "PropertySpecific", "CustomDomain");
        }
    }
});

module.exports = CustomDomainDemoPage;

