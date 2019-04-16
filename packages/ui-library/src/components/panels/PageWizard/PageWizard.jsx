import React from "react";
import ButtonBar from "../../forms/ButtonBar";
import Menu from "./Menu";
import Messages from "../../general/messages/index";
import PageSpinner from "../../general/PageSpinner";
import PropTypes from "prop-types";
import Step from "./Step";

import _ from "underscore";
import classnames from "classnames";
import Utils from "../../../util/Utils";
import { lightInputs } from "../../../util/CSSModifiers";


/**
 * @class PageWizard
 * @desc Displays a modal-like page that leads the user through sequential required and non-required steps.
 *
 * @param {string} [data-id="wizard"]
 *     Value of the "data-id" assigned to the top-level HTML container.
 * @param {number} [activeStep=0]
 *     The zero-based index of the step to display.
 * @param {Messages} [messageProps]
 *     An object containing the props for the Messages displayed in the active step. Any props specified
 *     in the Messages will override the default behavior.  Any unassigned properties
 *     will take the wizard defaults. See the Message component for full documentation of these props.
 * @param {ButtonBar} [buttonBarProps]
 *     An object containing the props for the buttonBar displayed in the active step. Any props specified
 *     in the buttonBar will override the default behavior as well as the step-level onSave.  Any unassigned properties
 *     will take the wizard defaults. See the ButtonBar component for full documentation of these props.
 * @param {Array.<StringEntry>} [strings]
 *     An object containing key/text pairs of the text (menuTitle, dividerTitle) in the wizard menu.
 * @param {Array.<TitleValuePair>} [headerItems]
 *     An array of objects containing the information to display horizontally along the top of the wizard. This data
 *     usually relates to information saved in a previous step.
 * @param {PageWizard~onCancel} [onCancel]
 *     Handler function triggered when the cancel button is clicked. Note that this function is not triggered when a
 *     skip button is clicked.
 * @param {PageWizard~onClose} [onClose]
 *     Handler function triggered when the close "x" button in the top cornder is clicked.
 * @param {PageWizard~onMenuClick} [onMenuClick]
 *     Handle clicks on the menu items in the sidebar. Called with the index of the step.
 * @param {PageWizard~onNext} [onNext]
 *     Handler function triggered when the next button is clicked. Note that this funtion is not triggered when a save
 *     button is clicked.
 * @param {ButtonBar~onSave} [onSave]
 *     Handler function triggered when the save button is clicked.
 * @param {string|boolean} [loading]
 *     Whether to show the spinner. If it's a string, that will be the message shown while loading.
 */

/**
 * @typedef {object} StringEntry
 *
 * @property {string} [key]
 * @property {string} [text]
 */

/**
 * @typedef {object} TitleValuePair
 *
 * @property {string} [title]
 * @property {string} [value]
 */

/**
 * @typedef {function} PageWizard~onClose
 */

/**
 * @typedef {function} PageWizard~onCancel
 */

/**
 * @typedef {function} PageWizard~onMenuClick
 *
 * @param {number} step
 *     Index of the step
 */

/**
 * @typedef {function} PageWizard~onNext
 */

/**
 * @typedef {Array} PageWizard~headerItems
 *
 * @param {string} [title]
 *     The title or label displayed above the value.
 * @param {string} [value]
 *     The value to display below the title :-|
 */

/**
 * @typedef {Object} PageWizard~strings
 *
 * @param {string} [key]
 *     The key used to display a specific bit of text.
 * @param {string} [text]
 *     The text associated with the key.
 */

/**
  * @class PageWizard~Step
  * @desc Displays a single wizard step.
  * @param {string} [data-id="wizard"]
  *     Value of the "data-id" assigned to the top-level HTML container of the step.
  * @param {boolean} [completed=false]
  *     Determines whether to render the step as completed in the menu.
  * @param {boolean|string} [loading]
  *     loading is set to true and if text is provided then the spinner will render the text.
  * @param {boolean} [continueDisabled=false]
  *     Determines whether to render the next or save button as disabled.
  * @param {string} [description]
  *     The text displayed below the title in the wizard body when the step is active.
  * @param {boolean} [hideButtonbar=false]
  *     When true, the button bar is not rendered on the page
  * @param {boolean} [hideMenu=false]
  *     When true, the wizard menu is not rendered on the page
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
  * @param {ButtonBar~onSave} [onSave]
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

class PageWizard extends React.Component {

    static displayName = "PageWizard";

    static propTypes = {
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
        onMenuClick: PropTypes.func,
        onNext: PropTypes.func,
        onSave: PropTypes.func,
        loading: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ])
    };

    static defaultProps = {
        activeStep: 1,
        buttonBarProps: {},
        "data-id": "wizard",
        headerItems: [],
        loading: false,
        messageProps: null,
        onCancel: _.noop,
        onMenuClick: _.noop,
        onNext: _.noop,
        required: false,
    };

    constructor(props) {
        super(props);
        this._triggerEvent(true);
    }

    _triggerEvent(open) {
        const eventName = open ? "ui-library-modal-open" : "ui-library-modal-close";
        const eventDetail = { component: this.displayName };
        let event;

        if (Utils.isIE()) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(eventName, true, false, eventDetail);
        } else {
            event = new CustomEvent(eventName, { bubbles: true, detail: eventDetail });
        }
        document.body.dispatchEvent(event);
    }

    componentWillUnmount() {
        this._triggerEvent(false);
    }

    render() {
        const {
            activeStep: activeStepIndex,
            buttonBarProps,
            children,
            ["data-id"]: dataId,
            loading,
            headerItems,
            messageProps,
            onCancel,
            onClose,
            onMenuClick,
            onNext,
            onSave,
            strings,
        } = this.props;

        let activeStep;
        let requiredSteps = [];
        let optionalSteps = [];
        let hasHeaderItems = headerItems && headerItems.length > 0;

        React.Children.toArray(children)
            .filter(({ props } = {}) => props !== undefined)
            .forEach((child, index) => {
                const childProps = _.defaults(
                    {
                        "data-id": child.props["data-id"] || `${dataId}-step`,
                        active: index === activeStepIndex,
                        index: index,
                        key: index,
                    },
                    child.props
                );
                if (index === activeStepIndex) {
                    activeStep = React.cloneElement(child, childProps);
                }

                if (child.props.required) {
                    requiredSteps.push(childProps);
                } else {
                    optionalSteps.push(childProps);
                }
            });

        const classNames = classnames("wizard2", {
            "wizard2--header-shown": hasHeaderItems,
            "wizard2--menu-hidden": activeStep.props.hideMenu,
            "wizard2--buttonbar-hidden": activeStep.props.hideButtonBar,
        });

        return (
            <div data-id={dataId} className={classNames}>
                {hasHeaderItems && <Header data-id={dataId} sections={headerItems}/> }
                <button
                    className="wizard2-close-btn"
                    onClick={onClose || onCancel}
                    data-id={`${dataId}-close-button`}
                />
                <div className={classnames("wizard2__content", lightInputs)}>
                    {messageProps && <Messages {...messageProps} />}
                    <ActiveStep
                        data-id={dataId}
                        step={activeStep}
                        stepTotal={requiredSteps.length + optionalSteps.length}
                        stepIndex={activeStep.props.required
                            ? _.findIndex(requiredSteps, activeStep.props)
                            : _.findIndex(optionalSteps, activeStep.props) + requiredSteps.length
                        }
                        hasOptional={optionalSteps.length > 0}
                        hideButtonBar={activeStep.props.hideButtonBar}
                        buttonBarProps={buttonBarProps}
                        loading={loading}
                        onCancel={onCancel}
                        onNext={onNext}
                        onSave={onSave}
                    />
                </div>
                {!activeStep.props.hideMenu && (
                    <Menu
                        optionalSteps={optionalSteps}
                        requiredSteps={requiredSteps}
                        activeStep={activeStepIndex}
                        data-id={dataId}
                        strings={strings}
                        onMenuClick={onMenuClick}
                    />
                )}
            </div>
        );
    }
}


function ActiveStep(props) {
    const buttonBarDefaults = { visible: !props.hideButtonBar };
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
                    className="wizard2__page-loader"
                    show
                    modal
                >
                    {props.step.props.loading !== true && props.step.props.loading}
                </PageSpinner>
            )}
            {props.step}
            <ButtonBar
                key="button-bar"
                data-id={`${props["data-id"]}-buttonbar`}
                className="wizard2__button-bar"
                {...buttonBarProps}
            />
        </div>
    );
}

function Header(props) {
    return (
        <div className="wizard2__header" data-id={`${props["data-id"]}-headeritems`}>
            {
                _.map(props.sections, (section, index) => {
                    return (
                        <div
                            className="wizard2__header-details"
                            key={index}
                            data-id={`${props["data-id"]}-headeritem-${index}`}
                            title={section.value}>
                            <div
                                className="wizard2__header-title"
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

PageWizard.Step = Step;
PageWizard.DefaultText = DEFAULT_TEXT;
export default PageWizard;
