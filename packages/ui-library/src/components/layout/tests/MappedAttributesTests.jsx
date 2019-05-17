import React from "react";
import { shallow } from "enzyme";
import MappedAttributes from "../MappedAttributes";
import Table from "../../tables/Table";

describe("MappedAttributes", () => {
    it("renders the component", () => {
        const component = shallow(
            <MappedAttributes />
        );

        expect(component.exists()).toBeTruthy();
    });

    it("renders the correct number of attribute rows", () => {
        const component = shallow(
            <MappedAttributes
                attributes={[
                    {
                        from: "email",
                        to: "username",
                        type: "Empty Only",
                        required: true
                    },
                    {
                        from: "email",
                        to: "email",
                        type: "Always"
                    },
                ]}
            />
        );

        const table = component.find(Table);

        expect(table.props().bodyData.length).toEqual(2);
    });

    it("renders five labels for the Table, regardless of how many are passed in", () => {
        const component = shallow(
            <MappedAttributes
                labels={{
                    to: "BORK"
                }}
            />
        );

        const table = component.find(Table);

        expect(table.props().headData.length).toEqual(5);
    });
});
