import React from "react";
import { shallow } from "enzyme";
import SegmentedBox from "../SegmentedBox";

describe("SegmentedBox", function () {
    it("renders", function () {
        const component = shallow(<SegmentedBox />);

        expect(component.find(".segmented-box").exists()).toBeTruthy();
    });
});
