import React, { forwardRef } from 'react';
import { mount } from 'enzyme';
import { List, KeyboardList, ListBox } from './List';

const defaultProps = {
    'data-id': 'test-list',
    items: [1, 2, 3, 4, 5, 6, 7, 8],
};
const getComponent = props => mount(<List {...defaultProps} {...props} />);

describe('List', () => {
    it('renders the List in the default state', () => {
        const wrapper = getComponent();
        const list = wrapper.find(`ul[data-id="${defaultProps['data-id']}"]`);

        expect(list.exists()).toEqual(true);
    });
});

describe('Keyboard List', () => {
    it('renders the KeyboardList in the default state', () => {
        const wrapper = mount(<KeyboardList {...defaultProps} />);
        const list = wrapper.find(`ul[data-id="${defaultProps['data-id']}"]`);

        expect(list.exists()).toEqual(true);
    });

    it('fires onSelect callback', () => {
        const callback = jest.fn();
        const wrapper = mount(<KeyboardList {...defaultProps} onSelect={callback} />);

        expect(callback).not.toBeCalled();
        wrapper.find('li').first().simulate('click');
        expect(callback).toBeCalled();
    });

    it('fires onMouseOver callback', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <KeyboardList {...defaultProps} onMouseOver={callback} onFocus={() => {}} />,
        );

        expect(callback).not.toBeCalled();
        wrapper.find('li').first().simulate('mouseover');
        expect(callback).toBeCalled();
    });

    it('fires onSelect callback from mouseOver', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <KeyboardList {...defaultProps} onSelect={callback} isMouseSelectable />,
        );

        expect(callback).not.toBeCalled();
        wrapper.find('li').first().simulate('mouseover');
        expect(callback).toBeCalled();
    });

    it('fires onSelect callback by pressing up', () => {
        const callback = jest.fn();
        const wrapper = mount(<KeyboardList {...defaultProps} onSelect={callback} />);

        expect(callback).not.toBeCalled();
        wrapper.find('ul').first().simulate('keydown', { keyCode: 38 });
        expect(callback).toBeCalled();
    });

    it('fires onSelect callback by pressing down', () => {
        const callback = jest.fn();
        const onSelect = n => callback(n);
        const wrapper = mount(<KeyboardList {...defaultProps} onSelect={onSelect} items={[0]} />);

        expect(callback).not.toBeCalled();
        wrapper.find('ul').first().simulate('keydown', { keyCode: 40 });
        expect(callback).toBeCalledWith(0);

        callback.mockReset();
        expect(callback).not.toBeCalled();
        wrapper.find('ul').first().simulate('keydown', { keyCode: 40 });
        expect(callback).toBeCalledWith(0);
    });

    it('fires onEnter callback by pressing enter', () => {
        const callback = jest.fn();
        const wrapper = mount(<KeyboardList {...defaultProps} onEnter={callback} />);

        expect(callback).not.toBeCalled();
        wrapper.find('ul').first().simulate('keydown', { keyCode: 13 });
        expect(callback).toBeCalled();
    });
});

const ListBoxItem = forwardRef((props, ref) => (
    <li {...props} ref={ref}>yo</li>
));

const BadListBoxItem = props => (
    <li {...props}>uh oh</li>
);

describe('ListBox', () => {
    it('renders the ListBox in the default state', () => {
        const wrapper = mount(<ListBox {...defaultProps} />);
        const list = wrapper.find(`ul[data-id="${defaultProps['data-id']}"]`);

        expect(list.exists()).toEqual(true);
    });

    it('fires onFocus for an item when you focus the list', () => {
        const wrapper = mount(
            <ListBox
                {...defaultProps}
                renderItem={props => <ListBoxItem {...props} />}
            />,
        );
        const list = wrapper.find(`ul[data-id="${defaultProps['data-id']}"]`);

        list.simulate('focus');
        expect(document.activeElement === list.find('li').first().getDOMNode()).toBeTruthy();
    });

    it('fires warning when you try to use renderItem without forwarding a ref', () => {
        /* eslint-disable no-console */
        console.warn = jest.fn();
        const wrapper = mount(
            <ListBox
                {...defaultProps}
                renderItem={props => <BadListBoxItem {...props} />}
            />,
        );

        expect(console.warn).not.toBeCalled();

        const list = wrapper.find(`ul[data-id="${defaultProps['data-id']}"]`);
        list.simulate('focus');

        expect(console.warn).toBeCalled();
        /* eslint-enable no-console */
    });

    it('should remove an item without crashing', () => {
        /* eslint-disable no-console */
        console.warn = jest.fn();

        const wrapper = mount(
            <ListBox
                {...defaultProps}
                items={[0, 1, 2, 3]}
                renderItem={props => <ListBoxItem {...props} />}
            />,
        );

        wrapper.setProps({ items: [0, 2] });
        expect(console.warn).not.toBeCalled();
        /* eslint-enable no-console */
    });
});
