jest.dontMock("../CondensedTable");

describe("CondensedTable", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        CondensedTable = require("../CondensedTable");

    var mockData = {
        head: [
            "name",
            "age",
            "city"
        ],
        body: [
            [
                "tom",
                "25",
                "denver"
            ],
            [
                "jane",
                "36",
                "breckenridge"
            ],
            [
                "roy",
                "19",
                "arvada"
            ]
        ]
    };
    var dataObjects = [
        {
            name: "tom",
            age: 25,
            city: "denver"
        },
        {
            name: "jane",
            age: 36,
            city: "breckenridge"
        },
        {
            name: "roy",
            age: 19,
            city: "arvada"
        }
    ];

    it("data-id's don't change", () => {
        TestUtils.mountSnapshotDataIds(
            <CondensedTable
                headData={mockData.head}
                bodyData={mockData.body}
            />
        );
    });

    it("data-id's don't change with data object", () => {
        TestUtils.mountSnapshotDataIds(
            <CondensedTable
                data={dataObjects}
            />
        );
    });

    it("renders table with head and body", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <div><CondensedTable headData={mockData.head} bodyData={mockData.body} /></div>);

        var section = TestUtils.findRenderedDOMNodeWithDataId(component, "section_0");
        var items = TestUtils.scryRenderedDOMNodesWithClass(section, "data-item");
        var label = TestUtils.findRenderedDOMNodeWithTag(items[0], "label");
        var description = TestUtils.findRenderedDOMNodeWithTag(items[0], "span");

        expect(items.length).toBe(3);
        expect(label.textContent).toBe("name");
        expect(description.textContent).toBe("tom");

    });

    it("renders table with data objects", function () {
        var component = ReactTestUtils.renderIntoDocument(<div><CondensedTable data={dataObjects} /></div>);
        var section = TestUtils.findRenderedDOMNodeWithDataId(component, "section_1");
        var items = TestUtils.scryRenderedDOMNodesWithClass(section, "data-item");
        var label = TestUtils.findRenderedDOMNodeWithTag(items[1], "label");
        var description = TestUtils.findRenderedDOMNodeWithTag(items[1], "span");

        expect(items.length).toBe(3);
        expect(label.textContent).toBe("age");
        expect(description.textContent).toBe("36");
    });
});
