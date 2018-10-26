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

    it("pushes messages", function () {
        var store = getStore();
        store.dispatch(Actions.pushMessage(
            "messages",
            "hello world",
            "success",
            5000,
            0
        ));
        store.dispatch(Actions.pushMessage(
            "messages",
            "hello world",
            undefined,
            5000,
            1
        ));

        expect(store.getState().messages).toEqual([
            {
                containerId: "messages",
                status: "success",
                type: "success",
                text: "hello world",
                index: 0,
                timer: 5000
            },
            {
                containerId: "messages",
                status: "success",
                type: "success",
                text: "hello world",
                index: 1,
                timer: 5000
            }
        ]);
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

    it("adds message using single-object form", function () {
        var store = getStore();
        store.dispatch(Actions.addMessage({
            containerId: "mycontainer",
            message: "hello world",
            status: "warning"
        }));

        expect(store.getState().mycontainer).toEqual([{
            containerId: "mycontainer",
            status: "warning",
            type: "warning",
            text: "hello world",
            index: 1,
            timer: 5000
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

        store.dispatch(Actions.removeAt("messages", 1));

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

        store.dispatch(Actions.removeMessage(1));

        expect(_.pluck(store.getState().messages, "text")).toEqual([]);
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

    it("Adds a message with a progress bar that is minimized", function () {
        const store = getStore();

        const progress = {
            percent: 30,
            text: "You've got 30 left"
        };

        store.dispatch(Actions.addMessage({
            containerId: "mycontainer",
            message: "progress...",
            status: "info",
            minimized: true,
            removeAfterMs: 0,
            progress
        }));

        expect(store.getState().mycontainer).toEqual([{
            containerId: "mycontainer",
            status: "info",
            type: "info",
            minimized: true,
            text: "progress...",
            timer: 0,
            index: 1,
            progress
        }]);
    });

    it("Adds a message with a progress bar that we update", function () {
        const store = getStore();

        const progress = {
            percent: 30,
            text: "You've got 30 left"
        };

        store.dispatch(Actions.addMessage({
            message: "progress...",
            messageId: "new-message",
            status: "info",
            removeAfterMs: 0,
            minimizeAfterMS: 500,
            progress
        }));

        expect(store.getState().messages).toEqual([{
            containerId: "messages",
            status: "info",
            type: "info",
            text: "progress...",
            timer: 0,
            index: "new-message",
            progress
        }]);

        store.dispatch(Actions.updateProgress("new-message", 99));

        expect(store.getState().messages[0].progress).toEqual(
            {
                percent: 99,
                text: "You've got 30 left"
            }
        );

        store.dispatch(Actions.minimizeMessage("new-message"));

        expect(store.getState().messages[0].minimized).toEqual(true);

        expect(window.setTimeout.mock.calls[0][1]).toBe(500);

        //trigger the cleanup function
        window.setTimeout.mock.calls[0][0]();
    });

    it("Updates a progress bar and minimizes the message", function () {
        const store = getStore();

        const progress = {
            percent: 30,
            text: "You've got 30 left"
        };

        store.dispatch(Actions.addMessage({
            containerId: "container",
            message: "progress...",
            messageId: "new-message",
            status: "info",
            removeAfterMs: 0,
            progress
        }));

        store.dispatch(Actions.updateProgress("container", "new-message", 99));

        expect(store.getState().container[0].progress).toEqual(
            {
                percent: 99,
                text: "You've got 30 left"
            }
        );

        store.dispatch(Actions.minimizeMessage("container", "new-message"));

        expect(store.getState().container[0].minimized).toEqual(true);
    });

    it("removes all messages in a container", function () {
        const store = getStore();

        store.dispatch(Actions.addMessage("uno"));
        store.dispatch(Actions.addMessage("dos"));
        store.dispatch(Actions.addMessage("tres"));

        expect(_.pluck(store.getState().messages, "text")).toEqual(["uno", "dos","tres"]);

        store.dispatch(Actions.removeAllMessages());

        expect(_.pluck(store.getState().messages, "text")).toEqual([]);
    });

    it("removes all messages in a container and not another", function () {
        const store = getStore();

        store.dispatch(Actions.addMessage("uno"));
        store.dispatch(Actions.addMessage("dos"));
        store.dispatch(Actions.addMessage("tres"));

        store.dispatch(Actions.addMessage("another", "uno"));
        store.dispatch(Actions.addMessage("another", "dos"));
        store.dispatch(Actions.addMessage("another", "tres"));

        expect(_.pluck(store.getState().another, "text")).toEqual(["uno", "dos","tres"]);

        store.dispatch(Actions.removeAllMessages("another"));

        expect(_.pluck(store.getState().messages, "text")).toEqual(["uno", "dos","tres"]);
        expect(_.pluck(store.getState().another, "text")).toEqual([]);
    });
});
