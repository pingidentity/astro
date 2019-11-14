import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button, { buttonTypes } from "../buttons/Button";
import FlexRow from "../layout/FlexRow";
import Icon, { iconTypes } from "../general/Icon";
import PopperContainer from "../tooltips/PopperContainer";
import { inStateContainer } from "../utils/StateContainer";

const OFFSET = 25;

export default class Tutorial extends React.Component {
    constructor(props) {
        super(props);
        this.modal = React.createRef();
    }

    _renderWelcome = () => {
        return (
            <div className="tutorial__welcome">

            </div>
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
                <div className="tutorial__modal--header">
                    {headerContent ? headerContent : null}
                </div>
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
                <li className={indicatorClassnames}></li>
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

    _renderPopup = (steps, active) => {
        const step = steps[active - 1];
        if (active > 0 && step) {
            return (
                <PopperContainer
                    getReference={step.target}
                    placement="bottom"
                >
                    <div className="tutorial__modal" ref={this.modal}>
                        <div className="tutorial__modal--close">
                            <Icon iconName="clear" type={iconTypes.INLINE} />
                        </div>
                        {this._renderStepContent(step)}
                        <div className="tutorial__modal--footer">
                            <FlexRow>
                                <div>
                                    {this._renderProgress(active, steps.length)}
                                </div>
                                <div>
                                    <Button onClick={this.props.onPrevious}>Back</Button>
                                    <Button type={buttonTypes.PRIMARY} onClick={this.props.onNext}>Next</Button>
                                </div>
                            </FlexRow>
                        </div>
                    </div>
                </PopperContainer>
            );
        }
    }

    _getReference = () => this.props.target;

    render() {
        const {
            "data-id": dataId,
            active,
            steps,
        } = this.props;

        return (
            <div className="tutorial">
                <div className="tutorial__bg">
                    { active === 0 ? (
                        this._renderWelcome()
                    ) : (
                        this._renderPopup(steps, active)
                    )}
                </div>
            </div>
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
    messageWelcomeTitle: PropTypes.node,
    messageWelcomeDescription: PropTypes.node,
    labelGetStarted: PropTypes.string,
    labelNext: PropTypes.string,
    labelPrevious: PropTypes.string,
    labelDismiss: PropTypes.string,
};

Tutorial.defaultProps = {
    visible: true,
    active: 0,
};