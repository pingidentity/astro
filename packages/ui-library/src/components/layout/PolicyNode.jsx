import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Anchor from "../general/Anchor";

/**
* @class PolicyNode
* @desc A node in a policy outline. Displays an icon, a label, some content, and sometimes an ornament in the gutter
*
* @param {string} [character]
*     When supplied, this character is shown in the circle
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {string} [data-id=policy-node]
*     The data-id of the component
* @param {enum} [gutter]
*     Set to "arrow" to display an arrow in the gutter
* @param {string} [iconName]
*     When supplied, the matching icon is displayed
* @param {string} [label]
*     Label shown at the top of the node
* @param {string} [number]
*     When supplied, this number is shown in the circle
* @param {function} [onEdit]
*     Callback for when the edit button is clicked
* @param {boolean} [parent]
*     When set, use the parent style
*/
const PolicyNode = ({
    character,
    children,
    className,
    "data-id": dataId,
    gutter,
    iconName,
    label,
    number,
    onEdit,
    parent,
}) => (
    <div className={
        classnames("policy-node", className, {
            "policy-node--parent": parent
        })
    } data-id={dataId}>
        {label &&
            <div className="policy-node__head">
                {number && <div className="policy-node__number">{number}</div>}
                {iconName && <div className={classnames("policy-node__icon", "icon-"+iconName)} />}
                {character && <div className={classnames("policy-node__character")}>{character}</div>}
                <span className="policy-node__label">{label}</span>
                {onEdit && <Anchor className="policy-node__edit icon-edit" onClick={onEdit} />}
            </div>
        }
        {children &&
            <div className="policy-node__content">
                {gutter === "arrow" &&
                    <div className="policy-node__gutter-arrow"/>
                }
                {children}
            </div>
        }
    </div>
);

PolicyNode.propTypes = {
    character: PropTypes.string,
    className: PropTypes.string,
    "data-id": PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gutter: PropTypes.oneOf(["arrow"]),
    iconName: PropTypes.string,
    label: PropTypes.string,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onEdit: PropTypes.func,
    parent: PropTypes.bool,
};

PolicyNode.defaultProps = {
    "data-id": "policy-node",
};

export default PolicyNode;
