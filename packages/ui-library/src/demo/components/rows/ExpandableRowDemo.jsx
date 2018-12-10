import React from "react";
import RowAccessories from "../../../components/rows/expandable-row/Accessories";
import HelpHint from "../../../components/tooltips/HelpHint";
import ExpandableRow from "../../../components/rows/ExpandableRow";
import Toggle from "../../../components/forms/form-toggle";
import DetailsTooltip from "../../../components/tooltips/DetailsTooltip";
import Button from "../../../components/buttons/Button";
import LabelValuePairs from "../../../components/layout/LabelValuePairs";
import ConfirmTooltip from "../../../components/tooltips/ConfirmTooltip";

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
        this._onToggle4 = this._onToggle.bind(null, 4);

        this.state = {
            expanded: false,
            rowDeleted: false
        };
    }

    static flags = ["use-portal"];

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

    _toggleCustomDelete = () => {
        this.setState({
            showCustomDeleteConfirm: !this.state.showCustomDeleteConfirm
        });
    };

    _customConfirm = () => {
        this.setState({
            rowCustomDeleted: true
        });
        this._toggleCustomDelete();
    };

    render() {
        const mockData = [
            {
                label: "Attribute Type",
                value: "String"
            },
            {
                label: "Category",
                value: "Profile"
            },
            {
                label: "name",
                value: "Tony Stark"
            },
            {
                label: "Display Name",
                value: "Iron Man"
            },
            {
                label: "Description",
                value: "Tony Stark is a playboy billionare who is a super hero with an iron suit"
            },
            {
                label: "Required",
                value: "NO"
            },
            {
                label: "Resgistration",
                value: "NO"
            },
        ];

        const { flags } = this.props;

        var customDeleteButton = (
            <DetailsTooltip
                flags={flags}
                stateless={false}
                label={(<button type="button" className="delete-btn" onClick={this._toggleCustomDelete}/>)}
                positionClassName="top left"
                title="Tooltip Title"
                open={this.state.showCustomDeleteConfirm}
                onToggle={this._toggleCustomDelete}>
                <p>
                    Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                    sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                </p>
                <div className="button-group" data-id="delete-confirmation">
                    <button
                            type="button"
                            data-id="confirm-action"
                            onClick={this._customConfirm} >
                        Confirm
                    </button>
                    <br />
                    <a className="cancel" onClick={this._toggleCustomDelete}>Cancel</a>
                </div>
            </DetailsTooltip>
        );
        return (
            <div data-id="idp-row" className="result-set">
                <ExpandableRow
                    flags={flags}
                    stateless={false}
                    title="Basic Row"
                    subtitle="Row Subtitle">
                    <LabelValuePairs dataPairs={mockData} />
                </ExpandableRow>
                <ExpandableRow
                    flags={flags}
                    stateless={false}
                    title="Expanded Row with Row Message"
                    rowMessage={{
                        text: ([
                            "The optional row message appears at the top of the expanded row only when the row is \
                            expanded.",
                            <span key="item-message" className="item-message__buttons">
                                <Button inline>Foo</Button>
                                <Button inline>Bar</Button>
                            </span>
                        ]),
                        type: ExpandableRow.RowMessageTypes.WARNING
                    }}
                    expanded={true}
                />
                <ExpandableRow
                    flags={flags}
                    stateless={false}
                    title="Row with Status Indicator"
                    subtitle="Row Subtitle"
                    status={ExpandableRow.Statuses.ERROR}
                />
                <ExpandableRow
                    flags={flags}
                    stateless={false}
                    title="Row with Toggle"
                    subtitle="stateful"
                    expanded={false}
                    rowAccessories={<Toggle stateless={false} />}
                />
                <ExpandableRow
                    flags={flags}
                    title="Row with Pill Button"
                    subtitle="stateless"
                    stateless={false}
                    expanded={this.state.expanded1}
                    onToggle={this._onToggle1}
                    rowAccessories={<RowAccessories.PillButton label="Pill Button" />}
                />
                <ExpandableRow
                    flags={flags}
                    stateless={false}
                    title="Row With a Variety of Right Content"
                    subtitle="Row Subtitle"
                    rowAccessories={[
                        <a key="link">Link</a>,
                        <span key="icon" className="icon-cog" />,
                        <HelpHint key="help" className="width-auto bottom" hintText="Provisioning">
                            <label className="row-help">PROV</label>
                        </HelpHint>,
                        <button key="button"className="inline">Inline Button</button>,
                        <Toggle key="toggle" stateless={false} />,
                        <span key="count" className="count">2</span>
                    ]}
                />
                <ExpandableRow
                    flags={flags}
                    stateless={false}
                    title="Row With Image"
                    subtitle="Row Subtitle"
                    image="src/demo/images/example-expandable-row-image.png"
                />
                <ExpandableRow
                    flags={flags}
                    stateless={false}
                    title="Row With Icon"
                    subtitle="Row Subtitle"
                    icon="icon-cog"
                />
                <ExpandableRow
                    flags={flags}
                    stateless={false}
                    title={
                        <div className="hover-tooltip">
                            Row With Tab
                            <HelpHint
                                placement="top"
                                hintText="Platform Provided"
                                iconName="tag"
                            />
                        </div>
                    }
                    expanded={false}
                />
                <ExpandableRow
                    flags={flags}
                    stateless={false}
                    title="Row in Waiting Mode"
                    subtitle="stateful"
                    waiting={true}
                />
                <ExpandableRow
                    flags={flags}
                    stateless={false}
                    title="Row in Ordering Mode"
                    subtitle="stateful"
                    ordering={{
                        position: 40,
                        total: 50,
                        onReorder: index => console.log("New position:", index)
                    }}
                    rowAccessories={(
                        <span className="row-accessories-content">
                            <a>Link</a>
                            <span className="icon-cog" />
                            <HelpHint className="width-auto bottom" hintText="Provisioning">
                                <label className="row-help">PROV</label>
                            </HelpHint>
                            <button className="inline">Inline Button</button>
                            <Toggle stateless={false} />
                            <span className="count">2</span>
                        </span>
                    )}
                />
                <ExpandableRow
                    flags={flags}
                    stateless={false}
                    title="Row With Invited Styling"
                    className="invited"
                    expanded={false}
                    rowAccessories={[
                        <div key="invite-info" className="invite-info">
                            <div className="invite-status">Invited (Open)</div>
                            <div className="invite-date">2017-4-10 4:35pm</div>
                        </div>,
                        <button key="button" className="inline">Resend Invitation</button>
                    ]}
                />
                <ExpandableRow
                    flags={flags}
                    editButton={
                        <ConfirmTooltip
                            flags={flags}
                            label=" "
                            className="edit-btn left"
                        >Confirm?</ConfirmTooltip>
                    }
                    stateless={false}
                    title="Row With Custom Edit Button"
                    expanded={false}
                />
                {!this.state.rowDeleted && (
                    <ExpandableRow
                        flags={flags}
                        title="Row with Delete Confirmation with Custom delete title"
                        subtitle="stateless"
                        stateless={false}
                        expanded={this.state.expanded3}
                        onToggle={this._onToggle3}
                        onDeleteCancelClick={this._handleDeleteCancel}
                        onDeleteConfirmClick={this._handleDeleteConfirm}
                        showDelete={true}
                        confirmDelete={true}
                        confirmDeleteTitle="Custom delete title"
                        showDeleteConfirm={this.state.showDeleteConfirm}
                        onDelete={this._handleDelete}
                        labelDeleteConfirm="Are you sure you want to delete this row?"
                    />
                )}
                {!this.state.rowCustomDeleted && (
                    <ExpandableRow
                        flags={flags}
                        title="Row with Custom Delete Tooltip Button"
                        subtitle="stateless"
                        stateless={false}
                        expanded={this.state.expanded4}
                        onToggle={this._onToggle4}
                        deleteButton={customDeleteButton}
                    />
                )}
            </div>
        );
    }
}

module.exports = ExpandableRowDemo;
