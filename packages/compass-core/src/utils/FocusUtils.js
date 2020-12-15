import { useEffect } from 'react';
import { isKey } from './KeyboardUtils';

const addFocusClass = ({ keyCode }) => {
    if (isKey.isTab(keyCode)) {
        document.body.classList.add('ui-library-focus-visible');
    }
};

const removeFocusClass = () => document.body.classList.remove('ui-library-focus-visible');

const getComponentCount = () => parseInt(document.body.dataset.uiLibComponentCount || 0, 10);

const onMount = () => {
    const componentCount = getComponentCount();
    if (componentCount > 0) {
        document.body.dataset.uiLibComponentCount = componentCount + 1;
    } else {
        document.body.dataset.uiLibComponentCount = 1;
        document.addEventListener('keydown', addFocusClass);
        document.addEventListener('mousedown', removeFocusClass);
    }
};

const onUnmount = () => {
    const componentCount = getComponentCount();

    if (componentCount === 1) {
        document.body.dataset.uiLibComponentCount = 0;
        document.removeEventListener('keydown', addFocusClass);
        document.removeEventListener('mousedown', removeFocusClass);
        removeFocusClass();
    } else {
        document.body.dataset.uiLibComponentCount = componentCount - 1;
    }
};

/**
* A custom hook that sets up a component to show focus outlines when tab
* is pressed and removes them when the mouse is used.
*/
export const useFocusOutline = () => {
    useEffect(() => {
        onMount();
        return onUnmount;
    });
};
