import React from 'react';
import PropTypes from 'prop-types';

export default class GenericStateContainer extends React.Component {
    static propTypes = {
        values: PropTypes.arrayOf(
            PropTypes.shape({
                callback: PropTypes.func,
                name: PropTypes.string,
                value: PropTypes.any,
            })
        ),
    };

    constructor({ values }) {
        super();
        this.controlledValues = [];
        this.state = {};
        this.values = values.reduce((acc, { callback, name, isToggle, value }) => {
            const isControlled = value === undefined || (isToggle && value === "initial") ? [name] : [];
            if (isControlled) {
                this.state[name] = value;
            }

            return {
                ...acc,
                [name]: {
                    getValue: () => isControlled ? this.state[name] : this.getValueFromProps(name),
                    setValue: this.setValue(callback, isControlled, name),
                }
            };
        }, {});
    }

    setValue = (callback, isControlled, valueName) => (value, e) => {
        if (callback) {
            callback(value, e);
        }
        if (isControlled) {
            this.setState({
                [valueName]: value,
            });
        }
    }

    getValueFromProps = name => this.props.values.find(value => value.name === name).value;

    render() {
        return this.props.children(this.values);
    }
}
