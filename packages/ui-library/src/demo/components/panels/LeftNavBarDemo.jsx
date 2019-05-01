var React = require("react");
var LeftNavBar = require("../../../components/panels/left-nav");

/**
* @name LeftNavBarDemo
* @memberof LeftNavBar
* @desc A demo for LeftNavBar
*/
class LeftNavDemo extends React.Component {
    constructor(props) {
        super(props);
        var initState = LeftNavBar.Reducer(null, {});

        this.state = LeftNavBar.Reducer(initState, LeftNavBar.Actions.init([
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
    }

    _handleSectionClick = (id) => {
        this.setState(LeftNavBar.Reducer(this.state, LeftNavBar.Actions.toggleSectionCloseOthers(id)));
    };

    _handleItemClick = (id) => {
        this.setState(LeftNavBar.Reducer(this.state, LeftNavBar.Actions.selectItemUnselectOthers(id)));
    };

    render() {
        return (
            <LeftNavBar {...this.state}
                onItemValueChange={this._handleItemClick}
                onSectionValueChange={this._handleSectionClick} legacy />);
    }
}

module.exports = LeftNavDemo;
