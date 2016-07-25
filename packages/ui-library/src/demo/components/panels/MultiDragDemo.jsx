var React = require("react"),
    Redux = require("redux"),
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
    _onRemove: function () {
        this.props.onRemove({ column: this.props.column, index: this.props.index });
    },

    _onAdd: function () {
        this.props.onAdd({ column: this.props.column, index: this.props.index });
    },

    _getButton: function () {
        if (this.props.column === 0) {
            return <button className="inline plus" data-id="row-button-add" onClick={this._onAdd} type="button" />;
        }

        return <button className="inline remove" data-id="row-button-remove" onClick={this._onRemove} type="button" />;
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
        this.rowsAvailable = true;
    },

    /*
     * Callbacks passed to the Row component instance.  Since the logic of what happens when clicking add/remove
     * is up to the individual application, it's outside the realm of the MultiDrag
     */
    onAdd: function (from) {
        this.onDrop({ from: from, to: { column: 1, index: 0 } });
    },

    onRemove: function (from) {
        this.onDrop({ from: from, to: { column: 0, index: 0 } });
    },

    /*
     * Callbacks for different events on the MultiDrag
     */
    onDrag: function (desc) {
        this.actions.placeholder(desc.to);
    },

    /*
     * When a drop event happens, the MultiDrag component simply makes a callback describing what happend.  It's up
     * to the user to decide what to do with that operation.  Where it gets hairy is if a drop is happening to and from
     * a filtered list.  The to/from indexes that the component reports wont accurately describe what the underlying
     * move in the unfiltered list should look like.  We have to do some logic to covert back the indexes relative to
     * the unfiltered rows.
     */
    onDrop: function (desc) {
        //find the index in the unfiltered columns
        var from = this.props.drag.columns[desc.from.column].rows.indexOf(
            this.props.drag.columns[desc.from.column].filteredRows[desc.from.index]);

        var to = desc.to.index >= this.props.drag.columns[desc.to.column].filteredRows.length
            /* if an item is being dragged to the end of the list, append it to the end of the unfiltered list */
            ? this.props.drag.columns[desc.to.column].rows.length
            : this.props.drag.columns[desc.to.column].rows.indexOf(
                  this.props.drag.columns[desc.to.column].filteredRows[desc.to.index]);

        this.actions.move(
            { column: desc.from.column, index: from },
            { column: desc.to.column, index: to });
    },

    onCancel: function () {
        this.actions.clearPlaceholder();
    },

    onSearch: function (column, str) {
        /*
         * If the search should be on the server side, instead of calling this action, we would call an action
         * which requests data from the server but with the given filter
         */
        this.actions.filterField("name", column, str);
    },

    onScrolledToBottom: function (column) {
        if (column === 0 && this.rowsAvailable) {
            this.rowsAvailable = false;
            this.messageActions.addMessage("loading more data...");

            setTimeout(function () {
                this.actions.append(0, data.moreRows);
            }.bind(this), 500);
        }
    },

    onScrolledToTop: function (column) {
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

    render: function () {
        var contentType = <Row onRemove={this.onRemove} onAdd={this.onAdd} style={this.props.demo.style} />;

        return (
            <div className="multidrag-demo" data-id="multidragDemoDiv">
                <Messages messages={this.props.messages.messages} onRemoveMessage={this.messageActions.removeAt} />

                {this.renderOptions()}

                <MultiDrag
                    showSearchOnAllColumns={this.props.demo.search === "all"}
                    showSearch={this.props.demo.search === "first"}
                    onSearch={this.onSearch}
                    columns={this.props.drag.columns}
                    previewMove={this.props.drag.placeholder}
                    onScrolledToTop={this.onScrolledToTop}
                    onScrolledToBottom={this.onScrolledToBottom}
                    onCancel={this.onCancel}
                    onDrop={this.onDrop}
                    onDrag={this.onDrag}
                    contentType={contentType} />
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
