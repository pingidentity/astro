import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Portal } from "react-portal";
import Button, { buttonTypes } from "../../components/buttons/Button";
import Link from "../../components/general/Link";
import FlexRow, {
    alignments,
    justifyOptions,
} from "../../components/layout/FlexRow";
import Icon, { iconTypes } from "../../components/general/Icon";
import PopperContainer from "../../components/tooltips/PopperContainer";

const Themes = {
    LIGHT: "light",
    DARK: "dark",
};

/**
 * @class Tutorial
 * @desc The Tutorial component can help guide a user through a new or complex interface.
 *
 * @param {number} [active=0]
 *     The active step. "0" is the welcome page, "1" is the first step.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {string} [data-id="tutorial"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [labelDismiss="Dismiss"]
 *     "Dismiss" button label.
 * @param {string} [labelFinal="Finish"]
 *     "Finish" button label.
 * @param {string} [labelGetStarted="Get Started"]
 *     "Get Started" button label.
 * @param {string} [labelNext="Next"]
 *     "Next" button label.
 * @param {string} [labelPrevious="Back"]
 *     "Previous" button label.
 * @param {string} link
 *     Provides a URL for a "More on this topic" link at the bottom of the tooltip.
 * @param {string} [messageWelcomeDescription]
 *     Node that is set as the initial welcome modal description.
 * @param {string} [messageWelcomeTitle]
 *     Node that is set as the initial welcome modal title.
 * @param {function} [onClose]
 *     onClose cick handler.
 * @param {function} [onNext]
 *     onPrevious cick handler.
 * @param {function} [onPrevious]
 *     onPrevious cick handler.
 * @param {array} steps
 *     An array of step objects that the tutorial will walk through.
 * @param {Tutiorial.themes} [theme]
 *     Theme for the Tutorial component.
 * @param {bool} [visible=false]
 *     If the Tutorial is to be displayed or not.
 */
class Tutorial extends React.Component {
    constructor(props) {
        super(props);
        this.modal = this.refs.modal;
    }

    _renderWelcome = () => {
        const {
            messageWelcomeTitle,
            messageWelcomeDescription,
            labelGetStarted,
            labelDismiss,
            onClose,
            onNext,
            theme,
        } = this.props;

        const welcomeClassnames = classnames("tutorial__welcome", {
            "tutorial__welcome--dark": theme === Themes.DARK,
        });

        return (
            <Portal>
                <div className={welcomeClassnames}>
                    <div className="tutorial__welcome--content">
                        <div className="tutorial__welcome--title">
                            {messageWelcomeTitle}
                        </div>
                        <div className="tutorial__welcome--description">
                            {messageWelcomeDescription}
                        </div>
                    </div>
                    <div className="tutorial__welcome--actions">
                        <div>
                            <Button type={buttonTypes.PRIMARY} onClick={onNext} noSpacing>
                                {labelGetStarted}
                            </Button>
                        </div>
                        <div>
                            <Link onClick={onClose}>{labelDismiss}</Link>
                        </div>
                    </div>
                </div>
            </Portal>
        );
    }

    _renderStepContent = (step) => {
        const {
            title,
            description,
            headerContent
        } = step;

        return (
            <div className="tutorial__modal--content">
                { headerContent ? (
                    <div className="tutorial__modal--header">
                        {headerContent}
                    </div>
                ) : null }
                <div key="title" className="tutorial__modal--title">{title}</div>
                <div key="description" className="tutorial__modal--description">{description}</div>
            </div>
        );
    }

    _renderProgress = (activeStep, steps) => {
        const progressIndicators = [];

        for (let i = 1; i <= steps; i = i + 1) {
            const indicatorClassnames = classnames("tutorial__modal--step", {
                "tutorial__modal--step--complete": i < activeStep,
                "tutorial__modal--step--active": i === activeStep,
                "tutorial__modal--step--inactive": i > activeStep,
            });

            progressIndicators.push((
                <li className={indicatorClassnames} key={`step-${i}`}></li>
            ));
        }

        return (
            <div className="tutorial__modal--progress">
                <ul className="tutorial__modal--steps">
                    {progressIndicators}
                </ul>
            </div>
        );
    }

    componentDidUpdate(prevProps) {

        // Remove existing lightbox if any
        const prevSpotlight = document.getElementsByClassName("tutorial__modal--lightbox")[0];

        if (prevSpotlight !== undefined) {
            prevSpotlight.remove();
        }

        if (prevProps.active !== this.props.active &&
            this.props.active <= this.props.steps.length &&
            this.props.active !== 0
        ) {
            // Get ref to target element
            const target = this.props.steps[this.props.active - 1].target;

            if (target() !== undefined) {

                // Create clone of target with custom styles
                const lightbox = document.createElement("div");
                const dims = target().getBoundingClientRect();
                lightbox.style.top = `${dims.top}px`;
                lightbox.style.left = `${dims.left}px`;
                lightbox.style.width = `${dims.width}px`;
                lightbox.style.height = `${dims.height}px`;
                lightbox.classList.add("tutorial__modal--lightbox");

                if (this.props.theme === Themes.DARK) {
                    lightbox.classList.add("tutorial__modal--lightbox--dark");
                }

                // Add clone by existing element to preserve contextual styles
                document.body.append(lightbox);
            }
        }
    }

    _renderPopup = (steps, active) => {
        const {
            labelNext,
            labelFinal,
            labelPrevious,
            onNext,
            onPrevious,
            onClose,
            theme,
        } = this.props;

        const step = steps[active - 1];

        const pointerClassnames = classnames("tutorial__modal--pointer", {
            "tutorial__modal--pointer--dark": theme === Themes.DARK,
        });

        const modalClassnames = classnames("tutorial__modal", {
            "tutorial__modal--dark": theme === Themes.DARK,
        });

        if (active > 0 && step) {
            return (
                <PopperContainer
                    getReference={step.target}
                    key={step.target}
                    placement={step.side}
                    pointerClassName={pointerClassnames}
                    className="tutorial__modal--popper"
                >
                    <div className={modalClassnames} ref={this.modal}>
                        <div className="tutorial__modal--close">
                            <Icon iconName="clear" type={iconTypes.INLINE} onClick={onClose}/>
                        </div>
                        {this._renderStepContent(step)}
                        <div className="tutorial__modal--footer">
                            <FlexRow alignment={alignments.CENTER} justify={justifyOptions.SPACEBETWEEN}>
                                <div>
                                    {this._renderProgress(active, steps.length)}
                                </div>
                                <div className="tutorial__modal--actions">
                                    <Link onClick={onPrevious}>{labelPrevious}</Link>
                                    <Button type={buttonTypes.PRIMARY} onClick={onNext} noSpacing>
                                        { active === steps.length ? labelFinal : labelNext }
                                    </Button>
                                </div>
                            </FlexRow>
                        </div>
                    </div>
                </PopperContainer>
            );
        }
    }

    render() {
        const {
            "data-id": dataId,
            active,
            steps,
            visible,
            theme,
            className,
        } = this.props;

        const tutorialClassnames = classnames("tutorial", className, {
            "tutorial--dark": theme === Themes.DARK,
        });

        return (
            visible ? (
                <div className={tutorialClassnames} data-id={dataId}>
                    <div className="tutorial__bg">
                        <div className="">
                            { active === 0 ? (
                                this._renderWelcome()
                            ) : (
                                this._renderPopup(steps, active)
                            )}
                        </div>
                    </div>
                </div>
            ) : null
        );
    }
}

Tutorial.propTypes = {
    "data-id:": PropTypes.string,
    visible: PropTypes.bool,
    className: PropTypes.string,
    active: PropTypes.number,
    steps: PropTypes.arrayOf(PropTypes.object),
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    onClose: PropTypes.func,
    messageWelcomeTitle: PropTypes.node.isRequired,
    messageWelcomeDescription: PropTypes.node.isRequired,
    labelGetStarted: PropTypes.string,
    labelNext: PropTypes.string,
    labelFinal: PropTypes.string,
    labelPrevious: PropTypes.string,
    labelDismiss: PropTypes.string,
    theme: PropTypes.oneOf(Object.values(Themes)),
};

Tutorial.defaultProps = {
    "data-id": "tutorial",
    visible: false,
    active: 0,
    steps: [],
    labelNext: "Next",
    labelFinal: "Finish",
    labelPrevious: "Back",
    labelGetStarted: "Get Started",
    labelDismiss: "Dismiss",
};

Tutorial.themes = Themes;
export default Tutorial;