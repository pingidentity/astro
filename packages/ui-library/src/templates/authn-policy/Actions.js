var keyMirror = require("fbjs/lib/keyMirror");
import Messages from "ui-library/lib/components/general/messages/";

exports.Types = keyMirror({
    EDIT_STEP: null,
    SAVE_STEP: null,
    CANCEL_EDIT_STEP: null,
    CHANGE_VALUE: null,
});

exports.editStep = (policy, step) => ({
    type: exports.Types.EDIT_STEP,
    policy, step
});

exports.cancelEditStep = () => ({ type: exports.Types.CANCEL_EDIT_STEP });

exports.saveStep = (policy, step) => dispatch => {
    dispatch({
        type: exports.Types.SAVE_STEP,
        policy, step
    });
    dispatch(Messages.Actions.addMessage("Saved!"));
};

exports.changeValue = (path, value) => ({
    type: exports.Types.CHANGE_VALUE,
    path, value
});
