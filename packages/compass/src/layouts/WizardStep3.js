import React from 'react';

import PlusIcon from '@mdi/svg/svg/plus.svg';
import Box from '../components/Box';
import Text from '../components/Text';
import Card from '../components/Card';
import ProductIcon from '../components/ProductIcon';
import DividedBox from '../components/DividedBox';
import Input from '../components/Input';
import Field from '../components/Field';

const WizardStep3 = () => (
    <Box>
        <Text type="title-section" mb="lg">
            Name and describe your environment.
        </Text>

        <Box maxWidth="50%">
            <Card
                header={(
                    <Box flexDirection="row" alignItems="center">
                        <Text type="title-section" mr="md">Services</Text>
                        <DividedBox
                            divider={<PlusIcon />}
                            gap="sm"
                            isRow
                        >
                            <div><ProductIcon product="p14C" /></div>
                            <div><ProductIcon product="pingfederate" /></div>
                            <div><ProductIcon product="pingid" /></div>
                        </DividedBox>
                    </Box>
                )}
            >
                <>
                    <Box mb="md">
                        <Text ml="auto">All fields are required</Text>
                    </Box>

                    <Box maxWidth="column">
                        <Field label="Enviroment Name">
                            <Input placeholder="Type to enter" />
                        </Field>
                    </Box>
                </>
            </Card>
        </Box>
    </Box>
);

export default WizardStep3;
