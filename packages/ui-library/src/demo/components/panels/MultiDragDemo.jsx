import React from "react";
const Redux = require("redux");
import deepClone from "clone";
import ConfirmTooltip from "../../../components/tooltips/ConfirmTooltip";
import FormLabel from "../../../components/forms/FormLabel";
import FormRadioGroup from "../../../components/forms/FormRadioGroup";
import Layout from "../../../components/general/ColumnLayout";
import MultiDrag, { MultiDragRow } from "../../../components/panels/multi-drag";
import Messages from "../../../components/general/messages/";
import Toggle from "../../../components/forms/form-toggle";
import classnames from "classnames";
import update from "re-mutable";
import keyMirror from "fbjs/lib/keyMirror";
import data from "./MultiDragData.js";
import dragScroll from "../../../util/dragScroll";
import _ from "underscore";

import Button from "../../../components/buttons/Button";
import HR from "ui-library/lib/components/general/HR";

/**
* @name MultiDragDemo
* @memberof MultiDrag
* @desc A demo for MultiDrag
*/

const CUSTOMSORTVALS = {
    SORTED: "sorted",
    UNSORTED: "unsorted"
};

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
            return state || { search: "first", style: "none" };
    }
}

/*
 * An example Row component implementation.  Since the MultiDrag component only cares about the drag/drop
 * interaction, we're free to mark up each individual row as we please.  In this case, we have implemented
 * a row which has Plus/Remove buttons
 */
class Row extends React.Component {
    _handleRemove = () => {
        const { onRemove } = this.props;
        if (onRemove) {
            onRemove({ column: this.props.column, index: this.props.index });
        }
    };

    _handleAdd = () => {
        const { onAdd } = this.props;
        if (onAdd) {
            onAdd({ column: this.props.column, index: this.props.index });
        }
    };

    _getButton = () => {
        if (this.props.column === 0) {
            return <Button inline iconName="plus" data-id="row-button-add" onClick={this._handleAdd} />;
        }

        return (<Button inline iconName="remove"
            data-id="row-button-remove"
            onClick={this._handleRemove}
        />);
    };

    render() {
        var hasImage = this.props.style === "iconSrc";
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
                        style={{ backgroundImage: "url(" + this.props.iconSrc + ")" }} />
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
    static flags = [ "use-portal" ];

    state = {
        demoType: "STATELESS",
        columns: data.columns, // used for stateful (stateless=false) demo
        disabled: false,
        sorted: false
    };

    constructor(props) {
        super(props);
        this.actions = Redux.bindActionCreators(MultiDrag.Actions, props.store.dispatch);
        this.messageActions = Redux.bindActionCreators(Messages.Actions, props.store.dispatch);
        this.demoActions = Redux.bindActionCreators(Actions, props.store.dispatch);

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

    _handleAddStateful = (from) => {
        this._getClassicRef()._handleDrop({ from: from, to: { column: 1, index: 0 } });
    };

    _handleRemoveStateful = (from) => {
        this._getClassicRef()._handleDrop({ from: from, to: { column: 0, index: 0 } });
    };

    _getClassicRef = () => this.refs["multi-drag-demo-classic"].refs.MultiDragStateful

    _getStatefulRef = () => {
        //MultiDragStateful ref is nested under the dragDropContext child ref
        return this.refs["multi-drag-demo-stateful"].refs.MultiDragStateful;
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

    _handleCategoryClickStateful = (column, value) => {
        if (value !== "") {
            console.log("Filter column " + column + " for category " + value);
        }
    };

    _handleCategoryToggle = (column) => {
        if (this.props.drag.columns[column].showCategoryList) {
            this.actions.hideCategoryList(column);
        } else {
            this.actions.showCategoryList(column);
        }
    }

    _handleCategoryClick = (column, value) => {
        this.actions.setCategory(column, value);
    }

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

    _getCategoryOptions = () => {
        let options = [];

        const checkCategory = category => item => item === category;

        for (let i = 0; i < this.props.drag.columns.length; i += 1) {
            const column = this.props.drag.columns[i];

            // const isCategory = item => item === column.rows[j].category;
            for (let j = 0; j < column.rows.length; j += 1) {
                const category = column.rows[j].categoryId || column.rows[j].category;
                if (!_.find(options, checkCategory(category))) {
                    options.push(category);
                }
            }
        }

        return options;
    };

    _toggleSort = id =>
        this.setState(() => ({
            sorted: id === CUSTOMSORTVALS.SORTED
        }));

    render() {
        const renderCustomButton = ({
            onClick,
            type,
            ...props
        }, RowButton) => type === "remove" ? (
            <ConfirmTooltip
                buttonLabel="Confirm"
                cancelText="Cancel"
                flags={["use-portal"]}
                label={
                    <RowButton {...props} />
                }
                onConfirm={onClick}
                placement="bottom right"
                title="Remove entry"
            >
                Are you sure you want to remove this entry?
            </ ConfirmTooltip>
        ) : <RowButton onClick={onClick} {...props} />;

        const contentTypeWithTooltip = (props) => (
            <MultiDragRow
                renderButton={renderCustomButton}
                {...props}
            />
        );

        const contentTypeStateful = (
            <Row
                onAdd={this._handleAddStateful}
                onRemove={this._handleRemoveStateful}
                style={this.props.demo.style}
            />
        );

        // depending on what the user has chosen to show on the rows,
        // we filter all the props out except that one from the row data
        const filterRowProps = row => _.defaults(
            { [this.props.demo.style]: row[this.props.demo.style] },
            _.omit(row, ["icon", "iconSrc", "count"])
        );

        const filterProps = column => _.defaults({
            rows: column.rows.map(filterRowProps),
            filteredRows: column.filteredRows ? column.filteredRows.map(filterRowProps) : [],
        }, column);

        const columnsStateless = this.props.drag.columns.map(filterProps);
        const columnsStateful = this.state.columns.map(filterProps);

        const sortRow = row => _.sortBy(row, ({ name }) => name);

        return (
            <div>
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
                                    { id: "iconSrc", name: "with image" },
                                    { id: "icon", name: "with icon" },
                                    { id: "count", name: "with count" },
                                    { id: "tooltip", name: "with delete tooltip" }
                                ]}
                            />
                        </Layout.Column>
                    </Layout.Row>
                    <Layout.Row className="columns-nopad">
                        <Layout.Column>
                            <FormLabel>Toggle custom sort (stateful only)</FormLabel>
                            <FormRadioGroup
                                stacked={false}
                                groupName="sorted"
                                selected={this.state.sorted ? CUSTOMSORTVALS.SORTED : CUSTOMSORTVALS.UNSORTED }
                                onValueChange={this._toggleSort}
                                items={[
                                    { id: CUSTOMSORTVALS.UNSORTED, name: "Unsorted" },
                                    { id: CUSTOMSORTVALS.SORTED, name: "Custom sort" }
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
                                categoryList={this._getCategoryOptions()}
                                columns={columnsStateless}
                                previewMove={this.props.drag.placeholder}
                                onScrolledToTop={this._handleScrolledToTop}
                                onScrolledToBottom={this._handleScrolledToBottomStateless}
                                onCancel={this._handleCancelStateless}
                                onCategoryClick={this._handleCategoryClick}
                                onCategoryToggle={this._handleCategoryToggle}
                                onDrop={this._handleDropStateless}
                                onDrag={this._handleDragStateless}
                                onDragStart={dragScroll.start}
                                onDragEnd={dragScroll.end}
                                onAdd={this._handleAddStateless}
                                onRemove={this._handleRemoveStateless}
                                labelEmpty="No Items Available"
                                disabled={this.state.disabled}
                                {...this.props.demo.style === "tooltip" ? {
                                    contentType: contentTypeWithTooltip
                                } : {}}
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
                                onCategoryClick={this._handleCategoryClickStateful}
                                categoryList={this._getCategoryOptions()}
                                columns={columnsStateful}
                                onScrolledToTop={this._handleScrolledToTop}
                                onScrolledToBottom={this._handleScrollToBottomStateful}
                                onCancel={this._handleCancelStateful}
                                onDrop={this._handleDropStateful}
                                onDrag={this._handleDragStateful}
                                onDragStart={dragScroll.start}
                                onDragEnd={dragScroll.end}
                                labelEmpty="No Items Available"
                                disabled={this.state.disabled}
                                strings={{
                                    defaultCategoryOption: "Everything",
                                    filteredByLabel: "but only"
                                }}
                                {...this.state.sorted && { customSort: sortRow }}
                            />
                        </div>
                    }
                    <HR />
                    <div>
                        <h2>Classic Style</h2>
                        <MultiDrag
                            ref="multi-drag-demo-classic"
                            showSearchOnAllColumns={false}
                            showSearch={true}
                            onSearch={_.noop}
                            onCategoryClick={_.noop}
                            columns={this.state.columns}
                            onCancel={_.noop}
                            onDrop={_.noop}
                            onDrag={_.noop}
                            onDragStart={_.noop}
                            onDragEnd={_.noop}
                            contentType={contentTypeStateful}
                            labelEmpty="No Items Available"
                            disabled={false}
                        />
                    </div>
                </div>
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
