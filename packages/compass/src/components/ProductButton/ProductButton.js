import React from 'react';
import PropTypes from 'prop-types';
import RocketIcon from '@mdi/svg/svg/rocket-launch.svg';
import { noop } from 'underscore';
import ProductIcon from '../ProductIcon';
import { products } from '../ProductIcon/ProductIcon';

import { buttonStyle, rocketContainerStyle, rocketButtonStyle, principalButtonStyle } from './ProductButton.styles.js';


/** Icon buttons for different Ping products. Uses ProductIcon. */
const ProductButton = React.forwardRef((props, ref) => {
    const {
        url,
        onClick,
        product,
        isSelected,
        hasBackground,
        ...passedProps
    } = props;

    const handleClick = (e) => {
        onClick(e);
        e.stopPropagation();
        e.preventDefault();
    };

    const commonIconProps = {
        product,
        isSelected,
    };


    return (
        <a
            css={buttonStyle({ isSelected })}
            href={url}
            onClick={handleClick}
            tabIndex={0}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref}
            {...passedProps}
        >
            <ProductIcon
                {...commonIconProps}
                css={principalButtonStyle}

                className="product-button__icon"

                hasBackground={hasBackground}
            />
            <div
                css={rocketContainerStyle}
                className="product-button__icon--rocket"
            >

                <ProductIcon
                    {...commonIconProps}
                    css={rocketButtonStyle}
                    icon={<RocketIcon />}
                    hasBackground
                />

            </div>
        </a>
    );
});

ProductButton.propTypes = {
    /** URL to link to */
    url: PropTypes.string,
    /** Callback for clicking on the icon */
    onClick: PropTypes.func,
    /** Which product to display. See ProductIcon props */
    product: PropTypes.oneOf(Object.keys(products)).isRequired,
    /** Selected state */
    isSelected: PropTypes.bool,
    /** Background Style */
    hasBackground: PropTypes.bool,
};

ProductButton.defaultProps = {
    onClick: noop,
    isSelected: false,
    hasBackground: false,
};

export default ProductButton;
