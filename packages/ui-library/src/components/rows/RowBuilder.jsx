import React from "react";
import propTypes from "prop-types";
import classnames from "classnames";
import Button from "../buttons/Button";
import Link from "../general/Link";

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
    onAdd,
    onRemove,
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
            <div className="row-builder__row" key={id}>
                {content}
                <div
                    className={`row-builder__remove ${hasRemoveLabel ? "" : "row-builder__remove--no-label"}`}
                    onClick={remove(id)}
                >
                    {
                        hasRemoveLabel && <div className="row-builder__remove__label"> Remove </div>
                    }
                    { removable &&
                        <Button
                            className="row-builder__remove__button"
                            data-id={`${dataId}-${id}-delete`}
                            iconName="minus"
                            inline
                        />
                    }
                </div>
            </div>
        );
    };

    return (
        <div className={classnames("row-builder", className)} data-id={dataId} >
            <div className="row-builder__rows">
                {rows.map(renderRow)}
            </div>
            <Link
                data-id="row-builder-add"
                onClick={add}
                title={addLabel}
            />
        </div>
    );
}

RowBuilder.defaultProps = {
    addLabel: "+ Add",
    "data-id": "row-builder",
    rows: []
};

RowBuilder.propTypes = {
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

export default RowBuilder;
