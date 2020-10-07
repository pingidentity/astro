import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { space, layout } from 'styled-system';
import { v4 as uuid } from 'uuid';
import { valuePropType } from '@pingux/compass-core/lib/utils/PropUtils';

import useCompassTheme from '../../styles/useCompassTheme';
import Text from '../Text';

export const FieldDataContext = createContext({});

/** Container for inputs that provides a label */
const Field = (props) => {
    const {
        children,
        id = useMemo(uuid),
        label,
        ...others
    } = props;
    const theme = useCompassTheme();
    const themeProps = { ...others, theme };

    return (
        <div
            {...others}
            css={css`
                ${space(themeProps)}
                ${layout(themeProps)}
            `}
        >
            {label && (
                <Text
                    tagName="label"
                    htmlFor={id}
                    variant="label"
                    mb="xs"
                    css={{ display: 'block' }}
                >
                    {label}
                </Text>
            )}
            <FieldDataContext.Provider value={{ id }}>
                {children}
            </FieldDataContext.Provider>
        </div>
    );
};

Field.propTypes = {
    id: valuePropType,
    label: PropTypes.node,
};

export default Field;
