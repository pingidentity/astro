window.__DEV__ = true;

jest.dontMock("../RowBuilder.jsx");

describe("RowBuilder", () => {
    const React = require("react");
    const { renderIntoDocument, Simulate } = require("react-dom/test-utils");
    const TestUtils = require("../../../testutil/TestUtils");
    const RowBuilder = require("../RowBuilder");

    const defaultRows = [
        {
            id: "first",
            content: <div/>
        },
        {
            id: "second",
            content: <div/>
        }
    ];

    function getComponent({
        rows = defaultRows,
        ...props
    } = {}) {
        return renderIntoDocument(
            <div>
                <RowBuilder rows={rows} {...props} />
            </div>
        );
    }

    it("renders all rows passed in", () => {
        const component = getComponent();
        const rows = TestUtils.scryRenderedDOMNodesWithClass(component, "row-builder__row");

        expect(rows.length).toEqual(2);
    });

    it("calls onAdd prop when add button is clicked", () => {
        const onAdd = jest.fn();
        const component = getComponent({ onAdd });
        const add = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "row-builder-add"
        );
        const addAnchor = TestUtils.findRenderedDOMNodeWithTag(
            add,
            "a"
        );

        Simulate.click(addAnchor);
        expect(onAdd).toHaveBeenCalled();
    });

    it("does not call onAdd prop when not passed in", () => {
        const onAdd = jest.fn();
        const component = getComponent();
        const add = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "row-builder-add"
        );
        const addAnchor = TestUtils.findRenderedDOMNodeWithTag(
            add,
            "a"
        );

        Simulate.click(addAnchor);
        expect(onAdd).not.toHaveBeenCalled();
    });

    it("calls onRemove prop with row id when remove button is clicked", () => {
        const onRemove = jest.fn();
        const component = getComponent({ onRemove });
        const [removeButton,] = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "row-builder__remove"
        );

        Simulate.click(removeButton);
        expect(onRemove.mock.calls[0][1]).toEqual("first");
    });

    it("does not call onRemove prop when not passed in", () => {
        const onRemove = jest.fn();
        const component = getComponent();
        const [removeButton,] = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "row-builder__remove"
        );

        Simulate.click(removeButton);
        expect(onRemove).not.toHaveBeenCalled();
    });

    it("renders remove label when showRemoveLabel prop is set to true", () => {
        const component = getComponent({ showRemoveLabel: true });
        const labels = TestUtils.scryRenderedDOMNodesWithClass(component, "row-builder__remove__label");

        expect(labels.length).not.toEqual(0);
    });

    it("does not render remove label when showRemoveLabel prop is set to true", () => {
        const component = getComponent({ showRemoveLabel: false });
        const label = TestUtils.findRenderedDOMNodeWithClass(component, "row-builder__remove__label");

        expect(label).toBeFalsy();
    });
});
