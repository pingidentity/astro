import React from "react";
import OverflowMenu from "../../../components/buttons/OverflowMenu";
import Button from "../../../components/buttons/Button";

/**
 * @name OverflowMenuDemo
 * @memberof OverflowMenu
 * @desc A demo for OverflowMenu
 */

class OverflowMenuDemo extends React.Component {

    state = {
        message: ""
    };

    _buttons = [
        {
            id: 1,
            label: <span>Option</span>,
            onClick: () => this.setState({ message: "Option Clicked" })
        },
        {
            id: 2,
            label: <span>Option 2</span>,
            onClick: () => this.setState({ message: "Option 2 Clicked" })
        },
        {
            id: 3,
            label: <span>Option 3</span>,
            onClick: () => this.setState({ message: "Option 3 Clicked" })
        },
        {
            id: 4,
            label: <span>Option 4</span>,
            onClick: () => this.setState({ message: "Option 4 Clicked" })
        }
    ];

    render() {
        return (
            <div>
                <Button>Regular Button</Button>
                <OverflowMenu
                    buttons={this._buttons}
                />
                <br />
                <br />
                <p>{this.state.message}</p>
            </div>
        );
    }
}

module.exports = OverflowMenuDemo;
