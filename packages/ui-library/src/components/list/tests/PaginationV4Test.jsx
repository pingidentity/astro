window.__DEV__ = true;

import { mount } from "enzyme";
import StateContainer from "../../utils/StateContainer";
import { allFlags } from "../../../util/FlagUtils";

jest.dontMock("../Pagination");
jest.dontMock("../../rows/expandable-row/ExpandableRow");

describe("Pagination", function () {

    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Utils = require("../../../util/Utils"),
        Pagination = require("../Pagination"),
        ExpandableRow = require("../../rows/expandable-row/ExpandableRow"),
        callback,
        component,
        pageLinks,
        top,
        topLinks;

    beforeEach(function () {
        callback = jest.fn();
        component = ReactTestUtils.renderIntoDocument(
            <Pagination
                data-id="test-pagination"
                page={2}
                perPage = {5}
                total = {100}
                onValueChange={callback}>
                <ExpandableRow className="row" key={1} />
                <ExpandableRow className="row" key={2} />
                <ExpandableRow className="row" key={3} />
                <ExpandableRow className="row" key={4} />
                <ExpandableRow className="row" key={5} />
            </Pagination>
        );

        pageLinks = TestUtils.scryRenderedDOMNodesWithClass(component, "page-links");
        top = pageLinks[0];
        topLinks = top.childNodes;

    });

    it ("renders short pages navigation", function () {

        component = ReactTestUtils.renderIntoDocument(
            <Pagination
                perPage = {5}
                total = {30}
                onValueChange={callback}
                flags={allFlags}
            >
                <ExpandableRow className="row" key={1} />
                <ExpandableRow className="row" key={2} />
                <ExpandableRow className="row" key={3} />
                <ExpandableRow className="row" key={4} />
                <ExpandableRow className="row" key={5} />
            </Pagination>
        );

        pageLinks = TestUtils.scryRenderedDOMNodesWithClass(component, "page-links");
        top = pageLinks[0];
        topLinks = top.childNodes;

        // expect 2 lists of page links
        expect(pageLinks.length).toBe(2);

        // expect 8 child dom nodes in page links, no ellipsis
        expect(topLinks.length).toEqual(8);

        // expect the first child to be "<<"
        expect(topLinks[0].childNodes[0].className).toBe("icon-previous");

        // expect the highest page to be 6
        expect(topLinks[6].textContent).toBe("6");

    });

    it ("renders expanded pages navigation", function () {

        // expect 2 lists of page links
        expect(pageLinks.length).toBe(2);
        // expect 10 child dom nodes in page links, 2 for next and previous, 2 for first and last pages, one for ellipsis and 5 for pages
        expect(topLinks.length).toEqual(10);

        // expect the first child to be "<<"
        expect(topLinks[0].childNodes[0].className).toBe("icon-previous");

        // expect the highest page to be 20
        expect(topLinks[8].textContent).toBe("20");

    });

    it ("renders no pages navigation", function () {

        component = ReactTestUtils.renderIntoDocument(
            <Pagination
                perPage = {5}
                total = {4}
                onValueChange={callback}
                flags={allFlags}
            >
                <ExpandableRow className="row" key={1} />
                <ExpandableRow className="row" key={2} />
                <ExpandableRow className="row" key={3} />
                <ExpandableRow className="row" key={4} />
                <ExpandableRow className="row" key={5} />
            </Pagination>
        );

        pageLinks = TestUtils.scryRenderedDOMNodesWithClass(component, "page-links");

        topLinks = pageLinks[0].childNodes;
        var bottomLinks = pageLinks[1].childNodes;

        // expect 2 lists of page links
        expect(pageLinks.length).toBe(2);

        // expect no child DOM nodes
        expect(topLinks.length).toEqual(0);
        expect(bottomLinks.length).toEqual(0);
    });

    it ("renders navigation using totalPages instead of total and perPage", function () {

        component = ReactTestUtils.renderIntoDocument(
            <Pagination
                totalPages={3}
                perPage={3}
                onValueChange={callback}
                flags={allFlags}
            >
                <ExpandableRow className="row" key={1} />
                <ExpandableRow className="row" key={2} />
                <ExpandableRow className="row" key={3} />
            </Pagination>
        );

        pageLinks = TestUtils.scryRenderedDOMNodesWithClass(component, "page-links");
        topLinks = pageLinks[0].childNodes;

        // expect 2 lists of page links
        expect(pageLinks.length).toBe(2);

        // expect the first child to be "<<"
        expect(topLinks[0].childNodes[0].className).toBe("icon-previous");

        // expect numeric links to be the correct number
        expect(topLinks[1].textContent).toBe("1");
        expect(topLinks[2].textContent).toBe("2");
        expect(topLinks[3].textContent).toBe("3");

        // expect the last child to be ">>"
        expect(topLinks[4].childNodes[0].className).toBe("icon-next");
    });

    it ("trigger page change callback", function () {
        ReactTestUtils.Simulate.click(topLinks[1]);
        expect(callback).toBeCalledWith({ first: 0, last: 5, page: 1 });
    });

    it ("is not triggering callback for same page", function () {
        ReactTestUtils.Simulate.click(topLinks[0]);
        expect(callback).not.toBeCalled();
    });

    it ("renders children content", function () {
        var children = TestUtils.scryRenderedDOMNodesWithClass(component, "row");
        expect(children.length).toEqual(5);
    });

    it ("verify default data-id", function () {
        var paging = ReactTestUtils.renderIntoDocument(
            <Pagination
                totalPages={3}
                perPage={3}
                onValueChange={callback}
                flags={allFlags}
            >
                <ExpandableRow className="row" key={1} />
            </Pagination>
        );
        var test = TestUtils.findRenderedDOMNodeWithDataId(paging, "pagination");
        expect(test).toBeTruthy();
    });

    it ("verify large number of pages", function () {
        component = ReactTestUtils.renderIntoDocument(
            <Pagination
                stateless={true}
                data-id="test-pagination"
                page={6}
                perPage = {5}
                total = {100}
                onValueChange={callback}
                flags={allFlags}
            >
                <ExpandableRow className="row" key={1} />
                <ExpandableRow className="row" key={2} />
                <ExpandableRow className="row" key={3} />
                <ExpandableRow className="row" key={4} />
                <ExpandableRow className="row" key={5} />
            </Pagination>
        );
        pageLinks = TestUtils.scryRenderedDOMNodesWithClass(component, "page-links");
        top = pageLinks[0];
        topLinks = top.childNodes;

        ReactTestUtils.Simulate.click(topLinks[9]);
        expect(callback).toBeCalledWith({ first: 95, last: 100, page: 20 });
    });

    it ("verify no pages", function () {
        component = ReactTestUtils.renderIntoDocument(
            <Pagination
                stateless={true}
                data-id="test-pagination"
                page={1}
                perPage = {5}
                total = {1}
                onValueChange={callback}
                flags={allFlags}
            >
                <ExpandableRow className="row" key={1} />
                <ExpandableRow className="row" key={2} />
                <ExpandableRow className="row" key={3} />
                <ExpandableRow className="row" key={4} />
                <ExpandableRow className="row" key={5} />
            </Pagination>
        );
        pageLinks = TestUtils.scryRenderedDOMNodesWithClass(component, "page-links");
        top = pageLinks[0];
        topLinks = top.childNodes;
        expect(topLinks.length).toEqual(0);
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            ReactTestUtils.renderIntoDocument(
                <Pagination id="foo" totalPages={2} perPage={1} onValueChange={jest.fn()} flags={allFlags}>
                    <ExpandableRow className="row" key={1} />
                    <ExpandableRow className="row" key={2} />
                </Pagination>
            );
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function () {
            ReactTestUtils.renderIntoDocument(
                <Pagination controlled={true} totalPages={2} perPage={1} onValueChange={jest.fn()}>
                    <ExpandableRow className="row" key={1} />
                    <ExpandableRow className="row" key={2} />
                </Pagination>
            );
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'onChange' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("onChange", "onValueChange"));

        expect(function () {
            ReactTestUtils.renderIntoDocument(
                <Pagination onChange={jest.fn()} totalPages={2} perPage={1} flags={allFlags}>
                    <ExpandableRow className="row" key={1} />
                    <ExpandableRow className="row" key={2} />
                </Pagination>
            );
        }).toThrow(expectedError);
    });

    it("does not throw error when deprecated prop 'id' is passed in in production", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));
        process.env.NODE_ENV = "production";

        expect(function () {
            ReactTestUtils.renderIntoDocument(
                <Pagination id="foo" totalPages={2} perPage={1} onValueChange={jest.fn()} flags={allFlags}>
                    <ExpandableRow className="row" key={1} />
                    <ExpandableRow className="row" key={2} />
                </Pagination>
            );
        }).not.toThrow(expectedError);

        process.env.NODE_ENV = "";
    });

    // Progressively stateful tests
    it("renders a progressively stateful component when the p-stateful flag is passed in", () => {
        const pagination = mount(
            <Pagination
                flags={allFlags}
                totalPages={1}
            />
        );

        expect(pagination.find(StateContainer).exists()).toBeTruthy();
    });

    it("updates page in p-stateful version", () => {
        const pagination = mount(
            <Pagination
                flags={allFlags}
                totalPages={10}
            />
        );

        expect(pagination.find("[data-id=\"bottomPageLinksfirst\"]").hasClass("active")).toBeTruthy();

        pagination.find("[data-id=\"bottomPageLinks2\"]").simulate("click");

        expect(pagination.find("[data-id=\"bottomPageLinksfirst\"]").hasClass("active")).toBeFalsy();
        expect(pagination.find("[data-id=\"bottomPageLinks2\"]").hasClass("active")).toBeTruthy();
    });

});
