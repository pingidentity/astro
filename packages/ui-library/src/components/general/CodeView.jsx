import React, { Component } from "react";
import SelectText from "./SelectText";
import PropTypes from "prop-types";
import hljs from "highlight.js/lib/highlight";
import bash from "highlight.js/lib/languages/bash";
import http from "highlight.js/lib/languages/http";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import python from "highlight.js/lib/languages/python";
import xml from "highlight.js/lib/languages/xml";
import Utils from "../../util/Utils";

// Only importing a subset of languages because hljs is gigantic
// otherwise.
[
    ["bash", bash],
    ["http", http],
    ["java", java],
    ["javascript", javascript],
    ["json", json],
    ["markdown", markdown],
    ["python", python],
    ["xml", xml]
].forEach(([name, lang]) =>
    hljs.registerLanguage(name, lang)
);

/**
 * @class CodeView
 * @desc shows error code in a text area
 *
 * @param {string} [data-id="code-view"]
 *      To define the base "data-id" value for the top-level HTML container.
 * @param {string} [language]
 *      Defines the type of language to highlight. Automatically detected if none provided.
 *      By default, the languages included are Bash, HTTP, Java, JavaScript, JSON, markdown,
 *      Python and XML.
 * @param {string} [value]
 *      The value passed in to display the code. The value will not format the code which means
 *      you will have to format it yourself in the html, or pass value a JSON.stringify().
 * @param {string} [className]
 *      CSS class to set on the top-level HTML container.
 *
 * @example <CodeView value={markup}/>
 *  Basic example of using CodeView.
 * @example <CodeView value={JSON.stringify()}/>
 *  Example using JSON.stringify to format the code.
 * @example <CodeView value={markup} language="JSON" />
 *  Example setting the language prop.
 * @example
 *  // Adding a language that we don't support out of the box.
 *  import hljs from "highlight.js/lib/highlight";
 *  import elixir from "highlight.js/lib/languages/elixir";
 *
 *  hl.js.registerLanguage("elixir", elixir)
 *
 *  <CodeView
 *      language="elixir"
 *      value={`
 *          def foo(term) when is_integer(term), do: term
 *          def foo(term) when is_float(term), do: round(term)
 *      `}
 *  />
 */

export default class Code extends Component {

    static propTypes = {
        "data-id": PropTypes.string,
        language: PropTypes.string,
        value: PropTypes.string.isRequired
    }

    static defaultProps = {
        "data-id": "code-view",
    }

    componentDidMount() {
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
