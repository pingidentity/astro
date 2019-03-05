import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getIconClassName } from "../../../util/PropUtils";
import Button from "../../buttons/Button";

/**
 * @class MultiDragRow
 * @desc The default row for the MultiDrag component.
 *
 * @param {string} [data-id="multi-drag-row"]
 *    To define the base "data-id" value for the top-level HTML container.
 * @param {string} [category]
 *    The category of the row, to be displayed below its name.
 * @param {number} [column]
 *    The column index of the row. 0 represents a column to be added from, while 1
 *    represents a column to be added to and removed from.
 * @param {number} [count]
 *    The count for the row, to be displayed before its name.
 * @param {string} [iconSrc]
 *    A background image URL, which will render to an image on the left
 *    side of the component.
 * @param {number} [index]
 *    The index of the row, used to identify it in callbacks.
 * @param {string} [name]
 *    The name of the row, to be displayed to the right of the other options.
 * @param {preview} [bool]
 *    Whether or not the row is a preview. Preview rows do not render their contents.
 **/

/**
 * @callback MultiDragRow~onAdd
 *    Called by add rows (row with a column value of 0) when add button is clicked.
 * @param {Object} columnInfo
 * @param {number} columnInfo.column
 *    The column index of the row.
 * @param {number} columnInfo.row
 *    The index of the row.
 */

/**
 * @callback MultiDragRow~onRemove
 *    Called by remove rows (row with a column value of 1) when remove button is clicked.
 * @param {Object} columnInfo
 * @param {number} columnInfo.column
 *    The column index of the row.
 * @param {number} columnInfo.row
 *    The index of the row.
 */

/**
 * @callback MultiDragRow~renderButton
 *    Optional function prop that renders a custom button instead of the usual add/remove buttons.
 * @param {Object} buttonInfo
 * @param {string} columnInfo.data-id
 *    The default data-id for the button.
 * @param {function} columnInfo.onClick
 *    The onClick event for the button; can be either an onAdd or onRemove depending
 *    on the row's column index.
 * @param {string} columnInfo.iconName
 *    The default iconName for the button, based on its column index.
 * @param {string} columnInfo.type
 *    The type of button being rendered, based on its column index. Can be either "add" or
 *    "remove".
 * @param {function} defaultButton
 *    The underlying Button component rendered by default in the row.
 * @param {Object} props
 *    The props passed to the MultiDragRow.
 */

function MultiDragRow(props) {
    const {
        category,
        column,
        count,
        ["data-id"]: dataId,
        iconSrc,
        index,
        name,
        onAdd,
        onRemove,
        preview,
        renderButton,
    } = props;

    const isAdd = column === 0;
    const buttonIcon = isAdd ? "plus" : "remove";
    const buttonDataId = `row-button-${isAdd ? "add" : "remove" }`;
    const handleClick = isAdd ? () => onAdd({ column, index }) : () => onRemove({ column, index });

    const iconClass = getIconClassName(props);

    const button = renderButton({
        "data-id": buttonDataId,
        onClick: handleClick,
        iconName: buttonIcon,
        inline: true,
        type: isAdd ? "add" : "remove"
    }, Button, props);

    const rowContent = [
        <span key="grip" className="selector-row__grip icon-grip" />,
        iconSrc &&
            <div key="image" className="selector-row__image" data-id="row-image"
                style={{ backgroundImage: "url(" + iconSrc + ")" }} />,
        iconClass &&
            <span key="icon" className={classnames("selector-row__icon", iconClass)} data-id="row-icon" />,
        count !== undefined &&
            <span key="count" className="selector-row__count" data-id="row-count">
                {count}
            </span>,
        <div key="labels" className="selector-row__labels">
            <div className="selector-row__name" data-id="row-name">{name}</div>
            <div className="selector-row__category" data-id="row-category">{category}</div>
        </div>,
        <div key="button">
            {button}
        </div>
    ];

    return (
        <div
            className={classnames(
                "selector-row",
                { "selector-row--preview": preview }
            )} data-id={dataId}>
            {preview ? null : rowContent}
        </div>
    );
}

MultiDragRow.propTypes = {
    category: PropTypes.string,
    column: PropTypes.number,
    count: PropTypes.number,
    "data-id": PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    iconSrc: PropTypes.string,
    index: PropTypes.number,
    name: PropTypes.string,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    preview: PropTypes.bool,
    renderButton: PropTypes.func
};

MultiDragRow.defaultProps = {
    "data-id": "multi-drag-row",
    renderButton: (props, ButtonComponent) => (
        <ButtonComponent
            {...props}
        />
    )
};

export default MultiDragRow;
