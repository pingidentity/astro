var React = require("react");
var HeaderBar = require("../../../components/panels/header-bar");

var HeaderBarDemo = React.createClass({
    getInitialState: function () {
        var initState = HeaderBar.Reducer(null, {});

        return HeaderBar.Reducer(initState, HeaderBar.Actions.init([
            { id: "help", title: "Documentation" },
            { id: "cog", children: [{ id: "cog", label: "Cog" }] },
            { id: "account", children: [{ id: "globe", label: "Globe" }] }
        ]));
    },

    _handleItemClick: function (id) {
        this.setState(HeaderBar.Reducer(this.state, HeaderBar.Actions.selectItemUnselectOthers(id)));
    },

    render: function () {
        //the header bar is styled with position fixed so it's not possible to have a demo for it
        return (
            <HeaderBar {...this.state}
                onItemClick={this._handleItemClick} />);
    }
});

module.exports = HeaderBarDemo;
