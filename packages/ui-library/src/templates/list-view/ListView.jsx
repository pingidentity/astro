var React = require("../../util/ReactWithDefaultMethods.js"),
    Toggle = require("../../components/forms/Toggle.jsx"),
    FormTextField = require("../../components/forms/form-text-field"),
    FormCheckbox = require("../../components/forms/FormCheckbox.jsx"),
    InfiniteScroll = require("../../components/list/InfiniteScroll.jsx"),
    TabbedSections = require("../../components/general/TabbedSections.jsx"),
    ExpandableRow = require("../../components/rows/ExpandableRow.jsx"),
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

    componentWillMount: function () {
        this._contentType = <ExpandableRow id={0} showEdit={true} rowAccessories={<RowAccessories />} />;
    },

    _handleTextFilter: function (value) {
        this.props.onSearchFilterChange("text", value);
    },

    _handleFilter: function (e) {
        this.props.onSearchFilterChange(e.target.getAttribute("data-id"), !!e.target.checked);
    },

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
                                onValueChange={this.props.onSearchQueryChange}
                                value={this.props.filters.text}
                                className="search" />

                            <span data-id="narrow-by"
                                className="filter-by"
                                onClick={this.props.onSearchToggleAdvanced}>Narrow By</span>
                        </div>
                        <div className="filters">
                            <FormCheckbox label="filter odd rows"
                                onChange={this._handleFilter}
                                id="odd"
                                checked={this.props.filters.odd} />
                            <FormCheckbox label="filter even rows"
                                onChange={this._handleFilter}
                                id="even"
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

var RowAccessories = React.createClass({
    render: function () {
        return (
            <div>
                <a>Link</a>
                <input type="button" className="button inline" value="Inline Button" />
                <Toggle />
                <div className="status good"></div>
            </div>);
    }
});
