var React = require("react");
var LeftNavBar = require("../../../components/panels/left-nav");

/**
* @name LeftNavBarDemo
* @memberof LeftNavBar
* @desc A demo for LeftNavBar
*/
var LeftNavDemo = React.createClass({
    getInitialState: function () {
        var initState = LeftNavBar.Reducer(null, {});

        return LeftNavBar.Reducer(initState, LeftNavBar.Actions.init([
            {
                label: "Section 1",
                id: "section1",
                children: [ { label: "Item 1", id: "item1" } ]
            },
            {
                label: "Section 2",
                id: "section2",
                children: [ { label: "Item 2", id: "item2" } ]
            }
        ]));
    },

    _handleSectionClick: function (id) {
        this.setState(LeftNavBar.Reducer(this.state, LeftNavBar.Actions.toggleSectionCloseOthers(id)));
    },

    _handleItemClick: function (id) {
        this.setState(LeftNavBar.Reducer(this.state, LeftNavBar.Actions.selectItemUnselectOthers(id)));
    },

    render: function () {
        return (
            <LeftNavBar {...this.state}
                onItemValueChange={this._handleItemClick}
                onSectionValueChange={this._handleSectionClick} />);
    }
});

module.exports = LeftNavDemo;
