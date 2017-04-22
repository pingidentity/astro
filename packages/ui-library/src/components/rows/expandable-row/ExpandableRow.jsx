"use strict";

var React = require("re-react"),
    ReactVanilla = require("re-react"),
    classnames = require("classnames"),
    _ = require("underscore"),
    DetailsTooltip = require("../../tooltips/DetailsTooltip.jsx"),
    Utils = require("../../../util/Utils.js"),
    Translator = require("../../../util/i18n/Translator.js");

/**
* @enum {string}
* @alias ExpandableRow.Statuses
* @desc An enum of expandable row statuses.
*/
var Statuses = {
    GOOD: "good",
    WARNING: "warning",
    ERROR: "error"
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
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 *     The "onToggle" callback will still be executed in case the owner is interested.
 * @param {boolean} [controlled=false]
 *     DEPRECATED. Use "stateless" instead.
 *
 * @param {boolean} [expanded=false]
 *     Whether the row is expanded or collapsed.
 * @param {boolean} [defaultToExpanded=false]
 *     DEPRECATED. Use "expanded" instead.
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
 *     If defined, will replace the default delet button implementation.
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
 * @param {boolean} [showDeleteConfirm=false]
 *     Whether or not the confirm delete dialog is visible.
 * @param {ExpandableRow~onDeleteCancelClick} [onDeleteCancelClick]
 *     Callback to be triggered when the 'cancel' button in a delete confirm dialog is clicked.
 * @param {ExpandableRow~onDeleteConfirmClick} [onDeleteConfirmClick]
 *     Callback to be triggered when the 'confirm' button in a delete confirm dialog is clicked.
 *
 * @param {ExpandableRow.Statuses} [status]
 *     The ExpandableRow.Statuses status to show on the right hand side of the row.
 * @param {object} [rowAccessories]
 *     A "span" (don't use a "div") where buttons and toggles may be passed in to render on the right side of the row
 *     just to the left of the expand button.
 *
 * @param {boolan} [waiting=false]
 *     If true, disables interaction with the row and reduces opacity of the layer.
 *
 * @example
 *         <h1>My Row Results</h1>
 *         <!-- note that all expanding rows must be in a div with the "result-set" css class -->
 *         <div className="result-set">
 *             <ExpandableRow id="1" title={'row1'} subtitle={'row1 subtitle'} content={row1Content} />
 *             <ExpandableRow id="2" title={'row2'} subtitle={'row2 subtitle'} content={row2Content} />
 *             <ExpandableRow id="3" title={'row3'} subtitle={'row3 subtitle'} content={row3Content} />
 *         </div>
 *
 *     You can also pass the content as a children of the component. This will overwrite any content passed in as a prop
 *
 *         <ExpandableRow title={titleJsx} subtitle={subtitleJsx}>
 *             {contentChildrenJsx}
 *         </ExpandableRow>
 */


var ExpandableRow = ReactVanilla.createClass({

    displayName: "ExpandableRow",

    propTypes: {
        controlled: React.PropTypes.bool, //TODO: remove in new version
        stateless: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false //TODO: change to stateless prop in new version
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless"));
        }
    },

    render: function () {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return stateless
            ? React.createElement(StatelessExpandableRow, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "StatelessExpandableRow" }, this.props), this.props.children)
            : React.createElement(StatefulExpandableRow, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "StatefulExpandableRow" }, this.props), this.props.children);
    }
});

var StatefulExpandableRow = ReactVanilla.createClass({

    displayName: "StatefulExpandableRow",

    propTypes: {
        defaultToExpanded: React.PropTypes.bool,
        showDeleteConfirm: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            defaultToExpanded: false,
            showDeleteConfirm: false,
            expanded: false
        };
    },

    _handleToggle: function () {
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

    getInitialState: function () {
        return {
            //TODO: remove defaultToExpanded when v1 no longer supported
            expanded: this.props.defaultToExpanded || this.props.expanded,
            showDeleteConfirm: this.props.showDeleteConfirm
        };
    },

    render: function () {
        var props = _.defaults({
            ref: "StatelessExpandableRow",
            expanded: this.state.expanded,
            onToggle: this._handleToggle,
            showDeleteConfirm: this.state.showDeleteConfirm,
            onDelete: this._handleDelete,
            onDeleteCancelClick: this._hideDeleteConfirm,
            onDeleteConfirmClick: this._handleDeleteConfirm
        }, this.props);

        return React.createElement(StatelessExpandableRow, props, this.props.children); //eslint-disable-line no-use-before-define
    }
});


var StatelessExpandableRow = React.createClass({

    displayName: "StatelessExpandableRow",

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.oneOfType([ //TODO: remove id when v1 no longer supported
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        className: React.PropTypes.string.affectsRendering,
        expanded: React.PropTypes.bool.affectsRendering,
        onToggle: React.PropTypes.func,
        title: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.string
        ]).affectsRendering,
        titleClassName: React.PropTypes.string.affectsRendering,
        subtitle: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.string
        ]).affectsRendering,
        image: React.PropTypes.string.affectsRendering,
        icon: React.PropTypes.string.affectsRendering,
        children: React.PropTypes.node.affectsRendering,
        content: React.PropTypes.object.affectsRendering,
        editViewRoute: React.PropTypes.string.affectsRendering,
        isEditEnabled: React.PropTypes.bool.affectsRendering,
        showEdit: React.PropTypes.bool.affectsRendering,
        editButton: React.PropTypes.object.affectsRendering,
        onEditButtonClick: React.PropTypes.func,
        showDelete: React.PropTypes.bool.affectsRendering,
        deleteButton: React.PropTypes.object.affectsRendering,
        onDelete: React.PropTypes.func,
        labelDeleteConfirm: React.PropTypes.string.affectsRendering,
        confirmDelete: React.PropTypes.bool.affectsRendering,
        showDeleteConfirm: React.PropTypes.bool.affectsRendering,
        onDeleteCancelClick: React.PropTypes.func,
        onDeleteConfirmClick: React.PropTypes.func,
        status: React.PropTypes.oneOf([Statuses.GOOD, Statuses.ERROR, Statuses.WARNING]).affectsRendering,
        rowAccessories: React.PropTypes.object.affectsRendering,
        waiting: React.PropTypes.bool.affectsRendering
    },

    getDefaultProps: function () {
        return {
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
            onDeleteCancelClick: _.noop,
            onDeleteConfirmClick: _.noop,
            waiting: false,
        };
    },

    componentWillMount: function () {
        if (this.props.defaultToExpanded && !Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("defaultToExpanded", "expanded"));
        }
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
                "has-icon": !!this.props.icon,
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

        var id = this.props.id || this.props["data-id"],
            titleClassName = classnames("item-title", this.props.titleClassName);

        return (
            <div data-id={id} className={containerClassname}>
                <div className="collapsed-content">
                    {this.props.image && (
                        <img src={this.props.image} className="item-image" />
                    )}
                    {this.props.icon && (
                        <span className={"item-icon " + this.props.icon} />
                    )}
                    <div className={titleClassName}>{this.props.title}</div>
                    {this.props.subtitle && (
                        <div className="item-sub-title">{this.props.subtitle}</div>
                    )}
                    { (this.props.rowAccessories || this.props.status) && (
                        <div data-id="row-accessories" className="row-accessories">
                            {this.props.rowAccessories}
                            {this.props.status && (
                                <div data-id="status" className={"status " + this.props.status}></div>
                            )}
                        </div>
                    )}
                    <a data-id="expand-btn"
                       className="expand-btn"
                       onClick={this._handleExpandButtonClick}>
                    </a>
                </div>
                {this.props.expanded && (
                    <div data-id="expanded-row" className="expanded-content clearfix">
                        <div className="expanded-content-scroll">
                            {this.props.children || this.props.content}
                        </div>

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
            </div>
        );
    }
});

var ConfirmDeleteDialog = ReactVanilla.createClass({

    displayName: "ConfirmDeleteDialog",

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
                positionClassName="bottom left"
                data-id="delete-confirm-dialog"
                className="delete-confirm-dialog"
                title={Translator.translate("confirmdelete")}
                open={true}
                onToggle={this.props.onCancel}>

                <p>{this.props.label}</p>

                <div className="buttons">
                    <button type="button"
                            data-id="cancel-delete"
                            className="secondary"
                            onClick={this.props.onCancel} >
                        {Translator.translate("cancel")}
                    </button>
                    <button type="button"
                            data-id="confirm-delete"
                            className="primary"
                            onClick={this.props.onDeleteConfirm} >
                        {Translator.translate("confirm")}
                    </button>
                </div>
            </DetailsTooltip>);
    }
});

ExpandableRow.Statuses = Statuses;
module.exports = ExpandableRow;
