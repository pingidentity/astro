window.__DEV__ = true;

jest.dontMock("../../grid");
jest.dontMock("../Grid.jsx");
jest.dontMock("../Column.jsx");
jest.dontMock("../Row.jsx");
jest.dontMock("../ColumnPagination.jsx");
jest.dontMock("../cells/CheckboxCell.jsx");
jest.dontMock("../cells/TextFieldCell.jsx");
jest.dontMock("../cells/ButtonCell.jsx");
jest.dontMock("../GridActions.js");
jest.dontMock("../GridReducer.js");
jest.dontMock("../../general/If.jsx");
jest.dontMock("../../forms/FormCheckbox.jsx");
jest.dontMock("../../forms/FormTextField.jsx");
jest.dontMock("../../forms/FormLabel.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");
jest.dontMock("../../forms/form-text-field/index.js");
jest.dontMock("../../forms/form-text-field");

describe("Grid", function () {
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var _ = require("underscore");
    var Utils = require("../../../util/Utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var ShallowRenderer = require("react-test-renderer/shallow");
    var Grid = require("../Grid.jsx");
    var TextFieldCell = require("../cells/TextFieldCell.jsx");
    var ButtonCell = require("../cells/ButtonCell.jsx");
    var CheckboxCell = require("../cells/CheckboxCell.jsx");

    var rows = [
        {
            rowheader: "Row Header 1",
            firstname: "Chien",
            midname: { value: "Something", className: "cell-btn" },
            lastname: "Cao",
            email: "chiencao@pingidentity.com",
            gender: "male",
            job: "Front-end Developer",
            birthday: "02/02",
            birthyear: "1987",
            hasLaptop: true
        },
        {
            rowheader: "Row Header 2",
            firstname: "Long",
            midname: "Something",
            lastname: "Tran",
            email: "longtran@pingidentity.com",
            gender: "male",
            job: "Front-end Developer",
            birthday: "",
            birthyear: "1992",
            hasLaptop: true,
            expanded: true
        }
    ];

    beforeEach(function () {
    });

    /*
     * Gets a simple component (no complex feature)
     */
    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            rows: rows,
            "data-id": "grid-test",
            columnsPerPage: 5,
            firstColumn: 0,
            lastColumn: 5,
            currentPage: 1,
            onPaginationChanged: jest.genMockFunction(),
            stateless: true
        });

        return ReactTestUtils.renderIntoDocument(
            <Grid {...opts} >
                <Grid.Column isLeftHeader={true} field="rowheader" />
                <Grid.Column headerText="Firstname" fixed={true} field="firstname" />
                <Grid.Column headerText="Lastname" field="lastname" />
                <Grid.Column headerText="Midname" field="midname"
                        width={Grid.ColumnSizes.XS}
                        data-id="grid-column-3"
                        align={Grid.Alignments.RIGHT} />
                <Grid.Column headerText="Email" field="email" />
                <Grid.Column headerText="Gender" field="gender" />
            </Grid>
        );
    }

    it("should render component correctly", function () {
        var component = getComponent();

        var grid = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-test");
        expect(ReactTestUtils.isDOMComponent(grid)).toBeTruthy();
    });

    it("should have <th> tag for left headers", function () {
        var component = getComponent();

        var trs = TestUtils.scryRenderedDOMNodesWithTag(component, "tr");

        for (var i = 1; i < trs.length; i = i + 1) {
            var tr = trs[i];
            var ths = TestUtils.scryRenderedDOMNodesWithTag(tr, "th");
            expect(ths[0].textContent).toContain("Row Header");
        }
    });

    it("should have <th> tag for top headers", function () {
        var component = getComponent();

        var headerRow = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-row-header");
        var ths = TestUtils.scryRenderedDOMNodesWithTag(headerRow, "th");

        for (var i = 1; i < ths.length; i = i + 1) {
            var th = ths[i];
            expect(th).not.toBeNull();
        }
    });

    it("should have column-xs class name at the third column header", function () {
        var component = getComponent();

        var headerCell3 = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-column-3");
        expect(headerCell3.getAttribute("class")).toContain("column-xs");
    });

    it("should have alignment class name right at the third column header", function () {
        var component = getComponent();

        var headerCell3 = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-column-3");
        expect(headerCell3.getAttribute("class")).toContain("right");
    });

    it("should call callback function when clicking on plus icon", function () {
        var callback = jest.genMockFunction();
        var component = getComponent({
            rowExpandable: true,
            onRowExpanded: callback,
            expandedRowContentType: <div>something</div>
        });

        var buttonCells = TestUtils.scryRenderedComponentsWithType(component, ButtonCell);
        var button = TestUtils.findRenderedDOMNodeWithDataId(buttonCells[0], "grid-button-cell");
        ReactTestUtils.Simulate.click(button);

        expect(callback).toBeCalled();
    });

    it("should expand a row when clicking on plus icon", function () {
        var component = getComponent({
            rowExpandable: true,
            onRowExpanded: jest.genMockFunction(),
            expandedRowContentType: (<div>here is expanded section</div>)
        });

        var expandedCell = TestUtils.findRenderedDOMNodeWithDataId(component, "expandedCell-1");
        expect(expandedCell.textContent).toEqual("here is expanded section");
    });

    it("should receive an addition css class for cell such as alignment or border style", function () {
        var component = getComponent();

        var td = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-row-0-cell-3");
        var className = td.getAttribute("class");
        expect(className).toContain("cell-btn");
        expect(className).toContain("right");
    });

    it("should have check all checkbox on header", function () {
        var props = {
            rows: rows,
            columnsPerPage: 2
        };
        var component = ReactTestUtils.renderIntoDocument(
            <Grid data-id="grid-test" {...props}>
                <Grid.Column headerText="Firstname" field="firstname" />
                <Grid.Column headerText="Has Laptop"
                        field="hasLaptop"
                        hasSelectAll={true}
                        data-id="check-all-header"
                        selectAllValue={true} >
                    <CheckboxCell onGridCellAction={jest.genMockFunction()} className="stacked" />
                </Grid.Column>
            </Grid>
        );

        var cellHeader = TestUtils.findRenderedDOMNodeWithDataId(component, "check-all-header");
        var checkbox = TestUtils.findRenderedDOMNodeWithDataId(cellHeader, "form-checkbox");
        expect(checkbox).not.toBeNull();
        expect(checkbox.checked).toBeTruthy();
    });

    it("triggers onGridCellAction on Checkbox cell change", function () {
        var props = {
            rows: rows,
            columnsPerPage: 2
        };
        var callback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <Grid data-id="grid-test" {...props}>
                <Grid.Column headerText="Firstname" field="firstname" width={Grid.ColumnSizes.S} />
                <Grid.Column headerText="Has Laptop" field="hasLaptop" >
                    <CheckboxCell onGridCellAction={callback} className="stacked" />
                </Grid.Column>
            </Grid>
        );

        var node = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-row-0-cell-1");
        var checkbox = TestUtils.findRenderedDOMNodeWithTag(node, "input");
        ReactTestUtils.Simulate.change(checkbox);
        expect(callback).toBeCalled();
    });

    it("should go to next column page if pagination changed", function () {
        var props = {
            rows: rows,
            stateless: false,
            columnsPerPage: 1
        };
        var component = ReactTestUtils.renderIntoDocument(
            <Grid data-id="grid-test" {...props}>
                <Grid.Column headerText="Firstname" fixed={true} field="firstname" />
                <Grid.Column headerText="Lastname" field="lastname" />
                <Grid.Column headerText="Email" field="email" />
            </Grid>
        );

        var paginationNext = TestUtils.findRenderedDOMNodeWithDataId(component, "pagination-next");
        ReactTestUtils.Simulate.click(paginationNext);

        var pagination = TestUtils.findRenderedDOMNodeWithDataId(component, "pagination");
        expect(pagination.textContent).toBe("2 of 2");

        var headerRow = TestUtils.findRenderedDOMNodeWithDataId(component, "grid-row-header");
        var ths = TestUtils.scryRenderedDOMNodesWithTag(headerRow, "th");
        expect(ths.length).toBe(3);
        expect(ths[0].textContent).toBe("Firstname");
        expect(ths[1].textContent).toBe("Email");
    });

    it("should have TextField in cells", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Grid rows={rows} stateless={false} >
                <Grid.Column headerText="Email" field="email" >
                    <TextFieldCell onGridCellAction={jest.genMockFunction()} />
                </Grid.Column>
            </Grid>
        );

        var trs = TestUtils.scryRenderedDOMNodesWithTag(component, "tr");
        for (var i = 1; i < trs.length; i = i + 1) {
            var tr = trs[i];
            var td = TestUtils.scryRenderedDOMNodesWithTag(tr, "td")[0];
            var input = TestUtils.scryRenderedDOMNodesWithTag(td, "input");
            expect(input[0]).toBeTruthy();
        }
    });

    it("triggers onGridCellAction on TextField cell change", function () {
        var callback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <Grid rows={rows} stateless={false} >
                <Grid.Column headerText="Email" field="email" >
                    <TextFieldCell onGridCellAction={callback} />
                </Grid.Column>
            </Grid>
        );

        var trs = TestUtils.scryRenderedDOMNodesWithTag(component, "tr");
        var td = TestUtils.scryRenderedDOMNodesWithTag(trs[1], "td")[0];
        var input = TestUtils.scryRenderedDOMNodesWithTag(td, "input")[0];
        ReactTestUtils.Simulate.change(input);
        expect(callback).toBeCalled();
    });

    it("should have Button in cells", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Grid rows={rows} stateless={false} >
                <Grid.Column headerText="Email" field="email" >
                    <ButtonCell onGridCellAction={jest.genMockFunction()} />
                </Grid.Column>
            </Grid>
        );

        var trs = TestUtils.scryRenderedDOMNodesWithTag(component, "tr");
        for (var i = 1; i < trs.length; i = i + 1) {
            var tr = trs[i];
            var td = TestUtils.scryRenderedDOMNodesWithTag(tr, "td")[0];
            var button = TestUtils.scryRenderedDOMNodesWithTag(td, "button");
            expect(button[0]).toBeTruthy();
        }
    });

    it("triggers onGridCellAction on button cell click", function () {
        var callback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <Grid rows={rows} stateless={false} >
                <Grid.Column headerText="Email" field="email" >
                    <ButtonCell data-id="cellWithonGridCellAction" onGridCellAction={callback} />
                </Grid.Column>
            </Grid>
        );
        var button = TestUtils.scryRenderedDOMNodesWithDataId(component, "cellWithonGridCellAction")[0];
        ReactTestUtils.Simulate.click(button);
        expect(callback).toBeCalled();
    });

    it("should return null for Column", function () {
        var shallowRenderer = new ShallowRenderer();
        shallowRenderer.render(<Grid.Column field="firstname" />);
        var output = shallowRenderer.getRenderOutput();

        expect(output).toBeNull();
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

});
