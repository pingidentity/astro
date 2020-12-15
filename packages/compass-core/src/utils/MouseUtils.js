import { useEffect, useCallback, useRef } from 'react';

export const callIfOutsideOfContainers = (containers, callback, target) => {
    if (
        containers.reduce(
            (result, container) => (result || (container && container.contains(target))),
            false,
        )
    ) {
        return false;
    }

    callback();
    return true;
};

/**
 * Triggers handler when body receives a click outside the ref element
 * or the escape key
 * @param {array} refs
 * @param {function} handler
 */
export const useClickOutsideHandler = (refs, handler) => {
    const removeMouseUp = useRef(null);

    const onMouseUp = useCallback(({ target }) => {
        if (removeMouseUp.current) {
            removeMouseUp.current();
            removeMouseUp.current = null;
        }

        callIfOutsideOfContainers(
            refs.map(ref => ref.current),
            handler,
            target,
        );
    }, []);

    const onMouseDown = useCallback(({ target }) => callIfOutsideOfContainers(
        refs.map(ref => ref.current),
        () => {
            if (removeMouseUp.current) {
                removeMouseUp.current();
            }
            window.addEventListener('mouseup', onMouseUp);
            removeMouseUp.current = () => {
                window.removeEventListener('mouseup', onMouseUp);
            };
        },
        target,
    ), []);

    useEffect(() => {
        window.addEventListener('mousedown', onMouseDown);
        return () => {
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    });
};
