var React = require("react");
var Link = require("./../../../components/general/Link");

/**
* @name LinkDemo
* @memberof Link
* @desc A demo for Link component
*/
const LinkDemo = () => {
    return (
        <div>
            <Link title="A link" url="#"/>
            &nbsp;
            <Link title="A link with a count" url="#" count="1"/>
            &nbsp;
            <Link title="A link with an icon" url="#" icon="cog" />
        </div>
    );
};

module.exports = LinkDemo;
