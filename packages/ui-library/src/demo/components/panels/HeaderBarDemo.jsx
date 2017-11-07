var React = require("react");
var HeaderBar = require("../../../components/panels/header-bar");

/**
* @name HeaderBarDemo
* @memberof HeaderBar
* @desc A demo for HeaderBar
*/
class HeaderBarDemo extends React.Component {
    constructor(props) {
        super(props);
        var initState = HeaderBar.Reducer(null, {});

        this.state = HeaderBar.Reducer(initState, HeaderBar.Actions.init([
            { id: "help", title: "Help" },
            {
                id: "account",
                label: "John Doe",
                children: [{
                    id: "globe",
                    iconClassName: "icon-globe",
                    title: "Internet",
                    label: "Internet" }
                ]
            }
        ]));
    }

    _handleItemClick = (id) => {
        this.setState(HeaderBar.Reducer(this.state, HeaderBar.Actions.selectItemUnselectOthers(id)));
    };

    render() {
        // by default the header bar is styled with position:fixed, but it has been changed to position:absolute for
        // purposes of this demo
        return (
            <HeaderBar {...this.state}
                onItemValueChange={this._handleItemClick}
            />);
    }
}

module.exports = HeaderBarDemo;
