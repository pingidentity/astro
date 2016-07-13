var React = require("react");
var ExpandableRow = require("../../../components/rows/ExpandableRow.jsx");
var Toggle = require("../../../components/forms/form-toggle");

/**
* @name ExpandableRowDemo
* @memberof ExpandableRow
* @desc A demo for ExpandableRow
*/
var ExpandableRowDemo = React.createClass({

    _onToggle: function (index) {
        var newState = {},
            key = "expanded" + index;

        newState[key] = !this.state[key];

        this.setState(newState);
    },

    _handleDelete: function () {
        this.setState({
            deletedRow: true
        });
    },

    _handleDelete2: function () {
        this.setState({
            showDeleteConfirm: true
        });
    },

    _handleDeleteCancel: function () {
        this.setState({
            showDeleteConfirm: false
        });
    },

    _handleDeleteConfirm: function () {
        this.setState({
            showDeleteConfirm: false,
            deletedRow2: true
        });
    },

    getInitialState: function () {
        return {
            expanded: false,
            deletedRow: false,
            deletedRow2: false
        };
    },

    render: function () {

        return (
            <div data-id="idp-row" className="result-set">
                <ExpandableRow
                    title="Row With Only a Title" />
                <ExpandableRow
                    title="Row With Right Status Indicator"
                    subtitle="Row Subtitle"
                    status={ExpandableRow.Statuses.ERROR} />
                <ExpandableRow
                    title="Row With Right Toggle"
                    subtitle="Row Subtitle"
                    rowAccessories={(<Toggle />)} />
                <ExpandableRow
                    title="Row With Right Button"
                    subtitle="Row Subtitle"
                    status={ExpandableRow.Statuses.WARNING}
                    rowAccessories={(<input type="button" className="button inline" value="Inline Button" />)} />
                <ExpandableRow
                    title="Row With a Variety of Right Content"
                    subtitle="Row Subtitle"
                    status={ExpandableRow.Statuses.GOOD}
                    rowAccessories={(
                        <span>
                            <a>Link</a>
                            <input type="button" className="button inline" value="Inline Button" />
                            <Toggle />
                        </span>
                    )} />
                <ExpandableRow
                    title="Collapsed Expandable Row"
                    subtitle="stateful"
                    expanded={false}
                    showDelete={false}
                    showEdit={true} />
                <ExpandableRow
                    title="Collapsed Expandable Row"
                    subtitle="stateless"
                    controlled={true}
                    expanded={this.state.expanded1}
                    onToggle={this._onToggle.bind(null, 1)}/>
                <ExpandableRow
                    title="Row With Image"
                    subtitle="Row Subtitle"
                    image="src/demo/images/example-expandable-row-image.png" />
                <ExpandableRow
                    title="Open Expandable Row"
                    subtitle="stateful"
                    expanded={true}
                    showDelete={true}
                    showEdit={false} />
                <ExpandableRow
                    title="Open Expandable Row in Waiting Mode"
                    subtitle="stateful"
                    waiting={true}/>
                <ExpandableRow
                    title="Expandable Row"
                    subtitle="stateless"
                    controlled={true}
                    expanded={this.state.expanded2}
                    onToggle={this._onToggle.bind(null, 2)} />
                {this.state.deletedRow
                    ? <span>Delete confirmed!</span>
                    : <ExpandableRow
                        title="Expanded Row with Delete Confirmation"
                        expanded={true}
                        showDelete={true}
                        confirmDelete={true}
                        onDelete={this._handleDelete}
                        labelDeleteConfirm="Are you sure you want to delete this row?" />
                }
                {this.state.deletedRow2
                    ? <span>Delete confirmed!</span>
                    : <ExpandableRow
                        title="Collapsed Row with Delete Confirmation"
                        subtitle="stateless"
                        controlled={true}
                        expanded={this.state.expanded3}
                        onToggle={this._onToggle.bind(null, 3)}
                        onDeleteCancelClick={this._handleDeleteCancel}
                        onDeleteConfirmClick={this._handleDeleteConfirm}
                        showDelete={true}
                        confirmDelete={true}
                        showDeleteConfirm={this.state.showDeleteConfirm}
                        onDelete={this._handleDelete2}
                        labelDeleteConfirm="Are you sure you want to delete this row?" />
                }
            </div>
        );
    }
});

module.exports = ExpandableRowDemo;
