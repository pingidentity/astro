import React, { Component } from "react";
import Pagination from "../../../components/list/Pagination";
import ExpandableRow from "../../../components/rows/ExpandableRow";
import { allFlags } from "../../../util/FlagUtils";

/**
* @name PaginationDemo
* @memberof Pagination
* @desc A demo for Pagination
*/
export default class PaginationDemo extends Component {
    static flags = ["p-stateful"]

    items = new Array(100).fill("").map(
        (str, idx) => (
            <ExpandableRow
                title = {"Entry " + (idx + 1)}
                data-id={"expandable-row" + idx}
                key = {idx}
                flags={allFlags}
            />
        )
    )

    state = {
        perPage: 5,
        display: this.items.slice(0, 5),
        first: 0,
        last: 5,
        currentPage: 1
    }

    _changeCallback = (pagingDetails) => {
        this.setState({
            display: this.items.slice(pagingDetails.first,pagingDetails.last),
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
                <Pagination
                    stateless={true}
                    className="result-set"
                    perPage={this.state.perPage}
                    page={this.state.currentPage}
                    total={this.items.length}
                    onValueChange={this._changeCallback}
                >
                    {this.state.display}
                </Pagination>
            </div>
        );
    }
}
