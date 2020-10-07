import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { noop, partial } from 'underscore';
import { defaultRender } from '../../utils/PropUtils';
import { isKey, isArrowKey } from '../../utils/KeyboardUtils';

const {
    isArrowDown,
    isArrowUp,
    isArrowRight,
    isArrowLeft,
    isEnter,
} = isKey;


export const List = ({
    className,
    css,
    'data-id': dataId,
    items,
    renderList,
    renderItem,
    style,
}) => {
    const listItems = () => (
        items.map((id, index) => renderItem(
            {
                tabIndex: -1,
                key: id,
                id,
                index,
                children: id,
            },
            'li',
        ))
    );

    return (
        <>
            {renderList({
                tabIndex: 0,
                className,
                css,
                'data-id': dataId,
                style,
                children: listItems(),
            }, 'ul')}
        </>
    );
};

List.propTypes = {
    /** Defines the "data-id" for top-level HTML container. */
    'data-id': PropTypes.string,
    /** A list of some kind of data. These items are passed to the render function. */
    items: PropTypes.array.isRequired,
    /** Render function for the whole list */
    renderList: PropTypes.func,
    /** Render function for each item in the list. Receives the item data. */
    renderItem: PropTypes.func,
    /** CSS classes to be set on the top-level HTML container. */
    className: PropTypes.string,
    /** CSS prop can be used for CSS-in-JS components. */
    css: PropTypes.object,
    /** Style directly */
    style: PropTypes.object,
};

List.defaultProps = {
    renderItem: defaultRender,
    renderList: defaultRender,
};


export const KeyboardList = ({
    onKeyDown,
    onEnter,
    onMouseOver,
    onSelect,
    isMouseSelectable,
    ...listProps
}) => {
    const [selectedItem, setSelected] = useState(null);

    const selectItem = (id, e) => {
        setSelected(id);
        onSelect(id, e);
    };

    const handleItemClick = id => partial(selectItem, id);

    const handleMouseOver = id => (e) => {
        e.persist();
        if (isMouseSelectable) {
            selectItem(id, e);
        }
        onMouseOver(e);
    };

    const handleUpDown = (keyCode, e) => {
        e.persist();
        const selectedIndex = listProps.items.findIndex(el => el === selectedItem);
        let nextIndex;
        if (isArrowUp(keyCode) || isArrowLeft(keyCode)) {
            nextIndex = selectedIndex - 1;
        }
        if (isArrowDown(keyCode) || isArrowRight(keyCode)) {
            nextIndex = selectedIndex + 1;
        }

        if (nextIndex < 0) {
            nextIndex = listProps.items.length - 1;
        }

        if (nextIndex > listProps.items.length - 1) {
            nextIndex = 0;
        }

        const nextSelected = listProps.items[nextIndex];

        selectItem(nextSelected, e);
        e.stopPropagation();
    };

    const handleKeyDown = (e) => {
        e.persist();
        e.stopPropagation();
        const { keyCode } = e;

        if (isArrowKey(keyCode)) {
            handleUpDown(keyCode, e);
        }

        if (isEnter(keyCode)) {
            onEnter(selectedItem, e);
        }
        onKeyDown(keyCode, e);
    };

    const handleRenderItem = (itemProps, Component) => listProps.renderItem({
        ...itemProps,
        onMouseOver: handleMouseOver(itemProps.id),
        onClick: handleItemClick(itemProps.id),
        selected: selectedItem === itemProps.id,
    }, Component);

    const handleRenderList = (props, Component) => listProps.renderList({
        ...props,
        onKeyDown: handleKeyDown,
    }, Component);

    return (
        <List
            {...listProps}
            renderList={handleRenderList}
            renderItem={handleRenderItem}
        />
    );
};

KeyboardList.propTypes = {
    onKeyDown: PropTypes.func,
    onEnter: PropTypes.func,
    onMouseOver: PropTypes.func,
    onSelect: PropTypes.func,
    isMouseSelectable: PropTypes.bool,
};

KeyboardList.defaultProps = {
    onKeyDown: noop,
    onEnter: noop,
    onMouseOver: noop,
    onSelect: noop,
    ...List.defaultProps,
};

// Component follows Wai Aria spec https://www.w3.org/TR/wai-aria-practices/#Listbox
/** Inherits props from List */
export const ListBox = ({
    onSelect,
    onFocus,
    ...listProps
}) => {
    const [selectedItem, setSelected] = useState(null);

    const itemRefs = useRef({});

    const focusItem = (id) => {
        if (!itemRefs.current[id]) {
            // eslint-disable-next-line no-console
            console.warn('Looks like you may have forgotten to forwardRefs in renderItem on the ListBox Component. Focus behavior will not work as intended.');
            return;
        }
        const itemNode = itemRefs.current[id];
        itemNode.tabIndex = 0;
        itemNode.focus();
    };

    const unfocusItem = (id, e) => {
        if (!itemRefs.current[id]) {
            return;
        }
        const itemNode = itemRefs.current[id];
        itemNode.tabIndex = -1;
        itemNode.blur(e);
    };

    const selectItem = (id, e) => {
        if (selectedItem) {
            unfocusItem(selectedItem);
        }
        setSelected(id);
        focusItem(id);
        onSelect(id, e);
    };

    const handleFocus = (e) => {
        // React synthetic focus events bubble unlike native,
        // so this event fires when children are focused.
        // We return to prevent this.
        if (e.target !== e.currentTarget) {
            return;
        }
        e.persist();

        const nextSelected = selectedItem || listProps.items[0];
        selectItem(nextSelected, e);

        onFocus(e);
    };

    const handleUnfocus = (e) => {
        if (selectedItem) {
            unfocusItem(selectedItem, e);
        }
    };


    const handleRenderItem = (props, Item) => {
        const renderedItem = listProps.renderItem({
            ...props,
            selected: selectedItem === props.id,
            ref: (el) => { itemRefs.current[props.id] = el; },
        }, Item);

        return renderedItem;
    };

    const handleRenderList = (props, Component) => {
        return listProps.renderList({
            ...props,
            onFocus: handleFocus,
            onBlur: handleUnfocus,
        }, Component);
    };

    return (
        <KeyboardList
            {...listProps}
            onSelect={selectItem}
            renderList={handleRenderList}
            renderItem={handleRenderItem}
        />
    );
};

ListBox.propTypes = {
    onSelect: PropTypes.func,
    onFocus: PropTypes.func,
    ...List.propTypes,
};

ListBox.defaultProps = {
    onSelect: noop,
    onFocus: noop,
    ...List.defaultProps,
};

export default { List, KeyboardList, ListBox };
