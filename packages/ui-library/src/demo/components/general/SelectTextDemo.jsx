var React = require("react");
var SelectText = require("./../../../components/general/SelectText.jsx");
var FormTextField = require("./../../../components/forms/FormTextField.jsx");

var SelectTextDemo = React.createClass({
    render: function () {
        return (
            <div>
                <div className="input-row">
                    <SelectText>
                        This text will be selected when clicked
                    </SelectText>
                </div>
                <div className="input-row">
                    <SelectText>
                        <FormTextField
                            mode="READ_ONLY"
                            value="The text in this input will be selected when clicked"
                        />
                    </SelectText>
                </div>
            </div>
        );
    }
});

module.exports = SelectTextDemo;
