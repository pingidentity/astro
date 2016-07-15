var React = require("re-react"),
    Genres = require("../mocks").Genres,
    Statuses = require("../mocks").StatusEnum,
    FormTextField = require("ui-library/src/components/forms/form-text-field"),
    FormCheckbox = require("ui-library/src/components/forms/FormCheckbox.jsx"),
    InfiniteScroll = require("ui-library/src/components/list/InfiniteScroll.jsx"),
    TabbedSections = require("ui-library/src/components/general/TabbedSections.jsx"),
    ExpandableRow = require("ui-library/src/components/rows/expandable-row"),
    PropsToUrlWatcher = require("ui-library/src/components/offscreen/PropsToUrlWatcher.jsx"),
    Section = require("ui-library/src/components/general/Section.jsx"),
    DetailsTooltip = require("ui-library/src/components/tooltips/DetailsTooltip.jsx"),
    SelectionList = require("ui-library/src/components/forms/selection-list"),
    ShowsAddWizardView = require("../ShowsAddWizard.jsx"),
    ShowsEditView = require("../ShowsEdit.jsx"),
    classnames = require("classnames"),
    _ = require("underscore");

var Shows = React.createClass({
    /*
     * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by re-react.
     */
    propTypes: {
        activeTab: React.PropTypes.number.isRequired.affectsRendering,
        advancedSearch: React.PropTypes.bool.affectsRendering,
        filters: React.PropTypes.object.affectsRendering,
        batches: React.PropTypes.array.affectsRendering,
        hasNext: React.PropTypes.bool.affectsRendering,
        hasPrev: React.PropTypes.bool.affectsRendering,
        wizard: React.PropTypes.object.affectsRendering,
        addWizardFields: React.PropTypes.object.affectsRendering
    },

    /*
     * When the component mounts, do a bunch of initialization
     */
    componentWillMount: function () {
        //Create an instance of the row type with the right accessory type and to pass in default props
        this._contentType = <ShowRow id={0} showEdit={true} onShowsEdit={this.props.onShowsEdit} />;

        //Create the partials here for better performance, instead of binding on every render
        this._handleTextValueChange = this._handleFilter.bind(null, "text");
        this._handleGenreFilterToggle = {};

        this._genreFilters = [];
        this._selectedGenreFilters = [];
        for (var genre in Genres) {
            this._handleGenreFilterToggle[genre] = this._handleFilter.bind(null, genre);

            //Initialize items for filter within SelectionList
            this._genreFilters.push({ id: genre, name: Genres[genre].title });
        }

        for (var status in Statuses) {
            this._handleGenreFilterToggle[status] = this._handleFilter.bind(null, status);
        }
    },

    /*
    * Handle SelectionList genre filter changes.
    */
    _handleGenreFiltersValueChange: function (selectedGenreFilters) {
        this._genreFilters.forEach(function (genreFilter) {
            this._handleGenreFilterToggle[genreFilter.id](selectedGenreFilters.indexOf(genreFilter.id) !== -1);
        }.bind(this));

        this._selectedGenreFilters = selectedGenreFilters;
    },

    /*
     * Wrap the callback in a function so that we can create partials without having to worry about the
     * callback changing.
     */
    _handleFilter: function (name, value) {
        this.props.onSearchFilterValueChange(name, value);
    },

    /*
     * Only execute the scroll callback if the the position changes
     */
    _handleScroll: function (pos) {
        if (this.props.position.batchId !== pos.batchId || this.props.position.itemIndex !== pos.itemIndex) {
            this.props.onScrollPositionValueChange(pos);
        }
    },

    /*
    * Generate shows filters.
    */
    _getShowsFilters: function () {
        var filters = [];

        //Status filters
        for (var status in Statuses) {
            filters.push(
                <FormCheckbox key={status + "-filter"}
                        data-id={status + "-filter"}
                        label={Statuses[status]}
                        onValueChange={this._handleGenreFilterToggle[status]}
                        checked={this.props.filters[status]} />
            );
        }
        //Genre filters
        filters.push(
            <DetailsTooltip key="genre-filters-container"
                    data-id="genre-filters-dialog"
                    className="input-selection-list-tooltip"
                    positionClassName="bottom right"
                    label="Genres"
                    showClose={false}
                    controlled={false} >
                <SelectionList data-id="genre-filters"
                        type={SelectionList.ListType.MULTI}
                        items={this._genreFilters}
                        selectedItemIds={this._selectedGenreFilters}
                        showSearchBox={true}
                        onValueChange={this._handleGenreFiltersValueChange} />
            </DetailsTooltip>
        );
        return filters;
    },

    /*
    * Generate genre description sections.
    */
    _getGenreDescriptions: function () {
        return Object.keys(Genres).map(function (genre) {
            return (
                <Section key={genre + "-description"}
                        data-id={genre + "-description"}
                        title={Genres[genre].title}
                        controlled={false} >
                    <div className="input-row">
                        {Genres[genre].description}
                    </div>
                </Section>
            );
        });
    },

    render: function () {
        return (
            <TabbedSections selectedIndex={this.props.activeTab} onValueChange={this.props.onActiveTabValueChange}>
                <div title="Shows">
                    <div className={classnames("search-bar", { expanded: this.props.advancedSearch })}>
                        <div>
                            <FormTextField controlled={true}
                                    onValueChange={this._handleTextValueChange}
                                    value={this.props.filters.text}
                                    className="search" />

                            <span data-id="narrow-by"
                                    className="filter-by"
                                    onClick={this.props.onSearchToggleAdvanced}>Narrow By</span>
                      
                            <ShowsAddWizardView {...this.props} genres={Genres} statuses={Statuses} />
                        </div>
                        <div className="filters">
                            {this._getShowsFilters()}
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
                                onLoadNext={_.noop}
                                onLoadPrev={_.noop} >
                            <div>No shows match the filters</div>
                        </InfiniteScroll>
                    </div>
                </div>
                <div title="Genres">
                    <p>
                        These are the genres you can asign to a show. Click on one to view its description.
                    </p>
                    {this._getGenreDescriptions()}
                </div>
            </TabbedSections>);
    }
});

/*
 * This component just serves as a proxy to choose the type of Show row to return.
 */
var ShowRow = React.createClass({
    /*
    * When the component mounts, do a bunch of initialization
    */
    componentWillMount: function () {
        //Create the partials here for better performance, instead of binding on every render
        this._handleEditButtonClick = this.props.onShowsEdit.bind(null, this.props.id);
    },

    /*
    * Generate the comma separeated genre list subtitle
    */
    _getGenreTitles: function () {
        return this.props.genres.map(function (genre) {
            return genre.title;
        }).join(", ");
    },

    render: function () {
        return (
            <ExpandableRow data-id={this.props.id}
                    title={this.props.title}
                    subtitle={this._getGenreTitles()}
                    onEditButtonClick={this._handleEditButtonClick}
                    showDelete={false} >
                <div className="data">
                    <div className="data-item">
                        <label>Status</label>
                        <span>{this.props.status}</span>
                    </div>
                    <div className="data-item">
                        <label>Summary</label>
                        <span>{this.props.summary}</span>
                    </div>
                </div>
            </ExpandableRow>
        );
    }
});

/*
* This component creates the ShowsView
*/
var ShowsView = React.createClass({
    /*
    * Handle toggling the advanced search bar
    */
    _handleSearchBarToggle: function () {
        this.props.onShowsSearchAdvancedToggle(!this.props.shows.advancedSearch);
    },

    /*
    * Handle changing the search filters
    */
    _handleSearchFilterValueChange: function (name, value) {
        this.props.onShowsSearchFilterValueChange(name, value);
    },

    render: function () {
        var watch = _.pick(this.props.shows, "position", "activeTab", "filters", "advancedSearch");
        var showsViewProps = _.pick(this.props, "wizard", "onWizardReset", "onWizardNext", "onWizardEdit",
            "onWizardChoose", "onShowsValueChange", "onShowsAddWizardReset", "onShowsAdd", "onShowsEdit");
        
        return (
            <div>
                {_.isEmpty(this.props.shows.editingRowInputs)
                    ? <Shows {...this.props.shows} {...showsViewProps}
                            onSearchToggleAdvanced={this._handleSearchBarToggle}
                            onSearchFilterValueChange={this._handleSearchFilterValueChange}
                            onScrollPositionValueChange={this.props.onShowsScrollPositionValueChange}
                            onActiveTabValueChange={this.props.onShowsActiveTabValueChange} />
                    : <ShowsEditView
                            genres={Genres}
                            statuses={Statuses}
                            editingRowInputs={this.props.shows.editingRowInputs}
                            editingRowErrors={this.props.shows.editingRowErrors}
                            onShowsValueChange={this.props.onShowsValueChange}
                            onShowsEditCancel={this.props.onShowsEditCancel}
                            onShowsEditSave={this.props.onShowsEditSave} />
                }
                {
                    /*
                    * Because the App also writes the url, the open/selected nodes need to be passed in.
                    */
                }
                <PropsToUrlWatcher ignoreFalse={true}
                        location={this.props.location}
                        onReplaceUrl={this.props.onReplaceUrl}
                        watch={_.defaults(watch, this.props.watch)} />
            </div>
        );
    }
});

module.exports = ShowsView;
