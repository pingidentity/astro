window.__DEV__ = true;

jest.dontMock("../Step");
jest.dontMock("../Wizard");
jest.dontMock("../Menu");
jest.dontMock("../../general/messages/");
jest.dontMock("../../forms/ButtonBar");
jest.dontMock("../../general/EllipsisLoaderButton");



describe("WizardV2", function () {

    const React = require("react"),
        TestUtils = require("../../../testutil/TestUtils"),
        ReactTestUtils = require("react-dom/test-utils"),
        ReactDOM = require("react-dom"),
        Wizard = require("../Wizard"),
        Wrapper = TestUtils.UpdatePropsWrapper,
        Step = Wizard.Step,
        _ = require("underscore");


    const wizardDefaultProps = {
        "data-id": "mrwizard",
        headerItems: [
            { title: "title 1", value: "value 1" },
            { title: "title 2", value: "value 2" },
            { title: "title 3", value: "value 3" },
        ],
        onCancel: jest.genMockFunction(),
        onMenuClick: jest.genMockFunction(),
        onNext: jest.genMockFunction(),
    };

    const defaultStepData = [
        {
            children: "step 1 content",
            description: "step 1 description",
            menuDescription: "step 1 menu description",
            title: "step 1 title",
            menuTitle: "step 1 menu title",
            onSave: jest.genMockFunction(),
            required: true,
        },
        {
            children: "step 2 content",
            description: "step 2 description",
            menuDescription: "step 2 menu description",
            title: "step 2 title",
            menuTitle: "step 2 menu title",
        },
        {
            children: "step 3 content",
            description: "step 3 description",
            menuDescription: "step 3 menu description",
            title: "step 3 title",
            menuTitle: "step 3 menu title",
            onSave: jest.genMockFunction(),
        }
    ];


    function getComponent (optionalProps, optionalStepData) {
        const stepData = optionalStepData ? optionalStepData : defaultStepData;

        const defaultSteps = stepData.map(function (stepdata, index) {
            return <Step {...stepData[index]} />;
        });

        return ReactTestUtils.renderIntoDocument(
            <Wizard {..._.extend({}, wizardDefaultProps, optionalProps)}>
                {defaultSteps}
            </Wizard>
        );
    }

    function getElementByDid (container, didExtension) {
        return TestUtils.findRenderedDOMNodeWithDataId(container, `${wizardDefaultProps["data-id"]}${didExtension}`);
    }


    it("renders the wizard title, description, and content for each step", function () {
        defaultStepData.map(function (dataItem, index) {
            const component = getComponent({ activeStep: index });
            const wizardTitle = getElementByDid(component, "-step-title");
            const wizardDescription = getElementByDid(component, "-step-description");
            const wizardContent = getElementByDid(component, "-step-content");

            expect(wizardTitle.textContent).toBe(dataItem.title);
            expect(wizardDescription.textContent).toBe(dataItem.description);
            expect(wizardContent.textContent).toBe(dataItem.children);
        });
    });

    it("renders the step menuTitle in the wizard if not step title is provided", function () {
        let stepData = defaultStepData.map(function (step) {
            const alteredStep = _.clone(step);
            alteredStep.title = null;
            return alteredStep;
        });

        stepData.map(function (dataItem, index) {
            const component = getComponent({ activeStep: index }, stepData);
            const wizardTitle = getElementByDid(component, "-step-title");

            expect(wizardTitle.textContent).toBe(dataItem.menuTitle);
        });
    });

    it("renders the step menuDescription in the wizard if not step description is provided", function () {
        let stepData = defaultStepData.map(function (step) {
            const alteredStep = _.clone(step);
            alteredStep.description = null;
            return alteredStep;
        });

        stepData.map(function (dataItem, index) {
            const component = getComponent({ activeStep: index }, stepData);
            const wizardDescription = getElementByDid(component, "-step-description");

            expect(wizardDescription.textContent).toBe(dataItem.menuDescription);
        });
    });

    it("renders the header items when provided", function () {
        let component = getComponent();
        let renderedItems = getElementByDid(component, "-headeritems");
        const dataItems = wizardDefaultProps.headerItems;


        // with header items
        expect(renderedItems.children.length).toBe(wizardDefaultProps.headerItems.length);
        dataItems.map(function (dataItem, index) {
            const renderedItem = getElementByDid(component, `-headeritem-${index}`);
            const renderedItemTitle = getElementByDid(renderedItem, `-headeritem-title-${index}`);

            expect(renderedItemTitle.textContent).toBe(dataItem.title);
            expect(renderedItem.textContent).toContain(dataItem.value);
        });

        // without header items
        component = getComponent({ headerItems: [] });
        renderedItems = getElementByDid(component, "-headeritems");
        expect(renderedItems).toBeFalsy();
    });

    it("renders the button bar and the proper callbacks are called on a SAVING step", function () {
        const component = getComponent({ activeStep: 0 });
        const primaryButton = getElementByDid(component, "-buttonbar-save");
        const secondaryButton = getElementByDid(component, "-buttonbar-cancel");

        expect(primaryButton.textContent).toBe("Save and Continue");
        expect(primaryButton.className).toContain("success");
        ReactTestUtils.Simulate.click(primaryButton);
        expect(component.props.children[0].props.onSave).toBeCalled();

        expect(secondaryButton.textContent).toBe("Cancel");
        expect(secondaryButton.className).toContain("cancel");
        ReactTestUtils.Simulate.click(secondaryButton);
        expect(component.props.onCancel).toBeCalled();
    });

    it("renders the button bar and the proper callbacks are called on an OPTIONAL step", function () {
        const component = getComponent({ activeStep: 1 });
        const primaryButton = getElementByDid(component, "-buttonbar-save");
        const secondaryButton = getElementByDid(component, "-buttonbar-cancel");

        expect(primaryButton.textContent).toBe("Skip");
        expect(primaryButton.className).toContain("secondary");
        ReactTestUtils.Simulate.click(primaryButton);
        expect(component.props.onNext).toBeCalled();

        expect(secondaryButton.textContent).toBe("Cancel");
    });

    it("renders the button bar and the proper callbacks are called on the FINAL step", function () {
        const component = getComponent({ activeStep: 2 });
        const primaryButton = getElementByDid(component, "-buttonbar-save");
        const secondaryButton = getElementByDid(component, "-buttonbar-cancel");

        expect(primaryButton.textContent).toBe("Save and Close");
        expect(primaryButton.className).toContain("success");
        ReactTestUtils.Simulate.click(primaryButton);
        expect(component.props.children[2].props.onSave).toBeCalled();

        expect(secondaryButton.textContent).toBe("Cancel");
        expect(secondaryButton.className).toContain("cancel");
        ReactTestUtils.Simulate.click(secondaryButton);
        expect(component.props.onCancel).toBeCalled();
    });

    it("renders the step properly if in a dirty state", function () {
        let stepData = _.clone(defaultStepData);
        stepData[1].dirty = true;

        const component = getComponent({}, stepData);
        const primaryButton = getElementByDid(component, "-buttonbar-save");
        const secondaryButton = getElementByDid(component, "-buttonbar-cancel");

        expect(primaryButton.textContent).toBe("Next");
        expect(primaryButton.className).toContain("primary");
        ReactTestUtils.Simulate.click(primaryButton);
        expect(component.props.onNext).toBeCalled();

        expect(secondaryButton.textContent).toBe("Cancel");
    });

    it("buttonBarProps overrides button bar display and callbacks when provided", function () {
        const buttonBarData = {
            cancelText: "No",
            saveText: "OK",
            cancelClassName: "custom-cancel-class",
            saveClassName: "custom-save-class",
            onCancel: jest.genMockFunction(),
            onSave: jest.genMockFunction(),
        };

        const component = getComponent({ buttonBarProps: buttonBarData });
        const primaryButton = getElementByDid(component, "-buttonbar-save");
        const secondaryButton = getElementByDid(component, "-buttonbar-cancel");

        expect(primaryButton.textContent).toBe(buttonBarData.saveText);
        expect(primaryButton.className).toContain(buttonBarData.saveClassName);
        ReactTestUtils.Simulate.click(primaryButton);
        expect(buttonBarData.onSave).toBeCalled();

        expect(secondaryButton.textContent).toBe(buttonBarData.cancelText);
        expect(secondaryButton.className).toContain(buttonBarData.cancelClassName);
        ReactTestUtils.Simulate.click(secondaryButton);
        expect(buttonBarData.onCancel).toBeCalled();
    });

    it("renders the default menu title and divider text", function () {
        const component = getComponent();
        const menuTitle = getElementByDid(component, "-menu-title");
        const menuDividerTitle = getElementByDid(component, "-menu-divider-title");

        expect(menuTitle.textContent).toBe("Progress");
        expect(menuDividerTitle.textContent).toBe("Optional Configurations");
    });

    it("renders custom menu title and divider text", function () {
        const wizardProps = {
            strings: {
                menuTitle: "Custom Wizard Title",
                dividerTitle: "Custom Divider Title",
            }
        };
        const component = getComponent(wizardProps);
        const menuTitle = getElementByDid(component, "-menu-title");
        const menuDividerTitle = getElementByDid(component, "-menu-divider-title");

        expect(menuTitle.textContent).toBe(wizardProps.strings.menuTitle);
        expect(menuDividerTitle.textContent).toBe(wizardProps.strings.dividerTitle);
    });

    it("renders the close button and triggers the callback when clicked", function () {
        const component = getComponent();
        const closeButton = getElementByDid(component, "-close-button");

        expect(closeButton).toBeTruthy();
        expect(closeButton.className).toBe("wizard-close-btn");
        ReactTestUtils.Simulate.click(closeButton);
        expect(component.props.onCancel).toBeCalled();
    });

    it("renders the menu items properly", function () {
        const activeStep = 1;
        const completedStep = 0;
        const wizardProps = { activeStep: activeStep };

        let stepData = _.clone(defaultStepData);
        stepData[completedStep].completed = true;

        const component = getComponent(wizardProps, stepData);
        const renderedMenuItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(
            component, "wizard-progress-menu__step"
        );

        expect(renderedMenuItems.length).toBe(stepData.length);

        renderedMenuItems.map(function(item, itemIndex) {
            const itemClasses = item.className;
            const itemIcon = item.children[0];
            const itemTitle = item.children[1];
            const itemDescription = item.children[2];

            expect(itemIcon.className).toContain("wizard-progress-menu__step-icon");

            expect(itemTitle.className).toContain("wizard-progress-menu__item-title");
            expect(itemTitle.textContent).toBe(stepData[itemIndex].menuTitle);

            expect(itemDescription.className).toContain("wizard-progress-menu__item-description");
            expect(itemDescription.textContent).toBe(stepData[itemIndex].menuDescription);


            // check if the required and optional steps have the right classes
            if (itemIndex === 0) {
                expect(itemIcon.className).toContain("wizard-progress-menu__step-icon--required");
                expect(itemIcon.className).not.toContain("wizard-progress-menu__step-icon--optional");
            } else {
                expect(itemIcon.className).not.toContain("wizard-progress-menu__step-icon--required");
                expect(itemIcon.className).toContain("wizard-progress-menu__step-icon--optional");
            }

            // check if the completed step has the right class
            if (itemIndex === completedStep) {
                expect(itemIcon.className).toContain("wizard-progress-menu__step-icon--completed");
            } else {
                expect(itemIcon.className).not.toContain("wizard-progress-menu__step-icon--completed");
            }

            // check if the disabled step has the right class
            if (itemIndex >= activeStep) {
                expect(itemClasses).toContain("wizard-progress-menu__step--click-disabled");
            } else {
                expect(itemClasses).not.toContain("wizard-progress-menu__step--click-disabled");
            }

            // check if the activeStep step has the right classes
            if (itemIndex === activeStep) {
                expect(itemClasses).toContain("wizard-progress-menu__step--active");
                expect(itemIcon.className).toContain("wizard-progress-menu__step-icon--optional-active");
            } else {
                expect(itemClasses).not.toContain("wizard-progress-menu__step--active");
                expect(itemIcon.className).not.toContain("wizard-progress-menu__step-icon--optional-active");
            }

        });

    });

    it("renders the step description in the menu if no menuDescription is provided", function () {
        let stepData = defaultStepData.map(function (step) {
            const alteredStep = _.clone(step);
            alteredStep.menuDescription = null;
            return alteredStep;
        });

        const component = getComponent({}, stepData);

        const renderedMenuItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(
            component, "wizard-progress-menu__step"
        );

        renderedMenuItems.map(function(item, itemIndex) {
            expect(item.children[2].textContent).toBe(stepData[itemIndex].description);
        });
    });

    it("disabled items do not trigger callback", function () {
        const component = getComponent();
        const renderedMenuItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(
            component, "wizard-progress-menu__step"
        );

        ReactTestUtils.Simulate.click(renderedMenuItems[2]);
        expect(component.props.onMenuClick).not.toBeCalled();

        ReactTestUtils.Simulate.click(renderedMenuItems[0]);
        expect(component.props.onMenuClick).toBeCalled();
    });

    it("clicking menu items changes selected menu item / visited optional steps become clickable", function () {
        const initialActiveStep = 1;
        const nextActiveStep = 2;
        const mySteps = _.clone(defaultStepData);
        let myProps = _.clone(wizardDefaultProps);

        myProps.activeStep = initialActiveStep;

        const component = ReactTestUtils.renderIntoDocument(
            <Wrapper type={Wizard} {...myProps}>
                {mySteps.map(function (stepdata, index) {
                    return <Step {...mySteps[index]} />;
                })}
            </Wrapper>
        );
        const renderedMenuItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(
            component, "wizard-progress-menu__step"
        );

        renderedMenuItems.map(function(item, itemIndex) {
            if (itemIndex === initialActiveStep) {
                expect(renderedMenuItems[itemIndex].className).toContain("wizard-progress-menu__step--click-disabled");
                expect(renderedMenuItems[itemIndex].className).toContain("wizard-progress-menu__step--active");
            } else {
                expect(renderedMenuItems[itemIndex].className).not.toContain("wizard-progress-menu__step--active");
            }
        });

        component._setProps({ activeStep: nextActiveStep });

        renderedMenuItems.map(function(item, itemIndex) {
            if (itemIndex === initialActiveStep) {
                // expect(renderedMenuItems[itemIndex].className).not.toContain("wizard-progress-menu__step--click-disabled");
            }

            if (itemIndex === nextActiveStep) {
                expect(renderedMenuItems[itemIndex].className).toContain("wizard-progress-menu__step--active");
            } else {
                expect(renderedMenuItems[itemIndex].className).not.toContain("wizard-progress-menu__step--active");
            }
        });
    });

    it("displays a message when provided", function () {
        const messageProps = {
            "data-id": `${wizardDefaultProps["data-id"]}-messages`,
            messages: [
                {
                    text: "New Message added",
                    type: "notice",
                }
            ]
        };
        const component = getComponent({
            activeStep: 0,
            messageProps: messageProps,
        });

        const wizardMessage = getElementByDid(component, "-messages");

        expect(wizardMessage.textContent).toContain(messageProps.messages[0].text);

    });

    it("does not display the loader by default", function () {
        const component = getComponent({
            activeStep: 0,
        });

        const loader = getElementByDid(component, "-loader");
        expect(loader).toBeFalsy();
    });

    it("displays the loader when shown", function () {
        const activeStep = 0;
        let stepData = _.clone(defaultStepData);

        stepData[activeStep].loading = true;

        const component = getComponent({
            activeStep: activeStep,
        });

        const loader = getElementByDid(component, "-loader");
        expect(loader).toBeTruthy();
    });

    it("emits open and close events", function () {
        const openListenerCallback = jest.genMockFunction();
        const closeListenerCallback = jest.genMockFunction();

        document.body.addEventListener("uilibrary-wizard-open", openListenerCallback);
        document.body.addEventListener("uilibrary-wizard-close", closeListenerCallback);

        let component = getComponent();

        expect(openListenerCallback).toBeCalled();
        expect(closeListenerCallback).not.toBeCalled();

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
        expect(closeListenerCallback).toBeCalled();
    });

    it("emits open and close events in IE", function () {
        const UtilsMock = require("../../../util/Utils");
        UtilsMock.isIE = () => { return true; };

        const openListenerCallback = jest.genMockFunction();
        const closeListenerCallback = jest.genMockFunction();

        document.body.addEventListener("uilibrary-wizard-open", openListenerCallback);
        document.body.addEventListener("uilibrary-wizard-close", closeListenerCallback);

        let component = getComponent();

        expect(openListenerCallback).toBeCalled();
        expect(closeListenerCallback).not.toBeCalled();

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
        expect(closeListenerCallback).toBeCalled();
    });


});
