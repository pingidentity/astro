var React = require("react");

/*
* In order to load different views programmatically we need this wrapper component that creates the corresponding
* view component based on the content type passed in and passes all props down
*/
class AppContent extends React.Component {
    render () {
        return (
            <div id="content">
                {this.props.content && React.createElement(this.props.content, this.props)}
            </div>
        );
    }
}

module.exports = AppContent;