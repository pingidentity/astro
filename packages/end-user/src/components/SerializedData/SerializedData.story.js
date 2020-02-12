import React from 'react';
import SerializedData from './SerializedData';

export default {
    title: 'Components/Display/SerializedData',
    component: SerializedData,
};

export const Default = () => (
    <SerializedData
        data={{
            id: '6c796712-0f16-4062-815a-e0a92f4a2143',
            code: 'INVALID_DATA',
            details: [
                {
                    code: 'EMPTY_VALUE',
                    target: 'givenName',
                    message: 'Given name cannot be empty.',
                },
                {
                    code: 'OUT_OF_RANGE',
                    target: 'age',
                    message: 'Age must be between 1 and 150',
                    innerError: {
                        rangeMinimumValue: '1',
                        rangeMaximumValue: '150',
                    },
                },
            ],
        }}
    />
);
