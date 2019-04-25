import React from "react";
import PopoverMenu from "../../../components/tooltips/PopoverMenu";

/**
 * @name PopoverMenuDemo
 * @memberof PopoverMenu
 * @desc A demo for PopoverMenu
 */

class PopoverMenuDemo extends React.Component {
    static flags = ["use-portal"];

    state = {
        open1: false,
        message: ""
    };

    _toggle1 = () => {
        this.setState({ open1: !this.state.open1 });
    };

    _buttons = [
        {
            label: "First Item",
            onClick: () => this.setState({ message: "First item" })
        },
        {
            label: "Second Item",
            onClick: () => this.setState({ message: "Second item" })
        },
        {
            label: "Third Item",
            onClick: () => this.setState({ message: "Third item" })
        }
    ];

    render() {
        return (
            <div>
                <p>Last clicked: {this.state.message}</p>
                <PopoverMenu
                    label={<span className="button inline edit" />}
                    buttons={this._buttons}
                    open={this.state.open1}
                    onToggle={this._toggle1}
                />
            </div>
        );
    }
}

module.exports = PopoverMenuDemo;
