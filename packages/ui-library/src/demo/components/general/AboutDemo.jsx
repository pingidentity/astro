import React, { useCallback, useState } from "react";
import Button from "ui-library/lib/components/buttons/Button";
import { AboutModal, AboutLogo, AboutVersion } from "ui-library/lib/components/general/About";
import Text, { textTypes } from "ui-library/lib/components/general/Text";
import pingCentralDark from "../../images/PingCentral.svg";
import { partial } from "underscore";

const { BODY } = textTypes;

/**
* @name AboutDemo
* @memberof About
* @desc A demo for About
*/

const AboutDemo = () => {
    const [isShowingAbout, setIsShowingAbout] = useState(false);
    const toggleIsShowingAbout = useCallback(
        partial(setIsShowingAbout, !isShowingAbout),
        [isShowingAbout, setIsShowingAbout],
    );

    return (
        <div>
            <Button onClick={toggleIsShowingAbout}>Show Me</Button>
            <AboutModal
                modalTitle="About PingCentral"
                expanded={isShowingAbout}
                onClose={toggleIsShowingAbout}
            >
                <AboutLogo src={pingCentralDark} />
                <AboutVersion>Version 1.5.1</AboutVersion>
                <Text type={BODY}>Copyright © 2013-2020 Ping Identity Corporation. All rights reserved.</Text>
            </AboutModal>
        </div>
    );
};

export default AboutDemo;