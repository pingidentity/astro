# Astro Version Migration Guide
This document contains detailed information about breaking and non-breaking changes between versions and how to migrate from one version to another.


1. [Troubleshooting](#troubleshooting)
2. [1.x to 2.0.0](#1.x-to-2.0.0)
    1. Introduction
    2. Why Update
    3. Non-breaking Changes
        1. Yarn 2 Upgrade
    5. Breaking Changes
        1. Theme Restructuring
        2. Deprecated Components and Variants
        3. Field Component Prop Refactoring

## Troubleshooting
For internal Ping users please reach out via #ui-astro or a UX Development team member.
For external users, please reach out via ux-development@pingidentity.com or open an issue in our GitHub repo.

## 1.x to 2.0.0

### Introduction
V1 of the Astro component library was released in December of 2021. Since its initial release, the UX development team has identified areas of improvement including required dependency upgrades, removal of deprecated components and design patterns, and prop consistency. Unfortunately, necessary upgrades will potentially require breaking changes which must be released in a major version.

**It is important to note this is not a design system change.** There will be no major visual design or design pattern changes.

### Why Update
The UX Development team recommends upgrading ASAP for continued support for the Astro library. UX Development will not be continuing 1.x development so if you need any future fixes or enhancements, you’ll need to update eventually.

We’ve also written an ESLint plugin - `eslint-plugin-pingux-astro` - that should help point out code which needs to be changed. This includes linting rules for variant name changes and deprecated components.

### Non-breaking Changes

#### Yarn 2 Upgrade
Upgrading to Yarn 2 offers several benefits to developers, including:

* Improved performance
* Better support for monorepos
* Enhanced security
* Improved developer experience

Upgrading Astro to utilize Yarn 2 also guarantees that it will not impede applications that rely on Astro from following suit. A [migration guide](https://yarnpkg.com/getting-started/migration) is available for reference if your team is interested in making the switch.

### Breaking Changes

#### Theme Restructuring

The structure of the Astro theme has been altered in Astro V2. While variants used internally by components should be updated automatically, this may cause breaking changes and visual regressions if custom variants and themes are not properly remapped. To identify which variant mappings have been changed and their updates, please take the following steps:
1. Follow the install steps in the README within the [ESLint Plugin for Astro repo](https://gitlab.corp.pingidentity.com/ux/eslint-plugin-pingux-astro).
2. After upgrading to Astro V2, run `yarn lint`.
3. The linter should return a series of warnings that detail the old variant mapping and the new one suggested.
4. Depending on your code editor, you should be able to find and replace all instances of the old variant with the new variant mappings. Re-run yarn lint after replacing to ensure the update has been made and there are no visual regressions.

If you have custom themes built and applied (not those shipped with the Astro library - astro-nano, end-user, uiLibraryOverride) and have questions about the restructuring please reach out via #ui-astro.

#### Deprecated Components and Variants
The following components and variants have been removed from the Astro Library. Please see the table below for replacement suggestions:

|Component / Variant|Replacement|
|---|---|
|List Component|ListView Component|
|Modal, Variant=”dark”|No replacement, this style should not be used.|
|Button, Variant= “icon”|IconButton Component|
|Button, Variant=”danger”|Variant=”critical”|
|Button, Variant=”text”|Variant=”link”|
|Chip|Renamed to Badge|
|Variants with “chip” in the name|The text has been swapped from “chip” to “badge” in all cases|



#### Field Component Prop Refactoring
Astro’s field components are composed components consisting of a wrapper, label, input, and help text. In order to help user’s better target specific elements these components contain the following props:  

|Prop|Target|
|---|---|
|ContainerProps|Surrounds the label, wrapper, control, and help text|
|WrapperProps|Directly surrounds the control|
|ControlProps|The input|
|LabelProps|The label|



However, some field components did not include these props or they were not placed consistently in V1. The following components have changes, highlighted components are considered to have breaking changes:


|Component|Updates|
|---|---|
|ColorField|Wrapper has been added and accepts wrapperProps|
|ComboBox|Wrapper has been moved to consistently match other container to inside to target the control|
|FileInputField|containerProps and wrapperProps have been switched|
|ImageUploadField|Now accepts wrapperProps|
|NumberField|Wrapper box now accepts wrapperProps|
|PasswordField|Wrapper box now accepts wrapperProps|
|RadioField|Wrapper box added and now accepts wrapperProps|
|SearchField|Wrapper box now accepts wrapperProps|
|SelectField|Wrapper box added and now accepts wrapperProps|
|SwitchField|Wrapper box added and now accepts wrapperProps|
|TextAreaField|Wrapper box added and now accepts wrapperProps|


