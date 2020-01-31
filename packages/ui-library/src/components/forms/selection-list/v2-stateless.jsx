import Button from "../../buttons/Button";
import PropTypes from "prop-types";
import React from "react";
import _ from "underscore";
import FlexRow, { justifyOptions, spacingOptions } from "../../layout/FlexRow";
import FormRadioGroup from "../FormRadioGroup";
import CheckboxGroup from "../CheckboxGroup";
import FormSearchBox from "../FormSearchBox";
import HelpHint from "../../tooltips/HelpHint";
import { ListType } from "./v2-constants";
import SegmentedBox, { boxSizes, SegmentedBoxMessage } from "../../layout/SegmentedBox";
import PipeRow, { pipeGaps } from "../../layout/PipeRow";
import Link, { linkSizes } from "../../general/Link";
import { defaultRender, translateItemsToOptions } from "../../../util/PropUtils";
import Stack, { gapSizes } from "../../layout/Stack";
import Text, { textTypes } from "../../general/Text";
import { filterFieldContains } from "../../../util/FilterUtils";

/**
 * @enum {string}
 * @alias SelectionList.ListWidths
 */
export const listWidths = {
    /** fixed */
    FIXED: "fixed",
    /** fluid */
    FLUID: "fluid",
    /** auto width */
    AUTOWIDTH: "autowidth",
    /** full width */
    FULL: "full"
};

const ValueList = ({
    "data-id": dataId,
    options
}) => (
    <Stack gap={gapSizes.SM} data-id={dataId}>
        {options.map(({
            value,
            label,
            helpHintText,
            hint = helpHintText,
        }, i) => (
            <FlexRow spacing={spacingOptions.XS} key={i} data-id={`value-item-${value}`}>
                <span>{label}</span>
                {hint && <HelpHint hintText={hint} placement="right" />}
            </FlexRow>
        ))}
    </Stack>
);

const AddOptions = ({
    "data-id": dataId,
    onValueChange,
    options
}) => {
    const valueChange = option => e => onValueChange(option, e);
    return (
        <Stack gap={gapSizes.SM} data-id={dataId}>
            {options.map(option => (
                <Text type={textTypes.VALUE} key={option.value} data-id="">
                    <Button
                        inline
                        iconName="plus"
                        data-id={`row-button-add_${option.value}`}
                        onClick={valueChange(option)}
                        disabled = {option.disabled}
                    />
                    {option.label}
                </Text>
            ))}
        </Stack>
    );
};

const itemProp = PropTypes.shape({
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
});

const optionProp = PropTypes.shape({
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
});

const listComponents = {
    [ListType.ADD]: AddOptions,
    [ListType.SINGLE]: FormRadioGroup,
    [ListType.MULTI]: CheckboxGroup,
    [ListType.MULTIADD]: CheckboxGroup,
    [ListType.VIEWONLY]: ValueList,
};

const listDataIdPostfix = {
    [ListType.ADD]: "-add-options",
    [ListType.SINGLE]: "-options-single-selection",
    [ListType.MULTI]: "-options-multi-selection",
    [ListType.MULTIADD]: "-options-multi-selection",
    [ListType.VIEWONLY]: "-read-only",
};

/**
 * @name SelectionListStateless
 * @memberof SelectionList
 * @desc This is a wrapper around the stateful (stateless=true) SelectionList.
 */
export default class SelectionListStateless extends React.Component {
    static displayName = "SelectionListStateless";

    static propTypes = {
        autoSelectAll: PropTypes.bool,
        autoFilter: PropTypes.bool,
        bottomPanel: PropTypes.node,
        "data-id": PropTypes.string,
        className: PropTypes.string,
        items: PropTypes.arrayOf(itemProp),
        labelSelectAll: PropTypes.string,
        labelUnselectAll: PropTypes.string,
        labelOnlySelected: PropTypes.string,
        labelShowAll: PropTypes.string,
        name: PropTypes.string,
        "no-border": PropTypes.bool,
        multiAddButtonLabel: PropTypes.string,
        multiAddButtonDisabledHint: PropTypes.string,
        onValueChange: PropTypes.func,
        onSelectAll: PropTypes.func,
        onSearch: PropTypes.func.isRequired,
        queryString: PropTypes.string,
        onVisibilityChange: PropTypes.func,
        options: PropTypes.arrayOf(optionProp),
        optionsNote: PropTypes.node,
        onMultiAdd: PropTypes.func,
        removeMaxHeight: PropTypes.bool,
        renderList: PropTypes.func,
        requiredText: PropTypes.string,
        showSelectionOptions: PropTypes.bool,
        showOnlySelected: PropTypes.bool,
        showSearchBox: PropTypes.bool,
        searchPlaceholder: PropTypes.string,
        selectedItemIds: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string,
            PropTypes.number
        ]),
        type: PropTypes.oneOf(Object.values(ListType)),
        width: PropTypes.oneOf(Object.values(listWidths))
    };

    static defaultProps = {
        "data-id": "selection-list",
        renderList: defaultRender,
        showSearchBox: true,
        type: ListType.SINGLE,
        showSelectionOptions: false,
        showOnlySelected: false,
        items: [],
        "no-border": false,
        multiAddButtonLabel: "Add",
        onMultiAdd: _.noop,
        onValueChange: _.noop,
        onSelectAll: _.noop,
        autoSelectAll: false,
        autoFilter: false,
    };

    _selectAll = () => {
        this.props.onSelectAll();
        if (this.props.autoSelectAll) {
            this.props.onValueChange(this._getOptions().map(({ value }) => value));
        }
    };

    _unselectAll = () => this.props.onValueChange([]);

    _onShowOnlyAllToggle = () => {
        this.props.onVisibilityChange();
    };

    /**
     * @desc Filter currently visible data on screen based on search string, toggles state, e.t.c.
     * @returns {array} the currently visible list of items
     * @private
     */
    _filterVisible = () => {
        return _.filter(this._getOptions(), (item) => {
            return this.props.selectedItemIds.indexOf(item.value) > -1;
        });
    };

    _getSelectionOptions = () => {
        var itemsSelected = typeof(this.props.selectedItemIds) === "object"
            ? this.props.selectedItemIds.length : !!this.props.selectedItemIds;

        return (
            <PipeRow data-id={this.props["data-id"]} gap={pipeGaps.SM} key="selection-options">
                <Link
                    data-id="show-only-or-all"
                    onClick={this._onShowOnlyAllToggle}
                    size={linkSizes.SM}
                >
                    {this.props.showOnlySelected ? this.props.labelShowAll : this.props.labelOnlySelected}
                </Link>
                {itemsSelected || !this.props.labelSelectAll
                    ? <Link
                        data-id="unselect-all"
                        onClick={this._unselectAll}
                        size={linkSizes.SM}
                    >
                        {this.props.labelUnselectAll}
                    </Link>
                    : <Link
                        data-id="select-all"
                        onClick={this._selectAll}
                        size={linkSizes.SM}
                    >
                        {this.props.labelSelectAll}
                    </Link>
                }
            </PipeRow>
        );
    };

    _renderMultiAddPanel = () => {
        const onClick = () => this.props.onMultiAdd(this.props.selectedItemIds);
        return (
            <FlexRow
                justify={justifyOptions.CENTER}
                key="add-panel"
            >
                <Button
                    data-id="add-button"
                    label={this.props.multiAddButtonLabel}
                    disabledText={this.props.multiAddButtonDisabledHint}
                    disabled={!!this.props.multiAddButtonDisabledHint}
                    onClick={onClick}
                    type="primary"
                />
            </FlexRow>
        );
    }

    // filter items if necessary
    _getOptions = () => {
        const {
            autoFilter,
            items,
            options = translateItemsToOptions(items),
            queryString,
        } = this.props;

        return autoFilter
            ? options.filter(_.partial(filterFieldContains, "label", queryString))
            : options;
    }

    render() {
        const {
            className,
            disabled,
            "data-id": dataId,
            name,
            "no-border": noBorder,
            onSearch,
            onValueChange,
            optionsNote,
            queryString,
            removeMaxHeight,
            renderList,
            requiredText,
            searchBoxProps,
            searchPlaceholder,
            selectedItemIds,
            showSearchBox,
            showSelectionOptions,
            type,
            width
        } = this.props;
        const visibleOptions = this.props.showOnlySelected ? this._filterVisible() : this._getOptions();

        const selectionOptions = showSelectionOptions && this._getSelectionOptions(visibleOptions);

        const searchBox = showSearchBox ? (
            <div data-id={dataId + "-search-box"} key="search">
                <FormSearchBox
                    queryString={queryString}
                    placeholder={searchPlaceholder}
                    onValueChange={onSearch}
                    width="MAX"
                    noSpacing
                    {...searchBoxProps} // band-aid fix to allow overriding the stateful text field
                />
            </div>
        ) : null;

        const bottomPanel = type === ListType.MULTIADD
            ? this._renderMultiAddPanel()
            : (this.props.bottomPanel && <div key="bottom-panel">{this.props.bottomPanel}</div>);

        const renderedTopPanel = (requiredText || searchBox || optionsNote)
            ? [
                requiredText && (
                    <SegmentedBoxMessage key="message" data-id={`${dataId}-required-message`}>
                        {requiredText}
                    </SegmentedBoxMessage>
                ),
                searchBox,
                optionsNote && <Text type={textTypes.NOTE} key="note" data-id="options-note">{optionsNote}</Text>,
            ]
            : null;
        const renderedBottomPanel = (bottomPanel || selectionOptions) ? [selectionOptions, bottomPanel] : null;

        return (
            <SegmentedBox
                data-id={dataId}
                scroll-box-data-id={`${dataId}-options`}
                className={className}
                width={
                    (width === listWidths.FLUID && boxSizes.SM) ||
                    (width === listWidths.FULL && "full") ||
                    (width !== listWidths.AUTOWIDTH && boxSizes.XS) || "none"
                }
                innerHeight={removeMaxHeight ? null : boxSizes.XS}
                border={!noBorder}
                topPanel={renderedTopPanel}
                bottomPanel={renderedBottomPanel}
            >
                {renderList({
                    "data-id": `${dataId}${listDataIdPostfix[type]}`,
                    groupName: name || `input-selection-list-items-${dataId}`,
                    stacked: true,
                    disabled,
                    queryString,
                    onValueChange,
                    options: visibleOptions,
                    value: selectedItemIds,
                    values: selectedItemIds,
                    selected: selectedItemIds,
                    setCheckboxDataId: (option, index) =>`selectionList-Checkbox-${index + 1}`, // backwards compatibility
                }, listComponents[type])}
            </SegmentedBox>
        );
    }
}
