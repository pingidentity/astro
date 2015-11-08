var React = require("react/addons");
var SelectText = require("./../../../components/general/SelectText.jsx");

var SelectTextDemo = React.createClass({


    render: function () {
        return (
            <div>
                <SelectText>
                    This text will be selected when clicked
                </SelectText>
                
                <br />
                
                <SelectText>
                    <input type="text" value="The text in this input will be selected when clicked" />
                </SelectText>
            </div>
        );
    }
});

module.exports = SelectTextDemo;