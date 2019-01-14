import PropTypes from "prop-types";
import React from "react";
import ExpandableRow from "../../components/rows/expandable-row";
import FormCheckbox from "../../components/forms/FormCheckbox";
import FormSearchBar from "../../components/forms/FormSearchBar";
import InfiniteScroll from "../../components/list/InfiniteScroll";
import Button from "../../components/buttons/Button";
import Modal from "../../components/general/Modal";
import RowAccessories from "../../components/rows/expandable-row/Accessories";
import Toggle from "../../components/forms/form-toggle";
import _ from "underscore";
import LabelValuePairs from "../../components/layout/LabelValuePairs";
import ColumnLayout from "../../components/general/ColumnLayout";

/**
 * @callback ListView~onSearchAdvancedToggle
 * @param {object} e
 *    The ReactJS synthetic event object.
 */

/**
 * @callback ListView~onSearchFilterChange
 * @param {string} Name
 *          Identifier for input
 * @param {string} value
 *          New value of input
 */

/**
 * @class ListView
 * @desc This is a template to demonstrate how to build an InfiniteScrolling list view, with search and filters.  Use
 * it as a starting poing for a page.
 *
 * @param {bool} advancedSearch
 *          Whether to show the narrow by section
 * @param {object} position
 *          The position of the Infinite Scroll.  Used to determine if the IS position has changed enough
 *          to execute the onScrollPositionChange callback.
 * @param {ListView~onSearchAdvancedToggle} onSearchAdvancedToggle
 *          Callback to be triggered when the advanced search is toggled
 * @param {ListView~onSearchFilterChange} onSearchFilterChange
 *          Callback to be triggered when the filter criteria is changed.
 *          The signature is function (filterName, filterValue)
 */
module.exports = class extends React.Component {
    /*
     * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by ReactDefaultMethods
     * utility.
     */
    static propTypes = {
        advancedSearch: PropTypes.bool,
        filters: PropTypes.object,
        batches: PropTypes.array,
        hasNext: PropTypes.bool,
        hasPrev: PropTypes.bool
    };

    state = {
        showCloseTooltip: false
    };

    _toggleModal = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    _resetModal = () => {
        this._toggle();
    };


    /*
     * When the component mounts, do a bunch of initialization
     */
    componentWillMount() {
        //Create an instance of the row type with the right accessory type
        this._contentType = <Row data-id={"row"} showEdit={true} />;

        //Instead of creating partials in the render function, which get computed on ever render, or
        //extracting the data-id of the target.  Created partials on mount and use them
        this._handleTextChange = this._handleFilter.bind(null, "text");
        this._handleOddFilterToggle = this._handleFilter.bind(null, "odd");
        this._handleEvenFilterToggle = this._handleFilter.bind(null, "even");
    }

    /*
     * Wrap the callback in a function so that we can create partials without having to worry about the
     * callback changing.
     */
    _handleFilter = (name, value) => {
        this.props.onSearchFilterChange(name, value);
    };

    /*
     * Only execute the scroll callback if the the position changes
     */
    _handleScroll = (pos) => {
        if (this.props.position.batchId !== pos.batchId || this.props.position.itemIndex !== pos.itemIndex) {
            this.props.onScrollPositionChange(pos);
        }
    };


    render() {
        return (
            <div>
                <Modal
                    data-id="add-modal"
                    modalTitle="Add Modal"
                    expanded={this.state.expanded}
                    onOpen={this._toggleModal}
                    onClose={this._toggleModal}
                >
                    <p>
                        Add Modal content
                    </p>
                </Modal>
                <FormSearchBar
                    formSearchBoxProps={{
                        onValueChange: this._handleTextChange,
                        queryString: this.props.filters.text,
                    }}
                    rightControl={
                        <Button
                            className="button-add-modal"
                            label="Add Modal Button"
                            iconName="add"
                            onClick={this._toggleModal}
                        />
                    }
                >
                    <FormCheckbox label="filter odd rows"
                        onValueChange={this._handleOddFilterToggle}
                        checked={this.props.filters.odd}
                        className="inline" />
                    <FormCheckbox label="filter even rows"
                        onValueChange={this._handleEvenFilterToggle}
                        checked={this.props.filters.even}
                        className="inline" />
                </FormSearchBar>
                {
                    /*
                    * Hardcoded height just to demonstrate the infinite scroll
                    */
                }
                <div className="result-set" data-id="result-set" style={{ height: 500 }}>
                    <InfiniteScroll contentType={this._contentType}
                        initialItem={this.props.position}
                        onScroll={this._handleScroll}
                        batches={this.props.batches}
                        hasNext={this.props.hasNext}
                        hasPrev={this.props.hasPrev}
                        onLoadNext={_.noop}
                        onLoadPrev={_.noop} >
                        <div className="result-set">No rows returned</div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
};

/*
 * This component just serves as a proxy to choose the type of row to return.  This is obviously verbose so
 * that the code for each row type is not obfuscated.  This could easily be boiled down to one return statement
 */
class Row extends React.Component {
    render() {
        const mockData = [
            {
                label: "Attribute Type",
                value: "String"
            },
            {
                label: "Category",
                value: "Profile"
            },
            {
                label: "name",
                value: "Tony Stark"
            },
            {
                label: "Display Name",
                value: "Iron Man"
            },
            {
                label: "Description",
                value: "Tony Stark is a playboy billionare who is a super hero with an iron suit"
            },
            {
                label: "Required",
                value: "NO"
            },
            {
                label: "Registration",
                value: "NO"
            },
        ];
        switch (this.props.type) {
            case "1 line with icon, no accessories":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"}>
                        <ColumnLayout.Row data-id="columns-2">
                            <ColumnLayout.Column>
                                <LabelValuePairs dataPairs={mockData} />
                            </ColumnLayout.Column>
                            <ColumnLayout.Column>
                                <LabelValuePairs dataPairs={mockData} />
                            </ColumnLayout.Column>
                        </ColumnLayout.Row>
                    </ExpandableRow>);
            case "2 lines with icon, no accessories":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        subtitle="this is a subtitle"
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"}>
                        <LabelValuePairs dataPairs={mockData} />
                    </ExpandableRow>);
            case "1 line no icon, no accessories":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"}>
                        <ColumnLayout.Row data-id="columns-2">
                            <ColumnLayout.Column>
                                <LabelValuePairs dataPairs={mockData} />
                            </ColumnLayout.Column>
                            <ColumnLayout.Column>
                                <LabelValuePairs dataPairs={mockData} />
                            </ColumnLayout.Column>
                        </ColumnLayout.Row>
                    </ExpandableRow>);
            case "2 lines no icon, no accessories":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"}>
                        <LabelValuePairs dataPairs={mockData} />
                    </ExpandableRow>);
            case "2 lines with icon, with status=good":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<RowAccessories.Status status="good" />}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"}>
                        <ColumnLayout.Row data-id="columns-2">
                            <ColumnLayout.Column>
                                <LabelValuePairs dataPairs={mockData} />
                            </ColumnLayout.Column>
                            <ColumnLayout.Column>
                                <LabelValuePairs dataPairs={mockData} />
                            </ColumnLayout.Column>
                        </ColumnLayout.Row>
                    </ExpandableRow>);
            case "2 lines with icon, with status=bad":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<RowAccessories.Status status="error" />}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"}>
                        <LabelValuePairs dataPairs={mockData} />
                    </ExpandableRow>);
            case "2 lines with icon toggle on":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<Toggle toggled={true} stateless={false} />}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"}>
                        <ColumnLayout.Row data-id="columns-2">
                            <ColumnLayout.Column>
                                <LabelValuePairs dataPairs={mockData} />
                            </ColumnLayout.Column>
                            <ColumnLayout.Column>
                                <LabelValuePairs dataPairs={mockData} />
                            </ColumnLayout.Column>
                        </ColumnLayout.Row>
                    </ExpandableRow>);
            case "2 lines with icon toggle off":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<Toggle toggled={false} stateless={false} />}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"}>
                        <LabelValuePairs dataPairs={mockData} />
                    </ExpandableRow>);
            case "2 lines with icon, with pill button":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<RowAccessories.PillButton label="Pill Button" onClick={this.props.onClick} />}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"}>
                        <ColumnLayout.Row data-id="columns-2">
                            <ColumnLayout.Column>
                                <LabelValuePairs dataPairs={mockData} />
                            </ColumnLayout.Column>
                            <ColumnLayout.Column>
                                <LabelValuePairs dataPairs={mockData} />
                            </ColumnLayout.Column>
                        </ColumnLayout.Row>
                    </ExpandableRow>);
            case "2 lines with icon, with all accessories":
                var accessories = (
                    <div>
                        <RowAccessories.PillButton label="Pill Button" />
                        <Toggle toggled={true} stateless={false} />
                        <RowAccessories.Status status="good" />
                        <RowAccessories.Status status="error" />
                        <RowAccessories.Status status="warning" />
                    </div>);

                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={accessories}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"}>
                        <LabelValuePairs dataPairs={mockData} />
                    </ExpandableRow>);
        }
    }
}
