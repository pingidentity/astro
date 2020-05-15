import React from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";

module.exports = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.string
    };

    static defaultProps = {
        "data-id": "cell",
        onClick: noop
    };

    render() {
        var label = this.props.value;
        var className = this.props.className + " cell";

        return (
            <div
                data-id={this.props["data-id"]}
                className={className}
                // TODO: Change this to actually fire onClick. This only has to be a mouse down
                // because the Calendar component input expects to blur when an option is clicked
                // and so this needs to fire before that happens.
                onMouseDown={e => this.props.onClick(this.props.value, e)}
            >
                {label}
            </div>
        );
    }
};
