import React from "react";
import Anchor from "../general/Anchor";
import copiesText from "../../util/behaviors/copiesText";

const IconAnchor = props => <Anchor {...props}><span className="inline-icon icon-clipboard"/></Anchor>;

/**
 * @class CopyIcon
 * @desc A button that copies some text to the clipboard
 *
 * @extends Anchor
 * @extends copiesText
 **/
const CopyIcon = copiesText(IconAnchor);

CopyIcon.defaultProps = {
    ...CopyIcon.defaultProps,
    "data-id": "copy-icon",
};

export default CopyIcon;