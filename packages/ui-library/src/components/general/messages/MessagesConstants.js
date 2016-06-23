var _ = require("underscore");

/**
 * @enum {string}
 * @alias Messages.MessageTypes
 * @desc Enum for the different types of Messages */
exports.MessageTypes = {
    /** success */
    SUCCESS: "success",
    /** notice */
    NOTICE: "notice",
    /** warning */
    WARNING: "warning",
    /** feature */
    FEATURE: "feature",
    /** error */
    ERROR: "warning"
};

/*
 * For convenience also expose the MessageTypes as an array
 */
exports.MessageTypeValues = _.values(exports.MessageTypes);

/**
 * @enum {string}
 * @alias Messages.ContainerTypes
 * @desc Enum for the different options for Message container.
 */
exports.ContainerTypes = {
    /** This is the default container type.  Takes the width of the entire window */
    FULL: "full",
    /** Use this containerType when the Messages component is inside a modal */
    MODAL: "in-modal"
};
