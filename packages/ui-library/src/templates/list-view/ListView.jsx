var React = require("re-react"),
    Toggle = require("../../components/forms/Toggle.jsx"),
    FormTextField = require("../../components/forms/form-text-field"),
    FormCheckbox = require("../../components/forms/FormCheckbox.jsx"),
    InfiniteScroll = require("../../components/list/InfiniteScroll.jsx"),
    TabbedSections = require("../../components/general/TabbedSections.jsx"),
    ExpandableRow = require("../../components/rows/expandable-row"),
    RowAccessories = require("../../components/rows/expandable-row/Accessories.jsx"),
    ModalButton = require("../../components/general/ModalButton.jsx"),
    classnames = require("classnames"),
    _ = require("underscore");

/**
 * @class ListView
 * @desc This is a template to demonstrate how to build an InfiniteScrolling list view, with search and filters.  Use
 * it as a starting poing for a page.
 *
 * @param {number} activeTab - The tab to show
 * @param {bool} advancedSearch - Whether to show the narrow by section
 * @param {object} position - The position of the Infinite Scroll.  Used to determine if the IS position has changed enough
 * to execute the onScrollPositionChange callback.
 * @param {function} onSearchToggleAdvanced - A callback executed when the advanced search is toggled
 * @param {function} onSearchFilterChange - A callback executed when the filter criteria is changed.  The signature is
 * function (filterName, filterValue).
 * @param {function} onActiveTabChange - A callback executed when the active tab is changed.
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
        this._contentType = <Row id={0} showEdit={true} />;

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
            <TabbedSections selectedIndex={this.props.activeTab} onSectionChange={this.props.onActiveTabChange}>
                <div title="First Page">
                    <div className={classnames("search-bar", { expanded: this.props.advancedSearch })}>
                        <div>
                            <FormTextField controlled={true}
                                onValueChange={this._handleTextChange}
                                value={this.props.filters.text}
                                className="search" />

                            <span data-id="narrow-by"
                                className="filter-by"
                                onClick={this.props.onSearchToggleAdvanced}>Narrow By</span>

                            <ModalButton ref="modal"
                                    value="Add Modal Button"
                                    modalTitle="Add Modal"
                                    containerStyle="add-modal" >
                                Add Modal content
                            </ModalButton>
                        </div>
                        <div className="filters">
                            <FormCheckbox label="filter odd rows"
                                onValueChange={this._handleOddFilterToggle}
                                checked={this.props.filters.odd} />
                            <FormCheckbox label="filter even rows"
                                onValueChange={this._handleEvenFilterToggle}
                                checked={this.props.filters.even} />
                        </div>
                    </div>
                    {
                      /*
                       * Hardcoded height just to demonstrate the infinite scroll
                       */
                    }
                    <div className="result-set" style={{ height: 500 }}>
                        <InfiniteScroll contentType={this._contentType}
                                initialItem={this.props.position}
                                onScroll={this._handleScroll}
                                batches={this.props.batches}
                                hasNext={this.props.hasNext}
                                hasPrev={this.props.hasPrev}
                                loadNext={_.noop}
                                loadPrev={_.noop} >
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
                    <ExpandableRow {...this.props}
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        title={"Row number " + this.props.id + " (" + this.props.type + ")"} />);
            case "2 lines with icon, no accessories":
                return (
                    <ExpandableRow {...this.props}
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        subtitle="this is a subtitle"
                        title={"Row number " + this.props.id + " (" + this.props.type + ")"} />);
            case "1 line no icon, no accessories":
                return (
                    <ExpandableRow {...this.props}
                        title={"Row number " + this.props.id + " (" + this.props.type + ")"} />);
            case "2 lines no icon, no accessories":
                return (
                    <ExpandableRow {...this.props} subtitle="this is a subtitle"
                        title={"Row number " + this.props.id + " (" + this.props.type + ")"} />);
            case "2 lines with icon, with status=good":
                return (
                    <ExpandableRow {...this.props} subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<RowAccessories.Status status="good" />}
                        title={"Row number " + this.props.id + " (" + this.props.type + ")"} />);
            case "2 lines with icon, with status=bad":
                return (
                    <ExpandableRow {...this.props} subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<RowAccessories.Status status="failure" />}
                        title={"Row number " + this.props.id + " (" + this.props.type + ")"} />);
            case "2 lines with icon toggle on":
                return (
                    <ExpandableRow {...this.props} subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<Toggle toggled={true} />}
                        title={"Row number " + this.props.id + " (" + this.props.type + ")"} />);
            case "2 lines with icon toggle off":
                return (
                    <ExpandableRow {...this.props} subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<Toggle toggled={false} />}
                        title={"Row number " + this.props.id + " (" + this.props.type + ")"} />);
            case "2 lines with icon, with pill button":
                return (
                    <ExpandableRow {...this.props} subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={<RowAccessories.PillButton label="Pill Button" onClick={this.props.onClick} />}
                        title={"Row number " + this.props.id + " (" + this.props.type + ")"} />);
            case "2 lines with icon, with all accessories":
                var accessories = (
                    <div>
                        <RowAccessories.PillButton label="Pill Button" />
                        <Toggle toggled={true} />
                        <RowAccessories.Status status="good" />
                        <RowAccessories.Status status="failure" />
                        <RowAccessories.Status status="warning" />
                    </div>);

                return (
                    <ExpandableRow {...this.props} subtitle="this is a subtitle"
                        image="https://media1.giphy.com/media/EldfH1VJdbrwY/200_s.gif"
                        rowAccessories={accessories}
                        title={"Row number " + this.props.id + " (" + this.props.type + ")"} />);
        }
    }
});
