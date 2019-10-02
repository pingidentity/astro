import React from "react";
import RowAccessories from "../../../components/rows/expandable-row/Accessories";
import RowAccessoriesLineChart from "../../../components/rows/expandable-row/AccessoriesLineChart";
import HelpHint from "../../../components/tooltips/HelpHint";
import Link from "../../../components/general/Link";
import ExpandableRow from "../../../components/rows/ExpandableRow";
import Toggle from "../../../components/forms/form-toggle";
import DetailsTooltip from "../../../components/tooltips/DetailsTooltip";
import Button from "../../../components/buttons/Button";
import LabelValuePairs from "../../../components/layout/LabelValuePairs";
import ConfirmTooltip from "../../../components/tooltips/ConfirmTooltip";
import ButtonGroup from "../../../components/layout/ButtonGroup";

/**
* @name ExpandableRowDemo
* @memberof ExpandableRow
* @desc A demo for ExpandableRow
*/
class ExpandableRowDemo extends React.Component {
    state = {
        expanded: false,
        rowDeleted: false,
        order1: 40,
    };

    static flags = ["use-portal", "expandable-row-class", "p-stateful"];

    _onToggle = (index) => () => {
        var newState = {},
            key = "expanded" + index;

        newState[key] = !this.state[key];

        this.setState(newState);
    };

    _handleValueChange = index => value => this.setState({ [`value${index}`]: value });

    _handleReorder = index => (from, to) => {
        const destination = (to > from) ? to - 1 : to;

        this.setState({
            [`order${index}`]: destination,
            [`value${index}`]: destination,
        });
    }

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

        var customDeleteButton = (
            <DetailsTooltip
                stateless={false}
                label={(<button type="button" className="delete-btn" onClick={this._toggleCustomDelete}/>)}
                placement="top left"
                title="Tooltip Title"
                open={this.state.showCustomDeleteConfirm}
                onToggle={this._toggleCustomDelete}>
                <p>
                    Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                    sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                </p>
                <ButtonGroup
                    data-id="delete-confirmation"
                    onCancel={this._toggleCustomDelete}
                >
                    <Button
                        data-id-primary="confirm-action"
                        onClick={this._customConfirm}
                    >
                        Confirm
                    </Button>
                </ButtonGroup>
            </DetailsTooltip>
        );
        return (
            <div>
                <ExpandableRow.SimpleWrapper data-id="idp-row">
                    <ExpandableRow
                        stateless={false}
                        title="Basic Row"
                        subtitle="Row Subtitle">
                        <LabelValuePairs dataPairs={mockData} />
                    </ExpandableRow>
                    <ExpandableRow
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
                        // When using the p-stateful flag, you can define an initial state for your component;
                        // it will still control the prop internally, but will initialize with the value you
                        // selected.
                        {
                        ...this.props.flags.includes("p-stateful")
                            ? {
                                initialState: {
                                    expanded: true
                                }
                            }
                            : {
                                expanded: true
                            }
                        }
                    />
                    <ExpandableRow
                        stateless={false}
                        title="Row with Status Indicator"
                        subtitle="Row Subtitle"
                        status={ExpandableRow.Statuses.ERROR}
                    />
                    <ExpandableRow
                        stateless={false}
                        title="Row with Toggle"
                        subtitle="stateful"
                        rowAccessories={<Toggle stateless={false} />}
                    />
                    <ExpandableRow
                        title="Row with Pill Button"
                        subtitle="stateless"
                        stateless={false}
                        expanded={this.state.expanded1}
                        onToggle={this._onToggle(1)}
                        rowAccessories={<RowAccessories.PillButton label="Pill Button" />}
                    />

                    <ExpandableRow
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
                        stateless={false}
                        title="Row With Image"
                        subtitle="Row Subtitle"
                        image="src/demo/images/example-expandable-row-image.png"
                    />
                    <ExpandableRow
                        stateless={false}
                        title="Row With Icon"
                        subtitle="Row Subtitle"
                        icon="icon-cog"
                    />
                    <ExpandableRow
                        stateless={false}
                        title={
                            <div className="hover-tooltip">
                                Row With Tab
                                <HelpHint
                                    placement="top"
                                    hintText="Platform Provided"
                                    iconName="tag"
                                    leftMargin
                                />
                            </div>
                        }
                    />
                    <ExpandableRow
                        stateless={false}
                        title="Row in Waiting Mode"
                        subtitle="stateful"
                        waiting={true}
                    />
                    <ExpandableRow
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
                        stateless={false}
                        title="Row in Ordering Mode"
                        subtitle="Using positionValue"
                        ordering={{
                            position: this.state.order1,
                            total: 50,
                            onReorder: this._handleReorder(1),
                            positionValue: this.state.value1,
                            onPositionValueChange: this._handleValueChange(1),
                        }}
                    />
                    <ExpandableRow
                        stateless={false}
                        title="Row With Invited Styling"
                        className="invited"
                        rowAccessories={[
                            <div key="invite-info" className="invite-info">
                                <div className="invite-status">Invited (Open)</div>
                                <div className="invite-date">2017-4-10 4:35pm</div>
                            </div>,
                            <button key="button" className="inline">Resend Invitation</button>
                        ]}
                    />
                    <ExpandableRow
                        editButton={
                            <ConfirmTooltip
                                flags={this.props.flags}
                                label=" "
                                className="edit-btn left"
                            >Confirm?</ConfirmTooltip>
                        }
                        stateless={false}
                        title="Row With Custom Edit Button"
                    />
                    {!this.state.rowDeleted && (
                        <ExpandableRow
                            title="Row with Delete Confirmation with Custom delete title"
                            subtitle="stateless"
                            stateless={false}
                            expanded={this.state.expanded3}
                            onToggle={this._onToggle(3)}
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
                            title="Row with Custom Delete Tooltip Button"
                            subtitle="stateless"
                            stateless={false}
                            expanded={this.state.expanded4}
                            onToggle={this._onToggle(4)}
                            deleteButton={customDeleteButton}
                        />
                    )}
                    <ExpandableRow
                        title="Expanded Row with Line Chart"
                        subtitle="Empty Data"
                        stateless={false}
                        expanded={this.state.expanded1}
                        onToggle={this._onToggle(1)}
                        rowAccessories={[
                            <RowAccessoriesLineChart
                                key="row-accessories-line-chart"
                                title="Avg daily sign-ons:"
                                count="0"
                                countLabel="Past 7 days"
                                isTrendPositive={true}
                                data={[]}
                                chartLabel="No data yet"
                                hintProps={{ type: HelpHint.Types.LIGHT }}
                                trend="+ 0%"

                            />,
                            <Toggle key="toggle" stateless={false} />
                        ]}
                    />
                    <ExpandableRow
                        title="Expanded Row with Line Chart"
                        subtitle="Full Data"
                        stateless={false}
                        expanded={this.state.expanded1}
                        onToggle={this._onToggle(1)}
                        rowAccessories={[
                            <RowAccessoriesLineChart
                                key="row-accessories-line-chart"
                                title="Avg daily sign-ons:"
                                count="1,234,234"
                                countLabel="Past 7 days"
                                isTrendPositive={true}
                                data={[
                                    { id: 1, value: 1 },
                                    { id: 2, value: 5 },
                                    { id: 3, value: 3 },
                                    { id: 4, value: 2 },
                                    { id: 5, value: 5 },
                                    { id: 6, value: 1 },
                                    { id: 7, value: 5 },
                                    { id: 8, value: 5 },
                                    { id: 9, value: 1 },
                                    { id: 10, value: 2 },
                                    { id: 11, value: 4 },
                                    { id: 12, value: 11 },
                                ]}
                                chartLabel="12 wk trend"
                                hint="See Contributing Data"
                                trend="+ 8.6%"
                            />,
                            <Toggle key="toggle" stateless={false} />
                        ]}
                    />
                    <ExpandableRow
                        title="Expanded Row with Line Chart"
                        subtitle="Partial Data"
                        stateless={false}
                        expanded={this.state.expanded1}
                        onToggle={this._onToggle(1)}
                        rowAccessories={[
                            <RowAccessoriesLineChart
                                key="row-accessories-line-chart"
                                title="Avg daily sign-ons:"
                                count="234,234"
                                countLabel="Past 7 days"
                                isTrendPositive={false}
                                data={[
                                    { id: 1 },
                                    { id: 2 },
                                    { id: 3 },
                                    { id: 4 },
                                    { id: 5 },
                                    { id: 6 },
                                    { id: 7, value: 6 },
                                    { id: 8, value: 5 },
                                    { id: 9, value: 4 },
                                    { id: 10, value: 3 },
                                    { id: 11, value: 2 },
                                    { id: 12, value: 1 },
                                ]}
                                chartLabel="12 wk trend"
                                hint={<Link>See Contributing Data</Link>}
                                trend="- 8.6%"
                            />,
                            <Toggle key="toggle" stateless={false} />
                        ]}
                    />
                    <ExpandableRow
                        title="Expanded Row with Line Chart"
                        subtitle="Zero Data"
                        stateless={false}
                        expanded={this.state.expanded1}
                        onToggle={this._onToggle(1)}
                        rowAccessories={[
                            <RowAccessoriesLineChart
                                key="row-accessories-line-chart"
                                title="Avg daily sign-ons:"
                                count="0"
                                countLabel="Past 7 days"
                                isTrendPositive={false}
                                data={[
                                    { id: 1 },
                                    { id: 2 },
                                    { id: 3 },
                                    { id: 4 },
                                    { id: 5 },
                                    { id: 6 },
                                    { id: 7 },
                                    { id: 8, value: 0 },
                                    { id: 9, value: 0 },
                                    { id: 10, value: 0 },
                                    { id: 11, value: 0 },
                                    { id: 12, value: 0 },
                                ]}
                                chartLabel="12 wk trend"
                                hint={<Link>See Contributing Data</Link>}
                                hintProps={{ type: HelpHint.Types.LIGHT }}
                                trend="+ 0%"

                            />,
                            <Toggle key="toggle" stateless={false} />
                        ]}
                    />
                    <ExpandableRow
                        title="Expanded Row with Line Chart"
                        subtitle="Zero values"
                        stateless={false}
                        expanded={this.state.expanded1}
                        onToggle={this._onToggle(1)}
                        rowAccessories={[
                            <RowAccessoriesLineChart
                                key="row-accessories-line-chart"
                                title="Avg daily sign-ons:"
                                count="0"
                                countLabel="Past 7 days"
                                isTrendPositive={false}
                                data={[
                                    { id: 1, value: 0 },
                                    { id: 2, value: 0 },
                                    { id: 3, value: 0 },
                                    { id: 4, value: 0 },
                                ]}
                                chartLabel="12 wk trend"
                                hint={<Link>See Contributing Data</Link>}
                                hintProps={{ type: HelpHint.Types.LIGHT }}
                                trend="+ 0%"
                            />,
                            <Toggle key="toggle" stateless={false} />
                        ]}
                    />
                </ExpandableRow.SimpleWrapper>
            </div>
        );
    }
}

module.exports = ExpandableRowDemo;
