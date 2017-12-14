window.__DEV__ = true;

jest.dontMock("../DragDropTable");
jest.dontMock("../../list/InfiniteScroll");

jest.useFakeTimers();


describe("DragDropTable", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore"),
        DragDropTable = require("../DragDropTable"),
        TestBackend = require("react-dnd-test-backend"),
        DragDropContext = require("react-dnd").DragDropContext;

    var thisComponent;

    function wrapInTestContext (Component) {
        return DragDropContext(TestBackend)( class extends React.Component {
            render() {
                return <Component {...this.props} ref={ c => thisComponent = c }/>;
            }
        });
    }


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
        var WrappedComponent = wrapInTestContext(DragDropTable);
        return ReactTestUtils.renderIntoDocument(<WrappedComponent {...props} />);
    }

    beforeEach(function () {
        thisComponent = null;
    });

    it("Correctly renders number of th and content", function () {
        getComponent();
        var component = thisComponent;
        var thead = TestUtils.scryRenderedDOMNodesWithClass(component, "th");

        expect(thead.length).toBe(3);

    });

    it("Correctly renders number of body rows and cells with correct content", function () {
        getComponent();
        var component = thisComponent;
        var tbody = TestUtils.findRenderedDOMNodeWithClass(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithClass(tbody, "tr");

        expect(tr.length).toBe(5);

        var td = TestUtils.scryRenderedDOMNodesWithClass(tr[0], "td");
        expect(td.length).toBe(3);
    });


    it("displays columns in default order ", function () {
        getComponent();
        var component = thisComponent;
        var thead = TestUtils.scryRenderedDOMNodesWithClass(component, "th");
        var tbody = TestUtils.findRenderedDOMNodeWithClass(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithClass(tbody, "tr");
        var td = TestUtils.scryRenderedDOMNodesWithClass(tr[2], "td");

        expect(thead[0].innerHTML).toBe("name");
        expect(td[0].innerHTML).toBe("roy");

    });

    it("sorts columns by order prop", function () {
        getComponent({ columnOrder: [2, 0, 1] });
        var component = thisComponent;
        var thead = TestUtils.scryRenderedDOMNodesWithClass(component, "th");
        var tbody = TestUtils.findRenderedDOMNodeWithClass(component, "tbody");
        var tr = TestUtils.scryRenderedDOMNodesWithClass(tbody, "tr");
        var td = TestUtils.scryRenderedDOMNodesWithClass(tr[2], "td");

        expect(thead[0].innerHTML).toBe("city");
        expect(td[0].innerHTML).toBe("arvada");
    });

    it("displays highlight based on drop target", function () {
        getComponent({ dropTarget: 1 });
        var component = thisComponent;

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
        getComponent({ beingDragged: 0 });
        var component = thisComponent;

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

        getComponent({ headContentType: getHeader() });
        var component = thisComponent;

        var thead = TestUtils.scryRenderedDOMNodesWithClass(component, "th");

        expect(thead[0].childNodes[0].tagName).toBe("A");
        expect(thead[0].childNodes[0].innerHTML).toBe("name");
    });

    it("adds fixed header based on prop", function () {
        getComponent({ fixedHead: true });
        var component = thisComponent;

        jest.runAllTimers();

        var fixedHead = TestUtils.findRenderedDOMNodeWithDataId(component, "drag-drop-table-fixedHead");
        expect(fixedHead).toBeTruthy();

    });

    it("sets widths for fixed header", function () {
        getComponent({ fixedHead: true });
        var component = thisComponent;

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
        getComponent({ fixedHead: true, infiniteScroll: infiniteScrollProps });
        var component = thisComponent;

        jest.runAllTimers();

        //access the infinite scroll node variable
        expect(component.infiniteScrollNode).toBeTruthy();

    });

    it("calls scroll callback for fixedhead", function () {
        getComponent({ fixedHead: true });
        var component = thisComponent;
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
        getComponent({ fixedHead: true, infiniteScroll: infiniteScrollProps });
        var component = thisComponent;
        component._handleHorizontalScroll = jest.genMockFunction();

        jest.runAllTimers();

        expect(component._handleHorizontalScroll.mock.calls.length).toBe(0);
        ReactTestUtils.Simulate.scroll(component.infiniteScrollNode);
        expect(component._handleHorizontalScroll.mock.calls.length).toBe(1);

    });


});
