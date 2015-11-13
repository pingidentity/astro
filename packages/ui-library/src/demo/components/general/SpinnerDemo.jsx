var React = require("react/addons"),
    Spinner = require("../../../components/general/Spinner.jsx");


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
                <p>
                    <Spinner
                        show={this.state.showSpinner}
                        defaultText="Loading...">
                        <div className="spinner-content">
                            Content shown after spinner/loading is complete goes here.
                        </div>
                    </Spinner>
                </p>
                <a onClick={this._toggleSpinner}>
                    Toggle Spinner
                </a>
            </div>
            /* jslint ignore:end */
        );
    }

});


module.exports = SpinnerDemo;
