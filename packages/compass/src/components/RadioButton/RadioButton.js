import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import RadioBoxBlank from '@mdi/svg/svg/radiobox-blank.svg';
import RadioBoxMarked from '@mdi/svg/svg/radiobox-marked.svg';
import Text from '../Text';
import Icon from '../Icon';

import useCompassTheme from '../../styles/useCompassTheme';
import {
    radioButtonContainerStyle,
    radioButtonInputElementStyle,
    radioButtonContentStyle,
} from './RadioButton.styles';

const RadioButton = ({
    checkedContent,
    isDefaultChecked,
    label,
    name,
    onChange,
    value,
    ...props
}) => {
    const theme = useCompassTheme();

    return (
        <label>
            <input
                type="radio"
                css={radioButtonInputElementStyle}
                name={name}
                value={value}
                onChange={onChange}
                defaultChecked={isDefaultChecked}
                {...props}
            />
            <div
                className="radiobutton__container"
                css={radioButtonContainerStyle({
                    borderRadius: 3,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    padding: 'md',
                    ...props,
                    theme,
                })}
            >
                <div>
                    <Icon size={20} className="radiobutton__icon--marked" component={RadioBoxMarked} fill="active" mr="sm" />
                    <Icon size={20} className="radiobutton__icon--blank" component={RadioBoxBlank} fill="active" mr="sm" />
                    <Text className="radiobutton__label" inline>{label}</Text>
                </div>
                {checkedContent &&
                    <div className="radiobutton__content" css={radioButtonContentStyle({ theme })}>
                        {checkedContent}
                    </div>
                }
            </div>
        </label>
    );
};

RadioButton.propTypes = {
    /** Content to show when radio is checked */
    checkedContent: PropTypes.node,
    /** If the radio is checked */
    isDefaultChecked: PropTypes.bool,
    /** The label for the radio */
    label: PropTypes.node,
    /** Name of the group the radio is a part of */
    name: PropTypes.string,
    /** Callback when the radio's state is changed */
    onChange: PropTypes.func,
    /** Value of the radio */
    value: PropTypes.string.isRequired,
};

RadioButton.defaultProps = {
    isDefaultChecked: false,
    onChange: noop,
};

export default RadioButton;
