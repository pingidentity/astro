window.__DEV__ = true;

jest.dontMock("../../grid");
jest.dontMock("../Row");
jest.dontMock("classnames");
jest.dontMock("../Grid");
jest.dontMock("../Column");
jest.dontMock("../cells/CheckboxCell");
jest.dontMock("../cells/ButtonCell");
jest.dontMock("../../forms/FormCheckbox");
jest.dontMock("../../forms/FormLabel");
jest.dontMock("../../tooltips/HelpHint");


describe("Row", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        CheckboxCell = require("../cells/CheckboxCell"),
        ButtonCell = require("../cells/ButtonCell"),
        Grid = require("../../grid"),
        Row = require("../Row");

    function render (props) {
        return ReactTestUtils.renderIntoDocument(
            <table>
                <tbody>
                    <Row data-id="grid-row-test" {...props} />
                </tbody>
            </table>
        );
    }

    function renderSampleGrid (props) {
        return ReactTestUtils.renderIntoDocument(
            <Grid data-id="datagrid" {...props}>
                <Grid.Column headerText="firstname" field="firstname" width={Grid.ColumnSizes.S} />
                <Grid.Column headerText="lastname" field="lastname" width={Grid.ColumnSizes.XS} />
            </Grid>
        );
    }

    function renderSampleGridWithLeftHeader (props) {
        return ReactTestUtils.renderIntoDocument(
            <Grid data-id="datagrid" {...props}>
                <Grid.Column headerText="Name" field="header" width={Grid.ColumnSizes.S} isLeftHeader={true} />
                <Grid.Column headerText="firstname" field="firstname" width={Grid.ColumnSizes.S} />
                <Grid.Column headerText="lastname" field="lastname" width={Grid.ColumnSizes.XS} />
            </Grid>
        );
    }

    it("should render row normally", function () {
        var rowObject = {
            firstname: "Chien",
            lastname: "Cao",
            email: "chiencao@pingidentity.com",
            hasLaptop: true
        };
        var dummyColumns = [];

        var component = render({
            rowObject: rowObject,
            rowExpandable: false,
            columns: dummyColumns
        });
        var node = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-row-test");
        expect(ReactTestUtils.isDOMComponent(node)).toBeTruthy();

    });

    it("should render row normally inside a grid with left header", function () {
        var rows = [{
            header: "Name",
            firstname: "Chien",
            lastname: "Cao",
        }];

        var component = renderSampleGridWithLeftHeader({
            rows: rows,
            columnsPerPage: 2,
            rowExpandable: false
        });

        var node = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-row-0");
        expect(ReactTestUtils.isDOMComponent(node)).toBeTruthy();
    });

    it("should render row normally inside a grid", function () {
        var rows = [{
            firstname: "Chien",
            lastname: "Cao",
        }];

        var component = renderSampleGrid({
            rows: rows,
            columnsPerPage: 2,
            rowExpandable: false
        });

        var node = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-row-0");
        expect(ReactTestUtils.isDOMComponent(node)).toBeTruthy();

    });

    it("should render row normally inside a grid with rowExpandable is true", function () {
        var rows = [{
            firstname: "Chien",
            lastname: "Cao",
        }];

        var callback = jest.fn();
        var component = renderSampleGrid({
            rows: rows,
            columnsPerPage: 2,
            rowExpandable: true,
            onRowExpanded: callback
        });

        var buttonCells = TestUtils.scryRenderedComponentsWithType(component, ButtonCell);
        expect(buttonCells.length).toBe(1);

        var firstnameTd = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-row-0-cell-0");
        expect(firstnameTd.textContent).toBe("Chien");

        var expandRowTd = TestUtils.findRenderedDOMNodeWithDataId(component,"grid-row-0_expandableIconCell");
        ReactTestUtils.Simulate.click(expandRowTd);
        expect(callback).toBeCalled();
    });

    it("should not render CheckboxCell without onGridCellAction callback", function () {
        var rows = [{
            firstname: { value: "Chien", className: "" },
            lastname: "Cao",
            hasLaptop: true
        }];

        var props = {
            rows: rows,
            columnsPerPage: 2
        };
        var component = ReactTestUtils.renderIntoDocument(
            <Grid data-id="grid-test" {...props}>
                <Grid.Column headerText="Firstname" field="firstname" width={Grid.ColumnSizes.S} />
                <Grid.Column headerText="Has Laptop" field="hasLaptop" >
                    <CheckboxCell className="stacked" />
                </Grid.Column>
            </Grid>
        );

        var node = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-row-0-cell-1");
        expect(ReactTestUtils.isDOMComponent(node)).toBeTruthy();

        var label = TestUtils.findRenderedDOMNodeWithTag(node, "label");
        expect(label).toBeNull();
        var input = TestUtils.findRenderedDOMNodeWithTag(label, "input");
        expect(input).toBeNull();
    });

    it("should render row normally inside a grid with onChange listener for cell", function () {
        var rows = [{
            firstname: { value: "Chien", className: "" },
            lastname: "Cao",
            hasLaptop: true
        }];

        var props = {
            rows: rows,
            columnsPerPage: 2
        };
        var callback = jest.fn();
        var component = ReactTestUtils.renderIntoDocument(
            <Grid data-id="grid-test" {...props}>
                <Grid.Column headerText="Firstname" field="firstname" width={Grid.ColumnSizes.S} />
                <Grid.Column headerText="Has Laptop" field="hasLaptop" >
                    <CheckboxCell onGridCellAction={callback} className="stacked" />
                </Grid.Column>
            </Grid>
        );

        var node = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-row-0-cell-1");
        expect(ReactTestUtils.isDOMComponent(node)).toBeTruthy();

        var label = TestUtils.findRenderedDOMNodeWithTag(node, "label");
        expect(label).toBeTruthy();
        var input = TestUtils.findRenderedDOMNodeWithTag(label, "input");
        expect(input).toBeTruthy();
        ReactTestUtils.Simulate.change(input);
        expect(callback).toBeCalled();
    });
});
