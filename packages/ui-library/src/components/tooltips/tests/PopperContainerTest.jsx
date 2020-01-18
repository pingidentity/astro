import React from "react";
import PopperContainer from "../PopperContainer";
import ReactTestUtils from "react-dom/test-utils";
import { mount } from "enzyme";

jest.mock("popper.js");
jest.mock("react-portal");

describe("PopperContainer", function() {
    it("gives popper.js the correct width with _matchReferenceWidth", function() {
        const getReference = () => null;
        const component = ReactTestUtils.renderIntoDocument(
            <PopperContainer getReference={getReference}>contents</PopperContainer>
        );
        const width = 1234;

        const data = {
            styles: {},
            offsets: {
                reference: {
                    width: width
                }
            }
        };

        const newData = component._matchReferenceWidth(data);

        expect(newData.styles.minWidth).toEqual(`${width}px`);
        expect(newData.styles.maxWidth).toEqual(`${width}px`);
    });

    it("gives popper.js the correct width with _matchReferenceMinWidth", function() {
        const getReference = () => null;
        const component = ReactTestUtils.renderIntoDocument(
            <PopperContainer getReference={getReference}>contents</PopperContainer>
        );
        const width = 1234;

        const data = {
            styles: {},
            offsets: {
                reference: {
                    width: width
                }
            }
        };

        const newData = component._matchReferenceMinWidth(data);

        expect(newData.styles.minWidth).toEqual(`${width}px`);
    });


    it("should insert the z index into a data object", function() {
        const getReference = () => null;
        const component = ReactTestUtils.renderIntoDocument(
            <PopperContainer getReference={getReference}>contents</PopperContainer>
        );
        const zIndex = 1234;

        const data = {
            styles: {},
        };

        const newData = component._setZIndex(zIndex)(data);

        expect(newData.styles.zIndex).toEqual(zIndex);
    });

    it("should create and disconnect mutation observer", function() {
        class Nothing extends React.Component {
            render() {
                return <div><div ref="testRef" /></div>;
            }
        }

        const nothing = mount(<Nothing />);

        const getReference = () => nothing.ref("testRef");
        const constructorCallback = jest.fn();
        const observeCallback = jest.fn();
        const disconnectCallback = jest.fn();

        global.MutationObserver = class {
            constructor(fn) {
                constructorCallback();
                this.observe = observeCallback;
                this.disconnect = disconnectCallback;
                fn();
            }
        };

        const component = mount(<PopperContainer getReference={getReference}>contents</PopperContainer>);
        component.unmount();

        expect(constructorCallback).toBeCalled();
        expect(observeCallback).toBeCalled();
        expect(disconnectCallback).toBeCalled();
    });
});