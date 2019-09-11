import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';

/**
 * @class NoDevices
 * @desc A panel will be shown if user has no MFA devices.
 *
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @param {string} [buttonTitle]
 *     Title of the add method button
 * @param {string} [description]
 *     Message to be shown.
 * @param {string} [data-id="add-method-panel"]
 *     data-id to set on the top HTML element (defaults to 'add-method-panel').
 * @param {function} [onAdd]
 *     Add method handler
 *
 * @example
 * <NoDevices onAdd={this._onAddMethod} title="Add method" />
 *
 */

const NoDevices = (props) => (
    <div data-id={props["data-id"]} className={classnames("no-devices", props.className)}>
        <Button className="add primary" onClick={props.onAdd}>{props.buttonTitle}</Button>
        <span className="padding-component--top-lg">{props.description}</span>
    </div>
);

NoDevices.propTypes = {
    onAdd: PropTypes.func,
    className: PropTypes.string,
    "data-id": PropTypes.string,
    description: PropTypes.string,
    buttonTitle: PropTypes.string
};

NoDevices.defaultProps = {
    onAdd: () => { },
    className: "",
    "data-id": "add-method-panel",
    description: "",
    buttonTitle: ""
};

export default NoDevices;
