import React from 'react';
import PropTypes from 'prop-types';
import { propType as styleProp } from '@styled-system/prop-types';
import { omit } from '@styled-system/props';
import AccountSVG from '@mdi/svg/svg/account.svg';
import { makeIcon } from '../Icon';
import useCompassTheme from '../../styles/useCompassTheme';
import { cropperStyle, imageStyle } from './ProfilePicture.styles';

const AccountIcon = makeIcon(AccountSVG, 'No Profile Picture');

/** Component for showing user photos in a circle */
const ProfilePicture = ({
    alt,
    src,
    size,
    width = size,
    height = size,
    ...props
}) => {
    const theme = useCompassTheme();

    return (
        <div
            css={cropperStyle({
                theme,
                bg: 'neutral.70',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'neutral.80',
                width,
                height,
                ...props,
            })}
            {...omit(props)}
        >
            {src
                ? <img css={imageStyle} src={src} alt={alt} />
                : <AccountIcon width={width} height={height} color="white" />
            }
        </div>
    );
};

ProfilePicture.propTypes = {
    /** Alt text for img tag */
    alt: PropTypes.string,
    /** Path to the image source */
    src: PropTypes.string,
    /** Sets the width and height together */
    size: styleProp,
    width: styleProp,
    height: styleProp,
};

ProfilePicture.defaultProps = {
    size: 125,
    alt: 'Profile Photo',
};

export default ProfilePicture;
