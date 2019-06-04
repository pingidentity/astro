window.__DEV__ = true;

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import Utils from "../../../util/Utils";
import TestUtils from "../../../testutil/TestUtils";
import I18nCountrySelector from "../i18n/I18nCountrySelector";
import StateContainer from "../../utils/StateContainer";
import _ from "underscore";

jest.mock("popper.js");
jest.mock("react-portal");

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
        name: "United States",
        iso2: "us",
        isoNum: "840",
        dialCode: "1",
        priority: 0,
        areaCodes: null
    }
]);

describe.skip("I18nCountrySelector v4", function () {

    function getComponent (props) {
        props = _.defaults(props || {}, {
            onValueChange: jest.fn(),
            onToggle: jest.fn(),
            onSearch: jest.fn(),
            flags: [ "use-portal", "p-stateful" ],
        });
        return ReactTestUtils.renderIntoDocument(<I18nCountrySelector {...props} />);
    }

    it("stateless: renders the component", function () {
        var component = getComponent({
            stateless: true
        });
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "i18n-country-selector")).toBeTruthy();
    });

    it("statelful: renders the component", function () {
        var component = getComponent();
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "i18n-country-selector")).toBeTruthy();
    });

    it("stateless: updates callback on country select", function () {
        var component = getComponent({
            open: true,
            stateless: true
        });
        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var canada = TestUtils.findRenderedDOMNodeWithDataId(component, "country-ca");
        var afghanistan = TestUtils.findRenderedDOMNodeWithDataId(component, "country-af");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(afghanistan);
        expect(component.props.onValueChange).toBeCalledWith("004");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(component.props.onValueChange).toBeCalledWith("124");
    });

    it("stateful: updates callback on country select", function () {
        var component = getComponent({
            open: true
        });
        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var canada = TestUtils.findRenderedDOMNodeWithDataId(component, "country-ca");
        var afghanistan = TestUtils.findRenderedDOMNodeWithDataId(component, "country-af");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(afghanistan);
        expect(component.props.onValueChange).toBeCalledWith("004");

        ReactTestUtils.Simulate.click(flag);

        ReactTestUtils.Simulate.click(canada);
        expect(component.props.onValueChange).toBeCalledWith("124");
    });

    it("stateless: handles clearing selected country", function () {
        var component = getComponent({
            stateless: true,
            countryCode: "840",
            open: true
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

        expect(flagInner.className).toContain("us");

        var noCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "none-option");

        ReactTestUtils.Simulate.click(noCountry);
        expect(component.props.onValueChange).toBeCalledWith("");
    });

    it("stateful: handles clearing selected country", function () {
        var component = getComponent({
            countryCode: "840",
            open: true
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        var flagInner = TestUtils.findRenderedDOMNodeWithClass(flag, "iti-flag");

        expect(flagInner.className).toContain("us");

        var noCountry = TestUtils.findRenderedDOMNodeWithDataId(component, "none-option");

        ReactTestUtils.Simulate.click(noCountry);
        expect(component.props.onValueChange).toBeCalledWith("");
    });

    it("stateful: onToggle callback changes open/close state", function () {
        const component = getComponent();
        const container = ReactTestUtils.scryRenderedComponentsWithType(component, StateContainer)[0];

        expect(container.state.open).toBe(false);
        container.callbacks.onToggle();
        expect(container.state.open).toBe(true);
    });

    it("find and select country by typing", function () {
        const component = getComponent({
            open: true
        });
        const container = ReactTestUtils.scryRenderedComponentsWithType(component, StateContainer)[0];

        const flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        // var currentCountryIso = componentRef.state.selected.iso2;
        // enter can, validate still not selected, hit enter, validate Canada now selected
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 78 }); // n
        expect(container.state.searchString).toBe("can");
        // expect(componentRef.state.selected.iso2).toBe(currentCountryIso);
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select canada
        expect(component.props.onValueChange).toBeCalledWith("124"); //canada
        // open flag, enter afg, hit enter, validate Afganistan now selected
        ReactTestUtils.Simulate.click(flag);
        expect(container.state.searchString).toBe("");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 70 }); // f
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 71 }); // g
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - select afganistan
        expect(component.props.onValueChange).toBeCalledWith("004"); //afganistan
        // open flag, enter ag, validate that no country found
        ReactTestUtils.Simulate.click(flag);
        expect(container.state.searchString).toBe("");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 71 }); // g
        expect(container.state.searchString).toBe("");
    });

    it("find and select country by typing empty with esc", function () {
        var component = getComponent({
            open: true
        });
        const container = ReactTestUtils.scryRenderedComponentsWithType(component, StateContainer)[0];

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");

        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 65 }); // a
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 78 }); // n
        expect(container.state.searchString).toBe("can");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 27 }); // esc
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 13 }); // enter - don't do anything because empty
        expect(container.state.searchString).toBe("");
    });

    it("stateless: triggers onSearch callback when typing and search string provided", function () {
        var component = getComponent({
            stateless: true,
            open: true,
            searchString: "",
            searchTime: 0
        });

        var flag = TestUtils.findRenderedDOMNodeWithDataId(component, "selected-option");
        ReactTestUtils.Simulate.keyDown(flag, { keyCode: 67 }); // c
        expect(component.props.onSearch).toBeCalled();
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'onCountrySearch' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("onCountrySearch", "onSearch"));

        expect(function () {
            getComponent({ onCountrySearch: jest.fn() });
        }).toThrow(expectedError);
    });

    it("fires cannonball warning when p-stateful flag isn't set", function() {
        console.warn = jest.fn();
        expect(console.warn).not.toBeCalled();
        getComponent({ flags: [ "use-portal" ] });
        expect(console.warn).toBeCalled();
    });

    it("doesn't fire cannonball warning when p-stateful and use-portal flags are set", function() {
        console.warn = jest.fn();
        getComponent({ flags: [ "use-portal", "p-stateful" ] });
        expect(console.warn).not.toBeCalled();
    });

});
