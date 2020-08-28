import React, { useState } from "react";
import Slider from "../../../components/general/Slider";
import Text from "../../../components/general/Text";

/**
* @name SliderDemo
* @memberof Slider
* @desc A demo for Slider
*/

function SliderDemo({ }) {
    const [single, setSingle] = useState(0);
    const [singleWithDefault, setSingleWithDefault] = useState(null);
    const [singleWithSteps, setSingleWithSteps] = useState(0);
    const [singleWithSingleBackground, setSingleWithSingleBackground] = useState(25);
    const [singleWithLowerBackground, setSingleWithLowerBackground] = useState(0);
    const [singleWithSolid, setSingleWithSolid] = useState(0);
    const [singleWithCustomSolid, setSingleWithCustomSolid] = useState(0);
    const [multiple, setMultiple] = useState([0, 1]);
    const [multipleWithDefault, setMultipleWithDefault] = useState([null]);
    const [multipleWithSteps, setMultipleWithSteps] = useState([0, 50]);
    const [multipleWithGradient, setMultipleWithGradient] = useState([10, 80]);
    const [multipleWithCustomGradient, setMultipleWithCustomGradient] = useState([0, 1]);
    const disabled = 25;
    const [color, setColor] = useState([{ color: "#a9d732", point: 0 }, { color: null, point: 100 }]);

    const setColorAndValue = (val) => {
        if (val < 25) {
            setColor([{ color: "#a9d732", point: val }, { color: null, point: 100 }]);
        } else if (val < 50) {
            setColor([{ color: "#e2d714", point: val }, { color: null, point: 100 }]);
        } else if (val < 75) {
            setColor([{ color: "#e78726", point: val }, { color: null, point: 100 }]);
        } else if (val < 100) {
            setColor([{ color: "#eb2c38", point: val }, { color: null, point: 100 }]);
        }

        setSingleWithLowerBackground(val);
    };

    return (
        <div>
            <Text type="label">Single ({single})</Text>
            <Slider
                value={single}
                onValueChange={val => setSingle(val)}
            />
            <Text type="label">Single with default value ({singleWithDefault})</Text>
            <Slider
                defaultValue={40}
                onValueChange={val => setSingleWithDefault(val)}
            />
            <Text type="label">Single with steps & custom max/min ({(singleWithSteps)})</Text>
            <Slider
                value={singleWithSteps}
                max={50}
                min={0}
                steps={5}
                onValueChange={val => setSingleWithSteps(val)}
            />
            <Text type="label">Single with single value background ({singleWithSingleBackground})</Text>
            <Slider
                value={singleWithSingleBackground}
                onValueChange={val => setSingleWithSingleBackground(val)}
                background="#a9d732"
            />
            <Text type="label">Single with solid lower background ({singleWithLowerBackground})</Text>
            <Slider
                value={singleWithLowerBackground}
                onValueChange={val => setColorAndValue(val)}
                background={color}
                backgroundVariant="solid"
            />
            <Text type="label">Single with solid background ({singleWithSolid})</Text>
            <Slider
                value={singleWithSolid}
                onValueChange={val => setSingleWithSolid(val)}
                background={["#a9d732" ,"#e2d714", "#e78726", "#eb2c38"]}
                backgroundVariant="solid"
            />
            <Text type="label">Single with solid background and custom point values ({singleWithCustomSolid})</Text>
            <Slider
                value={singleWithCustomSolid}
                onValueChange={val => setSingleWithCustomSolid(val)}
                background={[{ color: "#a9d732", point: 25 },
                    { color: "#e2d714", point: 75 },
                    { color: "#eb2c38", point: 100 }
                ]}
                backgroundVariant="solid"
            />
            <Text type="label">Multiple ({multiple.toString()})</Text>
            <Slider
                value={multiple}
                onValueChange={val => setMultiple(val)}
            />
            <Text type="label">Multiple with default value ({multipleWithDefault.toString()})</Text>
            <Slider
                defaultValue={[25, 75]}
                onValueChange={val => setMultipleWithDefault(val)}
            />
            <Text type="label">Multiple with steps ({multipleWithSteps.toString()})</Text>
            <Slider
                value={multipleWithSteps}
                onValueChange={val => setMultipleWithSteps(val)}
                steps={5}
            />
            <Text type="label">Multiple with gradient background ({multipleWithGradient.toString()})</Text>
            <Slider
                value={multipleWithGradient}
                onValueChange={val => setMultipleWithGradient(val)}
                background={["#a9d732", "#e2d714", "#e78726", "#eb2c38"]}
                backgroundVariant="gradient"
            />
            <Text type="label">
                Multiple with gradient background and custom point values ({multipleWithCustomGradient.toString()})
            </Text>
            <Slider
                value={multipleWithCustomGradient}
                onValueChange={val => setMultipleWithCustomGradient(val)}
                background={[
                    { color: "#a9d732", point: 10 },
                    { color: "#e2d714", point: 50 },
                    { color: "#eb2c38", point: 90 }
                ]}
                backgroundVariant="gradient"
            />
            <Text type="label">Disabled ({disabled})</Text>
            <Slider
                value={disabled}
                disabled
            />
        </div>
    );
}

export default SliderDemo;