import React from 'react';
import { mount } from 'enzyme';
import ExplicitGrid, { ExplicitGridItem } from './ExplicitGrid';

const defaultProps = {
    'data-id': 'test-grid',
    children: [
        <ExplicitGridItem key="1" column={1} row={1}>One</ExplicitGridItem>,
        <ExplicitGridItem key="2" column={2} row={1}>Two</ExplicitGridItem>,
        <ExplicitGridItem key="3" column={1} row={2}>Three</ExplicitGridItem>,
    ],
    columns: 2,
    rows: 2,
};

const getComponent = props => mount(<ExplicitGrid {...defaultProps} {...props} />);

describe('ExplicitGrid', () => {
    it('renders a grid', () => {
        const wrapper = getComponent();

        expect(wrapper.find('div[data-id="test-grid"]').exists()).toBeTruthy();
    });

    it('renders a grid with an item that spans two cells and two rows', () => {
        const wrapper = getComponent({
            children: (
                <ExplicitGridItem data-id="test-item" column={1} row={1} columnSpan={2} rowSpan={2}>
                    One
                </ExplicitGridItem>
            ),
        });

        const item = wrapper.find('div[data-id="test-item"]');
        expect(item).toHaveStyleRule('grid-column-end', 'span 2');
        expect(item).toHaveStyleRule('grid-row-end', 'span 2');
    });
});
