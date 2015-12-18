"use strict";

var React = require("react"),
    css = require("classnames");

 /**
 * @module ExpandableRow
 * @desc Basic expandable row component.
 *
 * @param {object} [title] - a JSX object that serves as the title shown on the row.
 * @param {string} [titleStyle] - extra css styling for label
 * @param {object} [subtitle] - a JSX object that goes right below the title, and serves as a subtitle.
 * @param {object} [content] - a JSX object that represents the content to be shown when expanding the row.
 * @param {bool} [isEditEnabled]- whether or not the 'edit' button is enabled. Default is true.
 * @param {string} [editViewRoute] - route to the 'edit mode' view. Default is ''.
 * @param {bool} [showEdit] - wheter or not the 'edit' button will be shown at all. Default is true.
 * @param {bool} [showDelete] - wheter or not the 'delete' button will be shown at all. Default is true.
 * @param {function} [onDelete] - to be triggered when clicking on the 'delete' icon (if present)
 * @param {bool} [defaultToExpanded] - option to render the row in a expanded state by default. Default is false.
 * @param {object} [editButton] - it is used to show an object inside edit body. For example: ModalButton
 *          can be passed like follow:
 *              editButton=&#123;<ModalButton
 *                  linkContent=&#123;editModalButton}#125;
 *                  data-id="edit-btn"
 *                  inline={#123;true}#125;
 *                  modalTitle={#123;this.props.editModalTitle}#125;
 *                  maximize={#123;true}#125;
 *                  modalBody={#123;this.props.editModalBody}#125;>
 *              </ModalButton>}#125;
 * @param {object} [deleteButton] - it is used to show an object inside delete body. For example: ModalButton
 * @param {string} className - extra CSS classes to be applied
 * @param {string} waiting - when true, disabled interaction with row and reduces opacity of the layer
 * @param {string} id - it is used for a unique data-id.
 *
 * @example
 *        <h1>My Row Results</h1>
 *        <!-- note that all expanding rows must be in a div with the "result-set" css class -->
 *        <div className="result-set">
 *            <ExpandableRow title={'row1'} subtitle={'row1 subtitle'} content={row1Content} />
 *            <ExpandableRow title={'row2'} subtitle={'row2 subtitle'} content={row2Content} />
 *            <ExpandableRow title={'row3'} subtitle={'row3 subtitle'} content={row3Content} />
 *        </div>
 *
 *  You can also pass the content as a children of the component. This will overwrite any content passed in as a prop
 *      <ExpandableRow title={titleJsx} subtitle={subtitleJsx}>
 *          {contentChildrenJsx}
 *      </ExpandableRow>
 */
var ExpandableRow = React.createClass({

    propTypes: {
        title: React.PropTypes.object,
        titleStyle: React.PropTypes.string,
        subtitle: React.PropTypes.object,
        content: React.PropTypes.object,
        isEditEnabled: React.PropTypes.bool,
        editViewRoute: React.PropTypes.string,
        showEdit: React.PropTypes.bool,
        showDelete: React.PropTypes.bool,
        onDelete: React.PropTypes.func,
        defaultToExpanded: React.PropTypes.bool,
        editButton: React.PropTypes.object,
        deleteButton: React.PropTypes.object,
        className: React.PropTypes.string,
        waiting: React.PropTypes.bool,
        id: React.PropTypes.string
    },

    /**
     * Handle row should expand or not. If it is expaned, then
     * it is not expanded and vise versa.
     *
     * @private
    */
    _handleExpandButtonClick: function () {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    },

    getDefaultProps: function () {
        return {
            showEdit: true,
            isEditEnabled: true,
            editViewRoute: "",
            showDelete: true,
            defaultToExpanded: false,
            id: "expandable-row",
            waiting: false
        };
    },

    getInitialState: function () {
        return {
            isExpanded: this.props.defaultToExpanded
        };
    },

    render: function () {
        var showEditIcon = this.props.showEdit && this.props.isEditEnabled,
            showViewIcon = this.props.showEdit && !this.props.isEditEnabled,
            containerCss = {
                item: true,
                expanded: this.state.isExpanded,
                "no-delete": !this.props.showDelete,
                "no-edit": !showEditIcon,
                waiting: this.props.waiting
            },
            editButtonCss = {
                "edit-btn": !showViewIcon,
                "view-btn": showViewIcon
            },
            titleCss = {
                "item-title": true,
                "title-only": !this.props.subtitle,
                name: this.props.titleStyle === "name" || null
            },
            deleteButton,
            editButton;

        if (this.props.className) {
            containerCss[this.props.className] = true;
        }

        if (this.props.showEdit && this.props.editButton) {
            editButton = this.props.editButton;
        } else {
            editButton = (
                <a data-id="edit-btn"
                    className={css(editButtonCss)}
                    href={"#/" + this.props.editViewRoute}>
                </a>
            );
        }

        if (this.props.showDelete) {
            if (this.props.deleteButton) {
                deleteButton = this.props.deleteButton;
            } else {
                deleteButton = (
                    <a data-id="delete-btn"
                        className="delete-btn"
                        onClick={this.props.onDelete}>
                    </a>
                );
            }
        }

        return (
            <div data-id={this.props.id} className={css(containerCss)}>
                <div className="collapsed-content">
                    <div className={css(titleCss)}>
                        {this.props.title}
                    </div>
                    {this.props.subtitle
                        ? <div className="item-sub-title">{this.props.subtitle}</div>
                        : null
                    }
                </div>
                {
                    this.state.isExpanded
                        ? <div data-id="expanded-row" className="expanded-content clearfix">
                            {this.props.children || this.props.content}
                            {editButton}
                            {deleteButton}
                        </div>
                    : null
                }
                <a data-id="expand-btn"
                    className="expand-btn"
                    onClick={this._handleExpandButtonClick}>
                </a>
            </div>
        );
    }

});

module.exports = ExpandableRow;
