import React from "react";
import FieldSet from "../../../components/layout/FieldSet";
import FormRadioGroup from "../../../components/forms/FormRadioGroup";
import Icon from "../../../components/general/Icon";
import Text from "../../../components/general/Text";

/**
* @name FieldSetDemo
* @desc A demo for FieldSet component
*/
const FieldSetDemo = () => {
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
           
            <Text type="label">FieldSet with icon legend and text</Text>
            <FieldSet legend={<Icon iconName="earth"> Example Legend</Icon>}>
                <FormRadioGroup
                    groupName="DemoName"
                    items={[
                        { id: "1", name: "Radio 1 Demo" },
                        { id: "2", name: "Radio 2 Demo" },
                    ]}
                />
            </FieldSet>
        </div>
    );
};

module.exports = FieldSetDemo;

