import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';
import FileInput from '../FileInput';
import { wrap } from 'module';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-input',
};
const getComponent = props => mount(<FileInput {...defaultProps} {...props} />);

describe('FileInput', () => {
    it('renders the file input in the default state', () => {
        const wrapper = getComponent();
        const component = wrapper.find(`[data-id="${defaultProps['data-id']}"]`);
        const button = wrapper.find('[data-id="select-button"]');
        const input = wrapper.find('[data-id="input"]');

        expect(component.exists()).toEqual(true);
        expect(button.exists()).toEqual(true);
        expect(input.exists()).toEqual(true);
    });

    it('renders the file input in the selected state', () => {
        const myValue = 'foobar.jpg';
        const wrapper = getComponent({
            value: myValue,
        });
        const value = wrapper.find('[data-id="value"]');

        expect(value.text()).toBe(myValue);
    });

    it('renders passed-in select/selected content', () => {
        const contentSelector = 'foo';
        const renderContentSelector = () => (<div data-id="content-selector">{contentSelector}</div>);
        const wrapper = getComponent({
            renderContentSelector,
        });

        const selector = wrapper.find('[data-id="content-selector"]');
        expect(selector.text()).toEqual(contentSelector);
    });

    it('renders passed-in selected content', () => {
        const selectedContent = 'bar';
        const renderSelectedContent = () => (<div data-id="selected-content">{selectedContent}</div>);
        const wrapper = getComponent({
            renderSelectedContent,
            value: 'foobar.jpg',
        });

        const selected = wrapper.find('[data-id="selected-content"]');
        expect(selected.text()).toEqual(selectedContent);
    });

    it('triggers the onChange callback', () => {
        const onChange = jest.fn();
        const wrapper = getComponent({ onChange });
        const blob = new Blob(['foo'], { type: 'image/jpeg' });

        expect(onChange).not.toHaveBeenCalled();
        wrapper.find('input').simulate('change', { target: { files: [blob] } });
        expect(onChange).toHaveBeenCalled();
    });

    it('triggers the onRemove callback', () => {
        const onRemove = jest.fn();
        const wrapper = getComponent({
            onRemove,
            value: 'foobar.jpg',
        });
        const removeButton = wrapper.find('button[data-id="remove-button"]');

        expect(onRemove).not.toHaveBeenCalled();
        removeButton.simulate('click');
        expect(onRemove).toHaveBeenCalled();
    });

    it('Triggers callbacks on drop', () => {
        const onChange = jest.fn();
        const preventDefault = jest.fn();
        const stopPropagation = jest.fn();

        const wrapper = getComponent({ onChange });
        const instance = wrapper.instance();

        const fileObj = {
            name: 'myfile.jpg',
            type: 'image/jpg',
        };
        const evtObj = {
            target: {
                files: [fileObj],
            },
            dataTransfer: {
                files: [fileObj],
            },
            preventDefault,
            stopPropagation,
        };

        instance._preventDefaults = preventDefault;

        expect(onChange).not.toHaveBeenCalled();
        expect(preventDefault).not.toHaveBeenCalled();
        instance._handleDrop(evtObj);
        expect(onChange).toHaveBeenCalled();
        expect(preventDefault).toHaveBeenCalled();
    });

    it('Does not call onChange when no file is provided to the _handleFileChange (canceled file dialog)', () => {
        const onChange = jest.fn();
        const wrapper = getComponent({ onChange });
        const instance = wrapper.instance();

        instance._handleFileChange(null, null);
        expect(onChange).not.toHaveBeenCalled();
    });

    it('sets/removes the hover state on hover/exit', () => {
        const wrapper = getComponent();
        const instance = wrapper.instance();

        instance._onHover();
        expect(wrapper.state('hovered')).toBe(true);

        instance._onExit();
        expect(wrapper.state('hovered')).toBe(false);
    });

    it('_preventDefaults method works properly', () => {
        const wrapper = getComponent();
        const instance = wrapper.instance();
        const preventDefault = jest.fn();
        const stopPropagation = jest.fn();
        const eventObj = { preventDefault, stopPropagation };

        expect(preventDefault).not.toHaveBeenCalled();
        expect(stopPropagation).not.toHaveBeenCalled();

        instance._preventDefaults(eventObj);

        expect(preventDefault).toHaveBeenCalled();
        expect(stopPropagation).toHaveBeenCalled();
    });

    it('_handleDrop does not bug-out if the file object cannot be read', () => {
        const wrapper = getComponent();
        const instance = wrapper.instance();
        const onChange = jest.fn();
        const eventObj = {
            preventDefault: () => {},
            stopPropagation: () => {},
        };

        instance._handleDrop(eventObj);
        expect(onChange).not.toHaveBeenCalled();
    });

    it('_handleInputChange does not bug-out if the file object cannot be read', () => {
        const wrapper = getComponent();
        const instance = wrapper.instance();
        const onChange = jest.fn();
        const eventObj = {
            preventDefault: () => {},
            stopPropagation: () => {},
            target: { files: null },
        };

        instance._handleInputChange(eventObj);
        expect(onChange).not.toHaveBeenCalled();
    });

    it('component does not bug-out if the onChange is not provided', () => {
        const wrapper = getComponent();
        const instance = wrapper.instance();
        const eventObj = {
            preventDefault: () => {},
            stopPropagation: () => {},
            target: { files: null },
        };

        instance._handleInputChange(eventObj);
        const button = wrapper.find('[data-id="select-button"]');
        expect(button.exists()).toEqual(true);
    });

    xit('Removes event listeners on unmount', () => {
        const wrapper = getComponent();
        const instance = wrapper.instance();
        const removeEventListener = jest.fn();

        instance.removeEventListener = removeEventListener;
        wrapper.unmount();

        ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
            expect(removeEventListener).toBeCalledWith(eventName, instance._preventDefaults);
        });

        ['dragleave', 'drop'].forEach((eventName) => {
            expect(instance.removeEventListener).toBeCalledWith(eventName, instance._onExit);
        });

        ['dragenter', 'dragover'].forEach((eventName) => {
            expect(instance.removeEventListener).toBeCalledWith(eventName, instance._onHover);
        });

        ['drop'].forEach((eventName) => {
            expect(instance.removeEventListener).toBeCalledWith(eventName, instance._onDrop);
        });
    });
});
