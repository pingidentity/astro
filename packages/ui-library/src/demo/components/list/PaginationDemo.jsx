var React = require("react"),
    Pagination = require("../../../components/list/Pagination.jsx"),
    ExpandableRow = require("../../../components/rows/ExpandableRow.jsx");


var PaginationDemo = React.createClass({

    getInitialState: function () {
        var items = [];
        for (var i = 0; i < 100; i = i + 1) {
            items.push(<ExpandableRow title = {"Entry " + (i+1)} key = {i}/>);
        }
        return {
            total: items.length,
            perPage: 5,
            items: items,
            display: items.slice(0, 5),
            first: 0,
            last: 5,
            currentPage: 1
        };
    },

    _changeCallback: function (first, last, page) {

        console.log(`++ _changeCallback(${first}, ${last}, ${page})`);

        this.setState({
            display: this.state.items.slice(first,last),
            first: first,
            last: last,
            currentPage: page
        });
    },

    render: function () {

        return (
            <div>
                <label>Callback to Parent</label>
                <div>
                    First Entry Index: {this.state.first},
                    Slice To: {this.state.last},
                    Current Page: {this.state.currentPage},
                </div>
                <Pagination controlled={true}
                    className = "result-set"
                    perPage = {this.state.perPage}
                    page = {this.state.currentPage}
                    total = {this.state.items.length}
                    onChange = {this._changeCallback}>
                    {this.state.display}
                </Pagination>
            </div>
        );
    }
});

module.exports = PaginationDemo;
