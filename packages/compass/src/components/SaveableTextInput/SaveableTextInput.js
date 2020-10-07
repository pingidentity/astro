import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import { noop } from 'underscore';
import FloatLabelInput from '../FloatLabelInput';
import RightContentInput from '../RightContentInput';
import { pickInputProps, omitInputProps } from '../Input/Input';
import { makeIconButton } from '../IconButton';
import { CheckSVG, CloseSVG } from '../Icons';

const CheckButton = makeIconButton(CheckSVG, 'Save');
const CancelButton = makeIconButton(CloseSVG, 'Cancel');

const SaveableTextInput = ({
    onCancel,
    onKeyDown,
    onKeyPress,
    onSave,
    hasCancel,
    hasSave,
    label,
    saveButtonProps,
    cancelButtonProps,
    ...props
}) => {
    const handleKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                onSave();
            }
            onKeyPress(e);
        },
        [onSave, onKeyPress],
    );

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape') {
                onCancel();
            }
            onKeyDown(e);
        },
        [onCancel, onKeyDown],
    );

    return (
        <Flex alignItems="center" {...omitInputProps(props)}>
            <Box flexGrow="1">
                <FloatLabelInput
                    autoFocus
                    rightContent={hasSave
                        ? <CheckButton onClick={onSave} type="inverted-square" {...saveButtonProps} />
                        : null}
                    {...pickInputProps(props)}
                    input={RightContentInput}
                    label={label}
                    onKeyDown={handleKeyDown}
                    onKeyPress={handleKeyPress}
                />
            </Box>
            {hasCancel && (
                <Box ml="xs">
                    <CancelButton color="text.primary" onClick={onCancel} {...cancelButtonProps} />
                </Box>
            )}
        </Flex>
    );
};

SaveableTextInput.propTypes = {
    /** Callback for clicking the cancel buttton
     *  @param {object} event
     */
    onCancel: PropTypes.func,
    /** Callback for pressing a key in the input
     *  @param {object} event
     */
    onKeyDown: PropTypes.func,
    /** Callback for pressing a key down in the input
     *  @param {object} event
     */
    onKeyPress: PropTypes.func,
    /** Callback for clicking the save buttton
     *  @param {object} event
     */
    onSave: PropTypes.func,
    /** Whether to show the cancel button.
     * Probably tied to the dirty state of the input's value.
     */
    hasCancel: PropTypes.bool,
    /** Whether to show the save button.
     * Probably tied to the dirty state of the input's value.
     */
    hasSave: PropTypes.bool,
    /** Text of the label */
    label: PropTypes.node,
    /** Props to pass to the save button */
    saveButtonProps: PropTypes.object,
    /** Props to pass to the cancel button */
    cancelButtonProps: PropTypes.object,
};

SaveableTextInput.defaultProps = {
    onCancel: noop,
    onKeyDown: noop,
    onKeyPress: noop,
    onSave: noop,
    hasCancel: false,
    hasSave: false,
};

export default SaveableTextInput;
