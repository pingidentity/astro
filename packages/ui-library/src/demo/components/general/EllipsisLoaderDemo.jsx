var React = require("react");
var EllipsisLoader = require("./../../../components/general/EllipsisLoader");

/**
* @name EllipsisLoaderDemo
* @memberof EllipsisLoader
* @desc A demo for EllipsisLoader
*/
class EllipsisLoaderDemo extends React.Component {
    state = {
        loading: false
    };

    /**
     * Set the loading flag to true, then call _finishLoading after 5000 ms.
     *
     * @private
     */
    _load = () => {
        this.setState({
            loading: true
        });
        window.setTimeout(this._finishLoading, 5000);
    };

    /**
     * Set the loading flag to false.
     *
     * @private
     */
    _finishLoading = () => {
        this.setState({
            loading: false
        });
    };

    render() {
        return (
            <div>
                <button type="button" onClick={this._load} >Load</button>
                <EllipsisLoader data-id="demo-ellipsis-loader" loading={this.state.loading} />
            </div>
        );
    }
}

module.exports = EllipsisLoaderDemo;
