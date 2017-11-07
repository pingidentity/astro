
var PropTypes = require("prop-types");
var React = require("react"),

    CollapsibleLink = require("../general/CollapsibleLink.jsx"),
    DetailsTooltip = require("../tooltips/DetailsTooltip.jsx"),

    classnames = require("classnames"),
    _ = require("underscore");


/**
 * @callback LinkDropDownList~onClick
 * @param {object} selectedMenuItem
 *     The data object of the selected/clicked menu item
 */

/**
 * @callback LinkDropDownList~onToggle
 */

/**
 * @class LinkDropDownList
 * @desc Toggles between two states on click. Is either "off" or "on".
 *
 * @param {string} [data-id=toggle]
 *     The "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to be set on the top-level HTML container.
 *
 * @param {boolean} [stateless]
 *     Enables whether the open state of teh component to be externally managed. True will relinquish control to the
 *     component's parent component. False or not specified will cause the component to manage state internally.
 * @param {boolean} [open=false]
 *     Determines whether the LinkDropDownList is visible. True = visible, False = hidden.
 *
 * @param {LinkDropDownList~onClick} [onClick]
 *     Callback triggered when a menu item is selected
 * @param {LinkDropDownList~onToggle} [onToggle]
 *     Callback triggered when the menu visibility is changed
 *
 *
 * @example
 *     <LinkDropDownList
 *         options={data.options}
 *         selectedOption={this.state.selectedOption}
 *         onClick{this._handleClick}
 *         onToggle={this._handleToggle}
 *     />
 */


class LinkDropDownList extends React.Component {
    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: false
    };

    render() {
        return this.props.stateless
            ? React.createElement(LinkDropDownListStateless, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "LinkDropDownListStateless" }, this.props))
            : React.createElement(LinkDropDownListStateful, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "LinkDropDownListStateful" }, this.props));
    }
}

class LinkDropDownListStateless extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        "data-id": PropTypes.string,
        label: PropTypes.string,
        onClick: PropTypes.func,
        onToggle: PropTypes.func,
        open: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedOption: PropTypes.object
    };

    static defaultProps = {
        closeOnSelection: true,
        "data-id": "link-dropdown-list"
    };

    _handleClick = (selectedOption) => {
        if (this.props.closeOnSelection) {
            this.props.onToggle();
        }

        this.props.onClick(selectedOption);
    };

    _renderLabel = () => {
        return (
            <CollapsibleLink
                data-id={this.props["data-id"] + "-label"}
                expanded={this.props.open}
                title={this.props.label}
            />
        );
    };

    _renderOptions = () => {
        return this.props.options.map(function (option, i) {
            return (
                <LinkDropDownListOption
                    key={i}
                    onClick={this._handleClick}
                    option={option}
                    selected={option === this.props.selectedOption}
                />
            );
        }.bind(this));
    };

    render() {
        return (
            <DetailsTooltip
                data-id={this.props["data-id"]}
                positionClassName="bottom right"
                className={classnames(this.props.className, "link-dropdown-list")}
                label={this._renderLabel()}
                showClose={false}
                open={this.props.open}
                onToggle={this.props.onToggle}>
                <ul className="select-list" data-id={this.props["data-id"] + "-menu"}>
                    {this._renderOptions()}
                </ul>
            </DetailsTooltip>
        );
    }
}

class LinkDropDownListStateful extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        "data-id": PropTypes.string,
        label: PropTypes.string,
        onClick: PropTypes.func,
        onToggle: PropTypes.func,
        open: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedOption: PropTypes.object
    };

    state = {
        open: this.props.open || false,
        selectedOption: this.props.selectedOption
    };

    _handleClick = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        });
        this.props.onClick(selectedOption);
    };

    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
        this.props.onToggle();
    };

    render() {
        var props = _.defaults({
            onClick: this._handleClick,
            onToggle: this._handleToggle,
            open: this.state.open,
            selectedOption: this.state.selectedOption,
            ref: "LinkDropDownListStateful"
        }, this.props);

        return React.createElement(LinkDropDownListStateless, props);
    }
}

class LinkDropDownListOption extends React.Component {
    static propTypes = {
        option: PropTypes.object,
        selected: PropTypes.bool
    };

    _handleClick = () => {
        this.props.onClick(this.props.option);
    };

    render() {
        var classNames = {
            "select-option": true,
            selected: this.props.selected
        };

        return (
            <li data-value={this.props.option.value}
                className={classnames(classNames)}
                onClick={this._handleClick}>
                {this.props.option.label}
            </li>
        );
    }
}

module.exports = LinkDropDownList;
