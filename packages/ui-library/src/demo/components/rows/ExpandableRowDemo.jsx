var React = require("react");
var RowAccessories = require("../../../components/rows/expandable-row/Accessories.jsx");
var HelpHint = require("../../../components/tooltips/HelpHint.jsx");
var ExpandableRow = require("../../../components/rows/ExpandableRow.jsx");
var Toggle = require("../../../components/forms/form-toggle");

/**
* @name ExpandableRowDemo
* @memberof ExpandableRow
* @desc A demo for ExpandableRow
*/
class ExpandableRowDemo extends React.Component {
    constructor(props) {
        super(props);
        this._onToggle1 = this._onToggle.bind(null, 1);
        this._onToggle3 = this._onToggle.bind(null, 3);

        this.state = {
            expanded: false,
            rowDeleted: false
        };
    }

    _onToggle = (index) => {
        var newState = {},
            key = "expanded" + index;

        newState[key] = !this.state[key];

        this.setState(newState);
    };

    _handleDelete = () => {
        this.setState({
            showDeleteConfirm: true
        });
    };

    _handleDeleteCancel = () => {
        this.setState({
            showDeleteConfirm: false
        });
    };

    _handleDeleteConfirm = () => {
        this.setState({
            showDeleteConfirm: false,
            rowDeleted: true
        });
    };

    render() {

        return (
            <div data-id="idp-row" className="result-set">
                <ExpandableRow
                    title="Basic Row"
                    subtitle="Row Subtitle"
                />
                <ExpandableRow
                    title="Expanded Row with Row Message"
                    rowMessage={{
                        text: "The optional row message appears at the top of the expanded row only when the row is \
                            expanded.",
                        type: ExpandableRow.RowMessageTypes.WARNING
                    }}
                    expanded={true}
                />
                <ExpandableRow
                    title="Row with Status Indicator"
                    subtitle="Row Subtitle"
                    status={ExpandableRow.Statuses.ERROR}
                />
                <ExpandableRow
                    title="Row with Toggle"
                    subtitle="stateful"
                    expanded={false}
                    rowAccessories={<Toggle />}
                />
                <ExpandableRow
                    title="Row with Pill Button"
                    subtitle="stateless"
                    stateless={true}
                    expanded={this.state.expanded1}
                    onToggle={this._onToggle1}
                    rowAccessories={<RowAccessories.PillButton label="Pill Button" />}
                />
                <ExpandableRow
                    title="Row With a Variety of Right Content"
                    subtitle="Row Subtitle"
                    rowAccessories={(
                        <span className="row-accessories-content">
                            <a>Link</a>
                            <span className="icon-cog" />
                            <HelpHint className="width-auto bottom" hintText="Provisioning">
                                <label className="row-help">PROV</label>
                            </HelpHint>
                            <button className="inline">Inline Button</button>
                            <Toggle />
                            <span className="count">2</span>
                        </span>
                    )}
                />
                <ExpandableRow
                    title="Row With Image"
                    subtitle="Row Subtitle"
                    image="src/demo/images/example-expandable-row-image.png"
                />
                <ExpandableRow
                    title="Row With Icon"
                    subtitle="Row Subtitle"
                    icon="icon-cog"
                />
                <ExpandableRow
                    title="Row in Waiting Mode"
                    subtitle="stateful"
                    waiting={true}
                />
                <ExpandableRow
                    title="Row With Invited Styling"
                    className="invited"
                    expanded={false}
                    rowAccessories={
                        <div className="row-accessories-content">
                            <div className="invite-info">
                                <div className="invite-status">Invited (Open)</div>
                                <div className="invite-date">2017-4-10 4:35pm</div>
                            </div>
                            <button className="inline">Resend Invitation</button>
                        </div>
                    }
                />
                {!this.state.rowDeleted && (
                    <ExpandableRow
                        title="Row with Delete Confirmation"
                        subtitle="stateless"
                        stateless={true}
                        expanded={this.state.expanded3}
                        onToggle={this._onToggle3}
                        onDeleteCancelClick={this._handleDeleteCancel}
                        onDeleteConfirmClick={this._handleDeleteConfirm}
                        showDelete={true}
                        confirmDelete={true}
                        showDeleteConfirm={this.state.showDeleteConfirm}
                        onDelete={this._handleDelete}
                        labelDeleteConfirm="Are you sure you want to delete this row?"
                    />
                )}
            </div>
        );
    }
}

module.exports = ExpandableRowDemo;
