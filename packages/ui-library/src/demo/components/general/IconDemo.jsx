import React from "react";
import Icon from "ui-library/lib/components/general/Icon";
import InputRow from "ui-library/lib/components/layout/InputRow";

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
            <Icon iconName="earth">
                <div className="textblock textblock--primary">Special Icon Styling</div>
                <div className="textblock">
                    Special icon title and description styling exists for targeted use.
                </div>
            </Icon>
            <hr className="hr" />
            <InputRow>
                We can also render simple icons:
                <Icon iconName="user-directory" type="inline" />
                <Icon iconName="chat" type="inline" />
                <Icon iconName="code" type="inline" />
                <Icon iconName="puzzle" type="inline" />
            </InputRow>
        </div>
    );
};

module.exports = IconDemo;
