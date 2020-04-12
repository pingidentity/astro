import React from "react";
import { shallow, mount } from "enzyme";
import { Icon, Message } from "../FormError";

describe("FormError", () => {
    describe("Icon", () => {
        it("renders the component", () => {
            const component = shallow(<Icon />);

            expect(component.exists()).toEqual(true);
        });
    });

    describe("Message", () => {
        it("renders the component", () => {
            const component = shallow(<Message value="SOMETHING WENT VERY WRONG HERE AND I AM ALARMED" />);
            expect(component.exists()).toEqual(true);
        });

        it("emits message event in Chrome", () => {
            navigator = {
                ...navigator,
                userAgent: "chrome"
            };

            document.body.dispatchEvent = jest.fn();

            expect(document.body.dispatchEvent).not.toHaveBeenCalled();

            // Have to do a mount here because Enzyme still has trouble with useEffect
            // and shallow rendering - https://github.com/enzymejs/enzyme/issues/2086
            mount(<Message value="SOMETHING WENT VERY WRONG HERE AND I AM ALARMED" />);

            expect(document.body.dispatchEvent).toHaveBeenCalledTimes(1);
        });

        it("emits message event in IE", () => {
            navigator = {
                ...navigator,
                userAgent: "msie"
            };

            document.body.dispatchEvent = jest.fn();

            expect(document.body.dispatchEvent).not.toHaveBeenCalled();

            mount(<Message value="SOMETHING WENT VERY WRONG HERE AND I AM ALARMED" />);

            expect(document.body.dispatchEvent).toHaveBeenCalledTimes(1);
        });
    });
});
