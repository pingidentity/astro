import React from 'react';
import { mount } from 'enzyme';
import Columns, { Column, widths, alignments } from './Columns';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-column',
    label: 'Test Button',
};

const getComponent = props => mount(<Column {...defaultProps} {...props} />);

describe('Column', () => {
    it('renders the column in the default state', () => {
        const wrapper = getComponent();
        const column = wrapper.find(`div[data-id="${defaultProps['data-id']}"]`);

        expect(column.exists()).toEqual(true);
        expect(column.hasClass('column__one')).toEqual(true);
    });

    it('renders the column with the proper widths', () => {
        Object.values(widths).map((width) => {
            const wrapper = getComponent({
                width: width,
            });
            const column = wrapper.find(`.column__${width}`);
            expect(column.exists()).toEqual(true);
        });
    });

    it('renders the column with the proper alignments', () => {
        Object.values(alignments).map((alignment) => {
            const wrapper = getComponent({
                alignment: alignment,
            });
            const column = wrapper.find(`.column--${alignment}`);
            expect(column.exists()).toEqual(true);
        });
    });
});