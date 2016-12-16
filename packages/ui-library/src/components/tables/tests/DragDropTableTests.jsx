window.__DEV__ = true;

jest.dontMock("../DragDropTable.jsx");
jest.dontMock("../../list/InfiniteScroll.jsx");


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
            "data-id": "drag-drop-table",
            onDrag: jest.genMockFunction(),
            onDrop: jest.genMockFunction(),
            onCancel: jest.genMockFunction(),
            headData: mockData.cols,
            bodyData: mockData.data
        });
        return ReactTestUtils.renderIntoDocument(<DragDropTable {...props} />);
    }

    it("Correctly renders number of th and content", function () {
        var component = getComponent();
        var thead = TestUtils.scryRenderedDOMNodesWithClass(component, "th");

        expect(thead.length).toBe(3);

    });

    it("Correctly renders number of body rows and cells with correct content", function () {
        var component = getComponent();
        var tbody = TestUtils.findRenderedDOMNodeWithClass(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithClass(tbody, "tr");

        expect(tr.length).toBe(5);

        var td = TestUtils.scryRenderedDOMNodesWithClass(tr[0], "td");
        expect(td.length).toBe(3);
    });


    it("displays columns in default order ", function () {
        var component = getComponent();
        var thead = TestUtils.scryRenderedDOMNodesWithClass(component, "th");
        var tbody = TestUtils.findRenderedDOMNodeWithClass(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithClass(tbody, "tr");
        var td = TestUtils.scryRenderedDOMNodesWithClass(tr[2], "td");

        expect(thead[0].innerHTML).toBe("name");
        expect(td[0].innerHTML).toBe("roy");

    });

    it("sorts columns by order prop", function () {
        var component = getComponent({ columnOrder: [2, 0, 1] });
        var thead = TestUtils.scryRenderedDOMNodesWithClass(component, "th");
        var tbody = TestUtils.findRenderedDOMNodeWithClass(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithClass(tbody, "tr");
        var td = TestUtils.scryRenderedDOMNodesWithClass(tr[2], "td");

        expect(thead[0].innerHTML).toBe("city");
        expect(td[0].innerHTML).toBe("arvada");
    });

    it("displays highlight based on drop target", function () {
        var component = getComponent({ dropTarget: 1 });

        var thead = TestUtils.scryRenderedDOMNodesWithClass(component, "th");
        var tbody = TestUtils.findRenderedDOMNodeWithClass(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithClass(tbody, "tr");
        var td = TestUtils.scryRenderedDOMNodesWithClass(tr[0], "td");

        var highlightedItems = TestUtils.scryRenderedDOMNodesWithClass(component, "drag-left");

        expect(highlightedItems.length).toBe(6);
        expect(thead[1]).toEqual(highlightedItems[0]);
        expect(td[1]).toEqual(highlightedItems[1]);

        expect(thead[1].className).toContain("drag-left");

    });

    it("adds class to dragged column", function () {
        var component = getComponent({ beingDragged: 0 });

        var tbody = TestUtils.findRenderedDOMNodeWithClass(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithClass(tbody, "tr");
        var td = TestUtils.scryRenderedDOMNodesWithClass(tr[0], "td");

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

        var thead = TestUtils.scryRenderedDOMNodesWithClass(component, "th");

        expect(thead[0].childNodes[0].tagName).toBe("A");
        expect(thead[0].childNodes[0].innerHTML).toBe("name");
    });

    it("adds fixed header based on prop", function () {
        var component = getComponent({ fixedHead: true });

        jest.runAllTimers();

        var fixedHead = TestUtils.findRenderedDOMNodeWithDataId(component, "drag-drop-table-fixedHead");
        expect(fixedHead).toBeTruthy();

    });

    it("sets widths for fixed header", function () {
        var component = getComponent({ fixedHead: true });

        expect(component.state.columnWidths).toBe(null);
        //setWidths is on a timeout so need to run timers
        jest.runAllTimers();
        expect(component.state.columnWidths.length).toBe(3);
    });

    it("renders with InfiniteScroll and fires scroll callback", function () {
        var infiniteScrollProps = {
            onNext: jest.genMockFunction,
            hasNext: true,
            batches: [
                { id: 1, data: mockData.data }
            ]
        };
        var component = getComponent({ fixedHead: true, infiniteScroll: infiniteScrollProps });

        jest.runAllTimers();

        //access the infinite scroll node variable
        expect(component.infiniteScrollNode).toBeTruthy();

    });

    it("calls scroll callback for fixedhead", function () {
        var component = getComponent({ fixedHead: true });
        var container = TestUtils.findRenderedDOMNodeWithDataId(component, "drag-drop-table-container");
        component.initialX = 30;
        container.scrollLeft = 80;

        jest.runAllTimers();

        var fixedHead = TestUtils.findRenderedDOMNodeWithDataId(component, "drag-drop-table-fixedHead");

        expect(fixedHead.style.left).toBe("");
        ReactTestUtils.Simulate.scroll(TestUtils.findRenderedDOMNodeWithDataId(component, "drag-drop-table-container"));
        expect(component.initialX).toBe(80);
        expect(fixedHead.style.left).toBe("-80px");
    });

    it("calls scroll callback for InfiniteScroll", function () {
        var infiniteScrollProps = {
            onNext: jest.genMockFunction,
            hasNext: true,
            batches: [
                { id: 1, data: mockData.data }
            ]
        };
        var component = getComponent({ fixedHead: true, infiniteScroll: infiniteScrollProps });
        component._handleHorizontalScroll = jest.genMockFunction();

        jest.runAllTimers();

        expect(component._handleHorizontalScroll.mock.calls.length).toBe(0);
        ReactTestUtils.Simulate.scroll(component.infiniteScrollNode);
        expect(component._handleHorizontalScroll.mock.calls.length).toBe(1);

    });


});
