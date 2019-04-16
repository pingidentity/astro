import React from "react";
import Image, { imageSizes } from "../../../components/general/Image";
import InputRow from "../../../components/layout/InputRow";
import Padding, { sizes } from "../../../components/layout/Padding";

/**
* @name ImageDemo
* @memberof Image
* @desc A demo for Image
*/

const onClick = console.log("The image was clicked.");

const ImageDemo = () => (
    <div>
        <InputRow>
            <Image
                alt="The Ping Identity logo"
                size={imageSizes.AUTO}
                source="src/demo/images/favicon.png"
            />
            <Padding
                right={sizes.SM}
            />
            An image sized to its container
        </InputRow>
        <InputRow>
            <Image
                alt="The Ping Identity logo"
                onClick={onClick}
                size={imageSizes.SM}
                source="src/demo/images/favicon.png"
            />
            <Padding
                right={sizes.SM}
            />
            An image with a size of "SM"
        </InputRow>
    </div>
);

export default ImageDemo;
