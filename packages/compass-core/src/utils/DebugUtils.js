/** @module DebugUtils */

/**
* @desc Checks if the current build is a production build.
*
* @return {boolean}
*    Returns true if on production build, false otherwise.
*/
export const isProduction = () => {
    return process.env.NODE_ENV === 'production';
};
