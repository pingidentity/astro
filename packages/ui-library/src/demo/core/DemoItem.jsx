import React from "react";
import classnames from "classnames";
import marked from "marked";
import _ from "underscore";
import Markup from "./Markup";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import StretchContent from "ui-library/lib/components/layout/StretchContent";
import InlineMessage from "ui-library/lib/components/general/InlineMessage";
import CheckboxGroup from "ui-library/lib/components/forms/CheckboxGroup";
import FormLabel from "ui-library/lib/components/forms/FormLabel";

const flagHelp = (
    `Use the flags prop on your component to specify custom behaviors.
    Example: flags={["new-behavior", "something-else"]}`
);

class DemoItem extends React.Component {
    state = {
        flags: [],
    };

    static propTypes = {
    };

    _handleChange = () => {
        this.setState({
            store: this.props.store.getState()
        });
    };

    _handleUpdateFlags = flags => this.setState({ flags });

    _renderMessage= ({ message, type, use } = {}) => {
        if (!type) {
            return null;
        } else if (message) {
            return (
                <InlineMessage type={InlineMessage.MessageTypes.WARNING}>
                    {message}
                </InlineMessage>
            );
        } else if (type === "design-deprecated") {
            return (
                <InlineMessage type={InlineMessage.MessageTypes.WARNING}>
                    This component is <strong>design-deprecated</strong>.
                    It should not appear in new designs,
                    and when possible, we should replace existing uses of it.
                    {use && ` Please use ${use} instead.`}
                </InlineMessage>
            );
        }
    }

    /*
     * When a new demo is selected, inspect the properties of the demo and determine if it's requesting an
     * isolated store.  If so, connect the demo class to the store before rendering.
     *
     * Also, ReactRedux.connect does not work reliably here (probably because of the multiple stores), so
     * instead we just subscribe directly to the store and use the updates to re-render
     */
    componentWillReceiveProps({ type, store }) {
        if (this.props.type !== type) {
            if (this.unsubscribe) {
                this.unsubscribe();
                this.unsubscribe = null;
            }

            if (type.Reducer) {
                this.unsubscribe = store.subscribe(this._handleChange);
                this.setState({ store: store.getState() });
            }

            this.setState({ selectedSource: 0 }); // Reset default source to demo for each new demo change
        }
    }

    render() {
        const {
            contentPage,
            demoCodePathUrl,
            description,
            fullscreen,
            jsdocUrl,
            type,
            status,
            flags,
        } = this.props;

        // This is very important because Redux updates are not instant.  When replacing the demoItemReducer,
        // The new state will take some type to propagate.  We dont want to try and render without an initial
        // state being injected into the store.  Demo actions are computed inside the Demo.jsx so they are
        // available instantly after switching to a new demo.
        if (!type || (this.props.demoActions && !this.props.demoProps)) {
            return null;
        }

        // Some demo items do not have documentation (e.g. Tutorial items)
        const docLinks = (<div className="doc-links">{[
            jsdocUrl && (
                <a key="js-doc" className="toggle" href={jsdocUrl} target="_blank">Documentation</a>
            ),
            this.props.codePathUrl && (
                <a key="code-source" className="toggle" href={this.props.codePathUrl} target="_blank">Source</a>
            ),
            demoCodePathUrl && (
                <a key="demo-source" className="toggle" href={demoCodePathUrl} target="_blank">Demo</a>
            ),
        ]}</div>);

        const markdown = description && marked(description),
            props = _.extend({}, this.props, this.state.store, { flags: this.state.flags }),
            containerClassName = classnames({ "fullscreen": (fullscreen || contentPage) }),
            headerClassName = "doc";

        const OutputComponent = (fullscreen || contentPage) ? StretchContent : "div";

        return (
            <StretchContent className={containerClassName}>
                <div className="documentation">

                    <div className={headerClassName}>
                        { !fullscreen &&
                            <PageHeader data-id="component-title"
                                title={this.props.label}
                                subtitle={this.props.importPath}
                            />
                        }
                        {docLinks}
                    </div>

                </div>
                <StretchContent className="section-content">
                    {this._renderMessage(status)}
                    <div className="demo-description"
                        dangerouslySetInnerHTML={{ __html: markdown }}></div>

                    <OutputComponent className="output">
                        {React.createElement(type, props)}

                        {flags &&
                            <div>
                                <hr className="hr" />
                                <FormLabel value="Flags" hint={flagHelp} />
                                <CheckboxGroup
                                    options={flags.map(flag => ({ value: flag, label: flag }))}
                                    values={this.state.flags}
                                    onValueChange={this._handleUpdateFlags}
                                />
                            </div>
                        }
                    </OutputComponent>

                    {!(fullscreen || contentPage) && <Markup content={this.props.code} />}
                </StretchContent>
            </StretchContent>
        );
    }
}

module.exports = DemoItem;
