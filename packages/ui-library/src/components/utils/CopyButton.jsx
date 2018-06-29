import Button from "../buttons/Button";
import copiesText from "../../util/behaviors/copiesText";

/**
 * @class CopyButton
 * @desc A button that copies some text to the clipboard
 *
 * @extends Button
 * @extends copiesText
 **/
const CopyButton = copiesText(Button);

CopyButton.defaultProps = {
    ...CopyButton.defaultProps,
    "data-id": "copy-button",
    label: "Copy",
};

export default CopyButton;