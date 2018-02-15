var React = require("react");
var Icon = require("./../../../components/general/Icon");

/**
* @name IconDemo
* @memberof Icon
* @desc A demo for Icon component
*/
const IconDemo = () => {
    return (
        <div>
            <div className="input-row">
                <Icon iconName="globe" data-id="myicon" /> A simple icon next to text
            </div>
            <div className="input-row">
                <Icon iconName="cog">
                    An icon with "content".  Icon content will be indented
                    <br/> even if the it wraps to the following line(s).
                </Icon>
            </div>
            <Icon iconName="earth">
                <div className="text text--primary">Special Icon Styling</div>
                <div className="text">
                    Special icon title and description styling exists for targeted use.
                </div>
            </Icon>
        </div>
    );
};

module.exports = IconDemo;
