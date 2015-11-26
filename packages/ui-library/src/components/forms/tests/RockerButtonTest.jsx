window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../RockerButton.jsx");
jest.dontMock("underscore");

describe("RockerButton", function () {

    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        RockerButton = require("../RockerButton.jsx");

    it("will trigger callback on selection change.", function () {

        var callback = jest.genMockFunction();

        var rockerButtonComponent = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={["Profile", "Groups", "Services"]} onChange={callback}/>
        );

        var labels = ReactTestUtils.scryRenderedDOMComponentsWithTag(rockerButtonComponent, "label");

        //make sure 3 labels in a list
        expect(labels.length).toBe(3);

        ReactTestUtils.Simulate.click(labels[1], {});

        // verify label, make sure callback was triggered for Groups
        expect(callback).toBeCalledWith("Groups", 1);

        ReactTestUtils.Simulate.click(labels[0], {});

        // verify label, make sure callback was triggered for Profile
        expect(callback).toBeCalledWith("Profile", 0);

        ReactTestUtils.Simulate.click(labels[2], {});

        // verify label, make sure callback was triggered for Services
        expect(callback).toBeCalledWith("Services", 2);
    });
});
