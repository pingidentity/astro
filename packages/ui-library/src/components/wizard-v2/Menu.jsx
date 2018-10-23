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
            let clickDisabled = false;

            if (!this.props.onMenuClick) {
                clickDisabled = true;
            } else if (type === TYPES.required) {
                clickDisabled = !step.completed && index > 0;
            } else {
                clickDisabled = this.state.optionalStepsVisited.indexOf(index) === -1;
            }

            return (
                <Item
                    key={index}
                    data-id={`${this.props["data-id"]}-menu-item-${type}-${index}`}
                    index={step.index}
                    clickDisabled={clickDisabled}
                    completed={step.completed}
                    onClick={this.props.onMenuClick}
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
                        "menuTitle",
                        "type",
                    ])}
                />
            );
        }, this);
    }

    render() {
        return (
            <div className="wizard2-progress-menu-scroller" data-id={`${this.props["data-id"]}-menu`}>
                <nav className="wizard2-progress-menu">
                    <button
                        className="wizard2-close-btn"
                        onClick={this.props.onClose}
                        data-id={`${this.props["data-id"]}-close-button`}
                    />
                    {this.props.strings.menuTitle !== "" &&
                        <div className="wizard2-progress-menu__title" data-id={`${this.props["data-id"]}-menu-title`}>
                            {this.props.strings.menuTitle || "Progress"}
                        </div>
                    }
                    {this._buildItems(this.props.requiredSteps, TYPES.required)}
                    {this.props.optionalSteps && this.props.optionalSteps.length > 0 &&
                        <div
                            className="wizard2-progress-menu__divider-container"
                            data-id={`${this.props["data-id"]}-menu-divider-title`}>
                            {this.props.strings.dividerTitle !== "" &&
                                <div className="wizard2-progress-menu__divider">
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
    const iconClassNames = classnames(
        "wizard2-progress-menu__step-icon",
        { "wizard2-progress-menu__step-icon--required": required },
        { "wizard2-progress-menu__step-icon--optional": !required },
        { "wizard2-progress-menu__step-icon--optional-active": props.active && !props.completed && !required },
        { "wizard2-progress-menu__step-icon--completed": props.completed }
    );
    const stepClassNames = classnames(
        "wizard2-progress-menu__step",
        { "wizard2-progress-menu__step--active": props.active },
        { "wizard2-progress-menu__step--click-disabled": props.clickDisabled },
        { "wizard2-progress-menu__step--completed": props.completed },
        { "wizard2-progress-menu__editable": props.completed && !props.clickDisabled }
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
            <div className={iconClassNames}>{content}</div>
            <div className="wizard2-progress-menu__item-title">
                <div className="wizard2-progress-menu__item-title-text">{props.menuTitle || props.title}</div>
                {props.completed && !props.clickDisabled && (
                    <div className="wizard2-progress-menu__item-title-icon icon-edit" />
                )}
            </div>
            <div className="wizard2-progress-menu__item-description">{props.menuDescription || props.description}</div>
        </div>
    );
}

export default Menu;
