var React = require("react"),
    EditViewSectioned = require("../../../templates/edit-view-sectioned");

var EditViewSectionedDemo = React.createClass({

    _handleInputChange: function (name, value) {
        this.props.demoActions.setInput(name, value);
    },

    _handleFormSave: function () {
        this.props.demoActions.saveForm();
    },

    render: function () {
        return (<EditViewSectioned {...this.props.demoProps}
            onInputChange={this._handleInputChange}
            onSave={this._handleFormSave} />);
    }
});

/*
 * Expose the Reducer and the Actions for the Demo app to inject
 */
EditViewSectionedDemo.Reducer = EditViewSectioned.Reducer;
EditViewSectionedDemo.Actions = EditViewSectioned.Actions;

module.exports = EditViewSectionedDemo;
