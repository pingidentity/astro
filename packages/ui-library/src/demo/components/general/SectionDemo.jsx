import React from "react";
import Button from "../../../components/buttons/Button";
import Indent from "../../../components/general/Indent";
import Section from "../../../components/general/Section";
import Text from "../../../components/general/Text";

/**
* @name SectionDemo
* @memberof Section
* @desc A demo for Section
*/
class SectionDemo extends React.Component {
    static flags = ["p-stateful"];

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
                    collapsedText="Test"
                    onToggle={this._toggleFirst}
                    expanded={this.state.firstSectionOpen}
                >
                    {this._getContent()}
                </Section>
                <Section
                    data-id="demo-section-2"
                    stateless={false}
                    title="Stateful section"
                    titleValue="Optional section value"
                >
                    {this._getContent()}
                </Section>
                <Section
                    title="Section with accessories"
                    stateless={false}
                    accessories={[
                        <Button key="1" inline iconName="edit"/>,
                        <Button key="2" inline iconName="delete"/>
                    ]}
                >
                    {this._getContent()}
                </Section>
                <Section
                    title="Section with details text"
                    stateless={false}
                    detailsText={{
                        expanded: "Expanded",
                        collapsed: "Collapsed"
                    }}
                >
                    {this._getContent()}
                </Section>
                <Section
                    title="Disabled section"
                    disableExpand={true}
                >
                    {this._getContent()}
                </Section>

                <br/><br/>
                <h2>Condensed Styling</h2>
                <br/>

                <div>
                    <Section
                        stateless={false}
                        condensed={true}
                        title="Section"
                    >
                        {this._getContent()}
                    </Section>
                    <Section
                        stateless={false}
                        condensed={true}
                        title="Section"
                        titleValue="Optional section value"
                    >
                        {this._getContent()}
                    </Section>
                    <Section
                        stateless={false}
                        condensed={true}
                        title="Section with accessories"
                        accessories={[
                            <Button key="1" inline iconName="edit"/>,
                            <Button key="2" inline iconName="delete"/>
                        ]}
                    >
                        {this._getContent()}
                    </Section>
                    <Section
                        stateless={false}
                        condensed={true}
                        title="Section with details text"
                        detailsText={{
                            expanded: "Expanded",
                            collapsed: "Collapsed"
                        }}
                    >
                        {this._getContent()}
                    </Section>
                    <Section
                        title="Disabled section"
                        condensed={true}
                        disableExpand={true}
                    >
                        {this._getContent()}
                    </Section>
                    <Section
                        arrowCircle
                        condensed
                        contentMargin={false}
                        flags={["p-stateful"]}
                        title="With no left margin on content"
                        underlined={false}
                    >
                        <Indent border title="all" colors>
                            <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                            </Text>
                            <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                            </Text>
                            <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                            </Text>
                            <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                            </Text>
                            <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                            </Text>
                            <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                            </Text>
                            <Section
                                condensed
                                contentMargin={false}
                                flags={["p-stateful"]}
                                title="No margin"
                                underlined={false}
                            >
                                <Indent border={true} title="any" colors>
                                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                                    </Text>
                                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                                    </Text>
                                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                                    </Text>
                                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                                    </Text>
                                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                                    </Text>
                                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque dignissim maximus.
                                    </Text>
                                </Indent>
                            </Section>
                        </Indent>
                    </Section>
                </div>
                <br/>
            </div>
        );
    }
}

module.exports = SectionDemo;
