import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiCellphoneIphone } from '@mdi/js';
import DeviceSelector, {
    DeviceSelectorDescription as Description,
    DeviceSelectorTitle as Title,
    DeviceSelectorOption,
} from '../../src/components/DeviceSelector';
import PopoverMenu from '../../src/components/PopoverMenu';
import TextBlock from '../../src/components/TextBlock';
import SaveableTextInput from '../../src/components/SaveableTextInput';

export default {
    title: 'Templates/Layouts/DeviceSelector',
    component: DeviceSelector,
};

export const Default = () => {
    const [isEditing, setIsEditing] = useState();
    const [itemTitle, setItemTitle] = useState('iPhone');
    const [itemTitleDraft, setItemTitleDraft] = useState(itemTitle);

    return (
        <DeviceSelector>
            <DeviceSelectorOption
                icon={<Icon path={mdiCellphoneIphone} size="32px" color="#3d454d" />}
                controls={
                    <PopoverMenu
                        buttons={[
                            {
                                label: 'Set as Default',
                                onClick: () => console.log('Set as Default clicked!'),
                                id: 'setDefault',
                            },
                            {
                                label: 'Edit Name',
                                onClick: () => setIsEditing('iphone1'),
                                id: 'editNamed',
                            },
                            {
                                label: <span style={{ color: '#a31300' }}>Remove</span>,
                                onClick: () => console.log('Remove clicked!'),
                                id: 'remove',
                            },
                        ]}
                    />
                }
            >
                { isEditing
                    ? <SaveableTextInput
                        value={itemTitleDraft}
                        onChange={(e) => {
                            setItemTitleDraft(e.target.value);
                        }}
                        onSave={() => {
                            setItemTitle(itemTitleDraft);
                            setIsEditing(false);
                        }}
                        onCancel={() => {
                            setItemTitleDraft(itemTitle);
                            setIsEditing(false);
                        }}
                    />
                    : (
                        <>
                            <Title>{itemTitle}</Title>
                            <Description>Test Description</Description>
                        </>
                    )
                }
            </DeviceSelectorOption>
        </DeviceSelector>
    );
};
