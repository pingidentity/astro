var PropTypes = require("prop-types");
var React = require("react"),
    Utils = require("../../util/Utils.js");

/**
 * @deprecated The component is deprecated and subject to be removed in future library versions. There is no direct
 *             replacement. Timer based polling or other timer related activities is better to be implemented on
 *             middleware/actions/reducers layer.
 *
 * @class BackgroundLoader
 *
 * @desc
 * <p><b>DEPRECATED</b> (see deprecation section in the doc below).</p>
 *
 * <p>
 * Repeatedly attempt to load content in the background, until
 * the loaded prop has been set to true.  Display provided
 * loading / spinner content while attempting to load data.
 * </p>
 *
 * <p>
 * This component is controlled by the 'loaded' prop.  This prop
 * must be set by the parent when it determines the data has been
 * loaded (which should be done as part of the 'load' callback call).
 * </p>
 *
 * <p>
 * In short:  This component calls the 'load' callback every 'interval'
 *  ms until 'loaded' is true.  While 'loaded' is not true, 'loading'
 *  content is displayed.  When 'loaded' is true, the children of this
 *  component are displayed.
 * </p>
 *
 * <p>
 * If this element is un-mounted then background loading will cease
 * and the timers will be cancelled.
 * </p>
 *
 * @param {function} load The method to load data
 * @param {function | object} [loading] The content to display when loading
 * @param {boolean} [loaded] Set to true if the content has been loaded and loading requests
 *  should cease.
 * @param {number | function} interval The time in ms between load calls.
 * @param {string} [className] CSS classes added to the input button
 *
 * @example
 *
 * <BackgroundLoader
 *     load={loadMethod}
 *     loading={loadingSpinner}
 *     loaded={isLoaded}
 *     interval={timeInMs} >
 *         <div className="complete-message">Everything was loaded!</div>
 * </BackgroundLoader>
 *
 *
 *
 */
class BackgroundLoader extends React.Component {
    static propTypes = {
        // The CSS class to set on the top HTML element
        className: PropTypes.string,
        // Time in ms between load calls,
        // can be a callback to change the interval dynamically
        interval: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.number
        ]).isRequired,
        // Function to call to load data.
        load: PropTypes.func.isRequired,
        // Content to display while loading data,
        // can be a callback or already rendered content.
        loading: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.object
        ]),
        // Whether the data has been loaded yet.
        loaded: PropTypes.bool
    };

    state = {
        hidden: "hidden",
        allowPoll: true
    };

    /*
     * Remove the timer from the timer queue.
     *
     */
    _clearTimeout = () => {
        if (this.timerId) {
            global.clearTimeout(this.timerId);
        }
    };

    /*
     * Start a load loop if one has not already been started.
     *
     */
    _startLoadLoop = () => {
        if (this._isMounted && !this.props.loaded && !this.timerId) {
            this._loadLoop();
        }
    };

    /*
     * Attempt to load the data and schedule another timer to load the
     * data again.
     *
     */
    _loadLoop = () => {
        if (this._isMounted && !this.props.loaded) {
            //only call function if window is in focus
            if (this.state.allowPoll) {
                this.props.load();
            }
            this.timerId = global.setTimeout(this._loadLoop, this._getInterval());
        } else {
            this.timerId = null;
        }
    };

    /*
     * Get the loading content, which can either be already rendered content
     * or a function to render the content.
     *
     */
    _loadingContent = () => {
        if (this.props.loading) {
            if ((typeof this.props.loading) === "function") {
                return this.props.loading();
            } else {
                return this.props.loading;
            }
        }
    };

    /*
     * Determine the interval between load calls.
     * If the interval prop passed is a function, then
     * call the function, otherwise use the value of
     * the prop.
     *
     */
    _getInterval = () => {
        var interval;
        if (this.props.interval) {
            if ((typeof this.props.interval) === "function") {
                interval = this.props.interval();
            } else {
                interval = this.props.interval;
            }
        }
        return (interval > 2000) ? interval : 2000;
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            console.warn("** This component is deprecated and will be removed in the next release. " +
            "There is no direct replacement. Timer based polling or other timer related activities is better to be " +
            "implemented on middleware/actions/reducers layer.");
        }
    }

    /*
     * When we mount we start trying to load the data.
     *
     */
    componentDidMount() {
        this._isMounted = true;
        this._startLoadLoop();
        this.initHidden();
    }

    /*
     * Listen for the data to have been loaded.
     *
     */
    componentWillReceiveProps(nextProps) {
        if (!this.props.loaded && nextProps.loaded) {
            this._clearTimeout();
        }
    }

    /*
     * Clear timers when we unmount so we do not leave any
     * memory leaks or un-expected behaviour lurking.
     *
     */
    componentWillUnmount() {
        this._clearTimeout();
        this._isMounted = false;
    }

    /*
     * When document is not in focus, do not allow any calls to the function to load the data
     */
    changeHidden = (evt) => {
        var evtMap = {
            focus: true,
            focusin: true,
            pageshow: true,
            blur: false,
            focusout: false,
            pagehide: false
        };

        if (this._isMounted) {
            evt = evt || window.event;
            if (evt.type in evtMap) {
                this.setState({ allowPoll: evtMap[evt.type] });
            }
            else {
                this.setState({ allowPoll: (document[this.state.hidden] ? false : true) });
            }
        }
    }
    /*
     * Set the initial page focus state, based on whether
     * the browser window is in focus or not.
     *
     */
    initHidden = () => {
        var hidden = null;

        // Standards:
        if ("hidden" in document) {
            document.addEventListener("visibilitychange", this.changeHidden);
            hidden = "hidden";
        }
        else if ("mozHidden" in document) {
            document.addEventListener("mozvisibilitychange", this.changeHidden);
            hidden = "mozHidden";
        }
        else if ("webkitHidden" in document) {
            document.addEventListener("webkitvisibilitychange", this.changeHidden);
            hidden = "webkitHidden";
        }
        else if ("msHidden" in document) {
            document.addEventListener("msvisibilitychange", this.changeHidden);
            hidden = "msHidden";
        }

        this.setState({ hidden: hidden });

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
        if (hidden !== null && document[hidden] !== undefined) {
            this.changeHidden({ type: document[hidden] ? "blur" : "focus" });
        }
    }

    render () {

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
                </span>
            );
        } else {
            return null;
        }
    }
}

module.exports = BackgroundLoader;
