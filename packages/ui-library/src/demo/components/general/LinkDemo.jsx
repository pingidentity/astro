var React = require("react");
import HR from "ui-library/lib/components/general/HR";
import Link, { linkTypes, iconColors } from "ui-library/lib/components/general/Link";

/**
* @name LinkDemo
* @memberof Link
* @desc A demo for Link component
*/
const LinkDemo = () => {
    return (
        <div>
            <Link title="A link" url="#" type={linkTypes.BLOCK} />
            &nbsp;
            <Link title="A link with a count" url="#" count="1" type={linkTypes.BLOCK} />
            &nbsp;
            <Link title="A link with an icon" url="#" icon="cog" type={linkTypes.BLOCK} />
            &nbsp;
            <Link
                title="More on this topic"
                url="#"
                icon="alert"
                type={linkTypes.BLOCK}
                iconColor={iconColors.ACTIVE}
            />
            <HR />
            <p>
                Here's a <Link url="https:/pingidentity.com" target="_blank">simple link</Link> in a block of text.
            </p>
            <p>
                Here's a <Link href="https:/pingidentity.com" target="_blank">simple link</Link> in
                a block of text using the href prop.
            </p>
            <p>
                <Link type={linkTypes.ADD}>Add link</Link> and a <Link type={linkTypes.REMOVE}>Remove link</Link> and
            </p>
            <p>
                <Link type={linkTypes.PAGE_RETURN}>Return to Page</Link>
            </p>
        </div>

    );
};

Link.linkTypes = linkTypes;
module.exports = LinkDemo;
