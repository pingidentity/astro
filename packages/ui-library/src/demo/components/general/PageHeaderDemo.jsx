import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import Padding, { sizes as paddingSizes } from "ui-library/lib/components/layout/Padding";
//eslint-disable-next-line import/no-extraneous-dependencies
import Button from "ui-library/lib/components/buttons/Button";
//eslint-disable-next-line import/no-extraneous-dependencies
import TutorialButton from "ui-library/lib/components/buttons/TutorialButton";
//eslint-disable-next-line import/no-extraneous-dependencies
import Icon from "ui-library/lib/components/general/Icon";
//eslint-disable-next-line import/no-extraneous-dependencies
import FlexRow from "ui-library/lib/components/layout/FlexRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import Chip, { chipTypes } from "ui-library/lib/components/layout/Chip";
//eslint-disable-next-line import/no-extraneous-dependencies
import PageHeader from "ui-library/lib/components/general/PageHeader";
//eslint-disable-next-line import/no-extraneous-dependencies
import HelpHint from "ui-library/lib/components/tooltips/HelpHint";
//eslint-disable-next-line import/no-extraneous-dependencies
import Link from "ui-library/lib/components/general/Link";

import SocialIcon from "@pingux/end-user/components/SocialIcon/SocialIcon";

/**
* @name PageHeaderDemo
* @memberof PageHeader
* @desc A demo for Page Header component
*/
const PageHeaderDemo = () => {
    return (
        <div>
            <PageHeader title="A Page Header"/>
            <br/>
            <PageHeader title="A Page Header with Icon" iconName="cog"
            />
            <br/>
            <PageHeader title="A Page Header with underline" underlined={true}/>
            <br/>
            <PageHeader title="A Page Header with a subtitle" subtitle="Subtitle"/>
            <br/>
            <PageHeader
                title="A Page Header with a subtitle and image"
                subtitle="Subtitle"
                image="http://doge2048.com/meta/doge-600.png"
            />
            <br/>
            <PageHeader
                title="A Page Header with accessories"
                accessories={[
                    <Link title="Link" key="link" type="block" />,
                    <Icon iconName="cog" key="icon" type="leading" />,
                    <HelpHint placement="bottom" hintText="Provisioning" key="hint">
                        <Chip type={chipTypes.CONDENSED}>PROV</Chip>
                    </HelpHint>,
                    <Button inline key="button" label="inline" />,
                    <Chip type={chipTypes.COUNT} key="count">2</Chip>
                ]}
            />
            <PageHeader
                title={
                    <FlexRow inline>
                        <Padding right={paddingSizes.LG}>
                            A Page Header with components in title
                        </Padding>
                        <TutorialButton />
                    </FlexRow>
                }
            />
            <PageHeader title="A Page Header with icon node" iconName={<SocialIcon.MARKETO/>}/>
        </div>
    );
};

module.exports = PageHeaderDemo;
