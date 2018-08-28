import React from "react";
import ButtonBar from "../forms/ButtonBar";
import Menu from "./Menu";
import Messages from "../general/messages/index";
import PageSpinner from "../general/PageSpinner";
import PropTypes from "prop-types";
import Step from "./Step";

import _ from "underscore";
import classnames from "classnames";
import Utils from "../../util/Utils";


/**
 * @class Wizard
 * @desc Displays a modal-like page that leads the user through sequential required and non-requied steps.
 *
 * @param {string} [data-id="wizard"]
 *     Value of the "data-id" assigned to the top-level HTML container.
 * @param {number} [activeStep=0]
 *     The zero-based index of the step to display.
 * @param {Object.Wizard~Messages} [messageProps]
 *     An object containing the props for the Messages displayed in the active step. Any props specified
 *     in the Messages will override the default behavior.  Any unassigned properties
 *     will take the wizard defaults. See the Message component for full documentation of these props.
 * @param {Object.Wizard~ButtonBar} [buttonBarProps]
 *     An object containing the props for the buttonBar displayed in the active step. Any props specified
 *     in the buttonBar will override the default behavior as well as the step-level onSave.  Any unassigned properties
 *     will take the wizard defaults. See the ButtonBar component for full documentation of these props.
 * @param {Object.Wizard} [strings]
 *     An object containing key/text pairs of the text (menuTitle, dividerTitle) in the wizard menu.
 * @param {Array.Wizard} [headerItems]
 *     An array of objects containing the information to display horizontally along the top of the wizard. This data
 *     usually relates to information saved in a previous step.
 * @param {Wizard~onCancel} [onCancel]
 *     Handler function triggered when the cancel button is clicked. Note that this function is not triggered when a
 *     skip button is clicked.
 * @param {Wizard~onNext} [onNext]
 *     Handler function triggered when the next button is clicked. Note that this funtion is not triggered when a save
 *     button is clicked.
 */

 /**
 * @typedef {Array} Wizard~headerItems
 *
 * @param {string} [title]
 *     The title or label displayed above the value.
 * @param {string} [value]
 *     The value to display below the title :-|
 */

 /**
 * @typedef {Object} Wizard~strings
 *
 * @param {string} [key]
 *     The key used to display a specific bit of text.
 * @param {string} [text]
 *     The text associated with the key.
 */

 /**
  * @class Step
  * @desc Displays a single wizard step.
  * @param {string} [data-id="wizard"]
  *     Value of the "data-id" assigned to the top-level HTML container of the step.
  * @param {boolean} [completed=false]
  *     Determines whether to render the step as completed in the menu.
  * @param {boolean} [continueDisabled=false]
  *     Determines whether to render the next or save button as disabled.
  * @param {string} [description]
  *     The text displayed below the title in the wizard body when the step is active.
  * @param {string} [menuDescription]
  *     The text displayed in the menu below the title.
  * @param {boolean} [required=false]
  *     Determines whether step is displayed under the required or optional steps in the menu.
  * @param {boolean} [dirty=false]
  *     Determines whether step an optional step is displayed with a skip or next button.
  * @param {string} [title]
  *     The text displayed at the top of the wizard body when the step is active.
  * @param {string} [menuTitle]
  *     The text displayed below the menu title in the menu for this step.
  * @param {Step~onSave} [onSave]
  *     Handler function triggered when the save button is clicked. When specified a save button is rendered in place of
  *     the next button.
 */



const DEFAULT_TEXT = {
    CANCEL: "Cancel",
    SAVE_AND_CONTINUE: "Save and Continue",
    SAVE_AND_CLOSE: "Save and Close",
    SKIP: "Skip",
    NEXT: "Next",
};

class Wizard extends React.Component {
    static displayName = "Wizard";

    static defaultProps = {
        activeStep: 1,
        buttonBarProps: {},
        messageProps: null,
        "data-id": "wizard",
        headerItems: [],
        loading: false,
        onCancel: _.noop,
        onNext: _.noop,
        required: false,
    };

    _triggerEvent(open) {
        const eventName = open ? "uilibrary-wizard-open" : "uilibrary-wizard-close";
        let event;

        if (Utils.isIE()) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(eventName, true, false, undefined);
        } else {
            event = new CustomEvent(eventName, { bubbles: true });
        }
        document.body.dispatchEvent(event);
    }

    componentWillMount() {
        this._triggerEvent(true);
    }

    componentWillUnmount() {
        this._triggerEvent(false);
    }

    render() {
        let activeStep;
        let requiredSteps = [];
        let optionalSteps = [];
        let hasHeaderItems = this.props.headerItems && this.props.headerItems.length > 0;

        React.Children.forEach(this.props.children, (child, index) => {
            if (child && typeof(child) === "object" && child.hasOwnProperty("props")) {

                const childProps = _.defaults(
                    {
                        "data-id": child.props["data-id"] || `${this.props["data-id"]}-step`,
                        active: index === this.props.activeStep,
                        index: index,
                        key: index,
                    },
                    child.props
                );
                if (index === this.props.activeStep) {
                    activeStep = React.cloneElement(child, childProps);
                }

                if (child.props.required) {
                    requiredSteps.push(childProps);
                } else {
                    optionalSteps.push(childProps);
                }
            }
        });

        return (
            <div
                data-id={this.props["data-id"]}
                className={classnames("wizard-2", hasHeaderItems ? "wizard-2--header-shown" : null)}>
                { hasHeaderItems && <Header data-id={this.props["data-id"]} sections={this.props.headerItems}/> }
                <div className="wizard__content">
                    {this.props.messageProps && <Messages {...this.props.messageProps} />}
                    <ActiveStep
                        data-id={this.props["data-id"]}
                        step={activeStep}
                        stepTotal={requiredSteps.length + optionalSteps.length}
                        stepIndex={activeStep.props.required
                            ? _.findIndex(requiredSteps, activeStep.props)
                            : _.findIndex(optionalSteps, activeStep.props) + requiredSteps.length
                        }
                        hasOptional={optionalSteps.length > 0}
                        {..._.pick(this.props, [
                            "buttonBarProps",
                            "loading",
                            "onCancel",
                            "onNext",
                            "onSave",
                        ])}
                    />
                </div>
                <Menu
                    optionalSteps={optionalSteps}
                    requiredSteps={requiredSteps}
                    {..._.pick(this.props, [
                        "activeStep",
                        "data-id",
                        "strings",
                        "onMenuClick",
                        "onClose",
                    ])}
                />
            </div>
        );
    }
}


function ActiveStep(props) {
    const buttonBarDefaults = { visible: true };
    const lastStep = props.stepIndex === props.stepTotal - 1;
    const stepSaveCallback = props.step.props.onSave;
    const stepNotCompleted = !props.step.props.completed;
    const stepContinueDisabled = props.step.props.continueDisabled;


    // Save button styling and text
    if (stepSaveCallback && stepNotCompleted) {
        if (lastStep) {
            buttonBarDefaults.saveText = DEFAULT_TEXT.SAVE_AND_CLOSE;
        } else {
            buttonBarDefaults.saveText = DEFAULT_TEXT.SAVE_AND_CONTINUE;
        }
        buttonBarDefaults.saveClassName = "success";

    } else if (props.step.props.dirty || stepSaveCallback || props.step.props.required) {
        buttonBarDefaults.saveText = DEFAULT_TEXT.NEXT;
        buttonBarDefaults.saveClassName = "primary";
    } else {
        buttonBarDefaults.saveText = DEFAULT_TEXT.SKIP;
        buttonBarDefaults.saveClassName = "secondary";
    }

    buttonBarDefaults.saveDisabled = stepContinueDisabled ? true : false;

    // Save button callback
    if (stepSaveCallback && stepNotCompleted) {
        buttonBarDefaults.onSave = props.step.props.onSave;
    } else if (lastStep && stepNotCompleted) {
        buttonBarDefaults.onSave = props.onClose;
    } else {
        buttonBarDefaults.onSave = props.onNext;
    }

    // Cancel button styling, text, and callback
    buttonBarDefaults.cancelText = DEFAULT_TEXT.CANCEL;
    buttonBarDefaults.onCancel = props.onCancel;
    buttonBarDefaults.cancelClassName = "cancel";

    const buttonBarProps = _.defaults({}, props.buttonBarProps, buttonBarDefaults);

    return (
        <div>
            {props.step.props.loading && (
                <PageSpinner
                    data-id={`${props["data-id"]}-loader`}
                    className="page-loader__wizard"
                    show
                    modal
                />
            )}
            {props.step}
            <ButtonBar
                key="button-bar"
                data-id={`${props["data-id"]}-buttonbar`}
                className="wizard__button-bar"
                {...buttonBarProps}
            />
        </div>
    );
}

function Header(props) {
    return (
        <div className="wizard__header" data-id={`${props["data-id"]}-headeritems`}>
            {
                _.map(props.sections, (section, index) => {
                    return (
                        <div
                            className="wizard__header-details"
                            key={index}
                            data-id={`${props["data-id"]}-headeritem-${index}`}
                            title={section.value}>
                            <div
                                className="wizard__header-title"
                                data-id={`${props["data-id"]}-headeritem-title-${index}`}>
                                {section.title}
                            </div>
                            {section.value}
                        </div>
                    );
                })
            }
        </div>
    );
}

Wizard.propTypes = {
    activeStep: PropTypes.number,
    buttonBarProps: PropTypes.object,
    messageProps: PropTypes.object,
    "data-id": PropTypes.string,
    headerItems: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            value: PropTypes.string,
        })
    ),
    strings: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            text: PropTypes.string,
        })
    ),
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    onNext: PropTypes.func,
    onSave: PropTypes.func,
    stepTotal: PropTypes.number,
};

Wizard.Step = Step;
Wizard.DefaultText = DEFAULT_TEXT;
export default Wizard;
