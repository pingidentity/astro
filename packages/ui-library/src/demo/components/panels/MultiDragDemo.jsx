var React = require("react"),
    Redux = require("redux"),
    deepClone = require("clone"),
    FormLabel = require("../../../components/forms/FormLabel"),
    FormRadioGroup = require("../../../components/forms/FormRadioGroup"),
    Layout = require("../../../components/general/ColumnLayout"),
    MultiDrag = require("../../../components/panels/multi-drag"),
    Messages = require("../../../components/general/messages/"),
    Toggle = require("../../../components/forms/form-toggle"),
    classnames = require("classnames"),
    update = require("re-mutable"),
    keyMirror = require("fbjs/lib/keyMirror"),
    data = require("./MultiDragData.js"),
    dragScroll = require("../../../util/dragScroll");

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
            return state || { search: "all", style: "none" };
    }
}

/*
 * An example Row component implementation.  Since the MultiDrag component only cares about the drag/drop
 * interaction, we're free to mark up each individual row as we please.  In this case, we have implemented
 * a row which has Plus/Remove buttons
 */
class Row extends React.Component {
    _handleRemove = () => {
        this.props.onRemove({ column: this.props.column, index: this.props.index });
    };

    _handleAdd = () => {
        this.props.onAdd({ column: this.props.column, index: this.props.index });
    };

    _getButton = () => {
        if (this.props.column === 0) {
            return <button className="inline plus" data-id="row-button-add" onClick={this._handleAdd} type="button" />;
        }

        return (<button className="inline remove"
                    data-id="row-button-remove"
                    onClick={this._handleRemove}
                    type="button" />
        );
    };

    render() {
        var hasImage = this.props.style === "image";
        var hasIcon = this.props.style === "icon";
        var hasCount = this.props.style === "count";

        return (
            <div className={classnames(
                    "item",
                    { preview: this.props.preview,
                    "item-decoration": hasImage || hasIcon || hasCount
                })} data-id={this.props["data-id"]}>
                <span className="icon-grip"></span>
                { hasImage &&
                    <div className="item-image" data-id="row-image"
                        style={{ backgroundImage: "url(" + this.props.icon + ")" }} />
                }
                { hasIcon &&
                    <span className="item-icon icon-cog" data-id="row-icon" />
                }
                { hasCount &&
                    <span className="item-count count" data-id="row-count">
                        {Math.round(Math.random() * 10)}
                    </span>
                }
                <span className="name" data-id="row-name">{this.props.name}</span>
                {this._getButton()}
            </div>);
    }
}

/*
 * Demo component for the MultiDrag component.  It uses the Row type above to tell the MultiDrag component
 * the type for each row.
 */
class MultiDragDemo extends React.Component {
    state = {
        demoType: "STATELESS",
        columns: data.columns, // used for stateful (stateless=false) demo
        disabled: false
    };

    componentWillMount() {
        this.actions = Redux.bindActionCreators(MultiDrag.Actions, this.props.store.dispatch);
        this.messageActions = Redux.bindActionCreators(Messages.Actions, this.props.store.dispatch);
        this.demoActions = Redux.bindActionCreators(Actions, this.props.store.dispatch);

        // initialize the multi drag data
        this.actions.init(data.columns);
        this.rowsAvailableStateless = true;
        this.rowsAvailableStateful = true;
    }

    _handleDemoTypeValueChange = (value) => {
        this.setState({
            demoType: value
        });
    };

    _handleDisabledToggle = () => {
        this.setState({
            disabled: !this.state.disabled
        });
    };

    /*
     * Callbacks passed to the Row component instance.  Since the logic of what happens when clicking add/remove
     * is up to the individual application, it's outside the realm of the MultiDrag
     */
    _handleAddStateless = (from) => {
        this._handleDropStateless({ from: from, to: { column: 1, index: 0 } });
    };

    _handleRemoveStateless = (from) => {
        this._handleDropStateless({ from: from, to: { column: 0, index: 0 } });
    };

    _getStatefulRef = () => {
        //MultiDragStateful ref is nested under the dragDropContext child ref
        return this.refs["multi-drag-demo-stateful"].refs.child.refs.MultiDragStateful;
    };

    _handleAddStateful = (from) => {
        this._getStatefulRef()._handleDrop({ from: from, to: { column: 1, index: 0 } });
    };

    _handleRemoveStateful = (from) => {
        this._getStatefulRef()._handleDrop({ from: from, to: { column: 0, index: 0 } });
    };

    /*
     * Callbacks for different events on the MultiDrag
     */
    _handleDragStateless = (desc) => {
        this.actions.placeholder(desc.to);
    };

    _handleDragStateful = (desc) => {
        console.log("Drag from column and index: " + desc.from.column + ", " + desc.from.index +
            " to column and index: " + desc.to.column + ", " + desc.to.index);
    };

    /*
     * When a drop event happens, the MultiDragStateless (stateless=true) component simply makes a callback describing
     * what happend. It's up to the user to decide what to do with that operation.
     *
     * Where it gets hairy is if a drop is happening to and from a filtered list.
     * The to/from indexes that the component reports wont accurately describe what the underlying move in the
     * unfiltered list should look like. We have to do some logic to covert back the indexes
     * relative to the unfiltered rows.
     */
    _handleDropStateless = (desc) => {
        var convertedDesc = MultiDrag.convertFilteredIndexes(this.props.drag.columns, desc);

        this.actions.move(
            { column: desc.from.column, index: convertedDesc.from },
            { column: desc.to.column, index: convertedDesc.to });
    };

    _handleDropStateful = (desc) => {
        console.log("Drop from column and index: " + desc.from.column + ", " + desc.from.index +
            " to column and index: " + desc.to.column + ", " + desc.to.index);
    };

    _handleCancelStateless = () => {
        this.actions.clearPlaceholder();
    };

    _handleCancelStateful = () => {
        console.log("Cancel called");
    };

    _handleSearchStateless = (column, str) => {
        /*
         * If the search should be on the server side, instead of calling this action, we would call an action
         * which requests data from the server but with the given filter
         */
        this.actions.filterField("name", column, str);
    };

    _handleSearchStateful = (column, str) => {
        if (str !== "") {
            console.log("Search column " + column + " for value " + str);
        }
    };

    _handleScrolledToBottomStateless = (column) => {
        if (column === 0 && this.rowsAvailableStateless) {
            this.rowsAvailableStateless = false;
            this.messageActions.addMessage("loading more data...");

            setTimeout(function () {
                this.actions.append(0, data.moreRows);
            }.bind(this), 500);
        }
    };

    _handleScrollToBottomStateful = (column) => {
        if (column === 0 && this.rowsAvailableStateful) {
            this.rowsAvailableStateful = false;
            this.messageActions.addMessage("loading more data...");

            setTimeout(function () {
                var nextColumns = deepClone(this._getStatefulRef().state.columns);
                nextColumns[0].rows = nextColumns[0].rows.concat(data.moreRows);
                this.setState({ columns: nextColumns });
            }.bind(this), 500);
        }
    };

    _handleScrolledToTop = (column) => {
        var msg = "onScrolledToTop called for column " + column + " , could use this to load more data";
        this.messageActions.addMessage(msg);
    };

    render() {
        var contentTypeStateless = (
            <Row
                onRemove={this._handleRemoveStateless}
                onAdd={this._handleAddStateless}
                style={this.props.demo.style}
            />
        );
        var contentTypeStateful = (
            <Row
                onRemove={this._handleRemoveStateful}
                onAdd={this._handleAddStateful}
                style={this.props.demo.style}
            />
        );

        return (
            <div className="multidrag-demo" data-id="multidragDemoDiv">
                <Messages messages={this.props.messages.messages} onRemoveMessage={this.messageActions.removeAt} />

                <Layout.Row className="columns-nopad">
                    <Layout.Column>
                        <FormLabel>Select the type of demo</FormLabel>
                        <FormRadioGroup
                            stacked={false}
                            groupName="stateless-stateful-choice"
                            selected={this.state.demoType}
                            onValueChange={this._handleDemoTypeValueChange}
                            items={[
                                { id: "STATELESS", name: "Stateless demo" },
                                { id: "STATEFUL", name: "Stateful demo" }
                            ]}
                        />
                    </Layout.Column>
                    <Layout.Column>
                        <FormLabel>Disable Component?</FormLabel>
                        <br/>
                        <Toggle
                            data-id="disable-toggle"
                            className="row-status-toggle"
                            stateless={true}
                            toggled={this.state.disabled}
                            onToggle={this._handleDisabledToggle}
                        />
                    </Layout.Column>
                </Layout.Row>
                <Layout.Row className="columns-nopad">
                    <Layout.Column>
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
                            ]}
                        />
                    </Layout.Column>
                    <Layout.Column>
                        <FormLabel value="row options" />
                        <FormRadioGroup
                            onValueChange={this.demoActions.setStyle}
                            selected={this.props.demo.style}
                            groupName="row-opts"
                            stacked={false}
                            items={[
                                { id: "none", name: "none" },
                                { id: "image", name: "with image" },
                                { id: "icon", name: "with icon" },
                                { id: "count", name: "with count" }
                            ]}
                        />
                    </Layout.Column>
                </Layout.Row>

                {this.state.demoType === "STATELESS" &&
                    <div>
                        <h2>
                            Stateless (stateless=true), Empty Label Set.
                            First column has sort within column disabled.
                        </h2>
                        <MultiDrag
                            stateless={true}
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
                            onDragStart={dragScroll.start}
                            onDragEnd={dragScroll.end}
                            contentType={contentTypeStateless}
                            labelEmpty="No Items Available"
                            disabled={this.state.disabled}
                        />
                    </div>
                }
                {
                    /*
                     * The Stateful MultiDrag does not use the MultiDrag Reducer.
                     */
                }
                {this.state.demoType === "STATEFUL" &&
                    <div>
                        <h2>Stateful (stateless=false)</h2>
                        <MultiDrag
                            ref="multi-drag-demo-stateful"
                            showSearchOnAllColumns={this.props.demo.search === "all"}
                            showSearch={this.props.demo.search === "first"}
                            onSearch={this._handleSearchStateful}
                            columns={this.state.columns}
                            onScrolledToTop={this._handleScrolledToTop}
                            onScrolledToBottom={this._handleScrollToBottomStateful}
                            onCancel={this._handleCancelStateful}
                            onDrop={this._handleDropStateful}
                            onDrag={this._handleDragStateful}
                            onDragStart={dragScroll.start}
                            onDragEnd={dragScroll.end}
                            contentType={contentTypeStateful}
                            labelEmpty="No Items Available"
                            disabled={this.state.disabled}
                        />
                    </div>
                }
          </div>);
    }
}

/*
 * Expose the reducer just to get it tied to the local store
 */
MultiDragDemo.Reducer = Redux.combineReducers({
    drag: MultiDrag.Reducer,
    messages: Messages.Reducer,
    demo: DemoReducer
});

module.exports = MultiDragDemo;
