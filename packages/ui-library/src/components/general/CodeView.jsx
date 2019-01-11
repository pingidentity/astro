"use strict";
import React, { Component } from "react";
import SelectText from "./SelectText";
import PropTypes from "prop-types";
import hljs from "highlight.js";
import Utils from "../../util/Utils";

/**
 * @class CodeView
 * @desc shows error code in a text area
 *
 * @param {string} [data-id="code-view"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [language]
 *          defines the type of language to highlight. auto if none provided.
 * @param {string} [value]
 *          string value shown in the codeview
 * @param {string} [className]
 *      css paramanter
 * @example <Code data=id="code-view" value={markup} className="code-view" />
 */

class Code extends Component {

    static propTypes = {
        "data-id": PropTypes.string,
        language: PropTypes.string,
        value: PropTypes.string.isRequired
    }

    static defaultProps = {
        "data-id": "code-view",
    }

    constructor(props) {
        super(props);
        if (this.props.language && !Utils.isProduction() && !hljs.getLanguage(this.props.language)) {
            console.warn(`${this.props.language} is not a valid option. Auto detecting a language.
            For a list of valid languages visit https://highlight.js.org`);
        }
    }


    render() {
        const code = this.props.language && hljs.getLanguage(this.props.language)
            ? hljs.highlight(this.props.language, this.props.value)
            : hljs.highlightAuto(this.props.value);
        return (
            <SelectText data-id={this.props["data-id"]}>
                <div className="code-view">
                    <pre>
                        <code className="code-view__font">
                            <div dangerouslySetInnerHTML={{ __html: code.value }} />
                        </code>
                    </pre>
                </div>
            </SelectText>
        );
    }
}

module.exports = Code;