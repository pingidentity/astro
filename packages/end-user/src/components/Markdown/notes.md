# Using Markdown

The [Markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/) is a good resource to help understand what options are available. For reference, we use [React Markdown](https://github.com/rexxars/react-markdown) to render the given source.


This component can be used on its own or it may already be supported by some components internally. See the following document for more information.

## Standalone

When using the `Markdown` component on its own, you have complete control over it. The defaults listed below for labels still apply, but may be overridden by supplying the appropriate props. Check the [React Markdown options](https://github.com/rexxars/react-markdown#options) for details on what needs to be supplied.

## As a Label

Supported input components will have a `hasMarkdown` prop which controls whether the given `label` is rendered with Markdown. This will generate the HTML needed for Markdown presentation which is then rendered inside of the input's label.

### Defaults

There are precautions and adaptations in place to use Markdown in a way which makes sense for labels. For example:

1. Paragraph, `<p>`, tags will not be rendered. This is to streamline the label presentation and
preserve inline styling.
2. All links will have `target="_blank"` and `rel="nofollow noreferrer noopener"` applied to them
for usability and security purposes.
3. All HTML is escaped. This is for security purposes.

### Support

Currently, the following components support Markdown for their label:

- `Checkbox`