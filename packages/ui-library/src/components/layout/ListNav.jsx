import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
* @class ListNav
* @desc ListNav creats a list nav bar that can be combined with other forms.
*
* @param {string} [data-id="list-nav"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.
* @param {array} [labels]
*     Array of label strings to use as button titles.
* @param {string} [selectedlabel]
*     corresponding id for selcted label to match the ListNav to the array labels
* @param {function} [onSelect]
*     function that corresponds to the Id to figure out which item is clicked
* @param {node} [listButton]
*     node that allows anything to be passed in to add to the list
* @example
*
*    <ListNav
*       labels={this.mockLabel}
*       selectedLabel={this.state.selectedLabel}
*       onSelect={this._onSelect}
*       listButton={
*           <ConfirmToolTip
*               positionClassName="bottom center"
*               labelClassName="my-css-class"
*               label="+ Add Language"
*               title="Add Language"
*               buttonLabel="Add"
*               cancelText="Cancel"
*               stateless={false}
*           >
*               <FormDropDownList
*                   label="Language"
*                   options={this.options}
*               />
*               <br/>
*               <FormDropDownList
*                   label="Locale"
*                   options={this.options}
*               />
*           </ConfirmToolTip>
*       }
*  />
**/

export default class ListNav extends Component {

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        labels: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
        })).isRequired,
        selectedLabel: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        onSelect: PropTypes.func.isRequired,
        listButton: PropTypes.node,

    }

    static defaultProps = {
        "data-id": "list-nav",
    }

    _renderList = (data) => {
        return data.map(({ label, id }) => {
            const classes = classnames("list-nav-item",{
                "list-nav-item--selected": this.props.selectedLabel === id
            });
            const handleClick = (e) => {
                this.props.onSelect(id, label, e);
            };

            return (
                <li className={classes} key={id}>
                    <a className="list-nav-item__link"
                        data-id={`${this.props["data-id"]}_nav-link_${id}`}
                        onClick={handleClick}
                    >
                        {label}
                    </a>
                </li>
            );
        });
    }

    render() {
        return (
            <div data-id={this.props["data-id"]} className={classnames("list-nav", this.props.className)}>
                <div className="list-nav__nav">
                    {this._renderList(this.props.labels)}
                    {this.props.listButton}
                </div>
                <div className="list-nav__content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}