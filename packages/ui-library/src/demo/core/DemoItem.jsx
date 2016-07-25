var React = require("react"),
    classnames = require("classnames"),
    marked = require("marked"),
    Markup = require("./Markup.jsx"),
    _ = require("underscore");

var DemoItem = React.createClass({
    propTypes: {
    },

    getInitialState: function () {
        return {
            open: false,
            source: false,
            demoSource: false
        };
    },

    _toggle: function () {
        this.setState({
            open: !this.state.open,
            source: false,
            demoSource: false
        });
    },
    
    _toggleSource: function () {
        this.setState({
            open: !this.state.open,
            source: true,
            demoSource: false
        });
    },

    _toggleDemoSource: function () {
        this.setState({
            open: !this.state.open,
            source: false,
            demoSource: true
        });
    },

    _handleChange: function () {
        this.setState({
            store: this.props.store.getState()
        });
    },

    _getComponentSourceFrame: function () {
        var sourceClassName = classnames("js-source", { hidden: !this.state.source || this.state.demoSource });

        if (Array.isArray(this.props.codePathUrl)) {
            return (
                <div className={sourceClassName}>
                    {
                        this.props.codePathUrl.map(function (url, index) {
                            var title = url.match("[^_]+\\.jsx.html$")[0].replace(".jsx.html", "");

                            if (index !== 0) {
                                return <a key={title} href={url} target="_blank">{title}</a>;
                            }
                        })
                    }

                    <iframe src={this.props.codePathUrl[0]} />
                </div>
            );
        } else {
            return <iframe src={this.props.codePathUrl} className={sourceClassName} />;
        }
    },

    /*
     * When a new demo is selected, inspect the properties of the demo and determine if it's requesting an
     * isolated store.  If so, connect the demo class to the store before rendering.
     *
     * Also, ReactRedux.connect does not work reliably here (probably because of the multiple stores), so
     * instead we just subscribe directly to the store and use the updates to re-render
     */
    componentWillReceiveProps: function (newProps) {
        if (this.props.type !== newProps.type) {
            if (this.unsubscribe) {
                this.unsubscribe();
                this.unsubscribe = null;
            }

            if (newProps.type.Reducer) {
                this.unsubscribe = newProps.store.subscribe(this._handleChange);
                this.setState({ store: newProps.store.getState() });
            }
        }
    },

    render: function () {
        // This is very important because Redux updates are not instant.  When replacing the demoItemReducer,
        // The new state will take some type to propagate.  We dont want to try and render without an initial
        // state being injected into the store.  Demo actions are computed inside the Demo.jsx so they are
        // available instantly after switching to a new demo.
        if (!this.props.type || (this.props.demoActions && !this.props.demoProps)) {
            return null;
        }

        // Some demo items do not have documentation (e.g. Tutorial items)
        var docToggle,
            srcToggle,
            demoSrcToggle;
        if (this.props.jsdocUrl) {
            docToggle = <span className="toggle" onClick={this._toggle} />;
        }
        if (this.props.codePathUrl) {
            srcToggle = <span className="toggle-source" onClick={this._toggleSource} />;
        }
        if (this.props.demoCodePathUrl) {
            demoSrcToggle = <span className="toggle-demo-source" onClick={this._toggleDemoSource} />;
        }
        
        var markdown = this.props.description && marked(this.props.description),
            props = _.extend({}, this.props, this.state.store),
            containerClassName = classnames("section", { fullscreen: this.props.fullscreen }),
            headerClassName = classnames("doc", {
                open: this.state.open,
                source: this.state.source,
                "demo-source": this.state.demoSource
            }),
            docsClassName = classnames("js-doc", { hidden: this.state.source || this.state.demoSource }),
            demoSourceClassname = classnames("js-demo-source", { hidden: !this.state.demoSource || this.state.source });

        return (
            <div className={containerClassName}>
                <div className="documentation">

                    <div className={headerClassName}>
                        <div className="clearfix">
                            <h1 className="page-title" data-id="component-title" >{this.props.label}</h1>
                            {docToggle}
                            {demoSrcToggle}
                            {srcToggle}
                        </div>
                        <iframe src={this.props.jsdocUrl} className={docsClassName} />
                        <iframe src={this.props.demoCodePathUrl} className={demoSourceClassname} />
                        {this._getComponentSourceFrame()}
                    </div>
                    
                </div>
                <div className="section-content">
                    <div className="demo-description"
                         dangerouslySetInnerHTML={{ __html: markdown }}></div>

                    <div className="output clearfix">
                        {React.createElement(this.props.type, props)}
                    </div>

                    {!this.props.fullscreen && <Markup content={this.props.code} />}
                </div>
            </div>
        );
    }
});

module.exports = DemoItem;
