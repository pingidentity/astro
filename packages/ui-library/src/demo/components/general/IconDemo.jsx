import React from "react";
import HR from "ui-library/lib/components/general/HR";
import Icon, { iconSizes, iconTypes, iconColors } from "ui-library/lib/components/general/Icon";
import InputRow from "ui-library/lib/components/layout/InputRow";
import Text, { textTypes } from "ui-library/lib/components/general/Text";


/**
* @name IconDemo
* @memberof Icon
* @desc A demo for Icon component
*/
const IconDemo = () => {
    return (
        <div>
            <InputRow>
                <Icon iconName="globe" data-id="myicon" type={iconTypes.LEADING} /> A simple icon next to text
            </InputRow>
            <InputRow>
                <Icon iconName="cog">
                    An icon with "content".  Icon content will be indented
                    <br/> even if the it wraps to the following line(s).
                </Icon>
            </InputRow>
            <InputRow>
                <Icon iconName="earth" color={iconColors.WARNING}>
                    <Text type={textTypes.PRIMARY}>Special Icon Styling</Text>
                    <Text>
                        Special icon title and description styling exists for targeted use.
                    </Text>
                </Icon>
            </InputRow>
            <InputRow>
                <Icon iconName="globe" iconSize={iconSizes.XL} title="hello" stackGap="ZERO">
                    <Text type={textTypes.VALUE}>Icon with multiple lines and title</Text>
                    <Text type={textTypes.ERROR}>Number of failed attempts 1/000</Text>
                </Icon>
            </InputRow>
            <HR />
            <InputRow>
                We can also render simple icons:
                <Icon iconName="user_directory" type={iconTypes.INLINE} />
                <Icon iconName="chat" type={iconTypes.INLINE} color={iconColors.SUCCESS} />
                <Icon iconName="code" type={iconTypes.INLINE} />
                <Icon iconName="puzzle" type={iconTypes.INLINE} color={iconColors.ERROR} />
            </InputRow>
            <InputRow>
                <Icon iconName="facebook" iconSize={iconSizes.XL} title="hello" stackGap="ZERO">
                    <Text type={textTypes.VALUE}>Icon with multiple lines and title</Text>
                    <Text type={textTypes.ERROR}>Number of failed attempts 1/000</Text>
                </Icon>
                <Icon iconName="twitter" iconSize={iconSizes.XL} title="hello" stackGap="ZERO">
                    <Text type={textTypes.VALUE}>Icon with multiple lines and title</Text>
                    <Text type={textTypes.ERROR}>Number of failed attempts 1/000</Text>
                </Icon>
            </InputRow>
            <HR />
            <InputRow>
                <Text type={textTypes.VALUE}>Icon Sizes:</Text>
            </InputRow>
            <InputRow>
                <Icon iconName="cogs" iconSize={iconSizes.SM}>
                    <Text type={textTypes.PRIMARY}>Small</Text>
                </Icon>
            </InputRow>
            <InputRow>
                <Icon iconName="cogs" iconSize={iconSizes.MD}>
                    <Text type={textTypes.PRIMARY}>Medium</Text>
                </Icon>
            </InputRow>
            <InputRow>
                <Icon iconName="cogs" iconSize={iconSizes.LG}>
                    <Text type={textTypes.PRIMARY}>Large</Text>
                </Icon>
            </InputRow>
            <InputRow>
                <Icon iconName="cogs" iconSize={iconSizes.XL}>
                    <Text type={textTypes.PRIMARY}>X-Large</Text>
                </Icon>
            </InputRow>
            <InputRow>
                <Icon iconName="cogs" iconSize={iconSizes.XXL}>
                    <Text type={textTypes.PRIMARY}>XX-Large</Text>
                </Icon>
            </InputRow>
        </div>
    );
};

module.exports = IconDemo;
