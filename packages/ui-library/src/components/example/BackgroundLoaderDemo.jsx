var React = require('react/addons');
var BackgroundLoader = require('./BackgroundLoader.jsx');

var BackgroundLoaderDemo = React.createClass({

    _loadData: function () {
        var remaining = this.state.timeout - this.state.interval;
        this.setState({
            timeout: remaining,
            isLoaded: remaining <= 0
        });
    },

    _showLoading: function () {
        return (
            <span>Data will be available in {this.state.timeout} millis.</span>
        );
    },
    
    getInitialState: function () {
        return {
            interval: 2000,
            timeout: 10000,
            isLoaded: false
        };
    },
    
    render: function () {
        return (
            <div>
                <BackgroundLoader
                        className="background-loader-example-wrapper"
                        interval={this.state.interval}
                        load={this._loadData}
                        loading={this._showLoading}
                        loaded={this.state.isLoaded}>
                    <span>Data has been loaded.</span>
                </BackgroundLoader>
            </div>
        );
    }
});


module.exports = BackgroundLoaderDemo;
