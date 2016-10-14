var React = require("react");

module.exports = function (props) {
    return (React.createElement(props.tagName, props, props.children));
};
