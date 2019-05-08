window.__DEV__ = true;

jest.dontMock("../ColumnLayout");

describe("Row", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        Layout = require("../ColumnLayout"),
        Utils = require("../../../util/Utils"),
        TestUtils = require("../../../testutil/TestUtils");

    var colContent, customRowCss, customColCss, columns2, columns3, columns4, testNodeParent, testNodeChildren, i;

    beforeEach(function () {
        colContent = ["One", "Two", "Three", "Four"];
        customRowCss = ["rowClass2", "rowClass3", "rowClass4"];
        customColCss = ["colClass1", "colClass2", "colClass3", "colClass4"];

        columns2 = ReactTestUtils.renderIntoDocument(
            <Layout.Row data-id="columns-2" className={customRowCss[0]}>
                <Layout.Column className={customColCss[0]}>{colContent[0]}</Layout.Column>
                <Layout.Column className={customColCss[1]}>{colContent[1]}</Layout.Column>
            </Layout.Row>
        );
        columns3 = ReactTestUtils.renderIntoDocument(
            <Layout.Row data-id="columns-3" className={customRowCss[1]}>
                <Layout.Column className={customColCss[0]}>{colContent[0]}</Layout.Column>
                <Layout.Column className={customColCss[1]}>{colContent[1]}</Layout.Column>
                <Layout.Column className={customColCss[2]}>{colContent[2]}</Layout.Column>
            </Layout.Row>
        );
        columns4 = ReactTestUtils.renderIntoDocument(
            <Layout.Row data-id="columns-4" className={customRowCss[2]}>
                <Layout.Column className={customColCss[0]}>{colContent[0]}</Layout.Column>
                <Layout.Column className={customColCss[1]}>{colContent[1]}</Layout.Column>
                <Layout.Column className={customColCss[2]}>{colContent[2]}</Layout.Column>
                <Layout.Column className={customColCss[3]}>{colContent[3]}</Layout.Column>
            </Layout.Row>
        );
    });

    it("row renders with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(<Layout.Row />);

        var row = TestUtils.findRenderedDOMNodeWithDataId(component, "row");

        expect(row).toBeDefined();
    });

    it("row renders with given data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(<Layout.Row data-id="myRow" />);

        var row = TestUtils.findRenderedDOMNodeWithDataId(component, "myRow");

        expect(row).toBeDefined();
    });

    it("column renders with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(<Layout.Column />);

        var column = TestUtils.findRenderedDOMNodeWithDataId(component, "column-layout");

        expect(column).toBeDefined();
    });

    it("column renders with given data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(<Layout.Column data-id="myColumnLayout" />);

        var column = TestUtils.findRenderedDOMNodeWithDataId(component, "myColumnLayout");

        expect(column).toBeDefined();
    });

    it("renders the correct number of columns", function () {

        // two columns
        testNodeParent = TestUtils.findRenderedDOMNodeWithDataId(columns2, "columns-2");
        expect(testNodeParent.getAttribute("class")).toContain("columns-2");
        testNodeChildren = ReactTestUtils.scryRenderedDOMComponentsWithClass(columns2, "content-column");
        expect(testNodeChildren.length).toBe(2);

        // three columns
        testNodeParent = TestUtils.findRenderedDOMNodeWithDataId(columns3, "columns-3");
        expect(testNodeParent.getAttribute("class")).toContain("columns-3");
        testNodeChildren = ReactTestUtils.scryRenderedDOMComponentsWithClass(columns3, "content-column");
        expect(testNodeChildren.length).toBe(3);

        // four columns
        testNodeParent = TestUtils.findRenderedDOMNodeWithDataId(columns4, "columns-4");
        expect(testNodeParent.getAttribute("class")).toContain("columns-4");
        testNodeChildren = ReactTestUtils.scryRenderedDOMComponentsWithClass(columns4, "content-column");
        expect(testNodeChildren.length).toBe(4);
    });

    it("renders content and in the proper columns", function () {

        // two columns
        testNodeChildren = ReactTestUtils.scryRenderedDOMComponentsWithClass(columns2, "content-column");
        for (i=0; i<testNodeChildren.length; i+=1) {
            expect(testNodeChildren[i].textContent).toBe(colContent[i]);
        }

        // three columns
        testNodeChildren = ReactTestUtils.scryRenderedDOMComponentsWithClass(columns3, "content-column");
        for (i=0; i<testNodeChildren.length; i+=1) {
            expect(testNodeChildren[i].textContent).toBe(colContent[i]);
        }

        // four columns
        testNodeChildren = ReactTestUtils.scryRenderedDOMComponentsWithClass(columns4, "content-column");
        for (i=0; i<testNodeChildren.length; i+=1) {
            expect(testNodeChildren[i].textContent).toBe(colContent[i]);
        }

    });

    it("adds custom css classes", function () {

        // two columns

        testNodeParent = ReactTestUtils.findRenderedDOMComponentWithClass(columns2, customRowCss[0]);
        expect(testNodeParent).toBeTruthy();

        testNodeChildren = ReactTestUtils.scryRenderedDOMComponentsWithClass(columns2, "content-column");
        for (i=0; i<testNodeChildren.length; i+=1) {
            expect(testNodeChildren[i].className).toContain(customColCss[i]);
        }

        // three columns

        testNodeParent = ReactTestUtils.findRenderedDOMComponentWithClass(columns3, customRowCss[1]);
        expect(testNodeParent).toBeTruthy();

        testNodeChildren = ReactTestUtils.scryRenderedDOMComponentsWithClass(columns3, "content-column");
        for (i=0; i<testNodeChildren.length; i+=1) {
            expect(testNodeChildren[i].className).toContain(customColCss[i]);
        }

        // four columns

        testNodeParent = ReactTestUtils.findRenderedDOMComponentWithClass(columns4, customRowCss[2]);
        expect(testNodeParent).toBeTruthy();

        testNodeChildren = ReactTestUtils.scryRenderedDOMComponentsWithClass(columns4, "content-column");
        for (i=0; i<testNodeChildren.length; i+=1) {
            expect(testNodeChildren[i].className).toContain(customColCss[i]);
        }

    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            ReactTestUtils.renderIntoDocument(
                <Layout.Row id="foo">
                    <Layout.Column>something</Layout.Column>
                </Layout.Row>
            );
        }).toThrow(expectedError);
    });
});
