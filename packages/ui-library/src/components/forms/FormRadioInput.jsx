import "focus-visible";

var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames"),
    FormLabel = require("./FormLabel");

/**
 * @callback FormRadioInput~onValueChange
 *
 * @param {string} value
 *    The value of the radio selected.
 * @param {object} e
 *    The ReactJS synthetic event object.
 */

/**
 * @class FormRadioInput
 * @desc A checkbox field component.
 *
 * @param {string} [data-id="FormRadioInput"]
 *    Defines the value of the "data-id" for the top-level component container.
 * @param {string} [className]
 *    CSS class(es) added on the top-level component container.
 *
 * @param {boolean} [autoFocus=false]
 *     Whether or not to auto-focus the element.
 * @param {boolean} [checked]
 *    Whether or not the radio input is selected.
 * @param {FormRadioInput~onValueChange} [onValueChange]
 *    Callback to be triggered when the radio input is toggled.
 *
 * @param {string} [label]
 *    Label text to be displayed.
 * @param {string} [helpHintText]
 *    When set, a help icon appears to the right of the label.  This value defines the text to display when the user
 *    hovers over the help icon.
 *
 * @param {string} [name]
 *    The name value for the input.
 * @param {string} [value]
 *    The value for the input.
 *
 * @param {boolean} [disabled]
 *    If true, disables current radio input in both functionaly and style.
 *
 * @example
 *
 *     <FormRadioInput
 *         label="Regular Checkbox"
 *         data-id="form-checkbox"
 *         onValueChange={this._onChangeCallback}
 *     />
 *
 */

class FormRadioInput extends React.Component {

    static propTypes = {
        "data-id": PropTypes.string,
        checked: PropTypes.bool,
        autoFocus: PropTypes.bool,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        label: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string
        ]),
        onValueChange: PropTypes.func,
        name: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    };

    static defaultProps = {
        "data-id": "FormRadioInput",
        autoFocus: false,
    };

    _handleValueChange = (e) => {
        this.props.onValueChange(this.props.value, e);
    };

    inputClassNames = classnames({
        "input-radio--autofocus": this.props.autoFocus,
    });

    render() {

        return (
            <FormLabel
                className={classnames("input-radio",
                    { "no-label": !this.props.label && !this.props.helpHintText },
                    { disabled: this.props.disabled },
                    this.props.className)}
                key={this.props.value}
                data-id={this.props["data-id"] + "_label_" + this.props.value}
                value={this.props.label}
                hint={this.props.helpHintText}>
                <input
                    data-id={this.props["data-id"] + "_" + this.props.value}
                    type="radio"
                    name={this.props.name}
                    value={this.props.value}
                    checked={this.props.checked}
                    onChange={this._handleValueChange}
                    disabled={this.props.disabled}
                    autoFocus={this.props.autoFocus}
                    className={this.inputClassNames}
                />
                <div className="circle"></div>
            </FormLabel>
        );
    }
}


module.exports = FormRadioInput;
