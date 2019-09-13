import React from "react";
import FileDetails from "../FileDetails";
import { shallow } from "enzyme";


it("renders filedetails when filedetails component is declared", () => {
    const component = shallow(
        <FileDetails />
    );
    expect(component.exists()).toEqual(true);
});