jest.dontMock("../Table");

describe("Table", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Table = require("../Table");
    
    const headData = [
        "name",
        "age",
        "city"
    ];

    const bodyData = [
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
    ];

    const dataObjects = [
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
        const component = ReactTestUtils.renderIntoDocument(
            <div><Table headData={headData} bodyData={bodyData} /></div>);

        const head = TestUtils.scryRenderedDOMNodesWithTag(component, "thead");
        const rows = TestUtils.scryRenderedDOMNodesWithTag(component, "tr");
        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "th");
        const values = TestUtils.scryRenderedDOMNodesWithTag(component, "td");

        expect(head.length).toBe(1);
        expect(rows.length).toBe(4);
        expect(labels.length).toBe(3);
        expect(values.length).toBe(9);

    });

    it("renders table with data objects", function () {
        const component = ReactTestUtils.renderIntoDocument(<div><Table data={dataObjects} /></div>);

        const head = TestUtils.scryRenderedDOMNodesWithTag(component, "thead");
        const rows = TestUtils.scryRenderedDOMNodesWithTag(component, "tr");
        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "th");
        const values = TestUtils.scryRenderedDOMNodesWithTag(component, "td");

        expect(head.length).toBe(1);
        expect(rows.length).toBe(4);
        expect(labels.length).toBe(3);
        expect(values.length).toBe(9);
    });

    it("renders table with row labels", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <div><Table headData={headData} bodyData={bodyData} rowLabels={true} /></div>);

        const head = TestUtils.scryRenderedDOMNodesWithTag(component, "thead");
        const rows = TestUtils.scryRenderedDOMNodesWithTag(component, "tr");
        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "th");
        const values = TestUtils.scryRenderedDOMNodesWithTag(component, "td");

        expect(head.length).toBe(1);
        expect(rows.length).toBe(4);
        expect(labels.length).toBe(6);
        expect(values.length).toBe(6);

    });

    it("renders table without lines", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <div><Table headData={headData} bodyData={bodyData} lines={false} /></div>);

        const findClass = TestUtils.scryRenderedDOMNodesWithClass(component, "grid--no-lines");

        expect(findClass.length).toBe(1);
    });

    it("renders table using a cell renderer", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <div><Table headData={headData} bodyData={bodyData} cellRenderers={[
                null, value => <div data-id="age">{value}</div>
            ]} /></div>);

        const ages = TestUtils.scryRenderedDOMNodesWithDataId(component, "age");

        expect(ages.length).toBe(3);
    });

});

