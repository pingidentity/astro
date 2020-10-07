import { useState, useEffect, useRef } from 'react';

const lagOn = (isOn, setOnLag) => {
    if (isOn) {
        setOnLag(true);
    }
};

const lagOff = (isOn, isOnLag, setOnLag, interval, timeoutRef) => {
    if (!isOn && isOnLag) {
        return setTimeout(
            () => setOnLag(false),
            interval,
        );
    }
    // clear the timeout function if the transition's been turned back on
    if (isOn && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        return null;
    }
    return timeoutRef.current;
};

/** Custom hook that manages the lifecycle of the animation to transition content in and out. */
export const useTransition = (isOn, interval) => {
    // if either isOnLag or isOn is true, the content should be rendered
    // but the content is only in its "on" state if both values are true
    const [isOnLag, setOnLag] = useState(isOn);
    const timeoutRef = useRef(null);

    // we wait one render until we change the content to its showing state
    useEffect(() => lagOn(isOn, setOnLag), [isOn]);

    // if the transition is off but we're still rendering, schedule its removal
    timeoutRef.current = lagOff(isOn, isOnLag, setOnLag, interval, timeoutRef);

    return {
        isShowing: isOn && isOnLag,
        isRendered: isOn || isOnLag,
    };
};

/** Custom hook that manages the lifecycle of the animation to transition between content */
export const useToggleTransition = (isOn, interval) => {
    // this uses basically the same logic as useTransition but with two states
    const [isOnLag, setOnLag] = useState(isOn);
    const [isOffLag, setOffLag] = useState(!isOn);
    const timeoutRefOn = useRef(null);
    const timeoutRefOff = useRef(null);

    useEffect(() => {
        lagOn(isOn, setOnLag);
        lagOn(!isOn, setOffLag);
    }, [isOn]);

    timeoutRefOn.current = lagOff(isOn, isOnLag, setOnLag, interval, timeoutRefOn);
    timeoutRefOff.current = lagOff(!isOn, isOffLag, setOffLag, interval, timeoutRefOff);

    return {
        isShowing: {
            on: isOn && isOnLag,
            off: !isOn && isOffLag,
        },
        isRendered: {
            on: isOn || isOnLag,
            off: !isOn || isOffLag,
        },
    };
};
