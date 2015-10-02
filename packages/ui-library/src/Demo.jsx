var React = require('react/addons');
var BackgroundLoaderDemo = require('components/example/BackgroundLoaderDemo.jsx');

var Demo = React.createClass({
    
    render: function () {
        return (
            <div>
                <BackgroundLoaderDemo />
            </div>
        );
    }
});

React.render(<Demo />, document.getElementById('demo'));
