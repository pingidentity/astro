var React = require("react");
var HeaderBar = require("../../../components/panels/header-bar");

var HeaderBarDemo = React.createClass({
    getInitialState: function () {
        var initState = HeaderBar.Reducer(null, {});

        return HeaderBar.Reducer(initState, HeaderBar.Actions.init([
            { id: "help", title: "Help" },
            { id: "account", label: "John Doe",
                    children: [{ id: "globe", title: "Internet", label: "Internet", url: "http://google.com" }] }
        ]));
    },

    _handleItemClick: function (id) {
        this.setState(HeaderBar.Reducer(this.state, HeaderBar.Actions.selectItemUnselectOthers(id)));
    },

    render: function () {
        //the header bar is styled with position fixed so it's not possible to have a demo for it
        return (
            <HeaderBar {...this.state}
                onItemValueChange={this._handleItemClick} />);
    }
});

module.exports = HeaderBarDemo;
