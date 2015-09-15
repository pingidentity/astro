var React = require('react/addons');
var BackgroundLoader = require('./main');

require('./css/example.css');

var Main = React.createClass({

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
                        className="loader-wrapper"
                        interval={this.state.interval}
                        load={this._loadData}
                        loading={this._showLoading}
                        loaded={this.state.isLoaded}>
                    <span>Data has been loaded.</span>
                </BackgroundLoader>
                <img src={require('images/bg3.png')} />
            </div>
        );
    }
});

React.render(
        <Main />,
        document.getElementById('content'));
