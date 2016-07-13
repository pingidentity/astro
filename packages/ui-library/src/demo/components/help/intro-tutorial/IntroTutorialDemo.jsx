var React = require("react"),
    ReactDOM = require("react-dom"),
    IntroTutorial = require("../../../../components/help/intro-tutorial");

/**
* @name IntroTutorialDemo
* @memberof IntroTutorial
* @desc A demo for IntroTutorial
*/
var Demo = React.createClass({
    LABELS: {
        messageWelcome: "Welcome to the tutorial",
        labelNext: "Next",
        labelPrevious: "Previous",
        labelDismiss: "Dismiss",
        labelGetStarted: "GetStarted",
        labelOf: "of",
        labelGotIt: "Finish"
    },

    getInitialState: function () {
        return {
            active: 0,
            visible: true,
            steps: []
        };
    },

    _handleDismiss: function () {
        this.setState({ visible: false });
        ReactDOM.findDOMNode(this.refs.container).style.display = "none";
    },

    _handleNext: function () {
        this.setState({ active: this.state.active + 1 });
    },

    _handlePrev: function () {
        this.setState({ active: this.state.active - 1 });
    },

    componentDidMount: function () {
        setTimeout(function () {
            this.setState({
                steps: [
                    {
                        title: "Markup",
                        description: "This is where the markup of your demo will be shown",
                        target: document.getElementsByClassName("markup-wrapper")[0]
                    },
                    {
                        title: "Description",
                        description: "This is where description of your demo will be displayed",
                        target: document.getElementsByClassName("demo-description")[0]
                    },
                    {
                        title: "Name",
                        description: "This is the name of your component",
                        target: document.getElementsByTagName("h1")[0]
                    },
                    {
                        title: "Page title",
                        description: "This is where the page title goes",
                        target: document.getElementsByTagName("h1")[0]
                    }
                ] });
        }.bind(this), 500);
    },

    render: function () {
        var style = { left: 0, top: 0, width: "100%", position: "fixed", height: "100%", zIndex: 10 };

        return (
            <div ref="container" style={style}>
                <IntroTutorial
                    {...this.LABELS}
                    onNext={this._handleNext}
                    onPrevious={this._handlePrev}
                    onDismiss={this._handleDismiss}
                    onGotIt={this._handleDismiss}
                    visible={this.state.visible}
                    steps={this.state.steps}
                    active={this.state.active} />
            </div>);
    }
});

module.exports = Demo;
