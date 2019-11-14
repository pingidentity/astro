import React from "react";
import Tutorial from "../../../components/general/Tutorial";

export default class TutorialDemo extends React.Component {
    state = {
        active: 1,
    };

    _onPrevious = () => {
        this.setState({ active: this.state.active - 1 });
    }

    _onNext = () => {
        this.setState({ active: this.state.active + 1 });
    }

    render() {
        return (
            <div>
                <div><span ref={c => (this.step1 = c)}>First Element</span></div>
                <div><span ref={c => (this.step2 = c)}>Second Element</span></div>
                <Tutorial
                    active={this.state.active}
                    onPrevious={this._onPrevious}
                    onNext={this._onNext}
                    steps={[
                        {
                            title: "This is the First Step",
                            description: "This is some text...",
                            headerContent: (
                                <span>Some header content...</span>
                            ),
                            side: "bottom",
                            target: () => this.step1,
                        },
                        {
                            title: "This is the Second Step",
                            description: "This is some text...",
                            headerContent: (
                                <span>Some header content...</span>
                            ),
                            side: "bottom",
                            target: () => this.step2,
                        }
                    ]}
                />
            </div>
        );
    }
}