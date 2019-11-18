import React from "react";
import Tutorial from "../../../components/general/Tutorial";
import TutorialButton from "../../../components/buttons/TutorialButton";

export default class TutorialDemo extends React.Component {
    state = {
        active: 0,
        visible: false,
        steps: [
            {
                title: "This is the First Step",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                side: "bottom",
                target: () => document.querySelectorAll("[data-id='BasicInputs']")[0]
            },
            {
                title: "This is the Second Step",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                side: "bottom",
                target: () => document.querySelectorAll("[data-id='Templates-label']")[0]
            },
            {
                title: "This is the Third Step",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                side: "bottom",
                target: () => document.querySelectorAll("[data-id='search']")[0]
            }
        ],
    };

    _onPrevious = () => {
        this.setState({
            active: this.state.active > 0 ? this.state.active - 1 : this.state.activ
        });
    }

    _onNext = () => {
        if (this.state.active === this.state.steps.length) {
            this.setState({
                visible: false,
                active: 0,
            });
        } else {
            this.setState({
                active: this.state.active + 1
            });
        }
    }

    _onClose = () => {
        this.setState({
            visible: false,
            active: 0,
        });
    }

    _openTutorial = () => {
        this.setState({ visible: true, active: 0 });
    }

    render() {
        return (
            <div>
                <TutorialButton onClick={this._openTutorial}/>
                <Tutorial
                    active={this.state.active}
                    visible={this.state.visible}
                    onPrevious={this._onPrevious}
                    onNext={this._onNext}
                    onClose={this._onClose}
                    messageWelcomeTitle="Welcome to the Dock!"
                    messageWelcomeDescription="Here's some description text about the tutorial..."
                    steps={this.state.steps}
                />
            </div>
        );
    }
}