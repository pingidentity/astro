var React = require("react"),
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
 * it as a starting poing for a page.  For the purposes of this demonstration, the view is treated like an app and
 * connected directly to the store, but under normal circumstances, the store would be connected to the app, and the app
 * would inject the appropriate branch of state into the view
 * @param {object} actions - For convenience we're passing all actions associated with this component, bound to the dispatcher
 * @param {number} activeTab - The tab to show
 * @param {bool} advancedSearch - Whether to show the narrow by section
 * @
 */
module.exports = React.createClass({
    componentWillMount: function () {
        this._contentType = <ExpandableRow id={0} showEdit={true} rowAccessories={<RowAccessories />} />;
    },

    _handleToggleSearchBar: function () {
        this.props.actions.setExpandedSearch(!this.props.advancedSearch);
    },

    _handleTextFilter: function (value) {
        this.props.actions.setFilter("text", value);
    },

    _handleFilter: function (e) {
        this.props.actions.setFilter(e.target.getAttribute("data-id"), !!e.target.checked);
    },

    render: function () {
        return (
            <TabbedSections selectedIndex={this.props.activeTab} onSectionChange={this.props.actions.setActiveTab}>
                <div title="First Page">
                    <div className={classnames("search-bar", { expanded: this.props.advancedSearch })}>
                        <div>
                            <FormTextField controlled={true}
                                onValueChange={this._handleTextFilter}
                                value={this.props.filters.text}
                                className="search" />

                            <span data-id="narrow-by"
                                className="filter-by"
                                onClick={this._handleToggleSearchBar}>Narrow By</span>
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
                    <div className="result-set">
                        <InfiniteScroll contentType={this._contentType}
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
