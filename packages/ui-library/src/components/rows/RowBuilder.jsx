import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { isFunction } from "underscore";
import Button from "../buttons/Button";
import InputRow from "../layout/InputRow";
import Link from "../general/Link";
import Icon from "../general/Icon";

export const renderRemoveIcon = ({
    "data-id": dataId,
    onRemove,
    removable,
    id,
}) => (
    removable ? (
        <Icon
            className="row-builder__remove-icon"
            data-id={dataId}
            type="inline"
            onClick={e => onRemove(e, id)}
            iconName="delete"
        />
    ) : null
);

function Row({
    children
}) {
    return (
        <div className="row-builder--form__row">
            {children}
        </div>
    );
}

function Separator({
    children
}) {
    return (
        <div className="row-builder--form__separator">
            {children}
        </div>
    );
}

/**
 * @class Row Builder
 * @desc A component for building rows
 *
 * @param {string} [data-id="link"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to be set on the inner Link container.
 * @param {node} [addLabel]
 *     Label for the button to add new rows.
 * @param {object} [rows]
 *     Rows for the component; must be an array of objects each with a string ID and
 *     a valid React node as its content property.
 * @param {boolean} [hasLineBetween=true]
 *     When true, lines and wider spacing are rendered between rows.
 * @param {boolean} [showRemoveLabel]
 *     Toggles whether or not remove button has a label on first row.
 * @param {node|function} [renderAddButton]
 *     Located below the row builder; normally an add link by default. Can be either a node
 *     a function that returns a function; the function is given the RowBuilder's onAdd.
 * @param {node|function} [renderRemoveButton]
 *     Located on the right each of the row builder; normally an inline button with a minus icon.
 *     Can be either a node a function that returns a function; the function is given the RowBuilder's onRemove.
 * @param {RowBuilder~onAdd} [onAdd]
 *     Callback triggered when add button is clicked. Passes in event as its parameter.
 * @param {RowBuilder~onRemove} [onRemove]
 *     Callback triggered when remove button is clicked. Passes back event and row ID.
 *
 */

function RowBuilder({
    addLabel,
    className,
    ["data-id"]: dataId,
    hasLineBetween,
    onAdd,
    onRemove,
    renderAddButton,
    renderRemoveButton,
    rows,
    showRemoveLabel,
}) {
    const add = e => {
        if (onAdd) {
            onAdd(e);
        }
    };

    const remove = id => e => {
        if (onRemove) {
            onRemove(e, id);
        }
    };

    const renderRow = ({ id, content, removable = true }, idx) => {
        const hasRemoveLabel = showRemoveLabel && idx === 0;
        const rowId = `${dataId}-${id}-delete`;

        return (
            <InputRow
                className="row-builder__row"
                key={id}
            >
                {content}
                <div className="row-builder__remove">
                    {
                        hasRemoveLabel && <div className="row-builder__remove__label"> Remove </div>
                    }
                    {renderRemoveButton
                        ? isFunction(renderRemoveButton)
                            ? renderRemoveButton({ "data-id": rowId, id, onRemove, removable })
                            : renderRemoveButton
                        : (<Button
                            className={classnames(
                                "row-builder__remove__button",
                                {
                                    "row-builder__remove__button--hidden": !removable
                                }
                            )}
                            data-id={rowId}
                            iconName="delete"
                            inline
                            onClick={remove(id)}
                        />)
                    }
                </div>
            </InputRow>
        );
    };

    return (
        <div
            className={classnames(
                "row-builder",
                className,
                { "row-builder--underlined": hasLineBetween }
            )}
            data-id={dataId}
        >
            <div className={classnames({ "row-builder__rows": rows.length > 0 })}>
                {rows.map(renderRow)}
            </div>

            <div className="row-builder__add">
                {renderAddButton
                    ? isFunction(renderAddButton) ? renderAddButton({ onAdd }) : renderAddButton
                    : (
                        <Link
                            data-id="row-builder-add"
                            onClick={add}
                            title={addLabel}
                            type="block"
                        />
                    )
                }
            </div>
        </div>
    );
}

RowBuilder.defaultProps = {
    addLabel: "+ Add",
    "data-id": "row-builder",
    hasLineBetween: true,
    rows: []
};

RowBuilder.propTypes = {
    addButton: PropTypes.node,
    addLabel: PropTypes.node,
    className: PropTypes.string,
    "data-id": PropTypes.string,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    renderAddButton: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    renderRemoveButton: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            content: PropTypes.node,
            removable: PropTypes.bool
        })
    ),
    showRemoveLabel: PropTypes.bool,
};

RowBuilder.Row = Row;
RowBuilder.Separator = Separator;

export default RowBuilder;
