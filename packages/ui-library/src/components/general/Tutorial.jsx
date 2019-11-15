import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Portal } from "react-portal";
import Button, { buttonTypes } from "../buttons/Button";
import Link from "../general/Link";
import FlexRow, {
    alignments,
    justifyOptions,
} from "../layout/FlexRow";
import Icon, { iconTypes } from "../general/Icon";
import PopperContainer from "../tooltips/PopperContainer";

export default class Tutorial extends React.Component {
    constructor(props) {
        super(props);
        this.modal = React.createRef();
    }

    _renderWelcome = () => {
        const {
            messageWelcomeTitle,
            messageWelcomeDescription,
            labelGetStarted,
            labelDismiss,
            onClose,
            onNext,
        } = this.props;

        return (
            <Portal>
                <div className="tutorial__welcome">
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
        } = this.props;
        const step = steps[active - 1];

        if (active > 0 && step) {
            return (
                <PopperContainer
                    getReference={step.target}
                    key={step.target}
                    placement={step.side}
                    pointerClassName="tutorial__modal--pointer"
                    className="tutorial__modal--popper"
                >
                    <div className="tutorial__modal" ref={this.modal}>
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
        } = this.props;

        return (
            visible ? (
                <div className="tutorial" data-id={dataId}>
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
};

Tutorial.defaultProps = {
    visible: false,
    active: 0,
    steps: [],
    labelNext: "Next",
    labelFinal: "Finish",
    labelPrevious: "Back",
    labelGetStarted: "Get Started",
    labelDismiss: "Dismiss",
};