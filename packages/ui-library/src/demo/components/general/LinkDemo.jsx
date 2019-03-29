var React = require("react");
var Link = require("./../../../components/general/Link");
import HR from "ui-library/lib/components/general/HR";

/**
* @name LinkDemo
* @memberof Link
* @desc A demo for Link component
*/
const LinkDemo = () => {
    return (
        <div>
            <Link title="A link" url="#" type="block"/>
            &nbsp;
            <Link title="A link with a count" url="#" count="1" type="block" />
            &nbsp;
            <Link title="A link with an icon" url="#" icon="cog" type="block" />
            &nbsp;
            <Link className="more-on-topic" title="More on this topic" url="#" icon="alert" type="block" />
            <HR />
            <p>
                Here's a <Link url="https:/pingidentity.com" target="_blank">simple link</Link> in a block of text.
            </p>
            <p>
                Here's a <Link href="https:/pingidentity.com" target="_blank">simple link</Link> in
                a block of text using the href prop.
            </p>
            <p>
                <Link type="add">Add link</Link> and a <Link type="remove">Remove link</Link>
            </p>
        </div>
    );
};

module.exports = LinkDemo;
