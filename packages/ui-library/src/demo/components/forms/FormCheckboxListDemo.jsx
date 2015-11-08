var React = require("react/addons"),
    FormCheckboxList = require("../../../components/forms/FormCheckboxList.jsx");

var FormCheckboxListDemo = React.createClass({

    getInitialState: function () {
        return {
            hideUnchecked: false,
            queryString: "",
            selectedIds: [1, 3]
        };
    },

    _onSelectionChange: function (selectedIds) {
        this.setState({
            selectedIds: selectedIds
        });
    },

    _onQueryChange: function (queryString) {
        this.setState({
            queryString: queryString
        });
    },

    _onVisibilityChange: function (hideUnchecked) {
        this.setState({
            hideUnchecked: !hideUnchecked
        });
    },

    render: function () {
        var checkboxItems = [
            { name: "Checkbox 1", id: 1, group: "Group A" },
            { name: "Checkbox 2", id: 2, group: "Group A" },
            { name: "Checkbox 3", id: 3, group: "Group B" },
            { name: "Checkbox 4", id: 4, group: "Group B" },
            { name: "Checkbox 5", id: 5, group: "Group B" }
        ];

        return (
            /* jshint ignore:start */
                <div>
                    <FormCheckboxList
                        groupName="aps_condition_type"
                        hideUnchecked={this.state.hideUnchecked}
                        items={checkboxItems}
                        labelSelectAll="Select All"
                        labelDeselectAll="Deselect All"
                        labelHideUnselected="Hide Unselected"
                        onSelectionChange={this._onSelectionChange}
                        onQueryChange={this._onQueryChange}
                        onVisibilityChange={this._onVisibilityChange}
                        queryString={this.state.queryString}
                        selected={this.state.selectedIds}
                    />
                    <div>
                        Selected Checkbox IDs = {this.state.selectedIds}
                    </div>
                </div>

            /* jshint ignore:end */
        );
    }

});


module.exports = FormCheckboxListDemo;
