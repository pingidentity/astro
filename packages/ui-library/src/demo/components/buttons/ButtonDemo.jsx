import React, { Component } from "react";
import Button from "../../../components/buttons/Button";

class ButtonsDemo extends Component {
    render() {
        return (
            <div>
                <Button
                    label="Button"
                />
                <Button
                    label="Primary"
                    iconName="primary"
                />
                <Button
                    label="Secondary"
                />
                <Button
                    label="Success"
                    iconName="success"
                />
                <Button
                    label="Cancel"
                    iconName="cancel"
                />
                <Button
                    label="Danger"
                    iconName="danger"
                />
                <Button
                    label="Inline"
                    inline
                />
                <Button
                    label="Inline"
                    inline>
                        <span className="badge">4</span>
                </Button>
                <br /><br />
                <Button
                    label="Add"
                    iconName="add"
                />
                <Button
                    label="Download"
                    iconName="download"
                />
                <Button
                    iconName="edit"
                    inline
                />
                <Button
                    iconName="plus"
                    inline
                />
                <Button
                    iconName="delete"
                    inline
                />
                <Button
                    iconName="prev"
                    inline
                />
                <Button
                    iconName="next"
                    inline
                />
            </div>
        );
    }
}

module.exports = ButtonsDemo;