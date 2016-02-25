window.__DEV__ = true;

jest.dontMock("../Multiselect.jsx");

describe("Multiselect", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var Multiselect = require("../Multiselect.jsx");
    var callback = jest.genMockFunction();
    var component;
    var checkboxes;
    var search;
    var clearBtn;

    beforeEach(function () {
        component = ReactTestUtils.renderIntoDocument(
            <Multiselect title="Sites" id="multiselect"
                options={{
                    "acme.com": "1st",
                    "acme.net": "2nd",
                    "foo.com": "3rd",
                    "foo.net": "4th"
                }}
                onChange={callback} />
        );
        checkboxes = TestUtils.scryRenderedDOMNodesWithDataId(component, "checkbox");
        search = TestUtils.scryRenderedDOMNodesWithTag(component, "input")[0];
        clearBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "clear");
    });

    it("will trigger callback on selection change.", function () {

        expect(checkboxes.length).toBe(4); //make sure 4 checkboxes

        ReactTestUtils.Simulate.change(checkboxes[2], { target: { checked: true } }) ;
        expect(callback).toBeCalledWith("3rd", true); //make sure callback was triggered for foo.com

        ReactTestUtils.Simulate.change(checkboxes[2], { target: { checked: false } });
        expect(callback).toBeCalledWith("3rd", false); //make sure callback was triggered for foo.com
    });

    it("narrow list on type.", function () {

        ReactTestUtils.Simulate.change(search, { target: { value: "acm" } });
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");
        expect(labels.length).toBe(2); //make sure we have only 2 options left which matching search
        expect(labels[0].textContent).toEqual("acme.com");
        expect(labels[1].textContent).toEqual("acme.net");
    });

    it("clears search on ESC", function () {

        ReactTestUtils.Simulate.change(search, { target: { value: "acm" } });

        expect(search.value).toEqual("acm");

        ReactTestUtils.Simulate.keyUp(search, { keyCode: 27 }); //ESC pressed

        expect(search.value).toEqual(""); //make sure search have been cleared

    });

    it("clears search on X click", function () {

        ReactTestUtils.Simulate.change(search, { target: { value: "acm" } });
        expect(search.value).toEqual("acm");

        ReactTestUtils.Simulate.click(clearBtn, {});
        expect(search.value).toEqual(""); //make sure search have been cleared
    });
});
