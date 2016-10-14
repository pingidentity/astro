window.__DEV__ = true;

//jest.dontMock("../DragDrop.jsx");
jest.dontMock("../DragDropTable.jsx");


describe("DragDropTable", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore"),
        DragDropTable = require("../DragDropTable.jsx");



    var mockData = {
        cols: [
            "name",
            "age",
            "city"
        ],
        data: [
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
            ],
            [
                "sue",
                "74",
                "colorado springs"
            ],
            [
                "amy",
                "56",
                "salida"
            ]
        ]
    };

    function getComponent (props) {
        props = _.defaults(props || {}, {
            onDrag: jest.genMockFunction(),
            onDrop: jest.genMockFunction(),
            onCancel: jest.genMockFunction(),
            headData: mockData.cols,
            bodyData: mockData.data
        });
        return ReactTestUtils.renderIntoDocument(<div><DragDropTable {...props}/></div>);
    }

    it("Correctly renders number of th and content", function () {
        var component = getComponent();
        var thead = TestUtils.scryRenderedDOMNodesWithTag(component, "th");

        expect(thead.length).toBe(3);

    });

    it("Correctly renders number of body rows and cells with correct content", function () {
        var component = getComponent();
        var tbody = TestUtils.findRenderedDOMNodeWithTag(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithTag(tbody, "tr");

        expect(tr.length).toBe(5);

        var td = TestUtils.scryRenderedDOMNodesWithTag(tr[0], "td");
        expect(td.length).toBe(3);
    });


    it("displays columns in default order ", function () {
        var component = getComponent();
        var thead = TestUtils.scryRenderedDOMNodesWithTag(component, "th");
        var tbody = TestUtils.findRenderedDOMNodeWithTag(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithTag(tbody, "tr");
        var td = TestUtils.scryRenderedDOMNodesWithTag(tr[2], "td");

        expect(thead[0].innerHTML).toBe("name");
        expect(td[0].innerHTML).toBe("roy");

    });

    it("sorts columns by order prop", function () {
        var component = getComponent({ columnOrder: [2, 0, 1] });
        var thead = TestUtils.scryRenderedDOMNodesWithTag(component, "th");
        var tbody = TestUtils.findRenderedDOMNodeWithTag(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithTag(tbody, "tr");
        var td = TestUtils.scryRenderedDOMNodesWithTag(tr[2], "td");

        expect(thead[0].innerHTML).toBe("city");
        expect(td[0].innerHTML).toBe("arvada");
    });

    it("displays highlight based on drop target", function () {
        var component = getComponent({ dropTarget: 1 });

        var thead = TestUtils.scryRenderedDOMNodesWithTag(component, "th");
        var tbody = TestUtils.findRenderedDOMNodeWithTag(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithTag(tbody, "tr");
        var td = TestUtils.scryRenderedDOMNodesWithTag(tr[0], "td");

        var highlightedItems = TestUtils.scryRenderedDOMNodesWithClass(component, "dragLeft");

        expect(highlightedItems.length).toBe(6);
        expect(thead[1]).toEqual(highlightedItems[0]);
        expect(td[1]).toEqual(highlightedItems[1]);

        expect(thead[1].className).toContain("dragLeft");

    });

    it("adds class to dragged column", function () {
        var component = getComponent({ beingDragged: 0 });

        var tbody = TestUtils.findRenderedDOMNodeWithTag(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithTag(tbody, "tr");
        var td = TestUtils.scryRenderedDOMNodesWithTag(tr[0], "td");

        expect(td[0].className).toContain("dragging");
        expect(td[1].className).not.toContain("dragging");


    });

    it("accepts react object for th", function () {
        var getHeader = function () {
            var ReactObject = function (props) {
                return (<a>{props.data}</a>);
            };
            return (<ReactObject />);
        };

        var component = getComponent({ headContentType: getHeader() });

        var thead = TestUtils.scryRenderedDOMNodesWithTag(component, "th");

        expect(thead[0].childNodes[0].tagName).toBe("A");
        expect(thead[0].childNodes[0].innerHTML).toBe("name");
    });


});
