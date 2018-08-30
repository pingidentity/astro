window.__DEV__ = true;

jest.dontMock("../DashboardCardList");

describe("StatAreaCard", () => {
    const React = require("react");
    const ReactTestUtils = require("react-dom/test-utils");
    const TestUtils = require("../../../../../testutil/TestUtils");
    const DashboardCardList = require("../DashboardCardList");
    const _ = require("underscore");

    const listData = [
        { label: "Last 30 days", value: "29" },
        { label: "Last 60 days", value: "124" },
        { label: "Last 90 days", value: "167" },
        { label: "Last 120 days", value: "195" },
        { label: "Last 150 days", value: "201" },
    ];

    const defaultProps = {
        "data-id": "dash-card-list",
        data: listData,
    };

    function getComponent(props) {
        return ReactTestUtils.renderIntoDocument(
            <div><DashboardCardList {...defaultProps} {...props} /></div>
        );
    }

    it("renders the list", () => {
        const component = getComponent();
        const listMarkup = TestUtils.findRenderedDOMNodeWithDataId(component, defaultProps["data-id"]);

        console.log("listMarkup.children.length", listMarkup.children.length);


        _.each(listMarkup.children, (row, index) => {
            const label = TestUtils.findRenderedDOMNodeWithClass(row, "dashboard-card__stat-row-label");
            const value = TestUtils.findRenderedDOMNodeWithClass(row, "dashboard-card__stat-row-number");
            expect(label.textContent).toBe(listData[index].label);
            expect(value.textContent).toBe(listData[index].value);
        });
    });

});