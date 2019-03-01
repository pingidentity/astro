import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import Text from "../Text";

describe("Text", function () {
    function getComponent (props) {

        return ReactTestUtils.renderIntoDocument(
            <div>
                <Text {...props}>
                    Have fun with it. We're not trying to teach you a thing to copy.
                    We're just here to teach you a technique, then let you loose into the world.
                    You're the greatest thing that has ever been or ever will be. You're special.
                    You're so very special. You've got to learn to fight the temptation to resist these things.
                    Just let them happen. You have to make almighty decisions when you're the creator.
                </Text>
            </div>
        );
    }

    it("renders with default data-id", function () {
        const component = getComponent({});

        expect(TestUtils.checkForDataIds(component, ["styled-text"])).toEqual(true);
    });

    it("renders with a style class", function () {
        const component = getComponent({ type: "primary" });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "text-primary");

        expect(element).toBeTruthy();
    });
});
