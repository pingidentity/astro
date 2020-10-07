import React from 'react';
import { mount } from 'enzyme';
import ArrowSVG from '@mdi/svg/svg/arrow-right.svg';
import { makeIconButton } from './IconButton';
import { active } from '../../styles/colors';
import Spinner from '../Spinner';

const TestButton = makeIconButton(ArrowSVG, 'next');

const defaultProps = {
    'data-id': 'test-button',
    children: 'Test',
};
const getComponent = props => mount(<TestButton {...defaultProps} {...props} />);

describe('Icon Button', () => {
    it('renders the button in the default state', () => {
        const wrapper = getComponent({});
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button.exists()).toEqual(true);
    });

    it('renders an inverted button', () => {
        const wrapper = getComponent({ isInverted: true });
        const button = wrapper.find(`button[data-id="${defaultProps['data-id']}"]`);

        expect(button).toHaveStyleRule('background', active);
    });

    it('renders a spinner only when loading', () => {
        expect(getComponent().find(Spinner).exists()).toBeFalsy();
        expect(getComponent({ status: 'loading' }).find(Spinner).exists()).toBeTruthy();
    });

    it('renders a white spinner on an inverted button', () => {
        const wrapper = getComponent({ status: 'loading', isInverted: true });
        const spinner = wrapper.find(Spinner);

        expect(spinner.props().color).toBe('white');
    });
});
