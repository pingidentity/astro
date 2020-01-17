import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias Image.imageSizes
 */
export const imageSizes = {
    /** auto */
    AUTO: "auto",
    /** sm */
    SM: "sm",
    /** full */
    FULL: "full",
};

/**
 * @enum {string}
 * @alias Image.imageTypes
 */
export const imageTypes = {
    /** auto */
    AUTOWIDTH: "auto",
    /** square */
    SQUARE: "square",
};

/**
 * @class Image
 * @desc A component for displaying an image.
 *
 * @param {string} [data-id="image-component"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [className]
 *     Extra CSS class(es) applied to the top-level HTML container.
 * @param {string} [alt]
 *     Alt text of the image; specifies its content for users unable to view
 *     the image, either due to a technical issue or due to using a screen reader.
 * @param {string} [source]
 *     The source of the image- corresponds to the src attribute of a regular
 *     HTML <img/> tag. Can be a URL or a base64-encoded data URI. More information
 *     on data URI's can be found here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 * @param {Image.imageSizes} [size]
 *     Size of the image.
 * @param {Image.imageTypes} [type]
 *     The display type of the image. Auto-width will allow the image to automatically resize horizontally;
 *     square will force the image into a square display by cutting off its sides.
 *
 * @param {Image~onClick} [onClick]
 *     Function called when image is clicked.
 *
 * @example
 * <Image className="my-class" data-id="myImage" src="my-image.jpg" />
 *
 */

function Image({
    alt,
    className,
    "data-id": dataId,
    onClick,
    size,
    source,
    type
}) {
    const isSquare = type === imageTypes.SQUARE;
    const Tag = isSquare ? "div" : "img";
    return (
        <Tag
            alt={alt}
            className={classnames(
                "image-component",
                className,
                `image-component--${size}`,
                {
                    [`image-component--${size}-square`]: isSquare,
                },
            )}
            data-id={dataId}
            onClick={onClick}
            // Set ARIA role if image has an onClick and is basically behaving
            // like a button
            {...onClick ? { role: "button" }: {}}
            {...isSquare
                ? {
                    style: {
                        backgroundPosition: "center",
                        backgroundImage: `url(${source})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }
                }
                : {
                    src: source
                }
            }
        />
    );
}

Image.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(Object.values(imageSizes)),
    source: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(imageTypes))
};

Image.defaultProps = {
    "data-id": "image-component",
    size: imageSizes.AUTO,
    type: imageTypes.AUTOWIDTH
};

export default Image;
