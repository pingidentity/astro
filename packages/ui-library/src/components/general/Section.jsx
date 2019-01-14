"use strict";

var React = require("react"),
    PropTypes = require("prop-types"),
    classnames = require("classnames"),
    CollapsibleLink = require("./CollapsibleLink"),
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
 * @param {boolean} [condensed=false]
 *     When true, this applies a more condensed stlying to the section. NOTE that in order to get the full effect of
 *     this style all of the sections must be in a common parent DOM node such as a <div>.
 * @param {boolean} [disableExpand]
 *     Optional attribute to indicate that section is unopenable.
 * @param {object} [accessories]
 *     A container where text, buttons, etc may be passed in to render on the right side of the collapsed section
 * @param {boolean} [stateless]
 *     WARNING. Default value for "stateless" will be set to false from next version.
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally. WARNING. Default value will be
 *     set to false from next version.
 * @param {object} [rowAccessories]
 *     A right-aligned container where buttons and toggles may be passed in to render on the right side of the section
 * @param {string|object} [title]
 *     The text to display in the the collapsed view and along the top in the expanded view (adjacent to the arrow)
 * @param {string|object} [titleValue]
 *     The text to display just to the right of the title (separated by a colon)
 * @param {object} [detailsText]
 *     Text to be displayed in the center of the component; switches between collapsed and expanded versions.
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
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            if (this.props.controlled !== undefined) {
                throw new Error(Utils.deprecatePropError("controlled", "stateless", "true", "false"));
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
        accessories: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.array
        ]),
        className: PropTypes.string,
        condensed: PropTypes.bool,
        "data-id": PropTypes.string,
        disableExpand: PropTypes.bool,
        expanded: PropTypes.bool,
        onToggle: PropTypes.func,
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        titleValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        detailsText: PropTypes.shape({
            collapsed: PropTypes.oneOfType([ PropTypes.node, PropTypes.string ]),
            expanded: PropTypes.oneOfType([ PropTypes.node, PropTypes.string ])
        })
    };

    static defaultProps = {
        condensed: false,
        "data-id": "section",
        disableExpand: false,
        expanded: false,
        onToggle: _.noop
    };

    _handleToggle = () => {
        if (this.props.disableExpand) {
            return;
        }
        this.props.onToggle(this.props.expanded);
    };

    _maybeRenderRightContent = () => {
        const {
            accessories,
            detailsText,
            expanded
        } = this.props;

        if (accessories || detailsText) {
            const acc = accessories &&
                <div
                    key="accessories"
                    data-id={this.props["data-id"] + "-collapsible-section-accessories"}
                    className="row-accessories">
                    {this.props.accessories}
                </div>;

            const collapsed = detailsText
                ? <div key="collapsed" className="collapsible-section__details-text">
                    {expanded ? detailsText.expanded : detailsText.collapsed}
                </div>
                : <div key="collapsed"></div>;

            return (
                <div className="collapsible-section__right-content">
                    {[ collapsed, acc ]}
                </div>
            );
        } else {
            return null;
        }
    }

    render() {
        const styles = {
            condensed: this.props.condensed,
            open: this.props.expanded,
            "disable-expand": this.props.disableExpand,
            "has-title-value": this.props.titleValue
        };

        return (
            <div
                className={classnames("collapsible-section", this.props.className, styles)}
                data-id={this.props["data-id"]}>
                <CollapsibleLink
                    data-id={this.props["data-id"] + "-title"}
                    className="collapsible-section-title"
                    arrowPosition={CollapsibleLink.arrowPositions.LEFT}
                    title={this.props.title}
                    expanded={this.props.expanded}
                    onToggle={this._handleToggle}
                />
                {this._maybeRenderRightContent()}
                {this.props.titleValue && (
                    <span className="collapsible-section-title-value" data-id={this.props["data-id"] + "-title-value"}>
                        {this.props.titleValue}
                    </span>
                )}
                <div className="collapsible-section-content" data-id={this.props["data-id"] + "-content"}>
                    {this.props.children}
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
