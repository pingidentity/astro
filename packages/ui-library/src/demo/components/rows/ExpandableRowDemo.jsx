import React from "react";
import RowAccessories from "ui-library/lib/components/rows/expandable-row/Accessories";
import RowAccessoriesLineChart from "ui-library/lib/components/rows/expandable-row/AccessoriesLineChart";
import HelpHint from "ui-library/lib/components/tooltips/HelpHint";
import Link from "ui-library/lib/components/general/Link";
import ExpandableRow from "ui-library/lib/components/rows/ExpandableRow";
import Toggle from "ui-library/lib/components/forms/form-toggle";
import DetailsTooltip from "ui-library/lib/components/tooltips/DetailsTooltip";
import Button from "ui-library/lib/components/buttons/Button";
import LabelValuePairs from "ui-library/lib/components/layout/LabelValuePairs";
import ConfirmTooltip from "ui-library/lib/components/tooltips/ConfirmTooltip";
import ButtonGroup from "ui-library/lib/components/layout/ButtonGroup";
import Chip, { chipTypes } from "ui-library/lib/components/layout/Chip";
import Icon from "ui-library/lib/components/general/Icon";

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

        var customDeleteButton = (
            <DetailsTooltip
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
                        title="Basic Row"
                        subtitle="Row Subtitle">
                        <LabelValuePairs dataPairs={mockData} />
                    </ExpandableRow>
                    <ExpandableRow
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
                        initialState={{
                            expanded: true
                        }}
                    />
                    <ExpandableRow
                        title="Row with Status Indicator"
                        subtitle="Row Subtitle"
                        status={ExpandableRow.Statuses.ERROR}
                    />
                    <ExpandableRow
                        title="Row with Toggle"
                        rowAccessories={<Toggle />}
                    />
                    <ExpandableRow
                        title="Row with Pill Button"
                        expanded={this.state.expanded1}
                        onToggle={this._onToggle(1)}
                        rowAccessories={<RowAccessories.PillButton label="Pill Button" />}
                    />

                    <ExpandableRow
                        title="Row With a Variety of Right Content"
                        subtitle="Row Subtitle"
                        rowAccessories={[
                            <a key="link">Link</a>,
                            <Icon iconName="cog" key="icon" />,
                            <HelpHint key="help" className="width-auto bottom" hintText="Provisioning">
                                <Chip type={chipTypes.CONDENSED}>Prov</Chip>
                            </HelpHint>,
                            <Button key="button" inline>Inline Button</Button>,
                            <Toggle key="toggle" />,
                            <Chip type={chipTypes.COUNT} key="count">2</Chip>
                        ]}
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
                        title="Row in Waiting Mode"
                        waiting={true}
                    />
                    <ExpandableRow
                        title="Row in Ordering Mode"
                        ordering={{
                            position: 40,
                            total: 50,
                            onReorder: index => console.log("New position:", index)
                        }}
                        rowAccessories={(
                            <span className="row-accessories-content">
                                <a>Link</a>
                                <Icon iconName="cog" key="icon" />,
                                <HelpHint className="width-auto bottom" hintText="Provisioning">
                                    <Chip type={chipTypes.CONDENSED}>Prov</Chip>
                                </HelpHint>
                                <Button inline>Inline Button</Button>
                                <Toggle />
                                <Chip type={chipTypes.COUNT} key="count">2</Chip>
                            </span>
                        )}
                    />
                    <ExpandableRow
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
                        title="Row With Invited Styling"
                        className="invited"
                        rowAccessories={[
                            <div key="invite-info" className="invite-info">
                                <div className="invite-status">Invited (Open)</div>
                                <div className="invite-date">2017-4-10 4:35pm</div>
                            </div>,
                            <Button key="button" inline>Resend Invitation</Button>
                        ]}
                    />
                    <ExpandableRow
                        editButton={
                            <ConfirmTooltip
                                label=" "
                                className="edit-btn left"
                            >Confirm?</ConfirmTooltip>
                        }
                        title="Row With Custom Edit Button"
                    />
                    {!this.state.rowDeleted && (
                        <ExpandableRow
                            title="Row with Delete Confirmation with Custom Confirmation Popup"
                            onToggle={this._onToggle(3)}
                            showDelete={true}
                            confirmDelete={true}
                            confirmDeleteTitle="Custom delete title"
                            onDeleteConfirmClick={this._handleDeleteConfirm}
                            confirmDeleteContent={({ onCancel, onConfirm, confirmLabel, cancelLabel }) => (<div>
                                <button key="confirm" onClick={onConfirm}>{confirmLabel}</button>
                                <button key="cancel" onClick={onCancel}>{cancelLabel}</button>
                            </div>)}
                            labelDeleteConfirm="Are you sure you want to delete this row?"
                        />
                    )}
                    {!this.state.rowCustomDeleted && (
                        <ExpandableRow
                            title="Row with Custom Delete Tooltip Button"
                            expanded={this.state.expanded4}
                            onToggle={this._onToggle(4)}
                            deleteButton={customDeleteButton}
                        />
                    )}
                    <ExpandableRow
                        title="Expanded Row with Line Chart"
                        subtitle="Empty Data"
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
                            <Toggle key="toggle" />
                        ]}
                    />
                    <ExpandableRow
                        title="Expanded Row with Line Chart"
                        subtitle="Full Data"
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
                            <Toggle key="toggle"/>
                        ]}
                    />
                    <ExpandableRow
                        title="Expanded Row with Line Chart"
                        subtitle="Partial Data"
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
                            <Toggle key="toggle"/>
                        ]}
                    />
                    <ExpandableRow
                        title="Expanded Row with Line Chart"
                        subtitle="Zero Data"
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
                            <Toggle key="toggle" />
                        ]}
                    />
                    <ExpandableRow
                        title="Expanded Row with Line Chart"
                        subtitle="Zero values"
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
                            <Toggle key="toggle"/>
                        ]}
                    />
                </ExpandableRow.SimpleWrapper>
            </div>
        );
    }
}

module.exports = ExpandableRowDemo;
