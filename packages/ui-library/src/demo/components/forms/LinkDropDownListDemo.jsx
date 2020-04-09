
import React from "react";
import LinkDropDownList from "ui-library/lib/components/forms/LinkDropDownList";
import FlexRow, { spacingOptions, alignments, justifyOptions } from "ui-library/lib/components/layout/FlexRow";
import InputRow from "ui-library/lib/components/layout/InputRow";
import HR from "ui-library/lib/components/general/HR";
import Icon, { iconSizes, iconTypes } from "ui-library/lib/components/general/Icon";
import Stack from "ui-library/lib/components/layout/Stack";
import Text, { textTypes } from "ui-library/lib/components/general/Text";
import Padding, { sizes } from "ui-library/lib/components/layout/Padding";
import FormSearchBox from "ui-library/lib/components/forms/FormSearchBox";
import Spacing from "ui-library/lib/components/layout/Spacing";

/**
* @name LinkDropDownListDemo
* @memberof LinkDropDownList
* @desc A demo for LinkDropDownList
*/
var _options = [
    { label: "One is the loneliest number", value: "1" },
    { label: "Two", value: "2", disabled: true },
    { label: "Three", value: "3" },
    { label: "Four", value: "4" },
    { label: "Five", value: "5" },
    { label: "Six", value: "6" },
    { label: "Seven", value: "7" },
    { label: "Eight", value: "8" },
    { label: "Nine", value: "9" },
    { label: "Ten", value: "10" }
];

const LicenseOption = ({
    created,
    envCount,
    expires,
    renewed,
    type,
}) => (
    <Padding vertical={sizes.SM}>
        <FlexRow spacing={spacingOptions.LG} justify={justifyOptions.SPACEBETWEEN} alignment={alignments.CENTER}>
            <Stack gap="XS">
                <Text type={textTypes.PARENTLABEL}>{type}</Text>
                {renewed && <Text type={textTypes.VALUE}>Renewed {renewed}</Text>}
                {created && <Text type={textTypes.VALUE}>Created {created}</Text>}
                <Text type={textTypes.VALUE}>Expires {expires}</Text>
            </Stack>
            <Stack gap="XS">
                <Icon iconName="earth" iconSize={iconSizes.LG} type={iconTypes.INLINE}/>
                <Text align={Text.alignments.CENTER} type={textTypes.VALUE}>{envCount}</Text>
            </Stack>
        </FlexRow>
    </Padding>
);

const nodeOptions = [
    {
        label: <LicenseOption type="Premier" renewed="2019-06-13" expires="2022-12-13" envCount="7/10" />,
        value: "1"
    },
    {
        disabled: true,
        label: <LicenseOption type="Trial" created="2019-06-13" expires="2022-12-13" envCount="4/5" />,
        value: "2"
    },
    {
        label: <LicenseOption type="Global" renewed="2019-06-13" expires="2022-12-13" envCount="11/15" />,
        value: "3"
    },
];
class LinkDropDownListDemo extends React.Component {
    state = {
        open: false,
        selectedOption: _options[0]
    };
    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };
    _handleClick = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        });
    };
    render() {
        return (
            <div>
                <InputRow>
                    <LinkDropDownList
                        closeOnClick={true}
                        label="Stateless Version"
                        onClick={this._handleClick}
                        onToggle={this._handleToggle}
                        open={this.state.open}
                        options={_options}
                        selectedOption={this.state.selectedOption}
                        bottomPanel={<a href="#">Link</a>}
                    />
                </InputRow>
                <LinkDropDownList
                    data-id="stateful-dropdown"
                    closeOnClick={true}
                    label="Stateful Version"
                    onClick={this._handleClick}
                    options={_options}
                    initialState={{
                        selectedOption: _options[0]
                    }}
                />
                <HR />
                <Padding left="xl"><Padding left="xl">
                    <LinkDropDownList
                        data-id="right-aligned"
                        closeOnClick={true}
                        label="Right-aligned"
                        options={_options}
                        initialState={{
                            selectedOption: _options[0]
                        }}
                        alignment={LinkDropDownList.alignments.RIGHT}
                        topPanel={
                            <Spacing spacing={Spacing.sizes.SM}>
                                <FormSearchBox noSpacing width={FormSearchBox.inputWidths.MAX} />
                            </Spacing>
                        }
                    />
                </Padding></Padding>
                <HR />
                <LinkDropDownList
                    closeOnClick={true}
                    label={<Icon inline iconName="edit"/>}
                    options={nodeOptions}
                    initialState={{
                        selectedOption: nodeOptions[0]
                    }}
                    labelArrowPosition={LinkDropDownList.labelArrowPositions.NONE}
                />
            </div>
        );
    }
}
module.exports = LinkDropDownListDemo;
