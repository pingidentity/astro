import React from "react";
import propTypes from "prop-types";
import classnames from "classnames";
import { isFunction } from "underscore";
import Button from "../buttons/Button";
import InputRow from "../layout/InputRow";
import Link from "../general/Link";

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
 * @param {boolean} [showRemoveLabel]
 *     Toggles whether or not remove button has a label on first row.
 * @param {node|function} [renderAddButton]
 *     Located below the row builder; normally an add link by default. Can be either a node
 *     a function that returns a function; the function is given the RowBuilder's onAdd.
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

        return (
            <InputRow
                className={classnames(
                    "row-builder__row",
                    {
                        "row-builder__row--underlined": hasLineBetween
                    }
                )}
                key={id}
            >
                {content}
                <div onClick={remove(id)}>
                    {
                        hasRemoveLabel && <div className="row-builder__remove__label"> Remove </div>
                    }
                    <Button
                        className={classnames(
                            "row-builder__remove__button",
                            {
                                "row-builder__remove__button--hidden": !removable
                            }
                        )}
                        data-id={`${dataId}-${id}-delete`}
                        iconName="minus"
                        inline
                    />
                </div>
            </InputRow>
        );
    };

    return (
        <div className={classnames("row-builder", className)} data-id={dataId} >
            <div className="row-builder__rows">
                {rows.map(renderRow)}
            </div>
            {renderAddButton
                ? isFunction(renderAddButton) ? renderAddButton({ onAdd }) : renderAddButton
                : (<Link
                    data-id="row-builder-add"
                    onClick={add}
                    title={addLabel}
                />)
            }
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
    addButton: propTypes.node,
    addLabel: propTypes.node,
    className: propTypes.string,
    "data-id": propTypes.string,
    onAdd: propTypes.func,
    onRemove: propTypes.func,
    rows: propTypes.arrayOf(
        propTypes.shape({
            id: propTypes.string,
            content: propTypes.arrayOf(
                propTypes.node
            ),
            removable: propTypes.bool
        })
    ),
    showRemoveLabel: propTypes.bool,
};

RowBuilder.Row = Row;
RowBuilder.Separator = Separator;

export default RowBuilder;
