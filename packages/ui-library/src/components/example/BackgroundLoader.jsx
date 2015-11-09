var React = require("react/addons");

require("./BackgroundLoader.css");

/*
 * Repeatedly attempt to load content in the background, until
 * the loaded prop has been set to true.  Display provided
 * loading / spinner content while attempting to load data.
 *
 * This component is controlled by the 'loaded' prop.  This prop
 * must be set by the parent when it determines the data has been
 * loaded (which should be done as part of the 'load' callback call).
 *
 * In short:  This component calls the 'load' callback every 'interval'
 *  ms until 'loaded' is true.  While 'loaded' is not true, 'loading'
 *  content is displayed.  When 'loaded' is true, the children of this
 *  component are displayed.
 *
 * If this element is un-mounted then background loading will cease
 * and the timers will be cancelled.
 *
 * Usage:
 *
 * <BackgroundLoader
 *     load={loadMethod}           // The method to load data
 *     loading={loadingSpinner}    // Message / content to display when loading
 *     loaded={isLoaded}           // Boolean to indicate whether the data has been loaded
 *     interval={timeInMs} >       // Time in ms between attempts to load.
 *         <div className="complete-message">Everything was loaded!</div>   // Content to display when loading complete
 * </BackgroundLoader>
 *
 *
 *
 */
var BackgroundLoader = React.createClass({

    propTypes: {
        // The CSS class to set on the top HTML element
        className: React.PropTypes.string,
        // Time in ms between load calls,
        // can be a callback to change the interval dynamically
        interval: React.PropTypes.oneOfType([
            React.PropTypes.func,
            React.PropTypes.number
        ]).isRequired,
        // Function to call to load data.
        load: React.PropTypes.func.isRequired,
        // Content to display while loading data,
        // can be a callback or already rendered content.
        loading: React.PropTypes.oneOfType([
            React.PropTypes.func,
            React.PropTypes.object
        ]),
        // Whether the data has been loaded yet.
        loaded: React.PropTypes.bool
    },
    
    /*
     * Remove the timer from the timer queue.
     *
     */
    _clearTimeout: function () {
        if (this.timerId) {
            global.clearTimeout(this.timerId);
        }
    },
    
    /*
     * Start a load loop if one has not already been started.
     *
     */
    _startLoadLoop: function () {
        if ((this.isMounted()) && (!this.props.loaded) && (!this.timerId)) {
            this._loadLoop();
        }
    },
    
    /*
     * Attempt to load the data and schedule another timer to load the
     * data again.
     *
     */
    _loadLoop: function () {
        if (this.isMounted() && !this.props.loaded) {
            //only call function if window is in focus
            if (this.state.allowPoll) {
                this.props.load();
            }
            this.timerId = global.setTimeout(this._loadLoop, this._getInterval());
        } else {
            this.timerId = null;
        }
    },
    
    /*
     * Get the loading content, which can either be already rendered content
     * or a function to render the content.
     *
     */
    _loadingContent: function () {
        if (this.props.loading) {
            if ((typeof this.props.loading) === "function") {
                return this.props.loading();
            } else {
                return this.props.loading;
            }
        }
    },
    
    _getInterval: function () {
        var interval;
        if (this.props.interval) {
            if ((typeof this.props.interval) === "function") {
                interval = this.props.interval();
            } else {
                interval = this.props.interval;
            }
        }
        return (interval > 2000) ? interval : 2000;
    },

    getInitialState: function () {
        return {
            hidden: "hidden",
            allowPoll: true
        };
    },
    
    /*
     * When we mount we start trying to load the data.
     *
     */
    componentDidMount: function () {
        this._startLoadLoop();
        this.initHidden();
    },
    
    /*
     * Listen for the data to have been loaded.
     *
     */
    componentWillReceiveProps: function (nextProps) {
        if (!this.props.loaded && nextProps.loaded) {
            this._clearTimeout();
        }
    },
    
    /*
     * Clear timers when we unmount so we do not leave any
     * memory leaks or un-expected behaviour lurking.
     *
     */
    componentWillUnmount: function () {
        this._clearTimeout();
    },

    /*
     * When document is not in focus, do not allow any calls to the function to load the data
     */
    changeHidden: function (evt) {
        var evtMap = {
            focus: true,
            focusin: true,
            pageshow: true,
            blur: false,
            focusout: false,
            pagehide: false
        };

        if (this.isMounted()) {
            evt = evt || window.event;
            if (evt.type in evtMap) {
                this.setState({ allowPoll: evtMap[evt.type] });
            }
            else {
                this.setState({ allowPoll: (document[this.state.hidden] ? false : true) });
            }
        }
    },

    initHidden: function () {
        // Standards:
        if ("hidden" in document) {
            document.addEventListener("visibilitychange", this.changeHidden);
            this.setState({ hidden: "hidden" });
        }
        else if ("mozHidden" in document) {
            document.addEventListener("mozvisibilitychange", this.changeHidden);
            this.setState({ hidden: "mozHidden" });
        }
        else if ("webkitHidden" in document) {
            document.addEventListener("webkitvisibilitychange", this.changeHidden);
            this.setState({ hidden: "webkitHidden" });
        }
        else if ("msHidden" in document) {
            document.addEventListener("msvisibilitychange", this.changeHidden);
            this.setState({ hidden: "msHidden" });
        }
        // IE 9 and lower and All others:
        document.onfocusin =
                document.onfocusout =
                window.onpageshow =
                window.onpagehide =
                window.onfocus =
                window.onblur =
                this.changeHidden;

        // set the initial state (but only if browser supports the Page
        // Visibility API)
        if (document[this.state.hidden] !== undefined) {
            this.changeHidden({ type: document[this.state.hidden] ? "blur" : "focus" });
        }
    },
    
    
    render: function () {
        
        var content;
        if (this.props.loaded) {
            content = this.props.children;
        } else {
            content = this._loadingContent();
        }
        
        if (content) {
            return (
                <span data-id="loader" className={this.props.className}>
                    {content}

                    <img src={require("./BackgroundLoader-example.png")} />

                    <span className="background-loader-example-span">
                        some example test to demonstrate the required CSS usage
                    </span>
                </span>
            );
        } else {
            return null;
        }
    }
});

module.exports = BackgroundLoader;
