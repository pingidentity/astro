var React = require("react"),
    FormCheckboxList = require("../../../components/forms/FormCheckboxList");

/**
* @name FormCheckboxListDemo
* @memberof FormCheckboxList
* @desc A demo for FormCheckboxList
*/
class FormCheckboxListDemo extends React.Component {
    state = {
        hideUnchecked: false,
        queryString: "",
        selectedIds: [1, 3]
    };

    _handleValueChange = (selectedIds) => {
        this.setState({
            selectedIds: selectedIds
        });
    };

    _handleQueryChange = (queryString) => {
        this.setState({
            queryString: queryString
        });
    };

    _handleVisibilityChange = (hideUnchecked) => {
        this.setState({
            hideUnchecked: !hideUnchecked
        });
    };

    render() {
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
}


module.exports = FormCheckboxListDemo;
