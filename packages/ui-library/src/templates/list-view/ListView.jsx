var React = require("re-react"),
    CollapsibleLink = require("../../components/general/CollapsibleLink.jsx"),
    ExpandableRow = require("../../components/rows/expandable-row"),
    FormCheckbox = require("../../components/forms/FormCheckbox.jsx"),
    FormSearchBox = require("../../components/forms/FormSearchBox.jsx"),
    InfiniteScroll = require("../../components/list/InfiniteScroll.jsx"),
    ModalButton = require("../../components/general/ModalButton.jsx"),
    RowAccessories = require("../../components/rows/expandable-row/Accessories.jsx"),
    Toggle = require("../../components/forms/form-toggle"),
    TabbedSections = require("../../components/general/TabbedSections.jsx"),
    classnames = require("classnames"),
    _ = require("underscore");

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
 * @callback ListView~onActiveTabChange
 * @param {number} index
 *          New index
 */

/**
 * @class ListView
 * @desc This is a template to demonstrate how to build an InfiniteScrolling list view, with search and filters.  Use
 * it as a starting poing for a page.
 *
 * @param {number} activeTab
 *          The tab to show
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
 * @param {ListView~onActiveTabChange} onActiveTabChange
 *          Callback to be triggered when the active tab is changed.
 */
module.exports = React.createClass({
    /*
     * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by ReactDefaultMethods
     * utility.
     */
    propTypes: {
        activeTab: React.PropTypes.number.isRequired.affectsRendering,
        advancedSearch: React.PropTypes.bool.affectsRendering,
        filters: React.PropTypes.object.affectsRendering,
        batches: React.PropTypes.array.affectsRendering,
        hasNext: React.PropTypes.bool.affectsRendering,
        hasPrev: React.PropTypes.bool.affectsRendering
    },

    /*
     * When the component mounts, do a bunch of initialization
     */
    componentWillMount: function () {
        //Create an instance of the row type with the right accessory type
        this._contentType = <Row data-id={"row"} showEdit={true} />;

        //Instead of creating partials in the render function, which get computed on ever render, or
        //extracting the data-id of the target.  Created partials on mount and use them
        this._handleTextChange = this._handleFilter.bind(null, "text");
        this._handleOddFilterToggle = this._handleFilter.bind(null, "odd");
        this._handleEvenFilterToggle = this._handleFilter.bind(null, "even");
    },

    /*
     * Wrap the callback in a function so that we can create partials without having to worry about the
     * callback changing.
     */
    _handleFilter: function (name, value) {
        this.props.onSearchFilterChange(name, value);
    },

    /*
     * Only execute the scroll callback if the the position changes
     */
    _handleScroll: function (pos) {
        if (this.props.position.batchId !== pos.batchId || this.props.position.itemIndex !== pos.itemIndex) {
            this.props.onScrollPositionChange(pos);
        }
    },

    render: function () {
        return (
            <TabbedSections selectedIndex={this.props.activeTab} onValueChange={this.props.onActiveTabChange}>
                <div title="First Page">
                    <div className={classnames("search-bar", { expanded: this.props.advancedSearch })}>
                        <div>
                            <FormSearchBox
                                className="search-box"
                                onValueChange={this._handleTextChange}
                                queryString={this.props.filters.text} />
                            <CollapsibleLink data-id="narrow-by"
                                title="Narrow by"
                                onToggle={this.props.onSearchAdvancedToggle}
                                arrowPosition={CollapsibleLink.arrowPositions.RIGHT}
                                expanded={this.props.advancedSearch}
                                className="filter-by" />
                            <ModalButton ref="modal"
                                    activatorButtonLabel="Add Modal Button"
                                    modalTitle="Add Modal"
                                    className="add-modal"
                                    activatorButtonClassName="add" >
                                <div>
                                    Add Modal content
                                </div>
                            </ModalButton>
                        </div>
                        <div className="filters">
                            <FormCheckbox label="filter odd rows"
                                onValueChange={this._handleOddFilterToggle}
                                checked={this.props.filters.odd}
                                className="inline" />
                            <FormCheckbox label="filter even rows"
                                onValueChange={this._handleEvenFilterToggle}
                                checked={this.props.filters.even}
                                className="inline" />
                        </div>
                    </div>
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
                            <div>Hello</div>
                        </InfiniteScroll>
                    </div>
                </div>
                <div title="Second Page">
                    I'm a second page...
                </div>
                <div title="Third Page">
                    I'm a third page...
                </div>
            </TabbedSections>);
    }
});

/*
 * This component just serves as a proxy to choose the type of row to return.  This is obviously verbose so
 * that the code for each row type is not obfuscated.  This could easily be boiled down to one return statement
 */
var Row = React.createClass({
    render: function () {
        switch (this.props.type) {
            case "1 line with icon, no accessories":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"} />);
            case "2 lines with icon, no accessories":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        subtitle="this is a subtitle"
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"} />);
            case "1 line no icon, no accessories":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"} />);
            case "2 lines no icon, no accessories":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"} />);
            case "2 lines with icon, with status=good":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<RowAccessories.Status status="good" />}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"} />);
            case "2 lines with icon, with status=bad":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<RowAccessories.Status status="error" />}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"} />);
            case "2 lines with icon toggle on":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<Toggle toggled={true} />}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"} />);
            case "2 lines with icon toggle off":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<Toggle toggled={false} />}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"} />);
            case "2 lines with icon, with pill button":
                return (
                    <ExpandableRow
                        data-id={this.props["data-id"]}
                        showEdit={this.props.showEdit}
                        subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<RowAccessories.PillButton label="Pill Button" onClick={this.props.onClick} />}
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"} />);
            case "2 lines with icon, with all accessories":
                var accessories = (
                    <div>
                        <RowAccessories.PillButton label="Pill Button" />
                        <Toggle toggled={true} />
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
                        title={"Row number " + this.props["data-id"] + " (" + this.props.type + ")"} />);
        }
    }
});
