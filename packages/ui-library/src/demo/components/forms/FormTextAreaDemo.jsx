var React = require('react/addons');
var FormTextArea = require('./../../../components/forms/FormTextArea.jsx');

/**
 * A demo for FormTextArea.
 */
var FormTextAreaDemo = React.createClass({

    getInitialState: function () {
        return {
            onChangeFieldValue: ''
        };
    },

    _changeCallback: function (event) {
        this.setState({
            onChangeFieldValue: event.target.value
        });
    },

    render: function () {
        var options = { 1: 'one', 2: 'two', 3: 'three' };

        return (
            <div>
                <div>
                    <FormTextArea labelText="Basic" />
                </div>
                <div>
                    <FormTextArea labelText="Required with placeholder and change callback"
                                  onValueChange={this._changeCallback} placeholder="placeholder" isRequired={true}>
                        <span>{this.state.onChangeFieldValue}</span>
                    </FormTextArea>
                </div>
                <div>
                    <FormTextArea labelText="With maxLength and defined size" options={options}
                                     cols={10} rows={3} maxLength={25} />
                </div>
                <div>
                    <FormTextArea labelText="With defaultValue and undo" defaultValue="Lorem ipsum dolor sit amet"
                                  originalValue="Lorem ipsum dolor sit amet" />
                </div>
                <div>
                    <FormTextArea mode="readonly" labelText="Read-only" value="Can't touch this" />
                </div>
                <div>
                    <FormTextArea mode="readonly" labelText="With error message" errorMessage="error!" />
                </div>
            </div>
        );
    }
});


module.exports = FormTextAreaDemo;
