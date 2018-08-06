const React = require("react");
const PageHeader = require("./../../../components/general/PageHeader");
const HelpHint = require("./../../../components/tooltips/HelpHint");
const Link = require("./../../../components/general/Link");

/**
* @name PageHeaderDemo
* @memberof PageHeader
* @desc A demo for Page Header component
*/
const PageHeaderDemo = () => {
    return (
        <div>
            <PageHeader title="A Page Header" />
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
                    <Link title="Link" key="link" />,
                    <span className="icon-cog" key="icon" />,
                    <HelpHint className="width-auto bottom" hintText="Provisioning" key="hint">
                        <label className="row-help">PROV</label>
                    </HelpHint>,
                    <button className="inline" key="button">Inline Button</button>,
                    <span className="count" key="count">2</span>
                ]}
            />
        </div>
    );
};

module.exports = PageHeaderDemo;
