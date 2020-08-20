import React, { useState } from "react";
import Slider from "../../../components/general/Slider";

import Label from "ui-library/lib/components/forms/FormLabel";
import tinygradient from "tinygradient";



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
    const [multipleWithSteps, setMultipleWithSteps] = useState([30, 50]);
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

    const dangerGradient = tinygradient(["#a9d732", "#e2d714", "#e78726", "#eb2c38"]);

    return (
        <div>
            <Label detached>Single ({single})</Label>
            <Slider
                defaultValue={9}
                onValueChange={val => setSingle(val)}
            />
            <Label detached>Single with default value ({singleWithDefault})</Label>
            <Slider
                defaultValue={40}
                onValueChange={val => setSingleWithDefault(val)}
            />
            <Label detached>Single with steps & custom max/min ({(singleWithSteps)})</Label>
            <Slider
                value={singleWithSteps}
                max={50}
                min={0}
                steps={5}
                onValueChange={val => setSingleWithSteps(val)}
            />
            <Label detached>Single with single string value background ({singleWithSingleBackground})</Label>
            <Slider
                value={singleWithSingleBackground}
                onValueChange={val => setSingleWithSingleBackground(val)}
                background="#a9d732"
            />
            <Label detached>Single with solid lower background ({singleWithLowerBackground})</Label>
            <Slider
                value={singleWithLowerBackground}
                onValueChange={val => setColorAndValue(val)}
                background={color}
            />
            <Label detached>Background as function with spot gradient</Label>
            <Slider
                defaultValue={58}
                onValueChange={console.log}
                background={val => {
                    console.log(val);
                    return [{ color: dangerGradient.rgbAt(val[0]/ 100).toHexString(), point: val[0] }, { point: 100 }];
                }}
            />
            <Label detached>Single with solid background ({singleWithSolid})</Label>
            <Slider
                value={singleWithSolid}
                onValueChange={val => setSingleWithSolid(val)}
                background={["#a9d732" ,"#e2d714", "#e78726", "#eb2c38"]}
            />
            <Label detached>Single with solid background and custom point values ({singleWithCustomSolid})</Label>
            <Slider
                value={singleWithCustomSolid}
                onValueChange={val => setSingleWithCustomSolid(val)}
                background={[{ color: "#a9d732", point: 25 },
                    { color: "#e2d714", point: 75 },
                    { color: "#eb2c38", point: 100 }
                ]}
            />
            <Label detached>Background as function with spot gradient</Label>
            <Slider
                defaultValue={37}
                background={val => {
                    return [{ color: dangerGradient.rgbAt(val[0]/ 100).toHexString(), point: val[0] }, { point: 100 }];
                }}
            />
            <Label detached>Multiple ({multiple.toString()})</Label>
            <Slider
                value={multiple}
                onValueChange={val => setMultiple(val)}
            />
            <Label detached>Multiple with default value ({multipleWithDefault.toString()})</Label>
            <Slider
                defaultValue={[25, 75]}
                onValueChange={val => setMultipleWithDefault(val)}
            />
            <Label detached>Multiple with steps ({multipleWithSteps.toString()})</Label>
            <Slider
                value={multipleWithSteps}
                onValueChange={val => setMultipleWithSteps(val)}
                background={val => [{ point: val[0] }, { color: "rebeccapurple", point: val[1] }, { point: 100 }]}
                steps={5}
            />
            <Label detached>Multiple with gradient background ({multipleWithGradient.toString()})</Label>
            <Slider
                value={multipleWithGradient}
                onValueChange={val => setMultipleWithGradient(val)}
                background={["#a9d732", "#e2d714", "#e78726", "#eb2c38"]}
                backgroundVariant="gradient"
            />
            <Label detached>
                Multiple with gradient background and custom point values ({multipleWithCustomGradient.toString()})
            </Label>
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
            <Label detached>Disabled ({disabled})</Label>
            <Slider
                value={disabled}
                disabled
            />
        </div>
    );
}

export default SliderDemo;
