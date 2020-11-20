import React from "react";
import PropTypes from "prop-types";
import Modal from "../general/Modal";
import Text, { textTypes, alignments } from "../general/Text";
import Stack from "../layout/Stack";
import { pick } from "underscore";

const { PAGETITLE } = textTypes;
const { CENTER } = alignments;

/**
 * @class AboutLogo
 * @desc Custom component for showing product logos in the About Modal
 * @memberof AboutModal
 *
 * @param {string} [className]
 *     CSS classes to be set on the root element.
 * @property {string} [data-id]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {node} [src]
 *     Source for the logo image. Same as what's passed to the img tag.
 * @param {number} [height=50]
 *     Height of the logo
 */

export const AboutLogo = ({ src, height, ...props }) => (
    <Text align={CENTER} {...pick(props, "data-id", "className")}>
        <img src={src} height={height} />
    </Text>
);

AboutLogo.propTypes = {
    src: PropTypes.node,
    height: PropTypes.number,
};

AboutLogo.defaultProps = {
    height: 50,
};

/**
 * @class AboutVersion
 * @desc Custom component for showing product logos in the About Modal
 * @memberof AboutModal
 *
 * @param {string} [className]
 *     CSS classes to be set on the root element.
 * @property {string} [data-id]
 *     To define the base "data-id" value for the top-level HTML container.
 */

export const AboutVersion = ({ children, ...props }) => (
    <Text type={PAGETITLE} align={CENTER} {...pick(props, "data-id", "className")}>
        {children}
    </Text>
);

/**
 * @class AboutModal
 * @desc Custom modal for showing version, licensing, and other information about a product
 *
 * @see Modal
 */

export const AboutModal = ({ children, ...props }) => (
    <Modal type="dialog" closeOnBgClick {...props}>
        <Stack gap="LG">
            {children}
        </Stack>
    </Modal>
);

export default {
    AboutModal,
    AboutLogo,
    AboutVersion,
};
