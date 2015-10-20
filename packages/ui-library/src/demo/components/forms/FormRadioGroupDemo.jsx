var React = require('react/addons'),
    FormRadioGroup = require('../../../components/forms/FormRadioGroup.jsx');

var FormRadioGroupDemo = React.createClass({

    getInitialState: function () {
        return {
            showSpinner: true
        };
    },

    _onChange: function (selectedIndex) {
        this.setState({
            selectedIndex: selectedIndex
        });
    },

    render: function () {
        var radioItems = [
            { id: '1', name: 'Radio 1' },
            { id: '2', name: 'Radio 2' },
            { id: '3', name: 'Radio 3' }
        ];

        return (
            /* jshint ignore:start */
                <div>
                    <FormRadioGroup
                        groupName="aps_condition_type"
                        selected={2}
                        onChange={this._onChange}
                        items={radioItems}
                    />

                    <div>
                        Selected radio index = {this.state.selectedIndex}
                    </div>
                </div>

            /* jshint ignore:end */
        );
    }

});


module.exports = FormRadioGroupDemo;
