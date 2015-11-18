window.__DEV__ = true;

jest.dontMock("../index.js");
jest.dontMock("../IntroTutorial.jsx");

describe("IntroTutorial", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        assign = require("object-assign"),
        IntroTutorial = require("../IntroTutorial.jsx");

    var Doc = React.createClass({
        /* jshint ignore:start */
        render: function () {
            return (<div>
                <IntroTutorial ref="tutorial" {...this.props} />
                <div className="app-search"></div>
                <div className="menu-button"></div>
            </div>);
        }
        /* jshint ignore:end */
    });

    //have to do this because the divs wont exist on the first render
    var sendSteps = function (component, activeStep) {
        var node = React.findDOMNode(component);

        component.setProps({
            active: activeStep,
            steps: [
               { target: node.getElementsByClassName("app-search")[0], title: "title 1", description: "d1" },
               { target: node.getElementsByClassName("menu-button")[0], title: "title 2", description: "d2" }
            ]
        });
    };

    var getComponent = function (opts) {
        var defaults = {
            labelNext: "Next",
            labelPrevious: "Previous",
            labelDismiss: "Dismiss",
            labelGetStarted: "GetStarted",
            labelOf: "of",
            messageWelcome: "HELLO WORLD",

            onNext: jest.genMockFunction(),
            onPrevious: jest.genMockFunction(),
            onDismiss: jest.genMockFunction(),
            visible: true,
            steps: [],
            active: 0
        };
        var props = assign(defaults, opts);

        /* jshint ignore:start */
        return ReactTestUtils.renderIntoDocument(<Doc {...props} />);
        /* jshint ignore:end */
    };

    window.addEventListener = jest.genMockFunction();
    window.removeEventListener = jest.genMockFunction();

    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("Hides when vibility is false", function () {
        var component = getComponent({ visible: false });
        var node = React.findDOMNode(component.refs.tutorial);

        expect(node).toBe(null);
    });

    it("Removes event listener on unmount", function () {
        var component = getComponent();
        expect(window.addEventListener.mock.calls.length).toBe(1);
        expect(removeEventListener.mock.calls.length).toBe(0);

        React.unmountComponentAtNode(React.findDOMNode(component).parentNode);

        expect(removeEventListener.mock.calls.length).toBe(1);
    });

    it("Show welcome text when step is 0", function () {
        var component = getComponent();
        var node = React.findDOMNode(component);

        expect(node.innerHTML.match("HELLO WORLD")).toBeTruthy();
    });

    it("Disabled previous button on first step", function () {
        var component = getComponent();
        var tutorial = component.refs.tutorial;

        sendSteps(component, 1);

        var prevButton = React.findDOMNode(tutorial.refs.prevButton);
        var nextButton = React.findDOMNode(tutorial.refs.nextButton);

        expect(prevButton.disabled).toBe(true);
        expect(nextButton.disabled).toBe(false);
    });

    it("Disabled next button on last step", function () {
        var component = getComponent();
        var tutorial = component.refs.tutorial;

        sendSteps(component, 2);

        var prevButton = React.findDOMNode(tutorial.refs.prevButton);
        var nextButton = React.findDOMNode(tutorial.refs.nextButton);

        expect(prevButton.disabled).toBe(false);
        expect(nextButton.disabled).toBe(true);
    });

    it("Executes callbacks on click", function () {
        var component = getComponent();
        var tutorial = component.refs.tutorial;

        sendSteps(component, 1);

        var dismissButton = React.findDOMNode(tutorial.refs.dismissButton);
        var prevButton = React.findDOMNode(tutorial.refs.prevButton);
        var nextButton = React.findDOMNode(tutorial.refs.nextButton);

        //next
        ReactTestUtils.Simulate.click(nextButton);
        expect(tutorial.props.onNext.mock.calls.length).toBe(1);
        //prev
        ReactTestUtils.Simulate.click(prevButton);
        expect(tutorial.props.onPrevious.mock.calls.length).toBe(1);
        //dismiss
        ReactTestUtils.Simulate.click(dismissButton);
        expect(tutorial.props.onDismiss.mock.calls.length).toBe(1);
    });
});

