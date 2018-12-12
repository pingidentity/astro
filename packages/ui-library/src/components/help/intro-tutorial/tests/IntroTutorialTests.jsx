window.__DEV__ = true;

jest.dontMock("../index.js");
jest.dontMock("../IntroTutorial");

describe("IntroTutorial", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        assign = require("object-assign"),
        IntroTutorial = require("../IntroTutorial");

    class Doc extends React.Component {
        state = this.props;

        /*
         * use this function to avoid setting the props directly on the component (anti pattern)
         */
        _setProps = (props) => {
            this.setState(props);
        };

        render() {
            return (<div>
                <IntroTutorial ref="tutorial" {...this.state} />
                <div className="app-search"></div>
                <div className="menu-button"></div>
                <div className="main-content"></div>
            </div>);
        }
    }

    //have to do this because the divs wont exist on the first render
    var sendSteps = function (component, activeStep) {
        var node = ReactDOM.findDOMNode(component);

        component._setProps({
            active: activeStep,
            steps: [
               { target: node.getElementsByClassName("app-search")[0], title: "title 1", description: "d1" },
               { target: node.getElementsByClassName("menu-button")[0], title: "title 2", description: "d2" },
               { target: node.getElementsByClassName("main-content")[0], title: "title 3", description: "d3" }
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
            labelGotIt: "Got it",
            messageWelcome: "HELLO WORLD",

            onNext: jest.fn(),
            onPrevious: jest.fn(),
            onDismiss: jest.fn(),
            onGotIt: jest.fn(),
            visible: true,
            steps: [],
            active: 0
        };
        var props = assign(defaults, opts);

        return ReactTestUtils.renderIntoDocument(<Doc {...props} />);
    };

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();

    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("Hides when vibility is false", function () {
        var component = getComponent({ visible: false });
        var node = ReactDOM.findDOMNode(component.refs.tutorial);

        expect(node).toBe(null);
    });

    it("Removes event listener on unmount", function () {
        var component = getComponent();
        expect(TestUtils.mockCallsContains(window.addEventListener, "resize")).toBe(true);
        expect(TestUtils.mockCallsContains(window.removeEventListener, "resize")).toBe(false);

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(TestUtils.mockCallsContains(window.removeEventListener, "resize")).toBe(true);
    });

    it("Show welcome text when step is 0", function () {
        var component = getComponent();
        var node = ReactDOM.findDOMNode(component);

        expect(node.textContent.match("HELLO WORLD")).toBeTruthy();
    });

    it("Disabled previous button on first step", function () {
        var component = getComponent();
        var tutorial = component.refs.tutorial;

        sendSteps(component, 1);

        var prevButton = ReactDOM.findDOMNode(tutorial.refs.prevButton);
        var nextButton = ReactDOM.findDOMNode(tutorial.refs.nextButton);

        expect(prevButton.disabled).toBe(true);
        expect(nextButton.disabled).toBe(false);
    });

    it("'Got it' next button on last step", function () {
        var component = getComponent();
        var tutorial = component.refs.tutorial;

        sendSteps(component, 3);

        var nextButton = ReactDOM.findDOMNode(tutorial.refs.nextButton);
        expect(nextButton.innerHTML).toBe("Got it");

        ReactTestUtils.Simulate.click(nextButton);
        expect(tutorial.props.onGotIt.mock.calls.length).toBe(1);
    });

    it("Executes callbacks on click", function () {
        var component = getComponent();
        var tutorial = component.refs.tutorial;

        sendSteps(component, 1);
        var nextButton = ReactDOM.findDOMNode(tutorial.refs.nextButton);

        //next
        ReactTestUtils.Simulate.click(nextButton);
        expect(tutorial.props.onNext.mock.calls.length).toBe(1);

        //prev disabled on active=1, so reset to active=2
        sendSteps(component, 2);
        var prevButton = ReactDOM.findDOMNode(tutorial.refs.prevButton);

        //prev
        ReactTestUtils.Simulate.click(prevButton);
        expect(tutorial.props.onPrevious.mock.calls.length).toBe(1);

        var dismissButton = ReactDOM.findDOMNode(tutorial.refs.dismissButton);

        //dismiss
        ReactTestUtils.Simulate.click(dismissButton);
        expect(tutorial.props.onDismiss.mock.calls.length).toBe(1);
    });

    it("Executes onGotIt callbacks on click", function () {
        var component = getComponent();
        var tutorial = component.refs.tutorial;

        sendSteps(component, 3);
        var gotItButton = ReactDOM.findDOMNode(tutorial.refs.nextButton);
        //got it
        ReactTestUtils.Simulate.click(gotItButton);
        expect(tutorial.props.onGotIt.mock.calls.length).toBe(1);
    });
});
