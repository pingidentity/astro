window.__DEV__ = true;

jest.dontMock("../CollapsibleSection.jsx");
jest.dontMock("../../../testutil/TestUtils");


describe("CollapsibleSection", function () {
    var React = require("react/addons");
    var ReactTestUtils = React.addons.TestUtils;
    var CollapsibleSection = require("../CollapsibleSection.jsx");
    var TestUtils = require("../../../testutil/TestUtils");
    var onToggle = jest.genMockFunction();
    var View;

    /*
     * Test CollapsibleSection is collapsed by default.
     */
    it("is collapsed by default", function () {
        View = ReactTestUtils.renderIntoDocument(
            <CollapsibleSection className="iShouldBeVisible">
                <div className="iShouldBeHidden" />
            </CollapsibleSection>
        );

        var cmp = ReactTestUtils.findRenderedComponentWithType(View, CollapsibleSection);
        var nada = TestUtils.scryRenderedDOMComponentsWithDataId(View, "iShouldBeHidden");

        expect(cmp).toBeTruthy();
        expect(nada.length).toEqual(0);
    });

    /*
     * Test CollapsibleSection is expanded by clicking.
     */
    it("expands on click", function () {
        View = ReactTestUtils.renderIntoDocument(
            <CollapsibleSection onToggle={onToggle}>
                <div className="iShouldBeVisibleAfterClick" />
            </CollapsibleSection>
        );

        ReactTestUtils.Simulate.click(React.findDOMNode(View));

        var child = TestUtils.findRenderedDOMComponentWithDataId(View, "collapsableSection");

        expect(onToggle).toBeCalled();
        expect(child).toBeTruthy();
    });

    /*
     * Test CollapsibleSection is expanded by default.
     */
    it("is rendering expanded state", function () {
        View = ReactTestUtils.renderIntoDocument(
            <CollapsibleSection className="iShouldBeVisible" expanded={true} >
                <div className="iShouldBeVisible" />
            </CollapsibleSection>
        );

        var child = TestUtils.findRenderedDOMComponentWithDataId(View, "collapsableSection");

        expect(child).toBeTruthy();
    });

    /*
     * Test CollapsibleSection is expanded by default
     * and add title to toggle .
     */
    it("is rendering expanded state and toggle title", function () {
        View = ReactTestUtils.renderIntoDocument(
            <CollapsibleSection className="section" expanded={true} toggleOnTitle={true}
                onToggle={onToggle}>
                <div className="section-title" title={true}>
                    <span className="icon-dropdown-arrow show-section"></span>
                                Conditions
                </div>
            </CollapsibleSection>
        );

        var child = TestUtils.findRenderedDOMComponentWithDataId(View, "collapsableSection");
        expect(onToggle).toBeCalled();
        expect(child).toBeTruthy();
    });
});