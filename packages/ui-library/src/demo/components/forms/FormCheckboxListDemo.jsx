var React = require("react"),
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
            { name: "Checkbox 4", id: 4, group: "Group B" },
            { name: "Checkbox 1", id: 1, group: "Group A" },
            { name: "Checkbox 3", id: 3, group: "Group B" },
            { name: "Checkbox 2", id: 2, group: "Group A" },
            { name: "Checkbox 5", id: 5, group: "Group B" }
        ];

        return (
                <div>
                    <FormCheckboxList
                        controlled={true}
                        hideUnchecked={this.state.hideUnchecked}
                        items={checkboxItems}
                        labelSelectAll={count => `Select ${count} items`}
                        labelDeselectAll={count => `Deselect ${count} items`}
                        labelHideUnselected="Hide Unselected"
                        labelSearchPlaceholder="Search"
                        onSelectionChange={this._onSelectionChange}
                        onQueryChange={this._onQueryChange}
                        onVisibilityChange={this._onVisibilityChange}
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
