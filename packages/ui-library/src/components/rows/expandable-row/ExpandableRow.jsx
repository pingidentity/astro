"use strict";

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";
import DetailsTooltip from "../../tooltips/DetailsTooltip";
import Utils from "../../../util/Utils";
import Translator from "../../../util/i18n/Translator";
import KeyboardUtils from "../../../util/KeyboardUtils";
import DragDrop from "../DragDropRow";
import dragScroll from "../../../util/dragScroll";
import InlineMessage from "../../general/InlineMessage";
import Button from "../../buttons/Button";
import StatusIndicator from "../../general/StatusIndicator";
import StretchContent from "../../layout/StretchContent";
import ButtonGroup from "../../layout/ButtonGroup";
import {
    cannonballChangeWarning,
    cannonballProgressivelyStatefulWarning,
    cannonballPortalWarning
} from "../../../util/DeprecationUtils";
import { inStateContainer, toggleTransform } from "../../utils/StateContainer";
import { flagsPropType, hasFlag, getFlags } from "../../../util/FlagUtils";

/**
* @enum {string}
* @alias ExpandableRow.Statuses
* @desc An enum of expandable row statuses.
*/
const Statuses = {
    GOOD: "good",
    WARNING: "warning",
    ERROR: "error"
};

const StatusTypes = {
    [Statuses.GOOD]: StatusIndicator.Types.SUCCESS,
    [Statuses.WARNING]: StatusIndicator.Types.WARNING,
    [Statuses.ERROR]: StatusIndicator.Types.ERROR,
};

/**
 * @enum {string}
 * @alias ExpandableRow.RowMessageTypes
 */
const RowMessageTypes = {
    WARNING: "warning"
};

/**
 * @enum {string}
 * @alias ExpandableRow.ConfirmDeletePositions
 */
const ConfirmDeletePositions = {
    TOP: "top",
    BOTTOM: "bottom"
};

/**
 * @callback ExpandableRow~eventCallback
 * @param {object} event - reactjs synthetic event object
 */

/**
 * @callback ExpandableRow~onToggle
 *
 * @param {boolean} expanded
 *     Current expanded/collapsed state.
 */

/**
* @callback ExpandableRow~onEditButtonClick
*
* @param {object} e
*    The ReactJS synthetic event object.
*/

/**
* @callback ExpandableRow~onDelete
*/

/**
* @callback ExpandableRow~onDeleteCancelClick
*
* @param {object} e
*    The ReactJS synthetic event object.
*/

/**
* @callback ExpandableRow~onDeleteConfirmClick
*
* @param {object} e
*    The ReactJS synthetic event object.
*/

/**
 * @class ExpandableRow
 * @desc Basic expandable row component.
 *
 * @param {string} [data-id="expandable-row"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {string|number} [id]
 *     Row id, which may be used as a numeric counter rather. Can compliment data-id.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {array} [flags]
 *     Set the flag for "use-portal" to render tooltips with popper.js and react-portal
 *     Set the flag for "expandable-row-class" to use the updated CSS className
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 *     The "onToggle" callback will still be executed in case the owner is interested.
 *
 * @param {boolean} [expanded=false]
 *     Whether the row is expanded or collapsed.
 * @param {ExpandableRow~onToggle} [onToggle]
 *     Callback to be triggered when the expand/collapse button is clicked.
 *
 * @param {string|object} [title]
 *     A string or JSX object that serves as the title shown on the row.
 * @param {string} [titleClassName]
 *     CSS classes to set on the row title.
 *
 * @param {string|object} [subtitle]
 *     A string or JSX object that serves as the subtitle shown on the row right below the title.
 *
 * @param {string} [image]
 *     HTTP path to an image. When specified, the image displays to the left of the title and subtitle.
 * @param {string} [icon]
 *     HTTP path to an icon. When specified, the icon displays to the left of the title and subtitle.
 *
 * @param {object} [content]
 *     A JSX object that represents the content to be shown when expanding the row.
 *
 * @param {string} [editViewRoute=""]
 *     Route to the 'edit mode' view.
 * @param {boolean} [isEditEnabled=true]
 *     Whether or not the 'edit' button is enabled.
 * @param {boolean} [showEdit=true]
 *     Whether or not the 'edit' button will be shown at all.
 * @param {object}  [editButton]
 *     If defined, will replace the default edit button implementation.
 *     For example, a ModalButton can be passed as shown here:
 *         <...editButton={
 *             <ModalButton
 *                 linkContent={editModalButton}
 *                 data-id="edit-btn"
 *                 inline={true}
 *                 modalTitle={this.props.editModalTitle}
 *                 maximize={true}
 *                 modalBody={this.props.editModalBody}>
 *             </ModalButton>}>
 *         />
 * @param {ExpandableRow~onEditButtonClick} [onEditButtonClick]
 *     Callback to be triggered when the 'edit' button is clicked (if present).
 *
 * @param {boolean} [showDelete=true]
 *     Whether or not the 'delete' button will be shown at all.
 * @param {object} [deleteButton]
 *     If defined, will replace the default delete button implementation.
 *     For example, a ModalButton can be passed as shown here:
 *         <...deleteButton={
 *             <ModalButton
 *                 linkContent={deleteModalButton}
 *                 data-id="delete-btn"
 *                 inline={true}
 *                 modalTitle={this.props.deleteModalTitle}
 *                 maximize={true}
 *                 modalBody={this.props.deleteModalBody}>
 *             </ModalButton>}>
 *         />
 * @param {ExpandableRow~onDelete} [onDelete]
 *     Callback to be triggered when the 'delete' button is clicked (if present).
 *
 * @param {string} [labelDeleteConfirm]
 *     The message to display within the delete confirm dialog when asking for confirmation to delete a row.
 * @param {boolean} [confirmDelete=false]
 *     Whether or not a 'delete' action should show a confirmation dialog.
 * @param {string} [confirmDeletePosition=bottom]
 *     Used to determine whether the confirm delete dialog will appear above or below the delete button.
 * @param {string} [confirmDeleteTitle]
 *     Title to set for Confirm Delete dialog tooltip
 * @param {object} [confirmDeleteContent]
 *     Optional custom content to replace the default delete confirmation tooltip content
 * @param {boolean} [showDeleteConfirm=false]
 *     Whether or not the confirm delete dialog is visible.
 * @param {ExpandableRow~onDeleteCancelClick} [onDeleteCancelClick]
 *     Callback to be triggered when the 'cancel' button in a delete confirm dialog is clicked.
 * @param {ExpandableRow~onDeleteConfirmClick} [onDeleteConfirmClick]
 *     Callback to be triggered when the 'confirm' button in a delete confirm dialog is clicked.
 *
 * @param {ExpandableRow.Statuses} [status]
 *     The ExpandableRow.Statuses status to show on the right hand side of the row.
 * @param {ExpandableRow.RowMessageTypes} [rowMessage]
 *     Displays a message along the top of the expanded row above all row content including the title and row
  *    accessories.
 * @param {node} [rowAccessories]
 *     A right-aligned container where buttons, toggles, or anything else may be passed in to render on the right side
 *     of the row, just to the left of the expand button.
 *
 * @param {boolean} [waiting=false]
 *     If true, disables interaction with the row and reduces opacity of the layer.
 * @param {ExpandableRow~Ordering} [ordering]
 *     If exists, disables normal interaction with the row and adds ordering controls.
 *     Its properties are position, positionValue, total, onReorder, and onPositionValueChange.
 *
 * @example
 *         <h1>My Row Results</h1>
 *         <!-- note that all expanding rows must be in a div with the "result-set" css class or a wrapper component -->
 *         <ExpandableRow.SimpleWrapper>
 *             <ExpandableRow id="1" title={'row1'} subtitle={'row1 subtitle'} content={row1Content} />
 *             <ExpandableRow id="2" title={'row2'} subtitle={'row2 subtitle'} content={row2Content} />
 *             <ExpandableRow id="3" title={'row3'} subtitle={'row3 subtitle'} content={row3Content} />
 *         </ExpandableRow.SimpleWrapper>
 *
 *     You can also pass the content as a children of the component. This will overwrite any content passed in as a prop
 *
 *         <ExpandableRow title={titleJsx} subtitle={subtitleJsx}>
 *             {contentChildrenJsx}
 *         </ExpandableRow>
 */

/**
 * @typedef {object} ExpandableRow~Ordering
 * @property {number} position
 *  The current position of the row
 * @property {number} total
 *  Number of items in whole ordered list
 * @property {ExpandableRow~onReorder} onReorder
 *  Handler for changing the order
 * @property {function} onPositionValueChange
 *  Handler for editing the input field
 * @property {number} positionValue
 *  When provided, the value of the input field. When not provided, it's managed in-component
 */

/**
 * @typedef {function} ExpandableRow~onReorder
 * @param {number} from
 *  The current index of the item to be moved
 * @param {number} to
 *  The current index of the item that should be right after the moving item in the new order
 *  (If item 2 is moved to index 7, it will end up at index 6 because the list shifts after it is removed)
 */

class ExpandableRow extends React.Component {

    static displayName = "ExpandableRow";

    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: false
    };

    _usePStateful = () => hasFlag(this, "p-stateful")

    componentDidMount() {
        if (!Utils.isProduction()) {
            if (!this._usePStateful()) {
                cannonballProgressivelyStatefulWarning({
                    name: "ExpandableRow"
                });
            }
            if (this.props.controlled !== undefined) {
                throw new Error(Utils.deprecatePropError("controlled", "stateless"));
            }
            if (this.props.defaultToExpanded !== undefined) {
                throw new Error(Utils.deprecatePropError("defaultToExpanded", "expanded"));
            }
        }
    }

    render() {
        if (this._usePStateful()) {
            return <PStatefulExpandableRow {...this.props} />;
        }

        return this.props.stateless
            ? React.createElement(StatelessExpandableRow, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "StatelessExpandableRow" }, this.props), this.props.children)
            : React.createElement(StatefulExpandableRow, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "StatefulExpandableRow" }, this.props), this.props.children);
    }
}

class StatefulExpandableRow extends React.Component {
    static displayName = "StatefulExpandableRow";

    static propTypes = {
        showDeleteConfirm: PropTypes.bool
    };

    static defaultProps = {
        showDeleteConfirm: false,
        expanded: false
    };

    state = {
        expanded: this.props.expanded,
        showDeleteConfirm: this.props.showDeleteConfirm
    };

    _handleToggle = () => {
        if (typeof(this.props.onToggle) === "function") {
            this.props.onToggle(!this.state.expanded);
        }

        this.setState({
            expanded: !this.state.expanded
        });
    };

    _hideDeleteConfirm = () => {
        this.setState({
            showDeleteConfirm: false
        });
    };

    _handleDeleteConfirm = (e) => {
        this._hideDeleteConfirm();
        if (this.props.onDelete) {
            this.props.onDelete(e);
        }
    };

    _handleDelete = (e) => {
        e.preventDefault();
        if (!this.props.confirmDelete && this.props.onDelete) {
            this.props.onDelete(e);
        } else {
            this.setState({
                showDeleteConfirm: true
            });
        }
    };

    _handleReorder = (from = this.props.ordering.position, to) => {
        this.setState({
            positionValue: undefined,
        });
        if (this.props.ordering && this.props.ordering.onReorder) {
            // this is janky code to make up for the original
            // janky code in this stateful component, which will
            // be removed in v4
            this.props.ordering.onReorder(
                from !== to ? from : this.props.ordering.position,
                to
            );
        }
    };

    _handlePositionValueChange = (value) => {
        this.setState({
            positionValue: value
        });
    };

    render() {
        const ordering = this.props.ordering
            ? _.defaults({
                position: this.state.positionValue !== undefined
                    ? this.state.positionValue
                    : this.props.ordering.position,
                onReorder: this._handleReorder,
                onPositionValueChange: this._handlePositionValueChange,
            }, this.props.ordering)
            : undefined;
        const props = _.defaults({
            ref: "StatelessExpandableRow",
            expanded: this.state.expanded,
            onToggle: this._handleToggle,
            showDeleteConfirm: this.state.showDeleteConfirm,
            onDelete: this._handleDelete,
            onDeleteCancelClick: this._hideDeleteConfirm,
            onDeleteConfirmClick: this._handleDeleteConfirm,
            ordering
        }, this.props);

        return <StatelessExpandableRow {...props} />;
    }
}

class OrderingInput extends React.Component {
    state = {};

    _getValue = () => {
        if (this.state.value !== undefined) {
            return this.state.value;
        }
        const { positionValue = this.props.position } = this.props;
        return positionValue;
    }
    _positionInRange = number => {
        const { total } = this.props;

        if (number < 0) {
            return 0;
        } else if (number > total) {
            return total;
        } else {
            return number;
        }
    }

    _inputValueToPosition = value => value === "" ? "" : parseInt(value) - 1;

    _handleChange = e => {
        const value = this._inputValueToPosition(e.target.value.replace(/[^0-9]/, ""));

        if (this.props.onPositionValueChange) {
            this.props.onPositionValueChange(value, e);
        } else {
            this.setState({ value });
        }
    };

    _stopEvent = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    _handleKey = (e) => {
        // sometimes position is not the actual position but something to show in the field,
        // so it still makes sense to check the range
        const position = this._positionInRange(this.props.position);
        const positionValue = this._getValue();

        if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP) {
            // this is +2 rather than +1 because it's the index we're inserting this record before
            this._handleReorder(position, this._positionInRange(positionValue + 2));
        } else if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_DOWN) {
            this._handleReorder(position, this._positionInRange(positionValue - 1));
        } else if (e.keyCode === KeyboardUtils.KeyCodes.ENTER) {
            this._handleReorder(position, this._positionInRange(positionValue));
        } else {
            return;
        }
        this._stopEvent(e);
    };

    _handleDrag = this._stopEvent;

    _handleBlur = () => this._handleReorder(
        this._positionInRange(this.props.position), // just making sure it's in range in case we're not being passed the actual position
        this._positionInRange(this._getValue())
    );

    _handleClick = e => e.target.select();

    _handleReorder = (from, to) => {
        if (to !== "") {
            this.props.onReorder(from !== "" ? from : undefined, to);
        }
        this.setState({ value: undefined });
    }

    render() {
        const value = this._getValue();

        return (
            <input
                className="ordering-controls__input"
                data-id={this.props["data-id"]}
                draggable={true} // has to be draggable to override dragging
                onBlur={this._handleBlur}
                onChange={this._handleChange}
                onClick={this._handleClick}
                onDragStart={this._handleDrag}
                onKeyDown={this._handleKey}
                type="text"
                value={value === "" ? value : value + 1}
            />
        );
    }
}

class StatelessExpandableRow extends React.Component {
    static displayName = "StatelessExpandableRow";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        expanded: PropTypes.bool,
        onToggle: PropTypes.func,
        title: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        titleClassName: PropTypes.string,
        subtitle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        image: PropTypes.string,
        icon: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.string
        ]),
        children: PropTypes.node,
        content: PropTypes.object,
        editViewRoute: PropTypes.string,
        isEditEnabled: PropTypes.bool,
        showEdit: PropTypes.bool,
        editButton: PropTypes.object,
        onEditButtonClick: PropTypes.func,
        showDelete: PropTypes.bool,
        deleteButton: PropTypes.object,
        onDelete: PropTypes.func,
        labelDeleteConfirm: PropTypes.string,
        confirmDelete: PropTypes.bool,
        confirmDeletePosition: PropTypes.string,
        confirmDeleteContent: PropTypes.object,
        showDeleteConfirm: PropTypes.bool,
        onDeleteCancelClick: PropTypes.func,
        onDeleteConfirmClick: PropTypes.func,
        status: PropTypes.oneOf([Statuses.GOOD, Statuses.ERROR, Statuses.WARNING]),
        rowAccessories: PropTypes.node,
        rowMessage: PropTypes.object,
        waiting: PropTypes.bool,
        ordering: PropTypes.shape({
            position: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([""])]),
            total: PropTypes.number,
            onReorder: PropTypes.func,
            onPositionValueChange: PropTypes.func,
            positionValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([""])]),
        }),
        flags: flagsPropType,
    };

    static defaultProps = {
        "data-id": "expandable-row",
        expanded: false,
        editViewRoute: "",
        isEditEnabled: true,
        showEdit: true,
        onEditButtonClick: _.noop,
        showDelete: true,
        onDelete: _.noop,
        confirmDelete: false,
        showDeleteConfirm: false,
        confirmDeletePosition: ConfirmDeletePositions.BOTTOM,
        onDeleteCancelClick: _.noop,
        onDeleteConfirmClick: _.noop,
        waiting: false,
    };

    componentDidMount() {
        if (!this._useNewClassName()) {
            cannonballChangeWarning({
                message: (
                    `ExpandableRow will use a new className in v4. To use that className now, ` +
                    `add the flag 'expandable-row-class' to ExpandableRow.`
                ),
            });
        }

        if (!hasFlag(this, "use-portal")) {
            cannonballPortalWarning({ name: "ExpandableRow" });
        }
    }

    /**
     * Propagate expanded/collapse toggle event to owner.
     *
     * @private
     */
    _handleExpandButtonClick = () => {
        if (this.props.onToggle) {
            this.props.onToggle(this.props.expanded);
        }
    };

    _handleDrop = (targetId, beingDraggedId) => {
        if (targetId === beingDraggedId) {
            return;
        }

        if (this.props.ordering && this.props.ordering.onReorder) {
            this.props.ordering.onReorder(beingDraggedId, targetId);
        }
    };

    /*
     * PingAccess guys need the ability to specify a non-hash route to edit rows.  In order to maintain
     * backwards compatibility, the component will only skip adding a hash to the edit url if the editViewRoute
     * starts with a '/'.
     */
    _getEditViewRoute = (route) => {
        if (!route) {
            return null;
        }
        if (route[0] === "/") {
            return route;
        }
        return "#/" + route;
    };

    componentDidUpdate(prevProps) {
        if (this.props.expanded && !prevProps.expanded) {
            setTimeout(() => this.expandableRow.scrollIntoView(
                { behavior: "smooth", block: "nearest" }), 50
            );
        }
    }

    _useNewClassName = () => hasFlag(this, "expandable-row-class");

    render() {
        const { icon } = this.props;
        const baseClassName = this._useNewClassName() ? "expandable-row" : "item";
        var showEditIcon = this.props.showEdit && this.props.isEditEnabled,
            showViewIcon = this.props.showEdit && !this.props.isEditEnabled,
            containerClassname = classnames(baseClassName, this.props.className, {
                expanded: this.props.expanded,
                waiting: this.props.waiting,
                [`${baseClassName}--ordering`]: this.props.ordering,
                "has-image": !!this.props.image,
                "has-icon": icon,
                "no-delete": !this.props.showDelete,
                "has-subtitle": this.props.subtitle,
                "no-edit": !showEditIcon
            }),
            editButtonClassname = classnames({
                "edit-btn": !showViewIcon,
                "view-btn": showViewIcon
            }),
            deleteButton,
            editButton;

        if (this.props.showEdit) {
            editButton = this.props.editButton || (
                <a data-id="edit-btn" className={editButtonClassname}
                    href={this._getEditViewRoute(this.props.editViewRoute)}
                    onClick={this.props.onEditButtonClick} />);
        }

        if (this.props.showDelete) {
            deleteButton = this.props.deleteButton || (
                <a data-id={this.props.confirmDelete ? "delete-btn-confirm" : "delete-btn"}
                    className="delete-btn"
                    onClick={this.props.onDelete}/>);
        }

        var titleClassName = classnames("item-title", this.props.titleClassName);

        if (this.props.showDelete) {
            var deleteObject = this.props.deleteButton || (
                <button data-id={this.props.confirmDelete ? "delete-btn-confirm" : "delete-btn"}
                    className="delete-btn"
                    onClick={this.props.onDelete} />);
            //details tooltip should be delete button
            if (this.props.confirmDelete || this.props.confirmDeleteContent) {
                deleteButton = (<ConfirmDeleteDialog
                    trigger={deleteObject}
                    label={this.props.labelDeleteConfirm}
                    open={this.props.expanded && this.props.showDeleteConfirm}
                    onCancel={this.props.onDeleteCancelClick}
                    confirmDeleteTitle={this.props.confirmDeleteTitle}
                    onDeleteConfirm={this.props.onDeleteConfirmClick}
                    confirmDeletePosition={this.props.confirmDeletePosition}
                    flags={getFlags(this)}
                >
                    {this.props.confirmDeleteContent}
                </ConfirmDeleteDialog>);
            }
            else {
                deleteButton = deleteObject;
            }
        }

        const rendered = (
            <div
                ref={(row) => (this.expandableRow = row)}
                data-id={this.props["data-id"]}
                className={containerClassname}
            >
                { (this.props.rowAccessories || this.props.status) && (
                    <div data-id="row-accessories" className="row-accessories">
                        {this.props.rowAccessories}
                        {this.props.status && (
                            <StatusIndicator data-id="status" type={StatusTypes[this.props.status]} inline />
                        )}
                    </div>
                )}
                { (this.props.ordering) && (
                    <div data-id="ordering-controls" className="ordering-controls">
                        <span className="icon-grip ordering-controls__grip"/>
                        <OrderingInput
                            data-id="ordering-input"
                            {...this.props.ordering}
                        />
                        / {this.props.ordering.total}
                    </div>
                )}
                <div
                    className={
                        classnames(
                            "collapsed-content",
                            icon && _.isString(icon) ? "" : "collapsed-content--with-icon"
                        )
                    }
                >
                    {this.props.image && (
                        <img src={this.props.image} className="item-image" />
                    )}
                    {icon && (
                        _.isString(icon)
                            ? <span className={"item-icon " + icon} />
                            : <span className="collapsed-content__icon">{icon}</span>
                    )}
                    <div className={titleClassName}>{this.props.title}</div>
                    {this.props.subtitle && (
                        <div className="item-sub-title">{this.props.subtitle}</div>
                    )}

                </div>
                {this.props.expanded && (
                    <div data-id="expanded-row" className="expanded-content indent-content clearfix">
                        {this.props.rowMessage && (
                            <InlineMessage
                                data-id="item-message"
                                className={"item-message"}
                                type={this.props.rowMessage.type}
                                alternate={true}>
                                {this.props.rowMessage.text}
                            </InlineMessage>
                        )}
                        <div className="expanded-content-scroller">
                            {this.props.children || this.props.content}
                        </div>
                    </div>
                )}
                <div className="row-btns">
                    <a
                        data-id="expand-btn"
                        className="expand-btn"
                        onClick={this._handleExpandButtonClick}
                    />
                    {!this.props.showEdit && (
                        <div className="btn-fill" />
                    )}
                    {editButton}
                    {deleteButton}
                </div>
            </div>
        );
        if (this.props.ordering) {
            return (
                <DragDrop
                    className="draggable-item"
                    id={this.props.ordering.position}
                    index={this.props.ordering.position}
                    onDrop={this._handleDrop}
                    onDragStart={dragScroll.start}
                    onDragEnd={dragScroll.end}
                >{rendered}</DragDrop>
            );
        } else {
            return rendered;
        }
    }
}

class ConfirmDeleteDialog extends React.Component {
    static displayName = "ConfirmDeleteDialog";

    static propTypes = {
        confirmDeletePosition: PropTypes.string,
        label: PropTypes.string,
        confirmDeleteTitle: PropTypes.string,
        onCancel: PropTypes.func,
        onDeleteConfirm: PropTypes.func,
        flags: flagsPropType,
    };

    static defaultProps = {
        label: "",
        onCancel: _.noop,
        onDeleteConfirm: _.noop,
        confirmDeleteTitle: Translator.translate("confirmdelete")
    };

    _renderTooltipContent = () => {
        if (this.props.children) {
            return this.props.children;
        } else {
            return (
                <div>
                    <p>
                        {this.props.label}
                    </p>
                    <ButtonGroup
                        cancelLabel={Translator.translate("cancel")}
                        onCancel={this.props.onCancel}
                    >
                        <Button data-id="confirm-delete" onClick={this.props.onDeleteConfirm}>
                            {Translator.translate("delete")}
                        </Button>
                    </ButtonGroup>
                </div>
            );
        }
    };

    render() {
        return (
            <DetailsTooltip
                placement={`${this.props.confirmDeletePosition} left`}
                data-id="delete-confirm-dialog"
                title={this.props.confirmDeleteTitle}
                label={this.props.trigger}
                open={this.props.open}
                onToggle={this.props.open ? this.props.onCancel : _.noop}
                flags={getFlags(this)}
            >
                {this._renderTooltipContent()}
            </DetailsTooltip>
        );
    }
}

const PStatefulExpandableRow = inStateContainer([
    {
        name: "expanded",
        initial: false,
        callbacks: [
            {
                name: "onToggle",
                transform: toggleTransform
            }
        ]
    },
    {
        name: "showDeleteConfirm",
        initial: false,
        callbacks: [
            {
                name: "onDelete",
                transform: (e, showDeleteConfirm, { confirmDelete }) => confirmDelete ? !showDeleteConfirm : false
            },
            {
                name: "onDeleteConfirmClick",
                transform: () => false
            },
            {
                name: "onDeleteCancelClick",
                transform: () => false
            }
        ]
    }
])(StatelessExpandableRow);

/**
* @class ScrollingWrapper
* @memberof ExpandableRow
* @desc Wraps around a list of ExpandableRow components to display a scrolling list properly
*       You probably want to use it with an InfiniteScroll component
*
* @param {string} [data-id="scrolling-wrapper"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
* @param {node} [title]
*     Content to put in the title above the list
* @param {node} [heading]
*     Content to put above the list
*/

// list and wrapper components to make a list display correctly
const ScrollingWrapper = ({ "data-id": dataId, className, title, children, heading, ...props }) => (
    <StretchContent
        data-id={dataId}
        className={classnames("result-set", "result-set--stretched", className)}
        {...props}
    >
        {title && <div className="result-set__title">{title}</div>}
        {heading}
        <StretchContent scrollable className="result-set__scroller">{children}</StretchContent>
    </StretchContent>
);

ScrollingWrapper.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.node,
    heading: PropTypes.node,
};

ScrollingWrapper.defaultProps = {
    "data-id": "scrolling-wrapper",
};

/**
* @class SimpleWrapper
* @memberof ExpandableRow
* @desc Wraps around a list of ExpandableRow components to display a scrolling list properly
*
* @param {string} [data-id="scrolling-wrapper"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to set on the top-level HTML container.
*/

const SimpleWrapper = ({ "data-id": dataId, className, children, ...props }) => (
    <div data-id={dataId} className={classnames("result-set", className)} {...props}>{children}</div>
);

SimpleWrapper.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
};

SimpleWrapper.defaultProps = {
    "data-id": "simple-wrapper",
};

ExpandableRow.Statuses = Statuses;
ExpandableRow.RowMessageTypes = RowMessageTypes;
ExpandableRow.ConfirmDeletePositions = ConfirmDeletePositions;
ExpandableRow.ScrollingWrapper = ScrollingWrapper;
ExpandableRow.SimpleWrapper = SimpleWrapper;
module.exports = ExpandableRow;
