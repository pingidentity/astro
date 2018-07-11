import React from "react";
import PropTypes from "prop-types";
import ViewToggle from "../ViewToggle";
import classnames from "classnames";
import Checkbox from "../../../forms/FormCheckbox";


/**
 * @class DashboardCard
 * @desc A card that displays a single statistic, but can be flipped to reveal others as well.
 *
 * @param {string} [className]
 *     Custom class names
 * @param {array} [data-id="stat-card"]
 * @param {string} [errorMessage]
 *     When provided, the error message and icon will display in place of the regular front/back content.
 * @param {boolean} [flipped]
 *     If provided, whether or not the card is flipped. If not provided, the component maintains its own state
 * @param {boolean} [loading=false]
 *     When true the splinner animation shows in place of the stats
 * @param {function} [onFlip]
 *     Called when a flip is triggered
 * @param {node} [front]
 *     an object/information for the front of the card
 * @param {node} [back]
 *     an object/information for the back of the card
 * @param {number} [size]
 *     controls the CSS "flex-grow" of the card. When a single-sized card  appears next to a double-sized card, the
 *     double will occupy 2/3 of the width of the parent.
 * @param {function} [onMakeDefault]
 *     if provided it will add a checkbox to the back of the card to make that the default view.
 * @param {function} [ makeDefaultLabel]
 *     if provided it will add a label to the check box.
 *
 * @example
 * <DashboardCard
 *      back={<div> hello </div}
 *      front={<div> this is the front </div>}
 *      onMakeDefault={this._showDefaultValue}
 *    />
 *
 */

const valuePropType = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
]);

class DashboardCard extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        "data-id": valuePropType,
        errorMessage: PropTypes.string,
        flipped: PropTypes.bool,
        iconName: PropTypes.string,
        loading: PropTypes.bool,
        onFlip: PropTypes.func,
        value: valuePropType,
        front: PropTypes.node,
        back: PropTypes.node,
        size: PropTypes.number,
        onMakeDefault: PropTypes.func,
        makeDefaultLabel: PropTypes.string
    }

    static defaultProps = {
        "data-id": "dashboard-card",
        loading: false,
        makeDefaultLabel: "Make Default View"
    }

    state = {
        flipped: false,
        defaultChecked: false
    }

    _handleChecked = (val) => {
        if (this.props.onMakeDefault) {
            this.props.onMakeDefault(val);
        }

        this.setState({ defaultChecked: !this.state.defaultChecked });
    }

    _handleFlip = () => {
        if (this.props.onFlip) {
            this.props.onFlip();
        }

        this.setState({ flipped: !this.state.flipped });
    }

    _isFlipped = () => this.props.flipped === undefined ? this.state.flipped : this.props.flipped

    render = () => {
        const classes = classnames(
            "dashboard-card",
            this.props.className,
            {
                "dashboard-card--flipped": this._isFlipped(),
                "dashboard-card--double": this.props.size === 2,
            }
        );

        return (
            <div className={classes} data-id={this.props["data-id"]}>
                {!this.props.errorMessage && [
                    <div key="back" className="dashboard-card__back">
                        {this.props.back}
                        {this.props.onMakeDefault &&
                            <Checkbox label={this.props.makeDefaultLabel}
                            onValueChange={this._handleChecked}
                            checked={this.state.defaultChecked}/>}
                    </div>,
                    <div key="front" className="dashboard-card__front">{this.props.front}</div>,
                    <div key="control" className="dashboard-card__control">
                        {!this.props.loading && this.props.back &&
                            <ViewToggle onToggle={this._handleFlip} toggled={this.state.flipped} />
                        }
                    </div>
                ]}
                 {this.props.errorMessage &&
                    <div className="dashboard-card__front">
                        <div className="dashboard-card__error">
                            <div className="icon-cogs dashboard-card__error-icon" />
                            <div className="dashboard-card__error-text">
                                {this.props.errorMessage}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default DashboardCard;

