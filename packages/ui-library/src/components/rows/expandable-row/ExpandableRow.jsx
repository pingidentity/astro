"use strict";

var React = require("react"),
    classnames = require("classnames"),
    _ = require("underscore"),
    DetailsTooltip = require("../../tooltips/DetailsTooltip.jsx");

/**
 * @callback ExpandableRow~eventCallback
 * @param {object} event - reactjs synthetic event object
 */

/**
 * @callback ExpandableRow~toggleCallback
 * @param {boolean} isExpanded - current expanded state (expanded/collapsed).
 */

/**
 * @class ExpandableRow
 * @desc Basic expandable row component.
 *
 * @param {object}  [content] - a JSX object that represents the content to be shown when expanding
 *     the row.
 * @param {bool}    [controlled=false] - A boolean to enable the component to be externally managed.
 *     True will relinquish control to the components owner.  False or not specified will cause the component to manage
 *     state internally but still execute the onToggle callback in case the owner is interested.
 * @param {bool}    [defaultToExpanded=false] - DEPRECATED: option to render the row in a expanded
 *     state by default. Default is false. This option is only left for backward compatibility
 *     within stateful version of control.
 * @param {object}  [editButton] - it is used to show an object inside edit body. For example:
 *     ModalButton can be passed as shown here:
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
 * @param {string}  [editViewRoute] - route to the 'edit mode' view. Default is ''.
 * @param {bool}    [expanded=false] - whether row is expanded or collapsed
 * @param {string}  [image] - (optional) http path to an image. When specified, the image displays
 *     to the left of the title and subtitle
 * @param {bool}    [isEditEnabled=true] - whether or not the 'edit' button is enabled. Default is
 *     true.
 * @param {ExpandableRow~eventCallback}  [onDelete] - callback to be triggered when clicking on the
 *     'delete' icon (if present)
 * @param {ExpandableRow~toggleCallback} [onToggle] - callback to be triggered when expand/collapse
 *     button is clicked. Accepts param of type bool - expanded/collapsed state before trigger.
 * @param {object}  [subtitle] - a string or JSX object that goes right below the title, and serves
 *     as a subtitle.
 * @param {bool}    [showEdit=true] - whether or not the 'edit' button will be shown at all. Default
 *     is true.
 * @param {bool}    [showDelete=true] - whether or not the 'delete' button will be shown at all.
 *     Default is true.
 * @param {object}  [title] - a string or JSX object that serves as the title shown on the row.
 * @param {string}  [titleStyle] - extra css styling for label
 * @param {object}  [deleteButton] - it is used to show an object inside delete body. For example:
 *     ModalButton
 * @param {string}  [className] - extra CSS classes to be applied
 * @param {bool}    [waiting=false] - when true, disabled interaction with row and reduces opacity
 (     of the layer
 * @param {string}  [id="expandable-row"]- it is used for a unique data-id.
 * @param {object} [status] - show a ExpandableRow.Statuses to show the status on the right hand side of the row.
 * @param {object}  [rowAccessories] - a span (don't use a div) where buttons and toggles may be passed in
 *     to render on the right side of the row just to the left of the expand button
 * @param {bool} [confirmDelete=false] - whether or not a 'delete' should show a confirmation dialog.
 *      Default is false.
 * @param {bool} [showDeleteConfirm=false] - whether or not the confirm delete dialog is visible (default=false).
 * @param {string} [labelDeleteConfirm] - message to display when asking for confirmation to delete a row
 *      (default = Are you sure you want to delete this row?).
 * @param {ExpandableRow~eventCallback} [onEditButtonClick] - callback to be triggered when clicking on the
 *      'edit' button (if present)
 *
 * @example
 *         <h1>My Row Results</h1>
 *         <!-- note that all expanding rows must be in a div with the "result-set" css class -->
 *         <div className="result-set">
 *             <ExpandableRow title={'row1'} subtitle={'row1 subtitle'} content={row1Content} />
 *             <ExpandableRow title={'row2'} subtitle={'row2 subtitle'} content={row2Content} />
 *             <ExpandableRow title={'row3'} subtitle={'row3 subtitle'} content={row3Content} />
 *         </div>
 *
 *     You can also pass the content as a children of the component. This will overwrite any content passed in as a prop
 *
 *         <ExpandableRow title={titleJsx} subtitle={subtitleJsx}>
 *             {contentChildrenJsx}
 *         </ExpandableRow>
 */


var ExpandableRow = React.createClass({
    propTypes: {
        controlled: React.PropTypes.bool,
        defaultToExpanded: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false,
            defaultToExpanded: false
        };
    },

    render: function () {
        return (
            this.props.controlled
                ? <StatelessExpandableRow ref="StatelessExpandableRow" {...this.props} />
                : <StatefulExpandableRow ref="StatefulExpandableRow" {...this.props} />);
    }
});

var Statuses = {
    GOOD: "good",
    WARNING: "warning",
    ERROR: "error"
};

var StatefulExpandableRow = React.createClass({

    propTypes: {
        defaultToExpanded: React.PropTypes.bool,
        showDeleteConfirm: React.PropTypes.bool
    },

    _onToggle: function () {
        if (typeof(this.props.onToggle) === "function") {
            this.props.onToggle(!this.state.expanded);
        }

        this.setState({
            expanded: !this.state.expanded
        });
    },

    _hideDeleteConfirm: function () {
        this.setState({
            showDeleteConfirm: false
        });
    },

    _handleDeleteConfirm: function () {
        this._hideDeleteConfirm();
        if (this.props.onDelete) {
            this.props.onDelete();
        }
    },

    _handleDelete: function () {
        if (!this.props.confirmDelete && this.props.onDelete) {
            this.props.onDelete();
        } else {
            this.setState({
                showDeleteConfirm: true
            });
        }
    },

    getDefaultProps: function () {
        return {
            defaultToExpanded: false,
            showDeleteConfirm: false
        };
    },

    getInitialState: function () {
        return {
            expanded: this.props.defaultToExpanded,
            showDeleteConfirm: this.props.showDeleteConfirm
        };
    },

    render: function () {
        return (
            <StatelessExpandableRow ref="StatelessExpandableRow" {...this.props}
                expanded={this.state.expanded}
                onToggle={this._onToggle}
                showDeleteConfirm={this.state.showDeleteConfirm}
                onDelete={this._handleDelete}
                onDeleteCancelClick={this._hideDeleteConfirm}
                onDeleteConfirmClick={this._handleDeleteConfirm} />
        );
    }
});


var StatelessExpandableRow = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        content: React.PropTypes.object,
        deleteButton: React.PropTypes.object,
        draggable: React.PropTypes.bool,
        editButton: React.PropTypes.object,
        editViewRoute: React.PropTypes.string,
        expanded: React.PropTypes.bool,
        id: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        image: React.PropTypes.string,
        isEditEnabled: React.PropTypes.bool,
        onDelete: React.PropTypes.func,
        onToggle: React.PropTypes.func,
        rowAccessories: React.PropTypes.object,
        showDelete: React.PropTypes.bool,
        showEdit: React.PropTypes.bool,
        title: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.string
        ]),
        titleStyle: React.PropTypes.string,
        subtitle: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.string
        ]),
        waiting: React.PropTypes.bool,
        confirmDelete: React.PropTypes.bool,
        showDeleteConfirm: React.PropTypes.bool,
        labelDeleteConfirm: React.PropTypes.string,
        onDeleteCancelClick: React.PropTypes.func,
        onDeleteConfirmClick: React.PropTypes.func,
        onEditButtonClick: React.PropTypes.func
    },

    /**
     * Propagate expanded/collapse toggle event to owner.
     *
     * @private
     */
    _handleExpandButtonClick: function () {
        if (this.props.onToggle) {
            this.props.onToggle(this.props.expanded);
        }
    },

    getDefaultProps: function () {
        return {
            showEdit: true,
            isEditEnabled: true,
            editViewRoute: "",
            showDelete: true,
            expanded: false,
            id: "expandable-row",
            waiting: false,
            onDelete: _.noop,
            confirmDelete: false,
            showDeleteConfirm: false,
            labelDeleteConfirm: "Are you sure you want to delete this row?",
            onDeleteCancelClick: _.noop,
            onDeleteConfirmClick: _.noop,
            onEditButtonClick: _.noop
        };
    },

    /*
     * PingAccess guys need the ability to specify a non-hash route to edit rows.  In order to maintain
     * backwards compatibility, the component will only skip adding a hash to the edit url if the editViewRoute
     * starts with a '/'.
     */
    _getEditViewRoute: function (route) {
        if (!route) {
            return null;
        }
        if (route[0] === "/") {
            return route;
        }
        return "#/" + route;
    },

    render: function () {
        var showEditIcon = this.props.showEdit && this.props.isEditEnabled,
            showViewIcon = this.props.showEdit && !this.props.isEditEnabled,
            containerClassname = classnames("item", this.props.className, {
                expanded: this.props.expanded,
                waiting: this.props.waiting,
                "has-image": !!this.props.image,
                "no-delete": !this.props.showDelete,
                "title-only": !this.props.subtitle,
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
                      onClick={this.props.onDelete} />);
        }

        return (
            <div data-id={this.props.id} className={containerClassname}>
                <div className="collapsed-content">
                    {this.props.image && (
                        <img src={this.props.image} className="item-image" />
                    )}
                    <div className="item-title">{this.props.title}</div>
                    {this.props.subtitle && (
                        <div className="item-sub-title">{this.props.subtitle}</div>
                    )}
                    { (this.props.rowAccessories || this.props.status) && (
                        <div data-id="row-accessories" className="row-accessories">
                            {this.props.rowAccessories}
                            {this.props.status && (
                                <div data-id="status" className={"status "+ this.props.status}></div>
                            )}
                        </div>
                    )}
                </div>
                {this.props.expanded && (
                    <div data-id="expanded-row" className="expanded-content clearfix">
                        {this.props.children || this.props.content}
                        {editButton}
                        {deleteButton}
                        {!this.props.showEdit && (
                            <div className="btn-fill"></div>
                        )}
                        {this.props.confirmDelete && this.props.showDeleteConfirm &&
                            <ConfirmDeleteDialog
                                label={this.props.labelDeleteConfirm}
                                onCancel={this.props.onDeleteCancelClick}
                                onDeleteConfirm={this.props.onDeleteConfirmClick} />
                        }
                    </div>
                )}
                <a data-id="expand-btn"
                   className="expand-btn"
                   onClick={this._handleExpandButtonClick}>
                </a>
            </div>
        );
    }
});

var ConfirmDeleteDialog = React.createClass({

    propTypes: {
        label: React.PropTypes.string,
        onCancel: React.PropTypes.func,
        onDeleteConfirm: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            label: "",
            onCancel: _.noop,
            onDeleteConfirm: _.noop,
        };
    },

    render: function () {
        return (
            <DetailsTooltip label=" "
                positionStyle="bottom left"
                id="delete-confirm-dialog"
                className="delete-confirm-dialog"
                title="Confirm Delete"
                open={true}
                onToggle={this.props.onCancel}>

                <p>{this.props.label}</p>

                <div className="buttons">
                    <input type="button"
                        data-id="cancel-delete"
                        value="Cancel"
                        className="secondary"
                        onClick={this.props.onCancel} />
                    <input type="button"
                        data-id="confirm-delete"
                        value="Confirm"
                        className="primary"
                        onClick={this.props.onDeleteConfirm} />
                </div>
            </DetailsTooltip>);
    }
});

ExpandableRow.Statuses = Statuses;
module.exports = ExpandableRow;
