"use strict";
import React, { Component } from "react";
import SelectText from "./SelectText";
import PropTypes from "prop-types";

/**
 * @class CodeView
 * @desc shows error code in a text area
 *
 * @param {string} [data-id="code-view"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      css paramanter
 * @example <Code data=id="code-view" value={markup} className="code-view" />
 */

class Code extends Component {

    static propTypes = {
        "data-id": PropTypes.string
    }

    static defaultProps = {
        "data-id": "code-view"
    }
    render() {
        return (
            <SelectText data-id={this.props["data-id"]}>
                <div className="code-view">
                    <pre>
                        <code className="code-view__font">
                            {this.props.value}
                        </code>
                    </pre>
                </div>
            </SelectText>
        );
    }
}

module.exports = Code;
