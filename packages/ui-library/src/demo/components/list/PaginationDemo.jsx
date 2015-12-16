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
            total: 100,
            perPage: 5,
            items: items,
            display: []
        };
    },

    _changeCallback: function (first, last, page) {
        var display = this.state.items.slice(first,last);
        this.setState({
            display: display
        });
        this.first = first;
        this.last = last;
        this.page = page;
    },

    render: function () {

        return (
            <div>
                <label>Callback to Parent</label>
                <div>
                    First Entry Index: {this.first ? this.first : ""},
                    Slice To: {this.last ? this.last : ""},
                    Current Page: {this.page ? this.page : ""}
                </div>
                <Pagination
                    className = "result-set"
                    perPage = {this.state.perPage}
                    total = {this.state.items.length}
                    onChange = {this._changeCallback}>
                    {this.state.display}
                </Pagination>
            </div>
        );
    }
});

module.exports = PaginationDemo;
