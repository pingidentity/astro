import React, { Component } from "react";
import Pagination from "../../../components/list/Pagination";
import ExpandableRow from "../../../components/rows/ExpandableRow";
import { allFlags } from "../../../util/FlagUtils";
import InputRow from "../../../components/layout/InputRow";

/**
* @name PaginationDemo
* @memberof Pagination
* @desc A demo for Pagination
*/
export default class PaginationDemo extends Component {
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
        currentPage: 1,

        perPage2: 5,
        display2: this.items.slice(0, 5),
        first2: 0,
        last2: 5,
        currentPage2: 1,
    }

    _changeCallback = (pagingDetails) => {
        this.setState({
            display: this.items.slice(pagingDetails.first,pagingDetails.last),
            first: pagingDetails.first,
            last: pagingDetails.last,
            currentPage: pagingDetails.page
        });
    };

    _changeCallback2 = (pagingDetails) => {
        this.setState({
            display2: this.items.slice(pagingDetails.first,pagingDetails.last),
            firs2t: pagingDetails.first,
            last2: pagingDetails.last,
            currentPage2: pagingDetails.page
        });
    };



    render() {
        return (
            <div>
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
                        onValueChange={this._changeCallback}>
                        {this.state.display}
                    </Pagination>
                </div>
                <br />
                <br />
                <InputRow>
                    <label>Pagination with Render prop to display one or more page links</label>
                    <Pagination
                        stateless={true}
                        className="result-set"
                        perPage={this.state.perPage2}
                        page={this.state.currentPage2}
                        total={this.items.length}
                        onValueChange={this._changeCallback2}
                        renderPageLinks={(props, PageLinks)=> (
                            <div>
                                <PageLinks
                                    currentPage={props.currentPage}
                                    numPages={props.numPages}
                                    onValueChange={props.onValueChange}
                                    data-id="topPageLinks"
                                />
                                {props.children}
                            </div>
                        )}
                    >
                        {this.state.display2}
                    </Pagination>
                </InputRow>
            </div>
        );
    }
}

