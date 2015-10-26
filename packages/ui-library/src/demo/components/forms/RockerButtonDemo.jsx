var React = require('react/addons'),
    RockerButton = require('../../../components/forms/RockerButton.jsx');

var RockerButtonDemo = React.createClass({

    getInitialState: function () {
        return {
            selectedLabel: 'None.'
        };
    },

    _changeSubview: function (selectedLabel) {
        this.setState({
            selectedLabel: selectedLabel
        });
    },

    render: function () {
        
        return (
            /* jslint ignore:start */
            <div>
                <RockerButton onChange={this._changeSubview}
                    labels={['Label One', 'Label Two', 'Label Three', 'Label Four']} />
                
                <div>Selected rocker index = {this.state.selectedLabel}</div>
            </div>
            /* jslint ignore:end */
        );
    }

});

module.exports = RockerButtonDemo;
