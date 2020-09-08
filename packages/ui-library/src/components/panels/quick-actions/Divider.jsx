import React from "react";
import classnames from "classnames";

/**
 * @class QuickActions
 * @desc A collections of components for rendering Quick Actions and shortcuts.
 *
 */

/**
 * @class Divider
 * @desc A divider to put between QuickActions.Section components.
 * @memberof QuickActions
 *
 */


export default function Divider({ className }) {
    return (
        <div
            className={
                classnames("quick-actions__divider", className)
            }
        />
    );
}
