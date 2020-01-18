import React from "react";
import { mount, shallow } from "enzyme";
import PipeRow, { Pipe } from "../PipeRow";

describe("PipeRow", function () {
    it("should render a pipe row with a pipe", function() {
        const component = mount(<PipeRow><span>one</span><span>two</span></PipeRow>);
        expect(component.find(".pipe").exists()).toBeTruthy();
    });

    it("should render a standalone pipe", function() {
        const component = shallow(<Pipe />);
        expect(component.find(".pipe").exists()).toBeTruthy();
    });
});