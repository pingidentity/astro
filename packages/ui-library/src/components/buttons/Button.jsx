import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import EllipsisLoader from "../general/EllipsisLoader";

/**
 * @class Button
 * @desc button component
 *
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @param {string} [data-id="button"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [iconName]
 *     The name and CSS of the icon
 * @param {function} [onClick]
 *     Click handler
 * @param {string} [label]
 *     Html name of the button
 * @param {boolean} [disabled=false]
 *     Button will not function when true
 * @param {string} [inline]
 *  @param {boolean} loading
 *       While true, loading animation will be shown
 * @example
 *  <Button
 *      label="Button"
 *      iconName="Danger">
 *  </Button>
 *
 */



class Button extends Component {
    static propTypes = {
        "data-id": PropTypes.string,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        className: PropTypes.string,
        label: PropTypes.string,
        iconName: PropTypes.string,
        inline: PropTypes.bool,
        loading: PropTypes.bool
    };

    static defaultProps = {
        "data-id": "button",
        disabled: false,
        loading: false
    };


    render() {
        const classes = classnames(this.props.className, this.props.iconName, "ellipsis-loader-button",{
            inline: this.props.inline,
            loading: this.props.loading,
            disabled: this.props.disabled
        });

        return(
            <button
                className = {classes}
                data-id={this.props["data-id"]}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
                >
                {this.props.label}
                {this.props.children}
                <EllipsisLoader loading={this.props.loading}/>
            </button>
        );
    }
}


module.exports = Button;