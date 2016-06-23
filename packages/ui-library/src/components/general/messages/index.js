var Messages = require("./Messages.jsx");
var Constants = require("./MessagesConstants.js");

/*
 * Export the Actions and Reducer
 */
Messages.Reducer = require("./MessagesReducer");
Messages.Actions = require("./MessagesActions");

/*
 * Export the constants
 */
Messages.MessageTypes = Constants.MessageTypes;
Messages.MessageTypeValues = Constants.MessageTypeValues;
Messages.ContainerTypes = Constants.ContainerTypes;

module.exports = Messages;
