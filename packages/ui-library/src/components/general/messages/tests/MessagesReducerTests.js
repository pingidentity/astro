window.__DEV__ = true;

jest.dontMock("../MessagesReducer.js");
jest.dontMock("../MessagesActions.js");
jest.dontMock("../MessagesConstants.js");
jest.dontMock("../Messages");

describe("Messages", function () {
    var _ = require("underscore"),
        Reducer = require("../MessagesReducer.js"),
        Actions = require("../MessagesActions.js"),
        Redux = require("redux"),
        thunk = require("redux-thunk");

    beforeEach(function () {
        Actions.lastId = 0;

        window.setTimeout = jest.genMockFunction().mockImplementation(function (fn, timeout) {
            return timeout;
        });
    });

    afterEach(function () {
        window.setTimeout = setTimeout;
    });

    function getStore () {
        return Redux.applyMiddleware(thunk)(Redux.createStore)(Reducer);
    }

    it("backwards compat: adds message", function () {
        var store = getStore();
        store.dispatch(Actions.addMessage("hello world"));

        expect(store.getState().messages).toEqual([{
            containerId: "messages",
            status: "success",
            type: "success",
            text: "hello world",
            index: 1,
            timer: 5000
        }]);
    });

    it("backwards compat: adds message with status", function () {
        var store = getStore();
        store.dispatch(Actions.addMessage("hello world", "warning"));

        expect(store.getState().messages).toEqual([{
            containerId: "messages",
            status: "warning",
            type: "warning",
            text: "hello world",
            index: 1,
            timer: 5000
        }]);
    });

    it("backwards compat: adds message with status and remove timeout", function () {
        var store = getStore();
        store.dispatch(Actions.addMessage("hello world", "warning", 2000));

        expect(store.getState().messages).toEqual([{
            containerId: "messages",
            status: "warning",
            type: "warning",
            text: "hello world",
            index: 1,
            timer: 2000
        }]);
    });

    it("adds message with comp id", function () {
        var store = getStore();
        store.dispatch(Actions.addMessage("mycontainer", "hello world"));

        expect(store.getState().mycontainer).toEqual([{
            containerId: "mycontainer",
            status: "success",
            type: "success",
            text: "hello world",
            index: 1,
            timer: 5000
        }]);
    });

    it("adds message with status", function () {
        var store = getStore();
        store.dispatch(Actions.addMessage("mycontainer", "hello world", "warning"));

        expect(store.getState().mycontainer).toEqual([{
            containerId: "mycontainer",
            status: "warning",
            type: "warning",
            text: "hello world",
            index: 1,
            timer: 5000
        }]);
    });

    it("adds message with status and remove timeout", function () {
        var store = getStore();
        store.dispatch(Actions.addMessage("mycontainer", "hello world", "warning", 2000));

        expect(store.getState().mycontainer).toEqual([{
            containerId: "mycontainer",
            status: "warning",
            type: "warning",
            text: "hello world",
            index: 1,
            timer: 2000
        }]);
    });

    it("Add message schedules removal", function () {
        var store = getStore();

        store.dispatch(Actions.addMessage("message"));

        expect(window.setTimeout.mock.calls[0][1]).toBe(5000);

        //trigger the cleanup function
        window.setTimeout.mock.calls[0][0]();

        expect(store.getState().messages).toEqual([]);
    });

    it("Removes message by index", function () {
        var store = getStore();

        store.dispatch(Actions.addMessage("message 1"));
        store.dispatch(Actions.addMessage("message 2"));
        store.dispatch(Actions.addMessage("message 3"));

        store.dispatch(Actions.removeAt(1));

        expect(_.pluck(store.getState().messages, "text")).toEqual(["message 1", "message 3"]);
    });

    it("Adds and removes messages in two containers", function () {
        var store = getStore();

        store.dispatch(Actions.addMessage("message 1"));
        store.dispatch(Actions.addMessage("container1", "message 1.1"));

        expect(_.pluck(store.getState().messages, "text")).toEqual(["message 1"]);
        expect(_.pluck(store.getState().container1, "text")).toEqual(["message 1.1"]);

        store.dispatch(Actions.removeMessage("container1", 2));

        expect(_.pluck(store.getState().messages, "text")).toEqual(["message 1"]);
        expect(_.pluck(store.getState().container1, "text")).toEqual([]);
    });

    it("Shifts first message out of array", function () {
        var store = getStore();

        store.dispatch(Actions.addMessage("message 1"));
        store.dispatch(Actions.addMessage("message 2"));
        store.dispatch(Actions.addMessage("message 3"));
        store.dispatch(Actions.shiftMessage());

        expect(store.getState().messages.length).toBe(2);
    });

    it("Removes non-existant index", function () {
        var store = getStore();

        store.dispatch(Actions.addMessage("message 1"));
        store.dispatch(Actions.removeAt(1));

        expect(store.getState().messages.length).toBe(1);
    });
});
