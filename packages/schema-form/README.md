# `@pingux/schema-form`

## Usage

**This library requires React.** Can be used with require, import but designed to be used with a
`<script>` tag. Example in `index.html`.

## Custom Widgets

The following widgets can be used to apply custom behavior in `uiSchema` for a given property. For
example, providing `"ui:widget": "recaptchaV2"` will tell the form to present a ReCAPTCHA field on
the property it is applied to.

The following are options for custom widgets:
- `recaptchaV2`: Displays a Google ReCAPTCHA V2 widget. This will also require a `sitekey` to be passed in along with the form parameters.

## Conditionals and Field Logic

This library uses [`react-jsonschema-form-conditionals`](https://github.com/RXNT/react-jsonschema-form-conditionals)
and [`json-rules-engine-simplified`](https://github.com/RxNT/json-rules-engine-simplified) to handle
logic surrounding how the form is displayed. The `Form` takes in a `rules` array and each rule is
encapsulated in its own object. An example is provided in `index.html`.