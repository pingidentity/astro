var React = require('react/addons');
var BackgroundLoaderDemo = require('../components/example/BackgroundLoaderDemo.jsx');
var CacheDemo = require('./core/CacheDemo.jsx');

var Demo = React.createClass({
    
    render: function () {
        return (
            <div>
                <BackgroundLoaderDemo />
                <CacheDemo />
            </div>
        );
    }
});

React.render(<Demo />, document.getElementById('demo'));
