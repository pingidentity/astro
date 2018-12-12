window.__DEV__ = true;

jest.dontMock("../dragScroll");

//console.log(window)

describe ("dragScroll", function () {
    var _ = require("underscore"),
        dragScroll = require("../dragScroll");

    var genMockNode = function (x, y, width, height) {
        return {
            getBoundingClientRect: function () {
                return { top: y, left: x, right: x + width, bottom: y + height, height: height, width: width };
            }
        };
    };

    var genMockElement = function (props) {
        //var el = document.createElement(elType);
        var el = {

        };
        return _.extend(el, props);
    };


    // function getComponent (props) {
    //     var outerStyle = {
    //         width: "800px",
    //         height: "400px",
    //         overflow: "auto"
    //     };
    //     var innerStyle = {
    //         width: "200px",
    //         height: "800px"
    //     };
    //     props = _.defaults(props || {}, {
    //         onClick: jest.fn()
    //     });
    //     return ReactTestUtils.renderIntoDocument(
    //         <div>
    //             <div data-id="outer" style={outerStyle}>
    //                 <div data-id="inner" onClick={props.callback} style={innerStyle} />
    //             </div>
    //         </div>
    //     );
    // }

    xit("get scroll parent", function () {
        var scrollStyle = { overflowX: "auto", overflowY: "auto" };
        var parentX = genMockElement({
            dataId: "parentX",
            style: scrollStyle,
            scrollHeight: 400, clientHeight: 400, scrollWidth: 300, clientWidth: 200
        });
        var parentY = genMockElement({
            dataId: "parentY",
            style: scrollStyle,
            scrollHeight: 800, clientHeight: 400, scrollWidth: 200, clientWidth: 200
        });
        var child = genMockElement({
            dataId: "child",
            style: { overflowX: "hidden", overflowY: "visible" },
            scrollHeight: 400, clientHeight: 400, scrollWidth: 200, clientWidth: 200
        });

        parentY.appendChild(child);
        parentX.appendChild(parentY);
        document.body.appendChild(parentX);
        //
        // console.log(child.parentNode.dataId);
        // console.log(dragScroll.canScroll(parentX, "X"));
        //
        // console.log(dragScroll.findScrollParent(child, "X"));
        //
        // console.log(dragScroll.getScrollParents(child, { clientX: 10, clientY: 360 }, dragScroll.opts.BUFFER));
        //
        // console.log(dragScroll.findScrollParent(TestUtils.findRenderedDOMNodeWithDataId(document.body, "child"), "X"));
        // console.log(dragScroll.findScrollParent(TestUtils.findRenderedDOMNodeWithDataId(document.body, "child"), "Y"));


    });

    it("findScrollParent returns null when asking for parent of document root element", function () {
        expect(dragScroll.findScrollParent(document.documentElement, "X")).toBe(null);
        expect(dragScroll.findScrollParent(document.documentElement, "Y")).toBe(null);
    });

    it("gets scroll function based on direction", function () {
        var element = genMockElement({ scrollLeft: 15, scrollTop: 20 });
        var distance = 5;

        // X direction
        var scrollX = dragScroll.getScrollFunction(element, "X", 1, distance);
        scrollX();
        expect(element.scrollLeft).toBe(20);

        // Y direction
        var scrollY = dragScroll.getScrollFunction(element, "Y", 1, distance);
        scrollY();
        expect(element.scrollTop).toBe(25);
    });

    it("canScroll test", function () {

        var style = { overflowX: "hidden", overflowY: "auto" };
        //mock return because not an actual dom node
        window.getComputedStyle = jest.fn().mockReturnValue(style);
        var el = genMockElement({
            style: style,
            scrollHeight: 400,
            clientHeight: 400,
            scrollWidth: 200,
            clientWidth: 200
        });

        expect(dragScroll.canScroll(el, "X")).toBe(false);
        expect(dragScroll.canScroll(el, "Y")).toBe(false);

        el.style.overflowX = "auto";
        expect(dragScroll.canScroll(el, "X")).toBe(false);

        el.scrollWidth = 300;
        expect(dragScroll.canScroll(el, "X")).toBe(true);

        el.scrollHeight = 800;
        //expect(dragScroll.canScroll(el, "Y")).toBe(true); //TODO: failing b/c getComputedStyle in canScroll doesn't see style props

        el.style.overflowY = "hidden";
        expect(dragScroll.canScroll(el, "Y")).toBe(false);

        el.style.overflowY = "scroll";
        expect(dragScroll.canScroll(el, "Y")).toBe(true);

    });

    it("gets scroll direction for edge quadrants and center", function () {
        var node = genMockNode(0, 0, 400, 400);
        var offset = 50;

        var quads = {
            bottomLeft: { clientX: 10, clientY: 360 },
            bottomRight: { clientX: 370, clientY: 360 },
            topLeft: { clientX: 10, clientY: 30 },
            topRight: { clientX: 355, clientY: 23 },
            center: { clientX: 200, clientY: 200 }
        };
        var expectations = {
            bottomLeft: { X: -1, Y: 1 },
            bottomRight: { X: 1, Y: 1 },
            topLeft: { X: -1, Y: -1 },
            topRight: { X: 1, Y: -1 },
            center: { X: null, Y: null }
        };

        for (var prop in quads) {
            expect(dragScroll.getScrollDirection(node, "X", quads[prop], offset)).toEqual(expectations[prop].X);
            expect(dragScroll.getScrollDirection(node, "Y", quads[prop], offset)).toEqual(expectations[prop].Y);
        }
    });

    it("test adding and removing event listener start and end", function () {
        var listenMock = jest.fn();
        window.addEventListener = window.removeEventListener = listenMock;
        expect(listenMock.mock.calls.length).toBe(0);
        dragScroll.start();
        expect(listenMock.mock.calls.length).toBe(1);
        dragScroll.end();
        expect(listenMock.mock.calls.length).toBe(2);
    });
});
