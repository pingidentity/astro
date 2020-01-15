import React from "react";
import { mount } from "enzyme";
import ShowMore, { ShowSome } from "../ShowMore";

describe("ShowMore", () => {
    it("renders the component", () => {
        const component = mount(
            <div><ShowMore><div data-id="more-content">content</div></ShowMore></div>
        );

        expect(component.exists()).toEqual(true);

        expect(component.find("div[data-id='more-content']").exists()).toBeFalsy();
    });

    it("renders the content when expanded", () => {
        const component = mount(
            <div><ShowMore expanded><div data-id="more-content">content</div></ShowMore></div>
        );

        expect(component.exists()).toEqual(true);

        expect(component.find("div[data-id='more-content']").exists()).toBeTruthy();
    });

    it("renders the component and toggles", () => {
        const component = mount(
            <div><ShowMore><div data-id="more-content">content</div></ShowMore></div>
        );

        expect(component.find("div[data-id='more-content']").exists()).toBeFalsy();

        component.find("div[data-id='show-more']").simulate("click");

        expect(component.find("div[data-id='more-content']").exists()).toBeTruthy();
    });

    it("renders ShowSome with only 5 items", () => {
        const component = mount(
            <div>
                <ShowSome
                    count={5}
                    items={[0,1,2,3,4,5,6,7,8,9].map(number => <div data-id={`item-${number}`} />)}
                />
            </div>
        );

        expect(component.find("div[data-id='item-4']").exists()).toBeTruthy();
        expect(component.find("div[data-id='item-5']").exists()).toBeFalsy();
    });

    it("renders ShowSome with all the items", () => {
        const component = mount(
            <div>
                <ShowSome
                    count={5}
                    items={[0,1,2,3,4,5,6,7,8,9].map(number => <div data-id={`item-${number}`} />)}
                    expanded
                />
            </div>
        );

        expect(component.find("div[data-id='item-9']").exists()).toBeTruthy();
    });

});
