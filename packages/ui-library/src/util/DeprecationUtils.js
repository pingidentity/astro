import React from "react";
import PropTypes from "prop-types";
import { isEqual } from "underscore";
import { isProduction } from "./Utils";

function getSubstituteMessage(sub) {
    return sub ? ` Use "${sub}" instead.` : "";
}

function getVersionMessage(version) {
    return version ? `version ${version}` : "a future release";
}

function renderMessage(message) {
    return message ? ` ${message}` : "";
}

const isDeprecatedValue = propValue =>
    ({ contains, value }) => contains ? (value.indexOf(propValue) > -1) : isEqual(value, propValue);

/**
 * @desc Fires prop deprecation warning with optional substitute and version to be removed.
 *       Use this as though it were a propType.
 *
 * @param {Object} propInfo - The deprecated prop info object.
 * @param {string} propInfo.message - An optional message tacked on to the end of the warning.
 * @param {string} propInfo.substitute - What to use instead of the deprecated prop.
 * @param {string} propInfo.version - The version number when the deprecation will occur.
 *
 * @param {enum} props - props of component
 * @param {string} propName - name of prop being validated
 *
 * @returns {{}} `Prop "${propName}" is deprecated and will be removed in a future release.`
 *
 * @example:
 *          class MyComponent extends React.Component {
 *              static propTypes = {
 *                  title: deprecatedProp({
 *                      message: "Here's how you move to 4.0.0",
 *                      substitute: "aDifferentProp",
 *                      version: "4.0.0"
 *                  })
 *              }
 *          }
 */
export const deprecatedProp = ({
    message,
    substitute,
    version
}) => (props, propName) => (props[propName] !== undefined)
    ? new Error(
        `Prop "${propName}" is deprecated and will be removed in ${getVersionMessage(version)}.` +
        `${substitute ? ` Use "${substitute}" instead.` : ""}${renderMessage(message)}`
    )
    : null;

/**
 * @desc Fires deprecation warnings for specific values of a prop with option substitutes
 *       and removal version. Use this as though it were a propType.
 *
 * @param {Object[]} propType - The regular propType validator to use. Required.
 * @param {Object[]} values - An array of deprecated value objects. These are checked for deep equality, not reference equality.
 * @param {string} value.message - An optional message tacked on to the end of the warning.
 * @param {*} values.value - The actual value being deprecated.
 * @param {*} values.substitute - The value to use instead.
 * @param {boolean} values.contains - Used for string values; if true, checks to see if value
 *      is contained in propValue instead of doing an equality check.
 * @param {string} version - The version number when the values will be deprecated. Optional.
 *
 * @param {enum} props - props of component
 * @param {string} propName - name of prop being validated
 *
 * @returns {{}} `Prop "${propName}" is deprecated and will be removed in a future release.`
 *
 * @example:
 *          class MyComponent extends React.Component {
 *              static propTypes = {
 *                  position: deprecatedPropValues({
 *                      propType: PropTypes.oneOf(["left", "top-left", "top-right"])
 *                      values: [
 *                          {
 *                              value: "top-left",
 *                              substitute: "left"
 *                          },
 *                          {
 *                              messages: "The top-right isn't part of new designs.",
 *                              value: "top-right"
 *                          }
 *                      ],
 *                      version: "4.0.0"
 *                  })
 *              }
 *          }
 */

export const deprecatedPropValues = ({
    customMessage,
    propType,
    values,
    version
}) => (props, propName, componentName) => {
    const { [propName]: propValue } = props;
    const deprecatedValue = values.find(isDeprecatedValue(propValue));
    // Default to regular propType validator if no values or if no deprecated values.
    if (!deprecatedValue) {
        return PropTypes.checkPropTypes({
            [propName]: propType
        }, props, propName, componentName);
    }

    const { message, substitute } = deprecatedValue;
    const versionMessage = getVersionMessage(version);
    return new Error(
        customMessage ||
        `The prop value "${propValue}" is deprecated and will be removed in ${versionMessage}.` +
            `${substitute ? ` Use "${substitute}" instead.` : ""}` +
            `${renderMessage(message)}`);
};

/**
 * @desc Higher order component that fires an error if it sees a deprecated prop or if it sees a deprecated value.
 *      Stops code from running when deprecated props are used.
 * @param {Object[]} props - An array of deprecated prop objects.
 * @param {string} props.message - An optional message tacked on to the end of a prop's warning. Used when deprecating whole props.
 * @param {string} props.name - The name of the deprecated prop.
 * @param {string} props.substitute - The substitute prop to use instead. Optional- used when deprecating whole props.
 * @param {Object[]} props.values - An array of deprecated value objects; used if deprecating specific values.
 * @param {string} props.values.message - An optional message tacked on to the end of a value's warning.
 * @param {*} props.values.value - The deprecated value.
 * @param {*} props.values.substitute - The substitute for the deprecated value. Optional.
 * @param {boolean} values.contains - Used for string values; if true, checks to see if value
 *      is contained in propValue instead of doing an equality check.
 *
 * @param {{}} WrappedComponent - The component to be wrapped in this HOC
 *
 * @returns {{}} This higher order component will either throw an error or return the wrapped component.
 *
 * @example: export default withDeprecatedProps([
 *  {
 *      name: "myProp",
 *      values: [
 *          {
 *              message: "Please do not use this awful thing.",
 *              name: "aValueYouShouldNotUse",
 *              substitute: "aMuchBetterValue"
 *          },
 *      ]
 *  },
 *  {
 *      message: "More info on this prop: (link)"
 *      name: "myDeprecatedProp",
 *      substitute: "aMuchBetterProp"
 *  }
 * ])(MyComponent)
 */
export const withDeprecatedProps = deprecated => WrappedComponent => props => {
    const invalidProps = deprecated.reduce((acc, { name, values = [], ...prop }) => {
        const { [name]: propValue } = props;
        if (propValue !== undefined) {
            const deprecatedValue = values.find(isDeprecatedValue(propValue));

            return [
                ...acc,
                {
                    ...prop,
                    ...deprecatedValue ? { deprecatedValue: { ...deprecatedValue, value: propValue } } : {},
                    name
                }
            ];
        } else {
            return acc;
        }
    }, []);

    if (invalidProps.length > 0) {
        const { displayName } = WrappedComponent;
        const propsMessages = invalidProps.reduce((propsMessage, {
            deprecatedValue: dv,
            message,
            name: propName,
            substitute: sub
        }) => {
            if (dv !== undefined) {
                return `${propsMessage}The prop value "${dv.value}" is deprecated and can no longer be used.${
                    getSubstituteMessage(dv.substitute)}${renderMessage(dv.message)}`;
            } else {
                const subMessage = sub ? `; use "${sub}" instead.` : ".";
                return `${propsMessage}Prop "${propName}" is deprecated and can no longer be used${
                    subMessage}${renderMessage(message)}\n`;
            }
        }, `Error in component "${displayName}":\n`);
        throw new Error(propsMessages.trim());
    } else {
        return <WrappedComponent {...props} />;
    }
};

/**
 * @desc Function that logs a warning that a component or module will be removed in a future release.
 * @param {Object} warning - The warning object.
 * @param {string} warning.message - An optional message tacked on to the end of the warning.
 * @param {string} warning.name - The name of the module or component being deprecated.
 * @param {string} warning.substitute - The component or module to be used instead.
 * @param {string} warning.type - The type of thing being deprecated. Default is "component".
 * @param {string} warning.version - The version when the module or component will be removed. Optional.
 *
 * @returns {} No return value.
 *
 * @example: deprecationWarning({
 *      message: "Here's some information about how to get ready for next version",
 *      name: "myRegrettableComponent",
 *      substitute: "myBetterComponent",
 *      version: "4.0.0"
 *  })
 */
export function deprecationWarning({
    message,
    name,
    type = "component",
    substitute,
    version
}) {
    console.error(
        `The ${type} "${name}" is deprecated and will be removed in ${
            getVersionMessage(version)
        }.${getSubstituteMessage(substitute)}${renderMessage(message)}`
    );
}

/**
 * @desc Function that logs a warning that a component or module has been removed. Causes a runtime error,
 *       which will prevent pages using the deprecated thing from loading and will fail related unit tests.
 * @param {Object} error - The error object.
 * @param {string} error.message - An optional message tacked on to the end of the warning.
 * @param {string} error.name - The name of the module or component being deprecated.
 * @param {string} error.substitute - The component or module to be used instead.
 * @param {string} error.type - The type of thing being deprecated. Default is "component".
 *
 * @returns {} No return value.
 *
 * @example: deprecationError({
 *      message: "Here's an explanation of the substitute value.",
 *      name: "myRegrettableComponent",
 *      substitute: "myBetterComponent"
 *  })
 */
export function deprecationError({
    message,
    name,
    type = "component",
    substitute
}) {
    throw new Error(
        `The ${type} "${name}" is deprecated and has been removed.${
            getSubstituteMessage(substitute)}${renderMessage(message)}`
    );
}

/**
 * @desc Function specifically for the v4 Cannonball release. Shows a warning about changing behavior
 * @param {string} message - The message that will appear between the two pieces of boilerplate.
 *
 * @returns {} No return value.
 *
 * @example: cannonballChangeWarning({
 *      message: "This component will act much differently. Add 'much-differently' flag to preview.",
 *  })
 */
export function cannonballChangeWarning({
    message
}) {
    if (!isProduction()) {
        console.warn(
            `WARNING potential 4.0.0 breaking change: ` +
            message +
            ` For more information: https://uilibrary.ping-eng.com/3.42.0-SNAPSHOT/index.html#/?selectedSection=V4BreakingChanges&selectedNode=V4BreakingChanges&root=Documentation`
        );
    }
}

/**
 * @desc Function specifically for the v4 Cannonball release. Shows a warning about this specific behavior change
 * @param {string} name - The the name of the component
 *
 * @returns {} No return value.
 *
 * @example: cannonballProgressivelyStatefulWarning({
 *      name: "FormTextArea",
 *  })
 */
export function cannonballProgressivelyStatefulWarning({
    name
}) {
    cannonballChangeWarning({
        message: `The stateless prop will be removed from ${name}. ` +
            `Instead of distinguishing between stateless and stateful versions, ` +
            `the component will instead control the state of a subset of its props when those ` +
            `have not been defined.`
    });
}

/**
 * @desc Function specifically for the v4 Cannonball release. Shows a warning about portal behavior
 * @param {string} name - The name of the component
 *
 * @returns {} No return value.
 *
 * @example: cannonballPortalWarning({
 *      name: "Calendar",
 *  })
 */
export function cannonballPortalWarning({
    name
}) {
    cannonballChangeWarning({
        message: `${name} will render using a portal and auto-positioning.`
    });
}
