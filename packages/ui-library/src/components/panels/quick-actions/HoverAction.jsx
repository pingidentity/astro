import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Action from "./Action";

export default function HoverAction({ hoverIcon, iconName, isInactive, ...props }) {
    const [hovered, setHovered] = useState(false);
    useEffect(() => {
        setHovered(false);
    }, [isInactive]);

    return (
        <Action
            {...props}
            className={isInactive ? "quick-actions__action-card--inactive" : undefined}
            onMouseEnter={() => {
                if (!isInactive && !hovered) {
                    setHovered(true);
                }
            }}
            onMouseLeave={() => {
                if (!isInactive && hovered) {
                    setHovered(false);
                }
            }}
            iconName={(hovered && hoverIcon) ? hoverIcon : iconName}
        />
    );
}

HoverAction.propTypes = {
    ...Action.propTypes,
    hoverIcon: PropTypes.string,
    isInactive: PropTypes.bool,
};

HoverAction.defaultProps = {
    isInactive: false,
};
