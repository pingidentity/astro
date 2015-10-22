var React = require('react/addons'),
    Spinner = require('../../../components/general/Spinner.jsx');


var SpinnerDemo = React.createClass({

    getInitialState: function () {
        return {
            showSpinner: true
        };
    },

    _toggleSpinner: function () {
        this.setState({
            showSpinner: !this.state.showSpinner
        });
    },

    render: function () {
        return (
            /* jslint ignore:start */
            <div>
                <Spinner
                    show={this.state.showSpinner}
                    defaultText="Loading...">

                    <div className="spinner-content">
                        Spinner content here.
                    </div>
                </Spinner>

                <br/><br/><br/>

                <a onClick={this._toggleSpinner}>
                    Toggle Spinner
                </a>
            </div>
            /* jslint ignore:end */
        );
    }

});


module.exports = SpinnerDemo;
