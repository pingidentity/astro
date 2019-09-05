import React from "react";
import FieldSet from "../FieldSet";
import { shallow } from "enzyme";

it("adds legend when legend prop is declared", () => {
    const component = shallow(
        <FieldSet legend = "Title"
        />
    );
    expect(component.find("legend").exists()).toEqual(true);
});

it("does not add legend when legend prop is not declared", () => {
    const component = shallow(
        <FieldSet/>
    );
    expect(component.find("legend").exists()).toEqual(false);
});

it("renders fieldset when fieldset component is declared", () => {
    const component = shallow(
        <FieldSet/>
    );
    expect(component.find("fieldset").exists()).toEqual(true);
});