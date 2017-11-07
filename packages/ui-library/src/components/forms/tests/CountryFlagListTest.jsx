window.__DEV__ = true;

jest.setMock("../i18n/countryCodes", [
    {
        name: "Afghanistan (‫افغانستان‬‎)",
        iso2: "af",
        isoNum: "004",
        dialCode: "93",
        priority: 0,
        areaCodes: null
    },
    {
        name: "Canada",
        iso2: "ca",
        isoNum: "124",
        dialCode: "1",
        priority: 1,
        areaCodes: null
    },
    {
        name: "Cape Verde (Kabu Verdi)",
        iso2: "cv",
        isoNum: "132",
        dialCode: "127",
        priority: 0,
        areaCodes: null
    },
    {
        name: "United States",
        iso2: "us",
        isoNum: "840",
        dialCode: "1",
        priority: 0,
        areaCodes: null
    }
]);
jest.dontMock("../i18n/CountryFlagList.jsx");
jest.dontMock("../../../util/i18n/Translator.js");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../FormDropDownList.jsx");
jest.dontMock("../FormLabel.jsx");
jest.dontMock("../FormError.jsx");
jest.dontMock("../form-text-field/index.js");
jest.dontMock("../form-text-field/v2.jsx");

describe("CountryFlagList", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        CountryFlagList = require("../i18n/CountryFlagList.jsx"),
        Translator = require("../../../util/i18n/Translator.js"),
        _ = require("underscore");

    window.addEventListener = jest.genMockFunction();
    window.removeEventListener = jest.genMockFunction();
    function getComponent (props) {
        props = _.defaults(props || {}, {
            onValueChange: jest.genMockFunction(),
            onToggle: jest.genMockFunction(),
            onSearch: jest.genMockFunction()
        });
        return ReactTestUtils.renderIntoDocument(<CountryFlagList {...props} />);
    }

    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("renders the component with default data-id", function () {
        var component = getComponent();
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "country-flag-list")).toBeTruthy();
    });

    it("accepts custom data-id", function () {
        var component = getComponent({ "data-id": "custom-country-flag-list" });
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "custom-country-flag-list")).toBeTruthy();
    });

    it("accepts classsname", function () {
        var component = getComponent({ className: "custom-container-class" });
        expect(TestUtils.findRenderedDOMNodeWithClass(component, "custom-container-class")).toBeTruthy();
    });

    it("accepts countryCodeClassname classes", function () {
        var component = getComponent({ countryCodeClassName: "custom-country-code-class" });
        expect(TestUtils.scryRenderedDOMNodesWithClass(component, "custom-country-code-class").length).toBe(4);
    });

    it("displays long em dash in the preview when no selectedCountryCode is provided", function () {
        var component = getComponent();
        expect(TestUtils.findRenderedDOMNodeWithClass(component, "no-selection")).toBeTruthy();
    });

    it("defaults to iso2 countryCodeDisplayType", function () {
        var component = getComponent({
            selectedCountryCode: "af"
        });

        var countryListItem = TestUtils.findRenderedDOMNodeWithDataId(component, "country-af");
        var countryCode = TestUtils.findRenderedDOMNodeWithClass(countryListItem, "country-code");

        expect(countryCode.innerHTML).toBe("af");
    });

    it("displays correct country code in list for iso2 countryCodeDisplayType", function () {
        var component = getComponent({
            countryCodeDisplayType: "iso2",
            selectedCountryCode: "us"
        });

        var countryListItem = TestUtils.findRenderedDOMNodeWithDataId(component, "country-us");
        var countryCode = TestUtils.findRenderedDOMNodeWithClass(countryListItem, "country-code");

        expect(countryCode.innerHTML).toBe("us");
    });

    it("displays correct country code in list for isoNum countryCodeDisplayType", function () {
        var component = getComponent({
            countryCodeDisplayType: "isoNum",
            selectedCountryCode: "ca"
        });

        var countryListItem = TestUtils.findRenderedDOMNodeWithDataId(component, "country-ca");
        var countryCode = TestUtils.findRenderedDOMNodeWithClass(countryListItem, "country-code");

        expect(countryCode.innerHTML).toBe("124");
    });

    it("displays correct country code in list for dialCode countryCodeDisplayType", function () {
        var component = getComponent({
            countryCodeDisplayType: "dialCode",
            selectedCountryCode: "af"
        });

        var countryListItem = TestUtils.findRenderedDOMNodeWithDataId(component, "country-af");
        var countryCode = TestUtils.findRenderedDOMNodeWithClass(countryListItem, "country-code");

        expect(countryCode.innerHTML).toBe("93");
    });

    it("preselects flag by iso2 as selectedCountryCode", function () {
        var selectedIso2 = "af";

        var component = getComponent({
            selectedCountryCode: selectedIso2
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

        expect(flagInner.className).toContain(selectedIso2);
    });

    it("preselects flag by isoNum as selectedCountryCode", function () {
        var selectedIso2 = "us";
        var selectedIsoNum = "840";

        var component = getComponent({
            selectedCountryCode: selectedIsoNum
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

        expect(flagInner.className).toContain(selectedIso2);
    });

    it("renders with country flag list closed by default", function () {
        var component = getComponent();
        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "country-flag-list");
        var listClasses = list.className.split(" ");

        expect(_.contains(listClasses, "open")).toEqual(false);
    });

    it("can be set to render with list open", function () {
        var component = getComponent({
            open: true
        });

        var list = TestUtils.findRenderedDOMNodeWithDataId(component, "country-flag-list");
        var listClasses = list.className.split(" ");

        expect(_.contains(listClasses, "open")).toEqual(true);
    });

    it("opens country flag list on list button click", function () {
        var component = getComponent();
        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");

        expect(component.props.onToggle.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(flag);

        expect(component.props.onToggle.mock.calls.length).toBe(1);
    });

    it("triggers onValueChange callback when a country in the list is clicked", function () {
        var component = getComponent();

        // Click on Canada in the list
        var canada = TestUtils.findRenderedDOMNodeWithDataId(component, "country-ca");
        ReactTestUtils.Simulate.click(canada);

        expect(component.props.onValueChange).toBeCalled();
    });

    it("global click handler closes open list when click outside of component", function () {
        var component = getComponent({ open: true });
        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];

        expect(component.props.onToggle).not.toBeCalled();

        // click outside
        handler({ target: document.body });

        expect(component.props.onToggle).toBeCalled();
    });

    it("skips the global click handler if not open and click on component", function () {
        var component = getComponent();
        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];

        // click on component
        handler({ target: document.body });

        expect(component.props.onToggle).not.toBeCalled();
    });

    it("find by typing", function () {
        var component = getComponent({
            open: true,
            searchString: "",
            searchTime: 0
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("c");

        component = getComponent({ // props seem to be immutable so I can't override them for this test
            open: true,
            searchString: component.props.onSearch.mock.calls[0][0],
            searchTime: component.props.onSearch.mock.calls[0][1]
        });
        flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        expect(component.props.onSearch.mock.calls[0][0]).toBe("ca");
    });

    it("find and select country by hitting enter", function () {
        var component = getComponent({
            open: true,
            searchIndex: 1,
            searchString: "can",
            searchTime: 0
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter
        expect(component.props.onValueChange).toBeCalled();
        expect(component.props.onValueChange.mock.calls[0][0].iso2).toBe("ca");
    });

    it("find by typing - clear with esc", function () {
        var component = getComponent({
            open: true,
            searchString: "ca",
            searchTime: 0
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 27 }); // esc
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("");
    });

    it("find by typing - clear with delay", function () {
        var component = getComponent({
            open: true,
            searchString: "c",
            searchTime: (Date.now() - 2000)
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("a");
    });

    it("flag list item renders with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(<CountryFlagList.Flag />);

        var flagItem = TestUtils.findRenderedDOMNodeWithDataId(component, "flag");

        expect(flagItem).toBeDefined();
    });

    it("flag list item renders with given data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(<CountryFlagList.Flag data-id="myFlagItem" />);

        var flagItem = TestUtils.findRenderedDOMNodeWithDataId(component, "myFlagItem");

        expect(flagItem).toBeDefined();
    });

    it("cycle though options with up/down arrows", function () {
        var component = getComponent({
            open: true,
            searchIndex: 1,
            searchString: "c",
            searchTime: (Date.now() - 2000)
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 40 }); // down arrow
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[0][0]).toBe("c"); // up/down keys don't change searchString
        expect(component.props.onSearch.mock.calls[0][2]).toBe(2); //added 1 to searchIndex
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 38 }); // up arrow
        expect(component.props.onSearch).toBeCalled();
        expect(component.props.onSearch.mock.calls[1][2]).toBe(0); //subtract 1 from searchIndex
    });

    it("call component will mount", function () {
        var component = getComponent();
        component._translateCountryNames = jest.genMockFunction();
        component.componentWillMount();
        expect(component._translateCountryNames).toBeCalled();
    });

    it("translates and sorts country names when current language is not en_us", function () {
        var component = getComponent();
        var countryList = [
            {
                name: "Afghanistan (‫افغانستان‬‎)",
                iso2: "af",
                isoNum: "004",
                dialCode: "93",
                priority: 0,
                areaCodes: null
            },
            {
                name: "Canada",
                iso2: "ca",
                isoNum: "124",
                dialCode: "1",
                priority: 1,
                areaCodes: null
            }];
        // Override Translator to mocks after getComponent so any Translator initialized as part of
        // the component's creation gets overriden with our latest mocks
        Translator.translate = jest.genMockFunction().mockReturnValueOnce("translated text 2")
            .mockReturnValueOnce("translated text 1");
        Translator.currentLanguage = "vi_vn";

        countryList = component._translateCountryNames(countryList);
        expect(countryList[0].name).toBe("translated text 1");
        expect(countryList[0].iso2).toBe("ca");
    });

});
