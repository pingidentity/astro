import React from "react";
import PropTypes from "prop-types";
import DashboardColors from "./dashboardColors";
import PageSpinner from "../../../general/PageSpinner";
import ViewToggle from "../ViewToggle";
import classnames from "classnames";
import Checkbox from "../../../forms/FormCheckbox";
import InputModifier, { InputColors } from "../../../general/InputModifier";

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
 * @param {string} [maxWidth]
 *     Percentage or pixel width passed to style attribute. Overridden with 100 at full width card breakpoint.
 * @param {function} [ makeDefaultLabel]
 *     if provided it will add a label to the check box.
 *  @param {bool} [defaultChecked]
 *     state of the checkbox set to false. If set to true will render with onMakeDefault already checked.
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
        makeDefaultLabel: PropTypes.string,
        maxWidth: PropTypes.string,
    }

    static defaultProps = {
        "data-id": "dashboard-card",
        loading: false,
        makeDefaultLabel: "Make Default View"
    }

    state = {
        flipped: false,
        defaultChecked: this.props.defaultChecked
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
        const accent = this.props.accent ? "dashboard-card--" + DashboardColors.getKey(this.props.accent) : null;
        const classes = classnames(
            "dashboard-card",
            this.props.className,
            accent,
            {
                "dashboard-card--flipped": this._isFlipped() && !this.props.errorMessage,
                "dashboard-card--double": this.props.size === 2,
            }
        );

        const style = {
            maxWidth: this.props.maxWidth,
        };

        return (
            <div className={classes} style={style} data-id={this.props["data-id"]}>
                {!this.props.errorMessage && [
                    <InputModifier inputColor={InputColors.LIGHT}>
                        <div key="back" className="dashboard-card__back">
                            {this.props.back}
                            {this.props.onMakeDefault &&
                                <Checkbox
                                    data-id={`${this.props["data-id"]}-make-default`}
                                    className="dashboard-card__make-default stacked"
                                    label={this.props.makeDefaultLabel}
                                    onValueChange={this._handleChecked}
                                    checked={this.state.defaultChecked}
                                />
                            }
                        </div>
                    </InputModifier>,
                    <InputModifier inputColor={InputColors.LIGHT}>
                        <div key="front" className="dashboard-card__front">
                            {this.props.front}
                        </div>
                    </InputModifier>,
                    <div key="control" className="dashboard-card__control">
                        {!this.props.loading && this.props.back &&
                            <ViewToggle
                                data-id={`${this.props["data-id"]}-view-toggle`}
                                onToggle={this._handleFlip}
                                toggled={this.state.flipped}
                            />
                        }
                    </div>
                ]}
                {this.props.errorMessage &&
                    <div className="dashboard-card__front">
                        <div className="dashboard-card__error" data-id={`${this.props["data-id"]}-error-message`}>
                            <div className="icon-cogs dashboard-card__error-icon" />
                            <div className="dashboard-card__error-text">
                                {this.props.errorMessage}
                            </div>
                        </div>
                    </div>
                }
                {this.props.loading && !this.props.errorMessage &&
                    <PageSpinner
                        data-id={`${this.props["data-id"]}-spinner`}
                        className="dashboard-card__loader"
                        show
                        small
                    />
                }
            </div>
        );
    }
}

export default DashboardCard;

