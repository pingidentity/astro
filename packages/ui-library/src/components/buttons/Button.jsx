import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import EllipsisLoader from "../general/EllipsisLoader";
import _ from "underscore";

/**
 * @class Button
 * @desc button component
 *
 * @param {string} [type]
 *      css class applied to html
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
 *      type="Danger">
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
        loading: PropTypes.bool,
        type: PropTypes.string,
        submit: PropTypes.bool,
        href: PropTypes.string,
        target: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "button",
        disabled: false,
        loading: false,
        submit: false,
    };

    _dontFocus = event => event.preventDefault();

    render() {
        const classes = classnames("button", this.props.className, this.props.iconName,{
            inline: this.props.inline,
            loading: this.props.loading,
            disabled: this.props.disabled,
            "ellipsis-loader-button": this.props.loading,
            [this.props.type]: _.indexOf(["primary", "success", "cancel", "danger"], this.props.type) !== -1
        });

        const TagName = this.props.href ? "a" : "button";

        return (
            <TagName
                className = {classes}
                data-id={this.props["data-id"]}
                onMouseDown={this._dontFocus}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
                type={this.props.submit ? "submit" : "button"}
                href={this.props.href}
                target={this.props.target}
                >
                {this.props.label}
                {this.props.children}
                <EllipsisLoader loading={this.props.loading}/>
            </TagName>
        );
    }
}


module.exports = Button;
