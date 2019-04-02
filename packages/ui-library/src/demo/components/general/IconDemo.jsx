import React from "react";
import Icon, { iconSizes } from "ui-library/lib/components/general/Icon";
import InputRow from "ui-library/lib/components/layout/InputRow";
import Text from "ui-library/lib/components/general/Text";
import HR from "ui-library/lib/components/general/HR";


/**
* @name IconDemo
* @memberof Icon
* @desc A demo for Icon component
*/
const IconDemo = () => {
    return (
        <div>
            <InputRow>
                <Icon iconName="globe" data-id="myicon" type="leading" /> A simple icon next to text
            </InputRow>
            <InputRow>
                <Icon iconName="cog">
                    An icon with "content".  Icon content will be indented
                    <br/> even if the it wraps to the following line(s).
                </Icon>
            </InputRow>
            <InputRow>
                <Icon iconName="earth">
                    <div className="textblock textblock--primary">Special Icon Styling</div>
                    <div className="textblock">
                        Special icon title and description styling exists for targeted use.
                    </div>
                </Icon>
            </InputRow>
            <InputRow>
                <Icon iconName="globe" iconSize={iconSizes.XL} title="hello" stackGap="ZERO">
                    <Text type="value">Icon with multiple lines and title</Text>
                    <Text type="error">Number of failed attempts 1/000</Text>
                </Icon>
            </InputRow>
            <HR />
            <InputRow>
                We can also render simple icons:
                <Icon iconName="user-directory" type="inline" />
                <Icon iconName="chat" type="inline" />
                <Icon iconName="code" type="inline" />
                <Icon iconName="puzzle" type="inline" />
            </InputRow>
            <InputRow>
                <Icon iconName="facebook" iconSize={iconSizes.XL} title="hello" stackGap="ZERO">
                    <Text type="value">Icon with multiple lines and title</Text>
                    <Text type="error">Number of failed attempts 1/000</Text>
                </Icon>
                <Icon iconName="twitter" iconSize={iconSizes.XL} title="hello" stackGap="ZERO">
                    <Text type="value">Icon with multiple lines and title</Text>
                    <Text type="error">Number of failed attempts 1/000</Text>
                </Icon>
            </InputRow>
        </div>
    );
};

module.exports = IconDemo;
