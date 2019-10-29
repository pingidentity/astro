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
                    title="Stateless section"
                    collapsedText="Test"
                    onToggle={this._toggleFirst}
                    expanded={this.state.firstSectionOpen}
                >
                    {this._getContent()}
                </Section>
                <Section
                    data-id="demo-section-2"
                    title="Stateful section"
                    titleValue="Optional section value"
                >
                    {this._getContent()}
                </Section>
                <Section
                    title="Section with accessories"
                    accessories={[
                        <Button key="1" inline iconName="edit"/>,
                        <Button key="2" inline iconName="delete"/>
                    ]}
                >
                    {this._getContent()}
                </Section>
                <Section
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
                    disableExpand={true}
                >
                    {this._getContent()}
                </Section>

                <br/><br/>
                <h2>Condensed Styling</h2>
                <br/>

                <div>
                    <Section
                        condensed={true}
                        title="Section"
                    >
                        {this._getContent()}
                    </Section>
                    <Section
                        condensed={true}
                        title="Section"
                        titleValue="Optional section value"
                    >
                        {this._getContent()}
                    </Section>
                    <Section
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
                        className="extra"
                        condensed={true}
                        disableExpand={true}
                    >
                        {this._getContent()}
                    </Section>
                    <Section
                        arrowCircle
                        condensed
                        contentMargin={false}
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
