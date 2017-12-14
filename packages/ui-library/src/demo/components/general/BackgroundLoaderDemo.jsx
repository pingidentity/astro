var React = require("react");
var BackgroundLoader = require("./../../../components/general/BackgroundLoader");

/**
* @name BackgroundLoaderDemo
* @memberof BackgroundLoader
* @desc A demo for BackgroundLoader
*/
class BackgroundLoaderDemo extends React.Component {
    state = {
        interval: 2000,
        timeout: 10000,
        isLoaded: false
    };

    _loadData = () => {
        var remaining = this.state.timeout - this.state.interval;
        this.setState({
            timeout: remaining,
            isLoaded: remaining <= 0
        });
    };

    _showLoading = () => {
        return (
            <span>Data will be available in {this.state.timeout} millis.</span>
        );
    };

    render() {
        return (
            <div>
                <BackgroundLoader
                        interval={this.state.interval}
                        load={this._loadData}
                        loading={this._showLoading}
                        loaded={this.state.isLoaded}>
                    <span>Data has been loaded.</span>
                </BackgroundLoader>
            </div>
        );
    }
}


module.exports = BackgroundLoaderDemo;
