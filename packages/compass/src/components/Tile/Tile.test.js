import React from 'react';
import { mount } from 'enzyme';

import Tile from './Tile';

const defaultProps = {
    'data-id': 'test-tile',
    id: 'test',
};
const getComponent = props => mount(<Tile {...defaultProps} {...props} />);

describe('Tile', () => {
    it('renders the tile in the default state', () => {
        const wrapper = getComponent();
        const tile = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        const svg = wrapper.find('svg[data-icon="yes"]');

        expect(tile.exists()).toEqual(true);
        expect(svg.exists()).toEqual(false);
    });

    it('renders the tile in the selected state', () => {
        const wrapper = getComponent({ isSelected: true });
        const tile = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);
        const svg = wrapper.find('svg[data-icon="yes"]');

        expect(tile.exists()).toEqual(true);
        expect(svg.exists()).toEqual(true);
    });

    it('calls the onHighlight callback when the tile is highlighted', () => {
        const onHighlight = jest.fn();
        const wrapper = getComponent({ onHighlight });
        const tile = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(onHighlight).toHaveBeenCalledTimes(0);
        tile.simulate('mouseEnter');
        expect(onHighlight).toHaveBeenNthCalledWith(1, { id: defaultProps.id });
        tile.simulate('focus');
        expect(onHighlight).toHaveBeenNthCalledWith(2, { id: defaultProps.id });
    });

    it('should not call the onHighlight callback on mouse enter when the tile is focused', () => {
        const onHighlight = jest.fn();
        const wrapper = getComponent({ onHighlight });
        const tile = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(onHighlight).toHaveBeenCalledTimes(0);
        tile.simulate('focus');
        expect(onHighlight).toHaveBeenNthCalledWith(1, { id: defaultProps.id });
        tile.simulate('mouseEnter');
        expect(onHighlight).not.toHaveBeenCalledTimes(2);
    });

    it('calls the onHighlight callback when the tile is highlighted', () => {
        const onHighlightOut = jest.fn();
        const wrapper = getComponent({ onHighlightOut });
        const tile = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(onHighlightOut).toHaveBeenCalledTimes(0);
        tile.simulate('mouseLeave');
        expect(onHighlightOut).toHaveBeenNthCalledWith(1, { id: defaultProps.id });
        tile.simulate('blur');
        expect(onHighlightOut).toHaveBeenNthCalledWith(2, { id: defaultProps.id });
    });

    it('should not call the onHighlightOut callback on mouse leave when the tile is focused', () => {
        const onHighlightOut = jest.fn();
        const wrapper = getComponent({ onHighlightOut });
        const tile = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(onHighlightOut).toHaveBeenCalledTimes(0);
        tile.simulate('focus');
        tile.simulate('mouseLeave');
        expect(onHighlightOut).not.toHaveBeenCalledTimes(1);
    });

    it('should call the supplied prop event handlers without overriding onHighlight', () => {
        const onFocus = jest.fn();
        const onHighlight = jest.fn();
        const onMouseEnter = jest.fn();
        const wrapper = getComponent({ onFocus, onHighlight, onMouseEnter });
        const tile = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(onFocus).toHaveBeenCalledTimes(0);
        expect(onHighlight).toHaveBeenCalledTimes(0);
        expect(onMouseEnter).toHaveBeenCalledTimes(0);
        tile.simulate('focus');
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onHighlight).toHaveBeenCalledTimes(1);
        expect(onMouseEnter).toHaveBeenCalledTimes(0);
        tile.simulate('mouseenter');
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onHighlight).toHaveBeenCalledTimes(1);
        expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('should call the supplied prop event handlers without overriding onHighlightOut', () => {
        const onBlur = jest.fn();
        const onHighlightOut = jest.fn();
        // const onMouseDown = jest.fn();
        const onMouseLeave = jest.fn();
        const wrapper = getComponent({ onBlur, onHighlightOut, onMouseLeave });
        const tile = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(onBlur).toHaveBeenCalledTimes(0);
        expect(onHighlightOut).toHaveBeenCalledTimes(0);
        expect(onMouseLeave).toHaveBeenCalledTimes(0);
        tile.simulate('blur');
        expect(onBlur).toHaveBeenCalledTimes(1);
        expect(onHighlightOut).toHaveBeenCalledTimes(1);
        expect(onMouseLeave).toHaveBeenCalledTimes(0);
        tile.simulate('mouseleave');
        expect(onBlur).toHaveBeenCalledTimes(1);
        expect(onHighlightOut).toHaveBeenCalledTimes(2);
        expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('should call the supplied onMouseDown prop and ensure preventDefault is called', () => {
        const e = { preventDefault: jest.fn() };
        const onMouseDown = jest.fn();
        const wrapper = getComponent({ onMouseDown });
        const tile = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(e.preventDefault).toHaveBeenCalledTimes(0);
        expect(onMouseDown).toHaveBeenCalledTimes(0);
        tile.simulate('mousedown', e);
        expect(e.preventDefault).toHaveBeenCalledTimes(1);
        expect(onMouseDown).toHaveBeenCalledTimes(1);
    });
});
