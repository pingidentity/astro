var React = require("react"),
    FormCheckboxList = require("../../../components/forms/FormCheckboxList.jsx");

/**
* @name FormCheckboxListDemo
* @memberof FormCheckboxList
* @desc A demo for FormCheckboxList
*/
var FormCheckboxListDemo = React.createClass({

    getInitialState: function () {
        return {
            hideUnchecked: false,
            queryString: "",
            selectedIds: [1, 3]
        };
    },

    _handleValueChange: function (selectedIds) {
        this.setState({
            selectedIds: selectedIds
        });
    },

    _handleQueryChange: function (queryString) {
        this.setState({
            queryString: queryString
        });
    },

    _handleVisibilityChange: function (hideUnchecked) {
        this.setState({
            hideUnchecked: !hideUnchecked
        });
    },

    render: function () {
        var checkboxItems = [
            { name: "Checkbox 4", id: 4, group: "Group B" },
            { name: "Checkbox 1", id: 1, group: "Group A" },
            { name: "Checkbox 3", id: 3, group: "Group B" },
            { name: "Checkbox 2", id: 2, group: "Group A" },
            { name: "Checkbox 5", id: 5, group: "Group B" }
        ];

        return (
                <div>
                    <FormCheckboxList
                        stateless={true}
                        hideUnchecked={this.state.hideUnchecked}
                        items={checkboxItems}
                        onGetSelectAllLabel={function (count) { return "Select " + count + " items"; }}
                        onGetDeselectAllLabel={function (count) { return "Deselect " + count + " items"; }}
                        labelHideUnselected="Hide Unselected"
                        labelSearchPlaceholder="Search"
                        onValueChange={this._handleValueChange}
                        onQueryChange={this._handleQueryChange}
                        onVisibilityChange={this._handleVisibilityChange}
                        queryString={this.state.queryString}
                        selected={this.state.selectedIds}
                    />
                    <div>
                        Selected Checkbox IDs = {this.state.selectedIds.join()}
                    </div>
                </div>
        );
    }

});


module.exports = FormCheckboxListDemo;
