import React from "react";
import PropTypes from "prop-types";
import Popover from "./Popover";
import _ from "underscore";

const PopoverMenu = props => {
    return (
        <Popover label="Trigger" {...props}>
            {_.map(props.buttons, (button, i) => {
                const handleClick = () => {
                    if (button.onClick) {
                        button.onClick();
                    }
                    props.onToggle();
                };

                return (
                    <button
                        data-id={`${props["data-id"]}-button-${i}`}
                        key={button.label}
                        className="button-menu__button"
                        onClick={handleClick}
                    >
                        {button.label}
                    </button>
                );
            })}
        </Popover>
    );
};

PopoverMenu.propTypes = {
    "data-id": PropTypes.string,
    buttons: PropTypes.array,
    onToggle: PropTypes.func
};

PopoverMenu.defaultProps = {
    "data-id": "popover-menu"
};

export default PopoverMenu;
