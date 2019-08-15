import React from "react";
import FormValidator, { FormTextFieldValidated, ButtonBarValidated } from "../FormValidator";
import { mount } from "enzyme";

describe("FormValidator", function() {
    const mountComponent = ({ buttonBarProps = {}, ...props } = {}) => mount(
        <FormValidator {...props}>
            <FormTextFieldValidated data-id="name-field" formKey="name" />
            <FormTextFieldValidated data-id="email-field" formKey="email" />
            <ButtonBarValidated data-id="button-bar" {...buttonBarProps} />
        </FormValidator>
    );

    const getSaveButton = component => component.find("button[data-id='button-bar-save']");
    const getDiscardButton = component => component.find("button[data-id='button-bar-discard']");
    const getNameField = component => component.find("label[data-id='name-field'] input");

    it("should render with button bar", function() {
        const component = mountComponent();

        expect(component.find("div[data-id='button-bar']").exists()).toBeTruthy();
    });

    it("disables save button when a required value is undefined", function () {
        const component = mountComponent({
            requiredValues: [ 1, 2, undefined ]
        });

        expect(component.find("button[data-id='button-bar-save'][disabled=true]").exists()).toBeTruthy();
    });

    it("disables save button when a required value is an empty string", function () {
        const component = mountComponent({
            requiredValues: [ "3", "4", "" ]
        });

        expect(component.find("button[data-id='button-bar-save'][disabled=true]").exists()).toBeTruthy();
    });

    it("doesn't disable save button when all required values are defined", function () {
        const component = mountComponent({
            requiredValues: [ "3", "4", "5" ]
        });

        expect(getSaveButton(component).exists()).toBeTruthy();
        expect(component.find("button[data-id='button-bar-save'][disabled=true]").exists()).toBeFalsy();
    });

    it("calls onInvalidSave when the save button is clicked while there's an invalid value", function() {
        const callback = jest.fn();

        const component = mountComponent({
            fields: {
                name: {
                    errorMessage: "STOP"
                },
                email: {},
            },
            onInvalidSave: callback,
        });

        expect(callback).not.toBeCalled();
        getSaveButton(component).simulate("mouseDown");
        expect(callback).toBeCalled();
    });

    it("calls onSave when everything's valid", function() {
        const callback = jest.fn();

        const component = mountComponent({
            fields: {
                name: {
                    errorMessage: ""
                }
            },
            buttonBarProps: {
                onSave: callback,
            },
        });

        expect(callback).not.toBeCalled();
        getSaveButton(component).simulate("click");
        expect(callback).toBeCalled();
    });

    it("doesn't show an error message on a field until it blurs", function() {
        const component = mountComponent({
            fields: {
                name: {
                    errorMessage: "STOP"
                },
                email: {},
            },
        });

        expect(component.find("div[data-id='name-field-error-message']").exists()).toBeFalsy();
        getNameField(component).simulate("blur");
        expect(component.find("div[data-id='name-field-error-message']").exists()).toBeTruthy();
    });

    it("doesn't show an error message on a field again after the discard button is pressed", function() {
        const component = mountComponent({
            fields: {
                name: {
                    errorMessage: "STOP"
                }
            },
        });

        getNameField(component).simulate("blur");
        expect(component.find("div[data-id='name-field-error-message']").exists()).toBeTruthy();
        getDiscardButton(component).simulate("click");
        expect(component.find("div[data-id='name-field-error-message']").exists()).toBeFalsy();
    });
});