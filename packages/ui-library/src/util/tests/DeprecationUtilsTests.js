import React from "react";
import PropTypes from "prop-types";
import { shallow } from "enzyme";
import {
    deprecatedProp,
    deprecatedPropValues,
    deprecationError,
    deprecationWarning,
    withDeprecatedProps,
} from "../DeprecationUtils";

describe("Deprecation Utils", () => {
    function getLastErrorCall() {
        const { calls } = console.error.mock;
        return calls[calls.length - 1][0];
    }

    // Needed to see what console.error has been called with.
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it("deprecatedProp returns error with correct propName and substitute", () => {
        const { message } = deprecatedProp({
            substitute: "betterProp",
            version: "testVersion"
        })({ "testProp": {} }, "testProp");

        expect(message).toEqual(
            "Prop \"testProp\" is deprecated and will be removed in version testVersion. Use \"betterProp\" instead."
        );
    });

    it("deprecatedProp returns error with message", () => {
        const { message } = deprecatedProp({
            message: "I'm a message"
        })({ "testProp": {} }, "testProp");

        expect(message).toEqual(
            "Prop \"testProp\" is deprecated and will be removed in a future release. I'm a message"
        );
    });

    it("deprecatedPropValues does not return error if invalid value is not in props", () => {
        const error = deprecatedPropValues({
            propType: PropTypes.string,
            values: [
                {
                    value: "aValue"
                }
            ],
            version: "testVersion"
        })({ testProp: "anotherValue" }, "testProp");

        expect(error).toEqual(undefined);
    });

    it("deprecatedPropValues returns error if value is present in props", () => {
        const { message } = deprecatedPropValues({
            values: [
                {
                    value: "aValue"
                }
            ],
            version: "testVersion"
        })({ testProp: "aValue" }, "testProp");

        expect(message).toEqual("The prop value \"aValue\" is deprecated and will be removed in version testVersion.");
    });


    it("deprecatedPropValues returns error with substitute", () => {
        const { message } = deprecatedPropValues({
            values: [
                {
                    value: "aValue",
                    substitute: "anotherValue"
                }
            ],
            version: "testVersion"
        })({ testProp: "aValue" }, "testProp");

        expect(message).toEqual("The prop value \"aValue\" is deprecated and will be removed in version testVersion." +
        " Use \"anotherValue\" instead.");
    });

    it("deprecatedPropValues returns error with message", () => {
        const { message } = deprecatedPropValues({
            values: [
                {
                    value: "aValue",
                    substitute: "anotherValue",
                    message: "I'm a message."
                }
            ],
            version: "testVersion"
        })({ testProp: "aValue" }, "testProp");

        expect(message).toEqual("The prop value \"aValue\" is deprecated and will be removed in version testVersion." +
        " Use \"anotherValue\" instead. I'm a message.");
    });

    it("deprecatedPropValues returns error if contains is set to true and value contains deprecated value", () => {
        const { message } = deprecatedPropValues({
            propType: PropTypes.number,
            values: [
                {
                    contains: true,
                    value: "aValue thatContains aDeprecatedValue"
                }
            ],
            version: "testVersion"
        })({ testProp: "aDeprecatedValue" }, "testProp");

        expect(message).toEqual(
            "The prop value \"aDeprecatedValue\" is deprecated and will be removed in version testVersion."
        );
    });

    it("withDeprecatedProps throws error if deprecated prop is present", () => {
        const Component = () => <div />;
        Component.displayName = "Component";

        const Wrapped = withDeprecatedProps([
            {
                name: "deprecatedProp"
            },
            {
                name: "otherProp",
                substitute: "SNARF"
            }
        ])(Component);

        // The weird indentation here causes the test to pass, since toThrowError pays attention to whitespace.
        expect(() => shallow(<Wrapped deprecatedProp="" otherProp="" />)).toThrowError(`Error in component "Component":
Prop "deprecatedProp" is deprecated and can no longer be used.
Prop "otherProp" is deprecated and can no longer be used; use "SNARF" instead.`);
    });

    it("withDeprecatedProps should not throw if deprecated props are not present", () => {
        const Component = () => <div />;
        Component.displayName = "Component";

        const Wrapped = withDeprecatedProps([["deprecatedProp"], ["otherProp", "SNARF"]])(Component);

        expect(() => shallow(<Wrapped />)).not.toThrowError();
    });

    it("withDeprecatedProps throws value error if deprecated value is present", () => {
        const Component = () => <div />;
        Component.displayName = "Component";

        const Wrapped = withDeprecatedProps([
            {
                name: "deprecatedProp",
                values: [{
                    value: "notAGreatValue",
                    substitute: "aGreatSubstitute"
                }]
            }
        ])(Component);

        // The weird indentation here causes the test to pass, since toThrowError pays attention to whitespace.
        expect(() => shallow(<Wrapped deprecatedProp="notAGreatValue" otherProp="" />))
            .toThrowError(`Error in component "Component":
The prop value "notAGreatValue" is deprecated and can no longer be used. Use "aGreatSubstitute" instead.`);
    });

    it("withDeprecatedProps throws value error with message if value and message are present", () => {
        const Component = () => <div />;
        Component.displayName = "Component";

        const Wrapped = withDeprecatedProps([
            {
                name: "deprecatedProp",
                values: [{
                    value: "notAGreatValue",
                    substitute: "aGreatSubstitute",
                    message: "I'm a message."
                }]
            }
        ])(Component);

        // The weird indentation here causes the test to pass, since toThrowError pays attention to whitespace.
        expect(() => shallow(<Wrapped deprecatedProp="notAGreatValue" otherProp="" />))
            .toThrowError(`Error in component "Component":
The prop value "notAGreatValue" is deprecated and can no longer be used. Use "aGreatSubstitute" instead.` +
" I'm a message.");
    });

    it("withDeprecatedProps throws value error if contains is true and value contains deprecated value", () => {
        const Component = () => <div />;
        Component.displayName = "Component";

        const Wrapped = withDeprecatedProps([
            {
                name: "deprecatedProp",
                values: [{
                    value: "notAGreatValue butThisOne isEvenWorse",
                    substitute: "aGreatSubstitute",
                    contains: true
                }]
            }
        ])(Component);

        // The weird indentation here causes the test to pass, since toThrowError pays attention to whitespace.
        expect(() => shallow(<Wrapped deprecatedProp="isEvenWorse" otherProp="" />))
            .toThrowError(`Error in component "Component":
The prop value "isEvenWorse" is deprecated and can no longer be used. Use "aGreatSubstitute" instead.`);
    });

    it("withDeprecatedProps does not throw error if deprecated value is not present", () => {
        const Component = () => <div />;
        Component.displayName = "Component";

        const Wrapped = withDeprecatedProps([
            {
                name: "deprecatedProp",
                values: [{
                    value: "notAGreatValue",
                    substitute: "aGreatSubstitute"
                }]
            }
        ])(Component);

        expect(() => shallow(<Wrapped otherProp="" />)).not.toThrowError();
    });

    it("deprecationWarning logs warning with just a name supplied", () => {
        deprecationWarning({
            name: "Component"
        });

        expect(getLastErrorCall()).toEqual(
            "The component \"Component\" is deprecated and will be removed in a future release."
        );
    });

    it("deprecationWarning logs warning with name and substitute", () => {
        deprecationWarning({
            name: "Component",
            substitute: "Substitute"
        });

        expect(getLastErrorCall()).toEqual(
            "The component \"Component\" is deprecated and will be removed in a future release." +
            " Use \"Substitute\" instead."
        );
    });

    it("deprecationWarning logs warning with name and message", () => {
        deprecationWarning({
            name: "Component",
            message: "I'm a message"
        });

        expect(getLastErrorCall()).toEqual(
            "The component \"Component\" is deprecated and will be removed in a future release. I'm a message"
        );
    });

    it("deprecationWarning logs warning with name and version", () => {
        deprecationWarning({
            name: "Component",
            version: "4.0.0"
        });

        expect(getLastErrorCall()).toEqual(
            "The component \"Component\" is deprecated and will be removed in version 4.0.0."
        );
    });

    it("deprecationWarning logs warning with name and type", () => {
        deprecationWarning({
            name: "DeprecationUtils",
            type: "module"
        });

        expect(getLastErrorCall()).toEqual(
            "The module \"DeprecationUtils\" is deprecated and will be removed in a future release."
        );
    });

    it("deprecationError logs warning with just a name supplied", () => {
        expect(() => deprecationError({
            name: "Component"
        })).toThrow(Error("The component \"Component\" is deprecated and has been removed."));
    });

    it("deprecationError logs warning with name and substitute", () => {
        expect(() => deprecationError({
            name: "Component",
            substitute: "Substitute"
        }))
        .toThrow(Error("The component \"Component\" is deprecated and has been removed. Use \"Substitute\" instead."));
    });

    it("deprecationError logs warning with name and message", () => {
        expect(() => deprecationError({
            name: "Component",
            message: "I'm a message."
        })).toThrow(Error("The component \"Component\" is deprecated and has been removed. I'm a message."));
    });

    it("deprecationError logs warning with name and type", () => {
        expect(() => deprecationError({
            name: "DeprecationUtils",
            type: "module"
        })).toThrow(Error("The module \"DeprecationUtils\" is deprecated and has been removed."));
    });
});