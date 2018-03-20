import React from "react";
import _ from "underscore";
import classnames from "classnames";


const TYPES = {
    required: "required",
    optional: "optional"
};

class Menu extends React.Component {
    static defaultProps = {
        strings: {},
    };

    constructor(props) {
        super(props);
        this._setAsVisited = this._setAsVisited.bind(this);
        this._buildItems = this._buildItems.bind(this);

        this.state = {
            optionalStepsVisited: [],
        };
    }

    componentWillUpdate(nextProps) {
        const nextStepIsOptional = nextProps.activeStep > (nextProps.requiredSteps.length - 1);
        const nextStepNotVisited = this.state.optionalStepsVisited.indexOf(nextProps.activeStep) === -1;

        if (nextStepIsOptional && nextStepNotVisited) {
            this._setAsVisited(nextProps.activeStep - nextProps.requiredSteps.length);
        }
    }

    _setAsVisited(index) {
        if (this.state.optionalStepsVisited.indexOf(index) === -1) {
            this.setState({ optionalStepsVisited: [...this.state.optionalStepsVisited, index] });
        }
    }

    _buildItems(steps, type) {
        return _.map(steps, (step, index) => {
            const clickDisabled = type === TYPES.required
                ? !step.completed
                : this.state.optionalStepsVisited.indexOf(index) === -1;

            return (
                <Item
                    key={index}
                    data-id={`${this.props["data-id"]}-menu-item-${type}-${index}`}
                    index={step.index}
                    clickDisabled={clickDisabled}
                    onClick={this.props.onClick}
                    type={type}
                    number={index + 1}
                    {..._.pick(step, [
                        "active",
                        "clickDisabled",
                        "completed",
                        "description",
                        "menuDescription",
                        "number",
                        "title",
                        "type",
                    ])}
                />
            );
        }, this);
    }

    render() {

        console.log("this.props.strings.menuTitle", this.props.strings.menuTitle);

        return (
            <div className="wizard-progress-menu-scroller" data-id={`${this.props["data-id"]}-menu`}>
                <nav className="wizard-progress-menu">
                    <button
                        className="wizard-close-btn"
                        onClick={this.props.onClose}
                        data-id={`${this.props["data-id"]}-close-button`}
                    />
                    {this.props.strings.menuTitle !== "" &&
                        <div className="wizard-progress-menu__title" data-id={`${this.props["data-id"]}-menu-title`}>
                            {this.props.strings.menuTitle || "Progress"}
                        </div>
                    }
                    {this._buildItems(this.props.requiredSteps, TYPES.required)}
                    {this.props.optionalSteps && this.props.optionalSteps.length > 0 &&
                        <div
                            className="wizard-progress-menu__divider-container"
                            data-id={`${this.props["data-id"]}-menu-divider-title`}>
                            {this.props.strings.dividerTitle !== "" &&
                                <div className="wizard-progress-menu__divider">
                                    {this.props.strings.dividerTitle || "Optional Configurations"}
                                </div>
                            }
                        </div>
                    }
                    {this._buildItems(this.props.optionalSteps, TYPES.optional)}
                </nav>
            </div>
        );
    }
}

function Item(props) {
    const required = props.type === TYPES.required;
    const iconClassName = classnames(
        "wizard-progress-menu__step-icon",
        { "wizard-progress-menu__step-icon--required": required },
        { "wizard-progress-menu__step-icon--optional": !required },
        { "wizard-progress-menu__step-icon--optional-active": props.active && !props.completed && !required },
        { "wizard-progress-menu__step-icon--completed": props.completed }
    );
    const stepClassNames = classnames(
        "wizard-progress-menu__step",
        { "wizard-progress-menu__step--active": props.active },
        { "wizard-progress-menu__step--click-disabled": props.clickDisabled }
    );

    const content = required && !props.completed ? props.number : null;

    const handleClick = () => {
        if (props.clickDisabled) {
            return false;
        }

        props.onClick(props.index);
    };

    return (
        <div className={stepClassNames} onClick={handleClick} data-id={props["data-id"]}>
            <div className={iconClassName}>{content}</div>
            <div className="wizard-progress-menu__item-title">{props.title}</div>
            <div className="wizard-progress-menu__item-description">{props.menuDescription || props.description}</div>
        </div>
    );
}

export default Menu;
