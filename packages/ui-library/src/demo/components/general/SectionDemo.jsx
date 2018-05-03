var React = require("react"),
    Section = require("../../../components/general/Section");

import Button from "../../../components/buttons/Button";

/**
* @name SectionDemo
* @memberof Section
* @desc A demo for Section
*/
class SectionDemo extends React.Component {
    state = {
        firstSectionOpen: false
    };

    _toggleFirst = () => {
        this.setState({
            firstSectionOpen: !this.state.firstSectionOpen
        });
    };

    _getContent = () => {
        return (
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas lectus vulputate
                diam porta rhoncus. Aenean sollicitudin nunc dui, eget cursus nisi interdum vitae. Donec
                nec justo quis velit ullamcorper dictum vel sed quam. Etiam purus libero, porttitor
                vitae risus ac, venenatis luctus lacus.
            </div>
        );
    }

    render() {
        return (
            <div>

                <br/>
                <h2>Default Styling</h2>
                <br/>

                <Section
                    data-id="demo-section-1"
                    stateless={true}
                    title="Stateless section"
                    onToggle={this._toggleFirst}
                    expanded={this.state.firstSectionOpen}>
                    {this._getContent()}
                </Section>
                <Section
                    data-id="demo-section-2"
                    stateless={false}
                    title="Stateful section"
                    titleValue="Optional section value">
                    {this._getContent()}
                </Section>
                <Section
                    title="Section with accessories"
                    stateless={false}
                    accessories={[
                        <Button inline iconName="edit"/>,
                        <Button inline iconName="delete"/>
                    ]}>
                    {this._getContent()}
                </Section>
                <Section
                    title="Disabled section"
                    disableExpand={true}>
                    {this._getContent()}
                </Section>

                <br/><br/>
                <h2>Condensed Styling</h2>
                <br/>

                <div>
                    <Section
                        stateless={false}
                        condensed={true}
                        title="Section">
                        {this._getContent()}
                    </Section>
                    <Section
                        stateless={false}
                        condensed={true}
                        title="Section"
                        titleValue="Optional section value">
                        {this._getContent()}
                    </Section>
                    <Section
                        stateless={false}
                        condensed={true}
                        title="Section with accessories"
                        accessories={[
                            <Button inline iconName="edit"/>,
                            <Button inline iconName="delete"/>
                        ]}>
                        {this._getContent()}
                    </Section>
                    <Section
                        title="Disabled section"
                        className="extra"
                        condensed={true}
                        disableExpand={true}>
                        {this._getContent()}
                    </Section>
                </div>

                <br/>
            </div>
        );
    }
}

module.exports = SectionDemo;
