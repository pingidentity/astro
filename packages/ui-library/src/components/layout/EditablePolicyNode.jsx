import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import PolicyNode from "./PolicyNode";

/**
* @class EditablePolicyNode
* @desc Node with an edit button that toggles between the first two children
*
* @param {boolean} [editing]
*     Activates edit mode and displays second child rather than first
* @param {function} onEdit
*     Callback for the edit button
*/
const EditablePolicyNode = props => {
    const {
        children,
        editing,
        onEdit
    } = props;

    const policyNodeProps = _.omit(props, [
        "children",
        "editing",
        "id",
        "onEdit"
    ]);

    return (
        <PolicyNode
            parent
            gutter={!editing ? "arrow" : null}
            onEdit={!editing ? onEdit : null}
            {...policyNodeProps}
        >
            {editing ? children[1] : children[0]}
        </PolicyNode>
    );
};

EditablePolicyNode.propTypes = {
    editing: PropTypes.bool,
    onEdit: PropTypes.func
};

export default EditablePolicyNode;