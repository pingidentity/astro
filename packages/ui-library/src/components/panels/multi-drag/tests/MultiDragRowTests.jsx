window.__DEV__ = true;

jest.dontMock("../MultiDragRow");
jest.dontMock("../../../buttons/Button.jsx");
import { mount } from "enzyme";
import { mountSnapshotDataIds } from "../../../../testutil/TestUtils";

describe("MultiDragRow", function() {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        MultiDragRow = require("../MultiDragRow"),
        _ = require("underscore");

    function getComponent(props) {
        props = _.defaults(props || {}, {});

        return ReactTestUtils.renderIntoDocument(<MultiDragRow {...props} />);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <MultiDragRow
                count="4"
                iconSrc="path"
                iconClass="icon-globe"
            />
        );
    });

    it("triggers add event", function() {
        const callback = jest.fn();
        const component = mount(
            <MultiDragRow
                column={0}
                onAdd={callback}
            />
        );

        const button = component.find("button[data-id=\"row-button-add\"]");
        expect(callback).not.toBeCalled();
        button.simulate("click");
        expect(callback).toBeCalled();
    });

    it("triggers remove event", function() {
        const callback = jest.fn();
        const component = mount(
            <MultiDragRow
                column={1}
                onRemove={callback}
            />
        );

        const button = component.find("button[data-id=\"row-button-remove\"]");
        expect(callback).not.toBeCalled();
        button.simulate("click");
        expect(callback).toBeCalled();
    });

    it("renders with all the extras", function() {
        const component = getComponent({ iconSrc: "nothing", icon: "nothing", count: 4 });
        expect(component).toBeDefined();
    });
});
