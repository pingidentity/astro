import React from "react";
import PopperContainer from "../PopperContainer";
import ReactTestUtils from "react-dom/test-utils";

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
});