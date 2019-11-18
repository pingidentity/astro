import React from "react";
import { mount } from "enzyme";
import Tutorial from "../../general/Tutorial";

const defaultProps = {
    active: 0,
    visible: false,
    messageWelcomeTitle: "Test Title",
    messageWelcomeDescription: "Test description...",
    steps: [
        {
            title: "Step 1 Title",
            description: "Step 1 description...",
            side: "bottom",
            target: () => document.querySelectorAll("[data-id='BasicInputs']")[0]
        },
        {
            title: "Step 2 Title",
            description: "Step 2 description...",
            side: "bottom",
            target: () => document.querySelectorAll("[data-id='BasicInputs']")[0]
        },
        {
            title: "Step 3 Title",
            description: "Step 3 description...",
            side: "bottom",
            target: () => document.querySelectorAll("[data-id='BasicInputs']")[0]
        },
    ]
};

const getComponent = props => mount((
    <Tutorial {...defaultProps} {...props} />
));

describe("UnitInput", () => {
    it("renders with default data-id", () => {
        const component = getComponent();
        const tutorial = component.find("[data-id='tutorial']");
        expect(tutorial.exists()).toEqual(true);
    });

    it("renders with custom data-id", () => {
        const component = getComponent({
            "data-id": "tutorial-custom"
        });
        const tutorial = component.find("[data-id='tutorial-custom']");
        expect(tutorial.exists()).toEqual(true);
    });

    it("renders the dark theme on welcome modal", () => {
        const component = getComponent({
            theme: Tutorial.themes.DARK,
            visible: true,
            active: 0,
        });
        const tutorial = component.find(".tutorial__welcome--dark");
        expect(tutorial.exists()).toEqual(true);
    });

    it("renders the dark theme on a step", () => {
        const component = getComponent({
            theme: Tutorial.themes.DARK,
            visible: true,
            active: 1,
        });
        const tutorial = component.find(".tutorial__modal--dark");
        expect(tutorial.exists()).toEqual(true);
    });

    it("renders the welcome modal", () => {
        const component = getComponent({
            visible: true,
            active: 0,
        });
        const welcomeModal = component.find(".tutorial__welcome");
        expect(welcomeModal.exists()).toEqual(true);
        expect(welcomeModal.find(".tutorial__welcome--title").text()).toEqual("Test Title");
        expect(welcomeModal.find(".tutorial__welcome--description").text()).toEqual("Test description...");
    });

    it("renders custom buttons on welcome modal", () => {
        const component = getComponent({
            visible: true,
            active: 0,
            labelDismiss: "Test Dismiss",
            labelGetStarted: "Test Get Started",
        });
        const welcomeModal = component.find(".tutorial__welcome--actions");
        const nextButton = welcomeModal.find("button");
        expect(nextButton.text()).toEqual("Test Get Started");
        const dismissButton = welcomeModal.find("a");
        expect(dismissButton.text()).toEqual("Test Dismiss");
    });

    it("calls onNext on welcome modal next click", () => {
        const onNext = jest.fn();
        const component = getComponent({
            visible: true,
            active: 0,
            onNext,
        });
        const welcomeModal = component.find(".tutorial__welcome--actions");
        const nextButton = welcomeModal.find("button");
        nextButton.simulate("click");
        expect(onNext).toHaveBeenCalled();
    });

    it("calls onClose on welcome modal dismiss click", () => {
        const onClose = jest.fn();
        const component = getComponent({
            visible: true,
            active: 0,
            onClose
        });
        const welcomeModal = component.find(".tutorial__welcome--actions");
        const dismissButton = welcomeModal.find("a");
        dismissButton.simulate("click");
        expect(onClose).toHaveBeenCalled();
    });

    it("renders custom buttons on step modal", () => {
        const component = getComponent({
            visible: true,
            active: 1,
            labelNext: "Test Next",
            labelPrevious: "Test Back",
        });
        const tutorialModal = component.find(".tutorial__modal--actions");
        const nextButton = tutorialModal.find("button");
        expect(nextButton.text()).toEqual("Test Next");
        const dismissButton = tutorialModal.find("a");
        expect(dismissButton.text()).toEqual("Test Back");
    });

    it("renders custom buttons on final step modal", () => {
        const component = getComponent({
            visible: true,
            active: 3,
            labelFinal: "Test Final",
            labelPrevious: "Test Back",
        });
        const tutorialModal = component.find(".tutorial__modal--actions");
        const finalButton = tutorialModal.find("button");
        expect(finalButton.text()).toEqual("Test Final");
        const dismissButton = tutorialModal.find("a");
        expect(dismissButton.text()).toEqual("Test Back");
    });

    it("calls onNext on step modal next click", () => {
        const onNext = jest.fn();
        const component = getComponent({
            visible: true,
            active: 1,
            onNext
        });
        const tutorialModal = component.find(".tutorial__modal--actions");
        const nextButton = tutorialModal.find("button");
        nextButton.simulate("click");
        expect(onNext).toHaveBeenCalled();
    });

    it("calls onPrevious on step modal back click", () => {
        const onPrevious = jest.fn();
        const component = getComponent({
            visible: true,
            active: 1,
            onPrevious
        });
        const tutorialModal = component.find(".tutorial__modal--actions");
        const backButton = tutorialModal.find("a");
        backButton.simulate("click");
        expect(onPrevious).toHaveBeenCalled();
    });

    it("populates the active step content", () => {
        const component = getComponent({
            visible: true,
            active: 1,
        });
        const tutorialModal = component.find(".tutorial__modal");
        const modalTitle = tutorialModal.find(".tutorial__modal--title");
        expect(modalTitle.text()).toEqual("Step 1 Title");
        const modalDescription = tutorialModal.find(".tutorial__modal--description");
        expect(modalDescription.text()).toEqual("Step 1 description...");
    });

    it("renders headerContent in step if provided", () => {
        const component = getComponent({
            visible: true,
            active: 1,
            steps: [
                {
                    title: "Step 1 Title",
                    description: "Step 1 description...",
                    side: "bottom",
                    headerContent: "Test header content...",
                    target: () => document.querySelectorAll("[data-id='BasicInputs']")[0]
                },
            ]
        });
        const tutorialModal = component.find(".tutorial__modal");
        const modalHeader = tutorialModal.find(".tutorial__modal--header");
        expect(modalHeader.text()).toEqual("Test header content...");
    });

    it("properly renders the progress indicator", () => {
        const component = getComponent({
            visible: true,
            active: 2,
        });
        expect(component.find(".tutorial__modal--step--complete").length).toEqual(1);
        expect(component.find(".tutorial__modal--step--active").length).toEqual(1);
        expect(component.find(".tutorial__modal--step--inactive").length).toEqual(1);
    });
});