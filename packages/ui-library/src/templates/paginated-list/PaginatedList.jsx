import React from "react";
import ExpandableRow from "../../components/rows/ExpandableRow";
import FormSearchBar from "../../components/forms/FormSearchBar";
import Pagination from "../../components/list/Pagination";
import Button from "../../components/buttons/Button";
import RowAccessories from "../../components/rows/expandable-row/Accessories";
import PageHeader from "../../components/general/PageHeader";


/**
 * @class PaginatedList
 * @desc This is a template to demonstrate how to build an paginated list view, with search and filters.  Use it as a
 *     starting point for a page.
 *
 */
export default class PaginatedList extends React.Component {


    state = {
        page: 1,
        searchTerm: "",
    }

    _handleFilter = (searchTerm) => {
        this.setState({
            searchTerm: searchTerm.toUpperCase(),
            page: 1
        });
    };

    _handlePageChange = (pagingDetails) => {
        this.setState({
            page: pagingDetails.page
        });
    };


    _generatePageRows = () => {
        let rows = [];
        const statuses = [ ExpandableRow.Statuses.GOOD,
            ExpandableRow.Statuses.GOOD,
            ExpandableRow.Statuses.GOOD,
            ExpandableRow.Statuses.ERROR,
            ExpandableRow.Statuses.WARNING
        ];
        for (let i = 1; i < 51; i+= 1) {
            rows.push({
                id: i, key: "row-" + i, "data-id": "row-" + i,
                title: "Row " + i, subtitle: "subtitle for row " + i,
                status: statuses[i % statuses.length]
            });
        }
        return rows;
    };

    rowList = this._generatePageRows();

    _filterSearch = () => this.rowList.filter(
        ({ title }) => title.toUpperCase().includes(this.state.searchTerm))

    _rowSlice = (rows) => rows
        .slice((this.state.page -1) * 10, ((this.state.page - 1) * 10) + 10).map( ({ status, ...obj }) => {
            return (<ExpandableRow {...obj}
                showEdit={true}
                rowAccessories={<RowAccessories.Status status={status} />}
            />);
        });


    render() {

        const filteredPages = this._filterSearch();

        return (
            <div>
                <PageHeader title="Paginated List" />
                <FormSearchBar
                    formSearchBoxProps={{
                        onValueChange: this._handleFilter,
                    }}
                    rightControl={<Button label="Add Application" iconName="add"/>}
                />
                {filteredPages.length && (
                    <Pagination stateless={true}
                        className = "result-set"
                        page = {this.state.page}
                        total = {filteredPages.length}
                        onValueChange = {this._handlePageChange}>

                        {this._rowSlice(filteredPages)}
                    </Pagination>
                ) || (
                    <ExpandableRow.SimpleWrapper>No rows returned</ExpandableRow.SimpleWrapper>
                )}

            </div>
        );
    }
}
