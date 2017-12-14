var React = require("react"),
    Pagination = require("../../../components/list/Pagination"),
    ExpandableRow = require("../../../components/rows/ExpandableRow");

/**
* @name PaginationDemo
* @memberof Pagination
* @desc A demo for Pagination
*/
class PaginationDemo extends React.Component {
    constructor(props) {
        super(props);
        var items = [];
        for (var i = 0; i < 100; i = i + 1) {
            items.push(<ExpandableRow title = {"Entry " + (i + 1)} data-id={"expandable-row" + i} key = {i}/>);
        }

        this.state = {
            total: items.length,
            perPage: 5,
            items: items,
            display: items.slice(0, 5),
            first: 0,
            last: 5,
            currentPage: 1
        };
    }

    _changeCallback = (pagingDetails) => {
        this.setState({
            display: this.state.items.slice(pagingDetails.first,pagingDetails.last),
            first: pagingDetails.first,
            last: pagingDetails.last,
            currentPage: pagingDetails.page
        });
    };

    render() {

        return (
            <div>
                <label>Callback to Parent</label>
                <div>
                    First Entry Index: {this.state.first},
                    Slice To: {this.state.last},
                    Current Page: {this.state.currentPage},
                </div>
                <Pagination stateless={true}
                    className = "result-set"
                    perPage = {this.state.perPage}
                    page = {this.state.currentPage}
                    total = {this.state.items.length}
                    onValueChange = {this._changeCallback}>
                    {this.state.display}
                </Pagination>
            </div>
        );
    }
}

module.exports = PaginationDemo;
