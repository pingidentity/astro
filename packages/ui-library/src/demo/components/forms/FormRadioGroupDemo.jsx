var React = require("react"),
    FormRadioGroup = require("../../../components/forms/FormRadioGroup.jsx");

/**
* @name FormRadioGroupDemo
* @memberof FormRadioGroup
* @desc A demo for FormRadioGroup
*/
class FormRadioGroupDemo extends React.Component {
    constructor(props, context) {
        super(props, context);
        var initialState = { showSpinner: true };

        for (var i=1; i<=this._numDemos; i+=1) {
            initialState["selectedId" + i] = i;
            this["_handleChange" + i] = this._handleChange.bind(this, i);
        }

        this.state = initialState;
    }

    _numDemos = 4;

    _handleChange = (i, value) => {
        var newState = {};
        newState["selectedId" + i] = value;
        this.setState(newState);
    };

    render() {
        var radioItems = [
            { id: "1", name: "Radio 1" },
            { id: "2", name: "Radio 2", helpHintText: "Radio 2 help hint" },
            { id: "3", name: "Radio 3", disabled: true }
        ];

        var radioItemsWithHidden = [
            { id: "1", name: "Radio A" },
            { id: "2", name: "Radio B" },
            { id: "3", name: "Radio C" },
            { id: "4", name: "Radio D" }
        ];
        radioItemsWithHidden[Math.round(Math.random() * 3)].hidden = true;

        return (
            <div>
                <div className="input-row">
                    <label className="detached">Horizonal Alignment</label>
                    <FormRadioGroup
                        groupName="horizontal-group"
                        selected={this.state.selectedId1}
                        onValueChange={this._handleChange1}
                        items={radioItems}
                        stacked={false}
                    />
                </div>

                <div className="input-row">
                    selected id = {this.state.selectedId1}
                </div>

                <div className="input-row">
                    <label className="detached">Stacked/Vertical Alignment</label>
                    <FormRadioGroup
                        groupName="stacked-group"
                        selected={this.state.selectedId2}
                        onValueChange={this._handleChange2}
                        items={radioItems}
                    />
                </div>

                <div className="input-row">
                    selected id = {this.state.selectedId2}
                </div>

                <div className="input-row">
                    <label className="detached">Disabled Radio Group</label>
                    <FormRadioGroup
                        groupName="disabled-stacked-group"
                        selected={this.state.selectedId3}
                        onValueChange={this._handleChange3}
                        items={radioItems}
                        disabled={true}
                    />
                </div>

                <div className="input-row">
                    <label className="detached">Radio Group With Random Hidden</label>
                    <FormRadioGroup
                        groupName="hidden-stacked-group"
                        selected={this.state.selectedId4}
                        onValueChange={this._handleChange4}
                        items={radioItemsWithHidden}
                    />
                </div>

            </div>
        );
    }
}


module.exports = FormRadioGroupDemo;
