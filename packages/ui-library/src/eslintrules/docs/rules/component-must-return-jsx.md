# ESLint rule to stop components from returning another other
# than JSX with a top-level div so that backwards compatibility
# with React 15 doesn't break.

Since the UI library supports both React 15 and 16, we need to avoid
certain features to make sure that we still have backward compatibility.
This rule prevents components from returning anything other than JSX with
a top-level div; arrays and strings are invalid.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

const BadComponent => [<div/>, <div/>, <div/>]

```

Examples of **correct** code for this rule:

```js

const GoodComponent => (
    <div>
        <div/>
        <div/>
        <div/>
    </div>
)

```
