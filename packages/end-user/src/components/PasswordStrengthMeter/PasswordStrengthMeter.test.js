import React from 'react';
import { shallow } from 'enzyme';
import PasswordStrengthMeter from '../PasswordStrengthMeter';

jest.dontMock('../PasswordStrengthMeter');

const defaultProps = {
    'data-id': 'test-passwordmeter',
};
const getComponent = props => shallow(<PasswordStrengthMeter {...defaultProps} {...props} />);

describe('PasswordStrengthMeter', () => {
    it('renders no bar coloring if score is zero', () => {
        const component = getComponent({ score: 0 });
        expect(component.first().props().className).toContain('password-meter--s0');
    });

    it('renders a very weak score', () => {
        const component = getComponent({ score: 1 });
        expect(component.first().props().className).toContain('password-meter--s1');
    });

    it('renders a weak score', () => {
        const component = getComponent({ score: 2 });
        expect(component.first().props().className).toContain('password-meter--s2');
    });

    it('renders a good score', () => {
        const component = getComponent({ score: 3 });
        expect(component.first().props().className).toContain('password-meter--s3');
    });

    it('renders a strong score', () => {
        const component = getComponent({ score: 4 });
        expect(component.first().props().className).toContain('password-meter--s4');
    });
});
