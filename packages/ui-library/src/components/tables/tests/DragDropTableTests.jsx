window.__DEV__ = true;

jest.useFakeTimers();

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import _ from "underscore";
import DragDropTable from "../DragDropTable";
import TestBackend from "react-dnd-test-backend";
import { DragDropContext } from "react-dnd";

describe("DragDropTable", function () {
    function wrapInTestContext (Component) {
        return DragDropContext(TestBackend)(Component);
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
            onDrag: jest.fn(),
            onDrop: jest.fn(),
            onCancel: jest.fn(),
            headData: mockData.cols,
            bodyData: mockData.data
        });
        var WrappedComponent = wrapInTestContext(DragDropTable);
        return ReactTestUtils.renderIntoDocument(<WrappedComponent {...props} />);
    }

    it("Renders with default data-id", function () {
        const component = getComponent();
        const table = TestUtils.findRenderedDOMNodeWithDataId(component, "drag-drop-table");

        expect(table).toBeTruthy();

    });

    it("Renders a header cell with dragging class", function () {
        const component = getComponent({ beingDragged: 1 });
        const cells = TestUtils.scryRenderedDOMNodesWithClass(component, "dragging");

        expect(cells.length).toBeGreaterThan(0);
    });

    it("Renders a header cell with dragging class in infinite scrolling table", function () {
        const infiniteScroll = {
            onNext: jest.fn(),
            hasNext: true,
            batches: [
                { id: 1, data: mockData.data }
            ]
        };

        const component = getComponent({ beingDragged: 1, infiniteScroll });
        const cells = TestUtils.scryRenderedDOMNodesWithClass(component, "dragging");

        expect(cells.length).toBeGreaterThan(0);
    });
});
