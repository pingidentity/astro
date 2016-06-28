var React = require("react");
var EllipsisLoader = require("./../../../components/general/EllipsisLoader.jsx");

var EllipsisLoaderDemo = React.createClass({

    getInitialState: function () {
        return {
            loading: false
        };
    },

    /**
     * Set the loading flag to true, then call _finishLoading after 5000 ms.
     *
     * @private
     */
    _load: function () {
        this.setState({
            loading: true
        });
        window.setTimeout(this._finishLoading, 5000);
    },

    /**
     * Set the loading flag to false.
     *
     * @private
     */
    _finishLoading: function () {
        this.setState({
            loading: false
        });
    },

    render: function () {
        return (
            <div>
                <input type="button" onClick={this._load} value="Load" />
                <EllipsisLoader data-id="demo-ellipsis-loader" loading={this.state.loading} />
            </div>
        );
    }
});

module.exports = EllipsisLoaderDemo;
