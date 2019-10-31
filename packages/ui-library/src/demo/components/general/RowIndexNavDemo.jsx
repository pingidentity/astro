import React from "react";
import ExpandableRow from "../../../components/rows/ExpandableRow";
import RowIndexNav from "../../../components/general/RowIndexNav";
import InputRow from "../../../components/layout/InputRow";
import Button from "../../../components/buttons/Button";

var createReactClass = require("create-react-class");

/**
* @name RowIndexNavDemo
* @memberof RowIndexNav
* @desc A demo illustrating the layout and basic functionalty of the RowIndexNav (alphabet navigation) component
*/
var RowIndexNavDemo = createReactClass({
    displayName: "RowIndexNavDemo",
    activeIndexes: "ABCEFGHIJLMNOPSTUVX".split(""),

    _handleOnClick: function (index) {
        this.setState({
            selectedIndex: index
        });
    },

    _selectNewIndex: function () {
        var newIndexPos = Math.round(Math.random() * (this.activeIndexes.length - 1));

        this.setState({
            selectedIndex: this.activeIndexes[newIndexPos]
        });
    },

    getInitialState: function () {
        return {
            selectedIndex: this.activeIndexes[0]
        };
    },

    render: function () {
        return (
            <div>
                <InputRow>
                    <Button
                        onClick={this._selectNewIndex}
                        inline
                    >
                        Randomly Select New Index
                    </Button> - illustrates autoscroll when selection is out of view.
                </InputRow>
                <div className="instructions">
                    Note that the rows below are not tied in anyway to the Index Nav on the right. The are present
                    only to show how the layout of the nav is acheived.
                </div>
                <ExpandableRow.SimpleWrapper>
                    <RowIndexNav
                        activeIndexes={this.activeIndexes}
                        onClick={this._handleOnClick}
                        selectedIndex={this.state.selectedIndex}
                    />
                    <ExpandableRow title="Expandable Row" />
                    <ExpandableRow title="Expandable Row" />
                    <ExpandableRow title="Expandable Row" />
                    <ExpandableRow title="Expandable Row" />
                    <ExpandableRow title="Expandable Row" />
                </ExpandableRow.SimpleWrapper>
            </div>
        );
    },
});

module.exports = RowIndexNavDemo;
