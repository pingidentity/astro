import { FormTextFieldStateless } from "../forms/form-text-field";
import copiesText from "../../util/behaviors/copiesText";

/**
 * @class CopyField
 * @desc A read-only field that you can click-to-copy
 *
 * @extends FormTextField
 * @extends copiesText
 **/
const CopyField = copiesText(FormTextFieldStateless, { value: "text" });

CopyField.defaultProps = {
    ...CopyField.defaultProps,
    "data-id": "copy-field",
    readOnly: true,
    iconRight: "clipboard",
};

export default CopyField;