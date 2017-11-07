var React = require("react"),
    Redux = require("redux"),
    EditViewSectioned = require("../../../templates/edit-view-sectioned");

/**
* @name EditViewSectionedDemo
* @memberof EditViewSectioned
* @desc A demo for EditViewSectioned
*/
class EditViewSectionedDemo extends React.Component {
    componentWillMount() {
        this.actions = Redux.bindActionCreators(EditViewSectioned.Actions, this.props.store.dispatch);
    }

    render() {
        return (<EditViewSectioned {...this.props}
            onInputChange={this.actions.setInput}
            onSave={this.actions.saveForm}
            saving={this.props.inputs.saving}
            showButtonBar={this.props.inputs.dirty}/>);
    }
}

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
EditViewSectionedDemo.Reducer = EditViewSectioned.Reducer;

module.exports = EditViewSectionedDemo;
