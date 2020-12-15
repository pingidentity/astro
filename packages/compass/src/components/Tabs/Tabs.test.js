import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { v4 as uuid } from 'uuid';

import Tabs from './Tabs';
import Tab from '../Tab';
import { active } from '../../styles/colors';

const defaultTabs = (hasValue = true) => Array(5).fill().map((_v, i) => (
    <Tab key={uuid()} value={hasValue ? `inex-${i}` : undefined} label={`index-${i}`} />
));
const defaultProps = {
    'data-id': 'test-tabs',
    children: defaultTabs(),
};
const getComponent = (props = {}) => render(<Tabs {...defaultProps} {...props} />);

describe('Tabs', () => {
    it('renders the tabs in the default state', () => {
        const { getByRole, getAllByRole } = getComponent();
        const tabs = getAllByRole('tab');

        expect(getByRole('tablist')).toBeInTheDocument();
        tabs.forEach((tab, i) => {
            expect(tab).toBeInTheDocument();
            if (i === 0) {
                expect(tab).toHaveStyleRule('border-bottom', `2px solid ${active}`);
            } else {
                expect(tab).not.toHaveStyleRule('border-bottom', `2px solid ${active}`);
            }
        });
    });

    it('renders tabs with no value', () => {
        const { getByRole, getAllByRole } = getComponent({
            children: defaultTabs(false),
        });
        const tabs = getAllByRole('tab');

        expect(getByRole('tablist')).toBeInTheDocument();
        tabs.forEach((tab, i) => {
            expect(tab).toBeInTheDocument();
            if (i === 0) {
                expect(tab).toHaveStyleRule('border-bottom', `2px solid ${active}`);
            } else {
                expect(tab).not.toHaveStyleRule('border-bottom', `2px solid ${active}`);
            }
        });
    });

    it('the given tab value is selected', () => {
        const selectedTabValue = defaultProps
            .children[defaultProps.children.length - 1]
            .props
            .value;
        const { getAllByRole } = getComponent({ selectedTabValue });
        const tabs = getAllByRole('tab');

        tabs.forEach((tab, i) => {
            expect(tab).toBeInTheDocument();
            if (i === defaultProps.children.length - 1) {
                expect(tab).toHaveStyleRule('border-bottom', `2px solid ${active}`);
            } else {
                expect(tab).not.toHaveStyleRule('border-bottom', `2px solid ${active}`);
            }
        });
    });

    it('the onChange callback is triggered on each new tab click or keypress', () => {
        const onChange = jest.fn();
        const { getAllByRole } = getComponent({ onChange });
        const tabs = getAllByRole('tab');

        expect(onChange).toHaveBeenCalledTimes(0);
        fireEvent.click(tabs[1]);
        expect(onChange).toHaveBeenNthCalledWith(1, {
            value: defaultProps.children[1].props.value,
        });
        fireEvent.keyPress(tabs[2], { key: 'Enter', code: 13, charCode: 13 });
        expect(onChange).toHaveBeenNthCalledWith(2, {
            value: defaultProps.children[2].props.value,
        });
    });

    it('the onChange callback is not triggered on a selected tab click or keypress', () => {
        const onChange = jest.fn();
        const { getAllByRole } = getComponent({ onChange });
        const tabs = getAllByRole('tab');

        expect(onChange).toHaveBeenCalledTimes(0);
        fireEvent.click(tabs[0]);
        expect(onChange).toHaveBeenCalledTimes(0);
        fireEvent.keyPress(tabs[0], { key: 'Enter', code: 13, charCode: 13 });
        expect(onChange).toHaveBeenCalledTimes(0);
    });
});
