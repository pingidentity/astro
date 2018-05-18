var React = require("react"),
    classnames = require("classnames"),
    marked = require("marked"),
    Markup = require("./Markup"),
    RockerButton = require("../../components/forms/RockerButton"),
    PageHeader = require("../../components/general/PageHeader"),
    If = require("../../components/general/If"),
    _ = require("underscore");

class DemoItem extends React.Component {
    static propTypes = {
    };

    state = {
        open: false,
        source: false,
        selectedSource: 0
    };

    _toggle = () => {
        this.setState({
            open: !this.state.open,
            source: false
        });
    };

    _toggleSource = () => {
        this.setState({
            open: !this.state.open,
            source: true
        });
    };

    _handleChange = () => {
        this.setState({
            store: this.props.store.getState()
        });
    };

    _handleSelectedSourceValueChange = (selectedSource) => {
        this.setState({ selectedSource: selectedSource.index });
    };

    _getConditionalSourceFrame = (url, test) => {
        return (
            <If key={url} test={this.state.selectedSource === test}>
                <iframe src={url} />
            </If>
        );
    };

    _getComponentSourceFrame = () => {
        let sourceClassName = classnames("js-source", { hidden: !this.state.source }),
            sourceLabels = [],
            sourceFrames = [],
            frameIndex = 0;

        // Some demos may not have demo source (e.g. tutorials)
        if (this.props.demoCodePathUrl) {
            sourceLabels.push("Demo");
            sourceFrames.push(this._getConditionalSourceFrame(this.props.demoCodePathUrl, frameIndex));
            frameIndex = frameIndex + 1;
        }

        if (Array.isArray(this.props.codePathUrl)) {
            this.props.codePathUrl.forEach(function (url) {
                sourceLabels.push("Component_" + url.match("[^_]+\\.jsx.html$")[0].replace(".jsx.html", ""));
                sourceFrames.push(this._getConditionalSourceFrame(url, frameIndex));
                frameIndex = frameIndex + 1;
            }.bind(this));
        } else {
            // Some demos may be demo only, without component source code (e.g. input widths)
            if (this.props.codePathUrl) {
                sourceLabels.push("Component");
                sourceFrames.push(this._getConditionalSourceFrame(this.props.codePathUrl, frameIndex));
                frameIndex = frameIndex + 1;
            }
        }

        return (
            <div className={sourceClassName}>
                <RockerButton className="source-select" labels={sourceLabels}
                        stateless={true}
                        selectedIndex={this.state.selectedSource}
                        onValueChange={this._handleSelectedSourceValueChange} />
                {sourceFrames}
            </div>
        );
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
        const docToggle = jsdocUrl &&
            <span className="toggle" onClick={this._toggle} />;

        const srcToggle = (this.props.codePathUrl || demoCodePathUrl) &&
            <span className="toggle-source" onClick={this._toggleSource} />;

        const markdown = description && marked(description),
            props = _.extend({}, this.props, this.state.store),
            containerClassName = classnames("section", { fullscreen }),
            headerClassName = classnames("doc", {
                open: this.state.open && (demoCodePathUrl || this.state.codePathUrl),
                source: this.state.source
            }),
            docsClassName = classnames("js-doc", { hidden: this.state.source });

        return (
            <div className={containerClassName}>
                <div className="documentation">

                    <div className={headerClassName}>
                        <div className="clearfix">
                            <PageHeader data-id="component-title"
                                    title={this.props.label}
                                    subtitle={this.props.importPath} />
                            {docToggle}
                            {srcToggle}
                        </div>
                        <iframe src={this.props.jsdocUrl} className={docsClassName} />
                        {this._getComponentSourceFrame()}
                    </div>

                </div>
                <div className="section-content">
                    <div className="demo-description"
                         dangerouslySetInnerHTML={{ __html: markdown }}></div>

                    <div className="output clearfix">
                        {React.createElement(type, props)}
                    </div>

                    {!fullscreen && <Markup content={this.props.code} />}
                </div>
            </div>
        );
    }
}

module.exports = DemoItem;
