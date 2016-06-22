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
            source: false
        };
    },

    _toggle: function () {
        this.setState({
            open: !this.state.open,
            source: false
        });
    },
    
    _toggleSource: function () {
        this.setState({
            open: !this.state.open,
            source: true
        });
    },

    _handleChange: function () {
        this.setState({
            store: this.props.store.getState()
        });
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
            srcToggle;
        if (this.props.jsdocUrl) {
            docToggle = <span className="toggle" onClick={this._toggle} />;
        }
        if (this.props.codePathUrl) {
            srcToggle = <span className="toggle-source" onClick={this._toggleSource} />;
        }
        
        var markdown = this.props.description && marked(this.props.description),
            props = _.extend({}, this.props, this.state.store);

        return (
            <div className={classnames("section", { fullscreen: this.props.fullscreen })}>
                <div className="documentation">

                    <div className={classnames("doc", { open: this.state.open, source: this.state.source })}>
                        <div className="clearfix">
                            <h1 className="page-title">{this.props.label}</h1>
                            {docToggle}
                            {srcToggle}
                        </div>
                        <iframe src={this.props.jsdocUrl}
                                className={classnames("js-doc", { hidden: this.state.source })} />
                        <iframe src={this.props.codePathUrl}
                                className={classnames("js-source", { hidden: !this.state.source })} />
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
