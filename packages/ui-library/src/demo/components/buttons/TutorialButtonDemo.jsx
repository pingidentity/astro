import React from "react";
import TutorialButton from "../../../components/buttons/TutorialButton";

/**
* @name TutorialButtonDemo
* @memberof TutorialButton
* @desc A demo for TutorialButton component
 */

export default function TutorialButtonDemo() {
    const onClick = e => console.log(e);
    return (
        <TutorialButton
            onClick={onClick}
        />
    );
}
