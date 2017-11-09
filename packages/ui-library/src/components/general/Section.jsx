"use strict";
var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames"),
    CollapsibleLink = require("./CollapsibleLink.jsx"),
    Utils = require("../../util/Utils"),
    _ = require("underscore");

/**
 * @callback Section~onToggle
 *
 * @param {boolean} expanded
 *     Current expanded/collapsed state.
 **/

/**
 * @class Section
 * @desc Simple section which expand/collapse on click. In collapsed mode only
 * title is shown. When expanded shows body content.
 *
 * @param {string} [data-id="section"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {boolean} [disableExpand]
 *     Optional attribute to indicate that section is unopenable.
 * @param {object} [accessories]
 *     A container where text, buttons, etc may be passed in to render on the right side of the collapsed section
 * @param {boolean} [stateless]
 *     WARNING. Default value for "stateless" will be set to false from next version.
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally. WARNING. Default value will be
 *     set to false from next version.
 * @param {string|object} [title]
 *     The text to display in the the collapsed view and along the top in the expanded view (adjacent to the arrow)
 * @param {string|object} [titleValue]
 *     The text to display just to the right of the title (separated by a colon)
 *
 * @param {boolean} [expanded=false]
 *     Whether or not section is expanded and showing body content.
 *
 * @param {Section~onToggle} [onToggle]
 *     Callback to be triggered when visibility is toggled.
 *
 * @example
 *     <Section className="section" title="My Section">
 *           <div className="section-container">     <!-- this is body, will be expanded/collapsed -->
 *               <div className="input-menu-button">
 *                   <button className="add inline">Add</button>
 *               </div>
 *           </div>
 *     </Section>
 *
 **/

class Section extends React.Component {
    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: true
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                throw(Utils.deprecatePropError("id", "data-id"));
            }
            if (this.props.controlled) {
                throw(Utils.deprecatePropError("controlled", "stateless", "true", "false"));
            }
        }
    }

    render() {
        return this.props.stateless
            ? <SectionStateless {..._.defaults({ ref: "SectionStateless" }, this.props)}>
                {this.props.children}
            </SectionStateless>
            : <SectionStateful {..._.defaults({ ref: "SectionStateful" }, this.props)}>
                {this.props.children}
            </SectionStateful>;
    }
}

class SectionStateless extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        expanded: PropTypes.bool,
        onToggle: PropTypes.func,
        accessories: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        titleValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        disableExpand: PropTypes.bool
    };

    static defaultProps = {
        "data-id": "section",
        expanded: false,
        onToggle: _.noop,
        disableExpand: false
    };

    _handleToggle = () => {
        if (this.props.disableExpand) {
            return;
        }
        this.props.onToggle(this.props.expanded);
    };

    render() {
        var styles = {
                "collapsible-section": true,
                open: this.props.expanded,
                "disable-expand": this.props.disableExpand
            },
            title = this.props.title;

        styles[this.props.className] = !!this.props.className;

        if (this.props.titleValue) {
            styles["has-title-value"] = true;
        }

        return (
            <div className={classnames(styles)} data-id={this.props["data-id"]}>
                <CollapsibleLink
                    data-id={this.props["data-id"] + "-title"}
                    className="collapsible-section-title"
                    arrowPosition={CollapsibleLink.arrowPositions.LEFT}
                    title={title}
                    expanded={this.props.expanded}
                    onToggle={this._handleToggle}
                />
                {this.props.titleValue && (
                    <span className="collapsible-section-title-value" data-id={this.props["data-id"] + "-title-value"}>
                        {this.props.titleValue}
                    </span>
                )}
                {this.props.accessories && (
                    <div
                        data-id={this.props["data-id"] + "-collapsible-section-accessories"}
                        className="collapsible-section-accessories">
                        {this.props.accessories}
                    </div>
                )}
                <div className="collapsible-section-content" data-id={this.props["data-id"] + "-content"}>
                    <div className="collapsible-section-content-inner">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

class SectionStateful extends React.Component {
    state = {
        expanded: this.props.expanded || false
    };

    _handleToggle = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    };

    render() {
        var props = _.defaults({
            ref: "SectionStateless",
            expanded: this.state.expanded,
            onToggle: this._handleToggle
        }, this.props);

        return (
            <SectionStateless {...props}>
                {this.props.children}
            </SectionStateless>
        );
    }
}

module.exports = Section;
