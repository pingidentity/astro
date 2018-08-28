var React = require("react"),
    classnames = require("classnames"),
    marked = require("marked"),
    Markup = require("./Markup"),
    PageHeader = require("../../components/general/PageHeader"),
    _ = require("underscore");

import StretchContent from "ui-library/lib/components/layout/StretchContent";

class DemoItem extends React.Component {
    static propTypes = {
    };

    _handleChange = () => {
        this.setState({
            store: this.props.store.getState()
        });
    };

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
            demoCodePathUrl,
            description,
            fullscreen,
            jsdocUrl,
            type
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
            props = _.extend({}, this.props, this.state.store),
            containerClassName = classnames("section", { fullscreen }),
            headerClassName = "doc";

        const OutputComponent = fullscreen ? StretchContent : "div";

        return (
            <StretchContent className={containerClassName}>
                <div className="documentation">

                    <div className={headerClassName}>
                        <div className="clearfix">
                            <PageHeader data-id="component-title"
                                    title={this.props.label}
                                    subtitle={this.props.importPath} />
                            {docLinks}
                        </div>
                    </div>

                </div>
                <StretchContent className="section-content">
                    <div className="demo-description"
                         dangerouslySetInnerHTML={{ __html: markdown }}></div>

                    <OutputComponent className="output clearfix">
                        {React.createElement(type, props)}
                    </OutputComponent>

                    {!fullscreen && <Markup content={this.props.code} />}
                </StretchContent>
            </StretchContent>
        );
    }
}

module.exports = DemoItem;
