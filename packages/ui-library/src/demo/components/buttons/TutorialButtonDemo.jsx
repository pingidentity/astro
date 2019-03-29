import React from "react";
import TutorialButton from "../../../components/buttons/TutorialButton";

export default function TutorialButtonDemo() {
    const onClick = e => console.log(e);
    return (
        <TutorialButton
            onClick={onClick}
        />
    );
}
