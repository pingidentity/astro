import React from "react";

/**
 * @module util/DependencyUtils
 * @desc Functions for showing nice errors when loading a component that has a requirement above our standard dependencies.
 */

/**
 * @alias module:util/DependencyUtils.usesStableContext
 *
 * @desc Throws an error if the React 16.3+ context API isn't available.
 *
 * @example
 *   usesStableContext()
 */

export const usesStableContext = (component) => {
    if (!React.createContext) {
        console.error(`${component} requires React 16.3`);
    }
};

/**
 * @alias module:util/DependencyUtils.usesFragments
 *
 * @desc Throws an error if React fragments aren't available.
 *
 * @example
 *   usesStableContext()
 */

export const usesFragments = (component) => {
    if (!React.Fragment) {
        console.error(`${component} requires React 16`);
    }
};
