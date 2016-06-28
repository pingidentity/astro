var React = require("react");
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
            <div>
                <EllipsisLoaderButton
                    data-id="demo-ellipsis-loader-button"
                    loading={this.state.loading1}
                    text="My Ellipsis Button Test Button"
                    onClick={this._toggleLoadingButton1}
                    className="primary"
                />
                <EllipsisLoaderButton
                    data-id="demo-ellipsis-loader-button"
                    loading={this.state.loading2}
                    text="My Ellipsis Button Test Button"
                    onClick={this._toggleLoadingButton2}
                />
            </div>
        );
    }
});

module.exports = EllipsisLoaderDemo;
