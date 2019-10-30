
import React from "react";
import LinkDropDownList from "ui-library/lib/components/forms/LinkDropDownList";
import InputRow from "ui-library/lib/components/layout/InputRow";
import HR from "ui-library/lib/components/general/HR";
import Icon, { iconSizes } from "ui-library/lib/components/general/Icon";
import FlexRow, { spacingOptions, alignments } from "ui-library/lib/components/layout/FlexRow";
import FormLabel from "ui-library/lib/components/forms/FormLabel";
import Stack from "ui-library/lib/components/layout/Stack";
import Text from "ui-library/lib/components/general/Text";
import Padding from "ui-library/lib/components/layout/Padding";
/**
* @name LinkDropDownListDemo
* @memberof LinkDropDownList
* @desc A demo for LinkDropDownList
*/
var _options = [
    { label: "One is the loneliest number", value: "1" },
    { label: "Two", value: "2" },
    { label: "Three", value: "3" },
    { label: "Four", value: "4" },
    { label: "Five", value: "5" },
    { label: "Six", value: "6" },
    { label: "Seven", value: "7" },
    { label: "Eight", value: "8" },
    { label: "Nine", value: "9" },
    { label: "Ten", value: "10" }
];
const nodeOptions = [
    { label:
        <FormLabel value="Premier">
            <FlexRow spacing={spacingOptions.MD} alignment={alignments.CENTER}>
                <Stack gap="XS">
                    <Text type="value">Renewed 2019-06-13</Text>
                    <Text type="value">Expires 2022-12-13</Text>
                </Stack>
                <Stack gap="XS">
                    <Icon iconName="globe" iconSize={iconSizes.LG}>7/10</Icon>
                </Stack>
            </FlexRow>
        </FormLabel>, value: "1" },
    { label:
            <FormLabel value="Trial">
                <FlexRow spacing={spacingOptions.MD} alignment={alignments.CENTER}>
                    <Stack gap="XS">
                        <Text type="value">Created 2019-06-13</Text>
                        <Text type="value">Expires 2022-12-13</Text>
                    </Stack>
                    <Stack gap="XS">
                        <Icon iconName="globe" iconSize={iconSizes.LG}>4/5</Icon>
                    </Stack>
                </FlexRow>
            </FormLabel>, value: "2" },
    { label:
                <FormLabel value="Global">
                    <FlexRow spacing={spacingOptions.MD} alignment={alignments.CENTER}>
                        <Stack gap="XS">
                            <Text type="value">Renewed 2019-06-13</Text>
                            <Text type="value">Expires 2022-12-13</Text>
                        </Stack>
                        <Stack gap="XS">
                            <Icon iconName="globe" iconSize={iconSizes.LG}>11/15</Icon>
                        </Stack>
                    </FlexRow>
                </FormLabel>, value: "2" }
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
                        closeOnClick={true}
                        label="Right-aligned"
                        options={_options}
                        initialState={{
                            selectedOption: _options[0]
                        }}
                        alignment={LinkDropDownList.alignments.RIGHT}
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
