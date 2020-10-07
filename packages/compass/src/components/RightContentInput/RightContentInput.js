import React, { useLayoutEffect, useRef } from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import Input from '../Input';

const RightContentInput = ({
    rightContent,
    afterContent,
    input: Component,
    ...props
}) => {
    const contentRef = useRef(null);
    const paddingRight = useRef(undefined);

    const contentContainer = (
        <div
            ref={contentRef}
            css={css`
                position: absolute;
                right: 8px;
                top: 50%;
                transform: translateY(-50%);
            `}
        >
            {rightContent}
        </div>
    );

    useLayoutEffect(() => {
        paddingRight.current = contentRef.current.clientWidth + 13;
    });

    return (
        <Component
            afterContent={<>{afterContent}{contentContainer}</>}
            pr={paddingRight.current}
            {...props}
        />
    );
};

RightContentInput.propTypes = {
    /** The content that is rendered after the component.
     * RightContentInput passes this on and adds its own as well. */
    afterContent: PropTypes.node,
    /** The content to insert at the right side of the input */
    rightContent: PropTypes.node,
    /** The input component to use */
    input: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

RightContentInput.defaultProps = {
    input: Input,
};

export default RightContentInput;
