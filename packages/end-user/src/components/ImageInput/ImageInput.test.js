import React from 'react';
import { mount } from 'enzyme';
import ImageInput from './ImageInput';
import { isHtmlFileApiSupported } from '../../util/FileUtils.js';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-input',
};
const getComponent = props => mount(<ImageInput {...defaultProps} {...props} />);

jest.mock(
    '../../util/FileUtils.js',
    () => ({
        isHtmlFileApiSupported: jest.fn(),
    }),
);

describe('FileInput', () => {
    it('renders the image input in the default state', () => {
        const wrapper = getComponent();
        const component = wrapper.find(`[data-id="${defaultProps['data-id']}"]`);
        const selector = wrapper.find('.image-input__selector');
        const input = wrapper.find('[data-id="input"]');

        expect(component.exists()).toEqual(true);
        expect(selector.exists()).toEqual(true);
        expect(input.exists()).toEqual(true);
    });

    it('renders the image input in the selected state', () => {
        const value = 'http://foo.com/bar.jpg';
        const wrapper = getComponent({ value });
        const component = wrapper.find(`[data-id="${defaultProps['data-id']}"]`);
        const selected = wrapper.find('.image-input__selected');
        const editBtn = wrapper.find('.image-input__edit-btn');

        expect(component.exists()).toEqual(true);
        expect(selected.exists()).toEqual(true);
        expect(editBtn.exists()).toEqual(true);
    });

    it('processes a file', () => {
        const fileObj = { foo: 'bar' };
        const processWithHtml5Api = jest.fn();
        const wrapper = getComponent();
        const instance = wrapper.instance();

        isHtmlFileApiSupported.mockImplementation(() => true);

        instance._processWithHtml5Api = processWithHtml5Api;
        instance._process(fileObj);
        expect(processWithHtml5Api).toHaveBeenCalledWith(fileObj);
    });

    it('calls default onError function', () => {
        isHtmlFileApiSupported.mockImplementation(() => false);

        const fileObj = { foo: 'bar' };
        const wrapper = getComponent();
        const instance = wrapper.instance();

        instance._process(fileObj);
        expect(wrapper.exists()).toEqual(true);

        jest.unmock('../../util/FileUtils.js');
    });

    it('calls onError when a file cannot be processed', () => {
        isHtmlFileApiSupported.mockImplementation(() => false);

        const onError = jest.fn();
        const fileObj = { foo: 'bar' };
        const wrapper = getComponent({ onError });
        const instance = wrapper.instance();

        instance._process(fileObj);
        expect(onError).toHaveBeenCalled();

        jest.unmock('../../util/FileUtils.js');
    });

    it('calls default onChange function', () => {
        const fileObj = { foo: 'bar' };
        const eventObj = { test: 'object' };
        const process = jest.fn();
        const onChange = jest.fn();
        const wrapper = getComponent();
        const instance = wrapper.instance();

        instance._process = process;
        instance._handleOnChange(fileObj, eventObj);
        expect(wrapper.exists()).toEqual(true);
    });

    it('calls handleChange', () => {
        const fileObj = { foo: 'bar' };
        const eventObj = { test: 'object' };
        const process = jest.fn();
        const onChange = jest.fn();
        const wrapper = getComponent({ onChange });
        const instance = wrapper.instance();

        instance._process = process;
        instance._handleOnChange(fileObj, eventObj);
        expect(onChange).toHaveBeenCalledWith(fileObj, eventObj);
    });

    it('calls handleRemove', () => {
        const prevDef = jest.fn();
        const eventObj = {
            preventDefault: prevDef,
        };
        const resetInput = jest.fn();
        const wrapper = getComponent();
        const instance = wrapper.instance();

        instance.fileInput.resetInput = resetInput;
        instance._handleRemove(eventObj);

        expect(prevDef).toHaveBeenCalled();
        expect(resetInput).toHaveBeenCalled();
        expect(instance.state.showMenu).toBe(false);
        expect(instance.state.value).toBe(null);
    });

    it('_processWithHtml5Api calls _readFile', () => {
        const fileObj = { type: 'image/png' };
        const readFile = jest.fn();
        const wrapper = getComponent();
        const instance = wrapper.instance();

        isHtmlFileApiSupported.mockImplementation(() => true);

        instance._readFile = readFile;
        instance._process(fileObj);
        expect(readFile).toHaveBeenCalledWith(fileObj);
    });

    it('_fileReadSuccess sets the contentUrl', () => {
        const contentUrl = 'http://foo.com/bar.png';
        const wrapper = getComponent();
        const instance = wrapper.instance();
        const eventObj = {
            target: {
                result: contentUrl,
            },
        };

        instance._fileReadSuccess(eventObj);
        expect(instance.state.value).toBe(contentUrl);
    });

    it('shows and hides the edit menu', () => {
        const wrapper = getComponent({
            value: 'http://foo.com/bar.png',
        });
        const button = wrapper.find('[data-id="edit-button"]');

        expect(wrapper.find('[data-id="edit-menu"]').exists()).toEqual(false);
        expect(wrapper.state('showMenu')).toBe(false);

        button.simulate('click');
        expect(wrapper.state('showMenu')).toBe(true);
        expect(wrapper.find('[data-id="edit-menu"]').exists()).toEqual(true);
        expect(wrapper.find('[data-id="delete-button"]').exists()).toEqual(true);

        wrapper.find('[data-id="change-button"]').simulate('click');
        expect(wrapper.state('showMenu')).toBe(false);
        expect(wrapper.find('[data-id="edit-menu"]').exists()).toEqual(false);
    });

});
