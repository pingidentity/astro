jest.dontMock("../CondensedTable.jsx");

describe("CondensedTable", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        CondensedTable = require("../CondensedTable.jsx");

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

    it("renders table with head and body", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <div><CondensedTable headData={mockData.head} bodyData={mockData.body} /></div>);

        var sections = TestUtils.scryRenderedDOMNodesWithDataId(component, "section");
        var items = TestUtils.scryRenderedDOMNodesWithDataId(sections[0], "item");
        var label = TestUtils.findRenderedDOMNodeWithTag(items[0], "label");
        var description = TestUtils.findRenderedDOMNodeWithTag(items[0], "span");

        expect(sections.length).toBe(3);
        expect(items.length).toBe(3);
        expect(label.textContent).toBe("name");
        expect(description.textContent).toBe("tom");

    });

    it("renders table with data objects", function () {
        var component = ReactTestUtils.renderIntoDocument(<div><CondensedTable data={dataObjects} /></div>);
        var sections = TestUtils.scryRenderedDOMNodesWithDataId(component, "section");
        var items = TestUtils.scryRenderedDOMNodesWithDataId(sections[1], "item");
        var label = TestUtils.findRenderedDOMNodeWithTag(items[1], "label");
        var description = TestUtils.findRenderedDOMNodeWithTag(items[1], "span");

        expect(sections.length).toBe(3);
        expect(items.length).toBe(3);
        expect(label.textContent).toBe("age");
        expect(description.textContent).toBe("36");
    });
});
