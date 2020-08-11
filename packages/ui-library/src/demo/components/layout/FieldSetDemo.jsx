import React, { Component } from "react";
import FieldSet from "../../../components/layout/FieldSet";
import FormRadioGroup from "../../../components/forms/FormRadioGroup";
import Icon from "../../../components/general/Icon";
import Text from "../../../components/general/Text";

/**
* @name FieldSetDemo
* @desc A demo for FieldSet component
*/

export default class FieldSetDemo extends Component {

    state = {
        radioSelected: null,
    }

    _handleSelectChange = dataId => value => {
        this.setState({
            [dataId]: value
        });
    };

    render() {
        return (
            <div>
                <Text type="label">FieldSet without legend</Text>
                <FieldSet>
                    <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris at maximus nibh.
                    </Text>
                </FieldSet>

            &nbsp;

                <Text type="label">FieldSet with legend</Text>
                <FieldSet legend="Example Legend">
                    <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris at maximus nibh. Donec vehicula feugiat massa,
                    eget pharetra nisl placerat sollicitudin. Duis lectus dolor,
                    euismod ac nisi et, faucibus accumsan tellus. Curabitur aliquam finibus iaculis.
                    Etiam luctus orci purus, et euismod ex aliquet nec. Etiam congue ac leo commodo commodo.
                    </Text>
                </FieldSet>

            &nbsp;

                <Text type="label">FieldSet with icon legend and text and Full Width</Text>
                <FieldSet legend={<Icon iconName="earth"> Example Legend</Icon>}>
                    <FormRadioGroup
                        groupName="DemoName"
                        data-id="radio"
                        items={[
                            { id: "1", name: "Radio 1 Demo" },
                            { id: "2", name: "Radio 2 Demo" },
                        ]}
                        selected={this.state.radioSelected}
                        onValueChange={this._handleSelectChange("radioSelected")}
                    />
                </FieldSet>
                &nbsp;
                <Text type="label">Full width fieldset</Text>
                <FieldSet legend="I'm full width" isFullWidth>
                    <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris at maximus nibh.
                    </Text>
                </FieldSet>

            </div>
        );
    }
}


