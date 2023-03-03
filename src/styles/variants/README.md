# Variant Naming Conventions

Variant names should be camel case so that dot notation can be used, e.g. `delete theme.buttons.myButton`.

When it comes to mapping the variant within the theme, the foundation of a component is the main differentiator. There are two types currently:
  1. Components which leverage a Theme UI base
  2. Custom components or layout components, often built on the `Box` component

If a component is built on top of a Theme UI component, we follow their existing [variant groups](https://theme-ui.com/components/variants), e.g. any variant for an `IconButton` should be placed within the `buttons` object in the theme because it uses the `IconButton` from Theme UI as its base.

If a component is custom or used for layout purposes, it will often have `Box` as its base. For these components, we create our own variant group for it under the `variants` object in the theme, e.g. `variants.modal`. Within this object is typically where internal layout variants will go for that component, e.g. `variants.modal.container`. NOTE: You don't need to specify `variants` in the naming, it's just used here for demo purposes.


## Example of component with Theme UI base

In the example below, `MyBadge` utilizes the Astro `Badge` component which is based on the Theme UI `Badge` component. The object within `MyBadge.styles.js` would then be exported as part of the theme within the `badges` object.

```js
// `src/components/MyBadge/MyBadge.js`
const MyBadge = () => <Badge variant="myBadge" />;

// `src/components/MyBadge/MyBadge.styles.js`
const myBadge = { backgroundColor: 'red' };
export default { myBadge };

// `src/styles/variants/index.js`
import defaultBadges from '../../components/Badge/Badge.styles';
import myBadge from '../../components/MyBadge/MyBadge.styles';
export const badges = { ...defaultBadges, ...myBadge };

// `src/styles/theme.js`
import { badges } from './variants';
const theme = { badges };
```

This results in a `theme` object as such:

```json
{
  "badges": {
    "myBadge": { "backgroundColor": "red" }
  }
}
```

## Example of custom component and internal layout components

In the example below, `MyComponent` is custom and has `Box` as its foundation. It also includes layout components and a `Button`. Since the `Button` component is built on a Theme UI base, it will follow the variant naming rules for those types of components. The object within `MyComponent.styles.js` should then be exported as part of the theme within the `variants` object.

```js
// `src/components/MyComponent/MyComponent.js`
const MyComponent = () => (
  <Box variant="myComponent.container">
    <Box variant="myComponent.leftSide" />
    <Box variant="myComponent.rightSide" />
    {/* The Button variant is exported differently in the theme */}
    <Button variant="myComponentButton">Click me</Button>
  </Box>
);

// `src/components/MyComponent/MyComponent.styles.js`
export const myComponentButton = { backgroundColor: 'critical' };
const container = { paddingTop: 'xl' };
const leftSide = { width: '100px', backgroundColor: 'green' };
const rightSide = { width: '20px', backgroundColor: 'orange' };
export default { container, leftSide, rightSide };

// `src/styles/variants/variants.js`
import myComponent from '../../components/MyComponent/MyComponent.styles';
export default { myComponent };

// `src/styles/variants/index.js`
import defaultButtons from '../../components/Button/Button.styles';
import { myComponentButton } from '../../components/MyComponent/MyComponent.styles';
export const buttons = { ...defaultButtons, myComponentButton };
export { default as variants } from './variants';

// `src/styles/theme.js`
import { buttons, variants } from './variants';
const theme = { buttons, variants };
```

This results in a `theme` object as such:

```json
{
  "buttons": {
    "myComponentButton": { "backgroundColor": "critical" }
  },
  "variants": {
    "myComponent": {
      "container": { "paddingTop": "xl" },
      "leftSide": { "width": "100px", "backgroundColor": "green" },
      "rightSide": { "width": "20px", "backgroundColor": "orange" }
    }
  }
}
```
