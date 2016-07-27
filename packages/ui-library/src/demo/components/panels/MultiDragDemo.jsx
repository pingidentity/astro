var React = require("react"),
    Redux = require("redux"),
    deepClone = require("clone"),
    FormLabel = require("../../../components/forms/FormLabel.jsx"),
    FormRadioGroup = require("../../../components/forms/FormRadioGroup.jsx"),
    MultiDrag = require("../../../components/panels/multi-drag"),
    Messages = require("../../../components/general/messages/"),
    classnames = require("classnames"),
    update = require("re-mutable"),
    keyMirror = require("fbjs/lib/keyMirror"),
    data = require("./MultiDragData.js");

/**
* @name MultiDragDemo
* @memberof MultiDrag
* @desc A demo for MultiDrag
*/

var Types = keyMirror({
    GRID_DEMO_SET: null,
    GRID_DEMO_TOGGLE_ICON: null
});

var Actions = {};

Actions.set = function (path, value) {
    return {
        type: Types.GRID_DEMO_SET,
        path: path,
        value: value
    };
};

Actions.setSearch = Actions.set.bind(null, ["search"]);
Actions.setStyle = Actions.set.bind(null, ["style"]);

function DemoReducer (state, action) {
    switch (action.type) {
        case Types.GRID_DEMO_SET:
            return update.set(state, action.path, action.value);
        default:
            return state || { search: "all", style: "both" };
    }
}

/*
 * An example Row component implementation.  Since the MultiDrag component only cares about the drag/drop
 * interaction, we're free to mark up each individual row as we please.  In this case, we have implemented
 * a row which has Plus/Remove buttons
 */
var Row = React.createClass({
    _handleRemove: function () {
        this.props.onRemove({ column: this.props.column, index: this.props.index });
    },

    _handleAdd: function () {
        this.props.onAdd({ column: this.props.column, index: this.props.index });
    },

    _getButton: function () {
        if (this.props.column === 0) {
            return <button className="inline plus" data-id="row-button-add" onClick={this._handleAdd} type="button" />;
        }

        return (<button className="inline remove"
                    data-id="row-button-remove"
                    onClick={this._handleRemove}
                    type="button" />
        );
    },

    render: function () {
        var hasIcon = this.props.style !== "text";
        var hasText = this.props.style !== "icon";

        return (
            <div className={classnames("item", { preview: this.props.preview, "with-icon": hasIcon })}>
                <span className="icon-grip"></span>
                { hasIcon &&
                    <div className="row-icon" data-id="row-icon"
                        style={{ backgroundImage: "url(" + this.props.icon + ")" }} />
                }
                { hasText &&
                    <span className="name" data-id="row-name">{this.props.name}</span>
                }
                {this._getButton()}
            </div>);
    }
});

/*
 * Demo component for the MultiDrag component.  It uses the Row type above to tell the MultiDrag component
 * the type for each row.
 */
var MultiDragDemo = React.createClass({
    componentWillMount: function () {
        this.actions = Redux.bindActionCreators(MultiDrag.Actions, this.props.store.dispatch);
        this.messageActions = Redux.bindActionCreators(Messages.Actions, this.props.store.dispatch);
        this.demoActions = Redux.bindActionCreators(Actions, this.props.store.dispatch);

        //initialize the multi drag data
        this.actions.init(data.columns);
        this.rowsAvailableStateless = true;
        this.rowsAvailableStateful = true;
    },

    _handleDemoTypeValueChange: function (value) {
        this.setState({
            demoType: value
        });
    },

    /*
     * Callbacks passed to the Row component instance.  Since the logic of what happens when clicking add/remove
     * is up to the individual application, it's outside the realm of the MultiDrag
     */
    _handleAddStateless: function (from) {
        this._handleDropStateless({ from: from, to: { column: 1, index: 0 } });
    },

    _handleRemoveStateless: function (from) {
        this._handleDropStateless({ from: from, to: { column: 0, index: 0 } });
    },

    _getStatefulRef: function () {
        //MultiDragStateful ref is nested under the dragDropContext child ref
        return this.refs["multi-drag-demo-stateful"].refs.child.refs.MultiDragStateful;
    },

    _handleAddStateful: function (from) {
        this._getStatefulRef()._handleDrop({ from: from, to: { column: 1, index: 0 } });
    },

    _handleRemoveStateful: function (from) {
        this._getStatefulRef()._handleDrop({ from: from, to: { column: 0, index: 0 } });
    },

    /*
     * Callbacks for different events on the MultiDrag
     */
    _handleDragStateless: function (desc) {
        this.actions.placeholder(desc.to);
    },

    _handleDragStateful: function (desc) {
        console.log("Drag from column and index: " + desc.from.column + ", " + desc.from.index +
            " to column and index: " + desc.to.column + ", " + desc.to.index);
    },

    /*
     * When a drop event happens, the MultiDragStateless (controlled=true) component simply makes a callback describing
     * what happend. It's up to the user to decide what to do with that operation.
     *
     * Where it gets hairy is if a drop is happening to and from a filtered list.
     * The to/from indexes that the component reports wont accurately describe what the underlying move in the
     * unfiltered list should look like. We have to do some logic to covert back the indexes
     * relative to the unfiltered rows.
     */
    _handleDropStateless: function (desc) {
        var convertedDesc = MultiDrag.convertFilteredIndexes(this.props.drag.columns, desc);

        this.actions.move(
            { column: desc.from.column, index: convertedDesc.from },
            { column: desc.to.column, index: convertedDesc.to });
    },

    _handleDropStateful: function (desc) {
        console.log("Drop from column and index: " + desc.from.column + ", " + desc.from.index +
            " to column and index: " + desc.to.column + ", " + desc.to.index);
    },

    _handleCancelStateless: function () {
        this.actions.clearPlaceholder();
    },

    _handleCancelStateful: function () {
        console.log("Cancel called");
    },

    _handleSearchStateless: function (column, str) {
        /*
         * If the search should be on the server side, instead of calling this action, we would call an action
         * which requests data from the server but with the given filter
         */
        this.actions.filterField("name", column, str);
    },

    _handleSearchStateful: function (column, str) {
        console.log("Search column " + column + " for value " + str);
    },

    _handleScrolledToBottomStateless: function (column) {
        if (column === 0 && this.rowsAvailableStateless) {
            this.rowsAvailableStateless = false;
            this.messageActions.addMessage("loading more data...");

            setTimeout(function () {
                this.actions.append(0, data.moreRows);
            }.bind(this), 500);
        }
    },

    _handleScrollToBottomStateful: function (column) {
        if (column === 0 && this.rowsAvailableStateful) {
            this.rowsAvailableStateful = false;
            this.messageActions.addMessage("loading more data...");

            setTimeout(function () {
                var nextColumns = deepClone(this._getStatefulRef().state.columns);
                nextColumns[0].rows = nextColumns[0].rows.concat(data.moreRows);
                this.setState({ columns: nextColumns });
            }.bind(this), 500);
        }
    },

    _handleScrolledToTop: function (column) {
        var msg = "onScrolledToTop called for column " + column + " , could use this to load more data";
        this.messageActions.addMessage(msg);
    },

    renderOptions: function () {
        return (
            <div className="demo-options">
                <div>
                    <FormLabel value="Search options" />
                    <FormRadioGroup
                        onValueChange={this.demoActions.setSearch}
                        selected={this.props.demo.search}
                        groupName="search-opts"
                        stacked={false}
                        items={[
                            { id: "none", name: "none" },
                            { id: "first", name: "first column only" },
                            { id: "all", name: "all" }
                        ]} />
                </div>
                <div>
                    <FormLabel value="row options" />
                    <FormRadioGroup
                        onValueChange={this.demoActions.setStyle}
                        selected={this.props.demo.style}
                        groupName="row-opts"
                        stacked={false}
                        items={[
                            { id: "icon", name: "icon only" },
                            { id: "text", name: "text only" },
                            { id: "both", name: "icon + text" }
                        ]} />
                </div>
            </div>);
    },

    getInitialState: function () {
        return {
            demoType: "STATEFUL",
            columns: data.columns //used for stateful (controlled=false) demo
        };
    },

    render: function () {
        var contentTypeStateless = (
            <Row onRemove={this._handleRemoveStateless}
                    onAdd={this._handleAddStateless}
                    style={this.props.demo.style} />);

        var contentTypeStateful = (
            <Row onRemove={this._handleRemoveStateful}
                    onAdd={this._handleAddStateful}
                    style={this.props.demo.style} />);

        return (
            <div className="multidrag-demo" data-id="multidragDemoDiv">
                <Messages messages={this.props.messages.messages} onRemoveMessage={this.messageActions.removeAt} />

                <FormLabel>Select the type of demo</FormLabel>
                <FormRadioGroup stacked={false}
                        groupName="stateless-stateful-choice"
                        selected={this.state.demoType}
                        onValueChange={this._handleDemoTypeValueChange}
                        items={[
                            { id: "STATELESS", name: "Stateless demo" },
                            { id: "STATEFUL", name: "Stateful demo" }
                        ]} />

                <br />
                <hr />
                <br />

                {this.renderOptions()}

                {this.state.demoType === "STATELESS" &&
                    <div>
                        <h2>Stateless (controlled=true)</h2>
                        <MultiDrag
                                controlled={true}
                                showSearchOnAllColumns={this.props.demo.search === "all"}
                                showSearch={this.props.demo.search === "first"}
                                onSearch={this._handleSearchStateless}
                                columns={this.props.drag.columns}
                                previewMove={this.props.drag.placeholder}
                                onScrolledToTop={this._handleScrolledToTop}
                                onScrolledToBottom={this._handleScrolledToBottomStateless}
                                onCancel={this._handleCancelStateless}
                                onDrop={this._handleDropStateless}
                                onDrag={this._handleDragStateless}
                                contentType={contentTypeStateless} />
                    </div>
                }
                {
                    /*
                     * The Stateful MultiDrag does not use the MultiDrag Reducer.
                     */
                }
                {this.state.demoType === "STATEFUL" &&
                    <div>
                        <h2>Stateful (controlled=false)</h2>
                        <MultiDrag ref="multi-drag-demo-stateful"
                                showSearchOnAllColumns={this.props.demo.search === "all"}
                                showSearch={this.props.demo.search === "first"}
                                onSearch={this._handleSearchStateful}
                                columns={this.state.columns}
                                onScrolledToTop={this._handleScrolledToTop}
                                onScrolledToBottom={this._handleScrollToBottomStateful}
                                onCancel={this._handleCancelStateful}
                                onDrop={this._handleDropStateful}
                                onDrag={this._handleDragStateful}
                                contentType={contentTypeStateful} />
                    </div>
                }
          </div>);
    }
});

/*
 * Expose the reducer just to get it tied to the local store
 */
MultiDragDemo.Reducer = Redux.combineReducers({
    drag: MultiDrag.Reducer,
    messages: Messages.Reducer,
    demo: DemoReducer
});

module.exports = MultiDragDemo;
