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
import HR from "ui-library/lib/components/general/HR";
import FlagsProvider from "ui-library/lib/components/utils/FlagsProvider";
import FormattedContent from "ui-library/lib/components/general/FormattedContent";
import Stack from "ui-library/lib/components/layout/Stack";

const flagHelp = (
    `Use the flags prop on your component to specify custom behaviors.
    Example: flags={["new-behavior", "something-else"]}`
);

class DemoItem extends React.Component {
    static propTypes = {
    };

    _handleChange = () => {
        this.setState({
            store: this.props.store.getState()
        });
    };

    _handleUpdateFlags = flags => this.setState({ flags });

    _renderMessage= ({ message, type, use, dependencies } = {}) => {
        if (!type) {
            return null;
        } else if (type === "dependencies") {
            return (
                <InlineMessage type={InlineMessage.MessageTypes.NOTICE}>
                    {
                        dependencies.includes("context") &&
                        <div>This component uses the latest context API and requires <strong>React 16.3</strong>.</div>
                    }
                </InlineMessage>
            );
        } else if (message || type !== "design-deprecated") {
            return (
                <InlineMessage type={type === "version" ? InlineMessage.MessageTypes.WARNING : type }>
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

    componentDidMount() {
        // Backstop needs an event to let it know when to take screenshots
        console.log("backstop ready");
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
        } = this.props;
        const flags = this.props.flags ? [...this.props.flags, "v4"] : null;

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
            containerClassName = classnames("demo-item", { "fullscreen": (fullscreen || contentPage) }),
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
                    {flags ? this._renderMessage(
                        {
                            message: (
                                /* eslint-disable max-len */
                                <FormattedContent>
                                    <Stack gap={"XS"}>
                                        <h3>This component has new behaviors that will become
                                             standard in a future release.
                                        </h3>
                                        <p>Opt-in now by using the "flags" prop or the&nbsp;
                                            <a href="/index.html#/?selectedSection=undefined&selectedNode=FlagsProvider&root=Components">
                                            FlagsProvider
                                            </a> component.
                                        </p>
                                        <p>V4: New apps and pages should be wrapped in&nbsp;
                                            <code>
                                                {`<FlagsProvider flags={["v4"]}></FlagsProvider>`}
                                            </code> to future-proof your code.
                                        </p>
                                    </Stack>
                                </FormattedContent>
                                /* eslint-enable max-len */
                            ),
                            type: InlineMessage.MessageTypes.NOTICE
                        }
                    ) : null}
                    <div className="demo-description"
                        dangerouslySetInnerHTML={{ __html: markdown }}></div>

                    <OutputComponent
                        className="output"
                        key={this.state.flags ? this.state.flags.join("_") : "demo"}
                    >
                        {flags &&
                            <div>
                                <FormLabel value="Flags" hint={flagHelp} />
                                <CheckboxGroup
                                    inline
                                    options={flags.map(flag => ({ value: flag, label: flag }))}
                                    values={this.state.flags}
                                    onValueChange={this._handleUpdateFlags}
                                />
                                <HR />
                            </div>
                        }
                        <FlagsProvider flags={_.intersection(this.state.flags, flags)}>
                            {React.createElement(type, props)}
                        </FlagsProvider>
                    </OutputComponent>

                    {!(fullscreen || contentPage) && <Markup content={this.props.code} />}
                </StretchContent>
            </StretchContent>
        );
    }
}

module.exports = DemoItem;
