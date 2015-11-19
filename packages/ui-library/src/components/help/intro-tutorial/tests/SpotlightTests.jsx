window.__DEV__ = true;

jest.dontMock("../Spotlight.jsx");
jest.dontMock("../../../../testutil/TestUtils.js");

describe("IntroTutorial", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        Spotlight = require("../Spotlight.jsx");

    beforeEach(function () {
    });

    it("Clones and positions the target", function () {
        var target = {
            getBoundingClientRect: jest.genMockFunction().mockReturnValue({
                top: 100,
                left: 100,
                width: 500
            }),
            outerHTML: "<div data-id=\"blah\">blah</div>"
        };
        var component = ReactTestUtils.renderIntoDocument(<Spotlight target={target} />);
        var node = React.findDOMNode(component);

        expect(node.innerHTML).toBe(target.outerHTML);
        expect(node.style.left).toBe("90px");
        expect(node.style.top).toBe("90px");
        expect(node.style.width).toBe("500px");
    });
});

