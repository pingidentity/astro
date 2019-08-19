import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @class FloatLabel
 * @desc Form label that includes an input element
 *
 * @param {node} [children]
 *      Elements to display after the input
 * @param {string} [data-id]
 *      Sets a data-id property on the FloatLabel element to be used as a test hook
 * @param {string} [id]
 *      ID for the input element
 * @param {node} [InputType]
 *      Sets the input element to be used
 * @param {string} [inputClassName]
 *      Sets the classname for the input
 *
 */

class FloatLabel extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        id: PropTypes.string,
        InputType: PropTypes.func,
        inputClassName: PropTypes.string,
        'data-id': PropTypes.string,
    };

    static defaultProps = {
        'data-id': 'floatlabel',
    };


    state = {
        active: false,
        text: '',
    };

    _isActive = (event) => {
        const text = event.target.value;
        if (text && text.length > 0) {
            this.setState({
                active: true,
                text,
            });
        } else {
            this.setState({
                active: false,
                text,
            });
        }
    }

    _getActiveClass() {
        if (this.state.active) {
            return 'float-label__active';
        }
        return 'float-label__label';
    }

    inputClassNames = classnames('float-label__input', this.props.inputClassName);

    render() {
        const { InputType } = this.props;
        return (
            <div className="float-label" data-id={this.props['data-id']}>
                <InputType
                    className={this.inputClassNames}
                    placeholder={this.props.label}
                    id={this.props.id}
                    onChange={this._isActive}
                    value={this.state.text}
                />
                <label className="float-label__label" htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                {this.props.children}
            </div>
        );
    }
}

export default FloatLabel;
