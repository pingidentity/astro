import React, { useState } from "react";
import DragDrop from "../../../rows/DragDrop";
import HoverAction from "../HoverAction";

const insertAtIndex = (arr, item, index) =>
    [...arr.slice(0, index), item, ...arr.slice(index, arr.length)];

const getSelectedWithPlaceholder = (selected, placeholderIndex, placeholder) => {
    if (placeholderIndex > -1) {
        return insertAtIndex(
            selected,
            placeholder,
            placeholderIndex
        );
    } else {
        return selected;
    }
};

export default function useRecentAndSelected(onValueChange, actions, selectedIds, recentIds, maxSelected = 12) {
    const [placeholderIndex, setPlaceholderIndex] = useState(-1);
    const [draggingId, setDraggingId] = useState(null);

    const isSelectedFull = selectedIds.length >= maxSelected;
    const isDragging = placeholderIndex > -1;
    const resetPlaceholder = () => {
        if (placeholderIndex > -1) {
            setPlaceholderIndex(-1);
        }
        if (draggingId !== null) {
            setDraggingId(null);
        }
    };

    const addToSelected = (id, index) => {
        resetPlaceholder();
        if (!selectedIds.includes(id)) {
            const updatedRecent = recentIds.filter(recent => recent !== id);
            onValueChange({
                selected: insertAtIndex(selectedIds, id, index).slice(0, maxSelected),
                recent: isSelectedFull
                    ? [selectedIds[selectedIds.length - 1], ...updatedRecent.slice(0, 4)]
                    : updatedRecent
            });
        }
    };

    const reorderSelected = (id, index) => {
        resetPlaceholder();
        const cleanedIds = selectedIds.filter(selected => selected !== id);
        onValueChange({
            selected: insertAtIndex(cleanedIds, id, index),
            recent: recentIds
        });
    };

    const removeFromSelected = id => {
        resetPlaceholder();
        onValueChange({
            selected: selectedIds.filter(selected => id !== selected),
            recent: [id, ...recentIds.filter(recent => recent !== id).slice(0, 4)]
        });
    };

    const mapped = Object.entries(actions).reduce((acc, [name, groupActions]) => {
        const [mappedActions, mappedSelected, mappedRecent] =
            groupActions.reduce(([baseAcc = [], selectedAcc, recentAcc], action) => {
                const selectedIndex = selectedIds.indexOf(action.id);
                const isSelected = selectedIndex > -1;
                const isRecent = recentIds.includes(action.id);
                return [
                    [...baseAcc,
                        <DragDrop
                            className="quick-actions__draggable-card"
                            data-id={`draggable-action_${action.id}`}
                            disabled={isSelectedFull}
                            dropTarget={false}
                            id={action.id}
                            key={action.id}
                            index={0}
                            type="column"
                            onCancel={() => {
                                resetPlaceholder();
                            }}
                            onDragStart={() => {
                                setDraggingId(action.id);
                                setPlaceholderIndex(0);
                            }}
                        >
                            <HoverAction
                                {...action}
                                isInactive={isSelected || isSelectedFull || isDragging}
                                hoverIcon="plus"
                                onClick={!isSelected ? id => addToSelected(id, 0) : undefined}
                                cornerIcon={isSelected ? "check" : null}
                            />
                        </DragDrop>
                    ],
                    isSelected
                        ? [...selectedAcc,
                            <DragDrop
                                className="quick-actions__draggable-card"
                                data-id={`selected-action_${action.id}`}
                                dropTarget={false}
                                id={action.id}
                                key={action.id}
                                index={selectedIds.indexOf(action.id)}
                                onCancel={isInBounds => {
                                    if (isDragging && isInBounds) {
                                        // Cancel doesn't actually mean a cancel; it means that the drag ended.
                                        // If the drag ended and the element was in the bounds of a drag container,
                                        // we can assume it was the placeholder container.
                                        reorderSelected(action.id, placeholderIndex);
                                    } else {
                                        resetPlaceholder();
                                    }
                                }}
                                onDrag={(targetIndex, beingDraggedIndex, whatever, _, targetId, draggedId) => {
                                    if (draggingId !== draggedId) {
                                        setDraggingId(draggedId);
                                    }
                                    if (targetIndex !== placeholderIndex) {
                                        setPlaceholderIndex(targetIndex);
                                    }
                                }}
                                type="column"
                                style={draggingId === action.id ? { display: "none" } : undefined}
                            >
                                <HoverAction
                                    {...action}
                                    onClick={removeFromSelected}
                                    isInactive={isDragging}
                                    cornerIcon="clear"
                                />
                            </DragDrop>
                        ]
                        : selectedAcc,
                    isRecent
                        ? [
                            ...recentAcc,
                            <HoverAction
                                {...action}
                                data-id={`recent-action_${action.id}`}
                                hoverIcon="plus"
                                onClick={id => addToSelected(id, 0)}
                                key={action.id}
                            />
                        ]
                        : recentAcc
                ];
            }, [acc[name], acc.selected, acc.recent]);
        return {
            ...acc,
            [name]: mappedActions,
            selected: mappedSelected,
            recent: mappedRecent
        };
    }, { selected: [], recent: [] });

    const orderedSelected = selectedIds.map(id => mapped.selected.find(item => item.props.id === id));

    return {
        ...mapped,
        recent: recentIds.map(id => mapped.recent.find(item => item.props.id === id)),
        selected: getSelectedWithPlaceholder(
            orderedSelected,
            placeholderIndex,
            <DragDrop
                className="quick-actions__draggable-card"
                data-id="selected-action-placeholder"
                dropTarget={false}
                id={"placeholder"}
                key={"placeholder"}
                index={placeholderIndex}
                onDrop={(targetIndex, beingDraggedIndex, _st, _t, targetId, draggedId) => {
                    const isSelected = selectedIds.includes(draggedId);
                    if (isSelected) {
                        reorderSelected(draggingId, placeholderIndex);
                    } else {
                        addToSelected(draggingId, placeholderIndex);
                    }
                }}
                type="column"
            >
                <div className="quick-actions__drag-placeholder" />
            </DragDrop>
        )
    };
}