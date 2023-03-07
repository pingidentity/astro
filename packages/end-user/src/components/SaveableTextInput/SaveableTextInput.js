import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import TextInput from '../TextInput';
import Button from '../Button'

const SaveableTextInput = ({
    'data-id': dataId,
    onSave,
    onCancel,
    ...props
}) => {
    return (
        <div className="saveable-textinput" data-id={dataId}>
            <div className="saveable-textinput__input">
                <TextInput
                    placeholder="Text"
                    className="saveable-textinput__control"
                    {...props}
                />
                <Button
                    className="saveable-textinput__save"
                    onClick={onSave}
                    role="button"
                    aria-label="Save"
                ></Button>
            </div>
            <Button
                className="saveable-textinput__cancel"
                role="button"
                onClick={onCancel}
                aria-label="Cancel"
            ></Button>
        </div>
    );
};


SaveableTextInput.propTypes = {
    'data-id': PropTypes.string,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

SaveableTextInput.defaultProps = {
    onSave: noop,
    onCancel: noop,
}

export default SaveableTextInput;