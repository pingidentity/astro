var React = require("react");
var Indent = require("./../../../components/general/Indent");
var Link = require("./../../../components/general/Link");

/**
* @name IndentDemo
* @memberof Indent
* @desc A demo for Indent
*/
class IndentDemo extends React.Component {
    state = {
        selectedLabel: "No link clicked"
    };

    _handleOnClick = () => {
        this.setState({
            selectedLabel: "Link clicked"
        });
    };

    render() {
        return (
            <div>
                <strong>
                    Basic Indent Component
                </strong>
                <br />
                <Indent title="all" className="primary">

                    <Link icon="cabinet" title="HR Apps Base Policy" url="#" type="block" />
                    <Indent title="any">
                        <Link icon="thumb" title="Rule.. truncates" url="#" type="block" />
                        <Link icon="thumb" title="HR Group" url="#" type="block" />
                    </Indent>

                    <Link icon="cabinet" title="HR Apps Advanced Policy" url="#" type="block" />
                    <Indent title="all">
                        <Link icon="cog" title="Modify Attributes" url="#" type="block" />
                        <Link icon="cog" title="Rewrite Last Name" url="#" type="block" />
                    </Indent>

                    <Link icon="cabinet" title="HR Apps Policy Extension" url="#" type="block" />
                    <Indent title="all">
                        <Link icon="thumb" title="Using In-Office IP" url="#" type="block" />
                        <Link icon="thumb" title="Using Secure Browser" url="#" type="block" />
                    </Indent>

                </Indent>
                <br /><br />

                <strong>
                    With Count
                </strong>
                <br />
                <Indent title="all">
                    <Link title="HR Apps Base Policy" url="#" count="2" type="block" />
                    <Indent title="any">
                        <Link icon="cog" title="Rule.. truncates" url="#" type="block" />
                        <Link icon="thumb" title="HR Group" url="#" type="block" />
                    </Indent>
                </Indent>
                <br /><br />

                <strong>
                    Single Indent, No URL, Click Events
                </strong>
                <br />
                <Indent title="all">
                    <Link icon="cog"
                        title="Basic Content Rewrite"
                        onClick={this._handleOnClick}
                        type="block"
                    />
                    <Link icon="thumb"
                        title="Super User Group"
                        onClick={this._handleOnClick}
                        type="block"
                    />
                </Indent>
                <br/>
                <div>This link clicked = {this.state.selectedLabel}</div>
                <br /><br />

                <strong>
                    Indent with One Sub-Group, Passing ClassName to Link
                </strong>
                <br />
                <Indent title="all">
                    <Link icon="cabinet" title="Advanced Content Rewrite" url="#" className="example" type="block" />
                    <Indent>
                        <Link icon="cog" title="Basic Content Rewrite" url="#" className="example" type="block" />
                        <Link icon="thumb" title="Super User Group" url="#" className="example" type="block" />
                    </Indent>
                </Indent>
                <br /><br />

                <strong>
                    Indent with No Border, No Parent Title, One Disabled Link
                </strong>
                <br />
                <Indent border={false}>
                    <Link icon="cabinet" title="Advanced Content Rewrite" url="#" type="block" />
                    <Link icon="cog" title="Basic Content Rewrite" url="#" type="block" />
                    <Link icon="thumb" title="Super User Group" url="#" disabled={true} type="block" />
                </Indent>
                <br /><br />

                <strong>
                    Indent with No Border, No Parent Title, and Other Children
                </strong>
                <br />
                <Indent border={false}>
                    <div>This content area can contain any data.</div>
                    <ul className="ul">
                        <li>Test Item One</li>
                        <li>Test Item Two</li>
                    </ul>
                </Indent>
                <br />

                <strong>
                    Two Indents, Separated by a Link (example of icon on right)
                </strong>
                <br />
                <Indent border={true} title="all">
                    <Link icon="cabinet" title="Advanced Content Rewrite" url="#" type="block" />
                    <Link icon="cog" className="text-first" title="Basic Content Rewrite" url="#" type="block" />
                </Indent>
                <Link icon="cabinet" title="Advanced Content Rewrite" url="#" className="detached" type="block" />
                <Indent border={true} title="any">
                    <Link icon="cabinet" title="Advanced Content Rewrite" url="#" type="block" />
                    <Link icon="cog" title="Basic Content Rewrite" url="#" type="block" />
                </Indent>
                <br /><br />

                <strong>
                    Two Grouped Indents
                </strong>
                <br />
                <Indent border={true} title="all" className="grouped">
                    <Link icon="cabinet" title="Advanced Content Rewrite" url="#" type="block" />
                    <Link icon="cog" title="Basic Content Rewrite" url="#" type="block" />
                </Indent>
                <Indent border={true} title="any">
                    <Link icon="cabinet" title="Advanced Content Rewrite" url="#" type="block" />
                    <Link icon="cog" title="Basic Content Rewrite" url="#" type="block" />
                </Indent>
                <br />
            </div>
        );
    }
}

module.exports = IndentDemo;
