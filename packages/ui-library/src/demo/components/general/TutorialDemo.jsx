import React from "react";
import Tutorial from "../../../components/general/Tutorial";
import Button from "../../../components/buttons/Button";

export default class TutorialDemo extends React.Component {
    state = {
        active: 0,
        visible: false,
        steps: [
            {
                title: "This is the First Step",
                description: "This is some text...",
                headerContent: (
                    <span>Some header content...</span>
                ),
                side: "bottom",
                target: () => document.getElementById("step__1"),
            },
            {
                title: "This is the Second Step",
                description: "This is some text...",
                headerContent: (
                    <span>Some header content...</span>
                ),
                side: "right",
                target: () => document.getElementById("step__2"),
            }
        ],
    };

    _onPrevious = () => {
        this.setState({ active: this.state.active > 0 ? this.state.active - 1 : this.state.active });
    }

    _onNext = () => {
        this.setState({ active: this.state.active < this.state.steps.length ? this.state.active + 1 : this.state.active });
    }

    _openTutorial = () => {
        this.setState({ visible: true, active: 1 });
    }

    render() {
        return (
            <div>
                <Button onClick={this._openTutorial}>Start Tutorial</Button>
                <div><span id="step__1">First Element</span></div>
                <div><span id="step__2">Second Element</span></div>
                <Tutorial
                    active={this.state.active}
                    visible={this.state.visible}
                    onPrevious={this._onPrevious}
                    onNext={this._onNext}
                    messageWelcomeTitle="Welcome to Ping!"
                    messageWelcomeDescription="Here's some description text..."
                    steps={this.state.steps}
                />
            </div>
        );
    }
}