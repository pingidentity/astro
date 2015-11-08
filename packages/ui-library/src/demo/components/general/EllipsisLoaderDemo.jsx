var React = require("react/addons");
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
     * @returns {undefined}
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
     * @returns {undefined}
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
                <EllipsisLoader id="demo-ellipsis-loader" loading={this.state.loading} />
            </div>
        );
    }
});

module.exports = EllipsisLoaderDemo;
