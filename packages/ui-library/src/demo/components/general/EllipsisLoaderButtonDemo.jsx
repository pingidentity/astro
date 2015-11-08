
var React = require("react/addons");
var EllipsisLoaderButton = require("./../../../components/general/EllipsisLoaderButton.jsx");


var EllipsisLoaderDemo = React.createClass({

    getInitialState: function () {
        return {
            loading: false
        };
    },

    _toggleLoadingButton1: function () {
        this.setState({
            loading1: !this.state.loading1
        });
    },

    _toggleLoadingButton2: function () {
        this.setState({
            loading2: !this.state.loading2
        });
    },

    render: function () {
        return (
            /* jshint ignore:start */
            <div>
                <EllipsisLoaderButton
                    id="demo-ellipsis-loader-button"
                    loading={this.state.loading1}
                    text="My Ellipsis Button Test Button"
                    onButtonClick={this._toggleLoadingButton1}
                    className="primary"
                />
                <EllipsisLoaderButton
                    id="demo-ellipsis-loader-button"
                    loading={this.state.loading2}
                    text="My Ellipsis Button Test Button"
                    onButtonClick={this._toggleLoadingButton2}
                />
            </div>

            /* jshint ignore:end */
        );
    }
});

module.exports = EllipsisLoaderDemo;
