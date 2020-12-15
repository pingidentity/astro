import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '../components/Box';
import Card from '../components/Card';
import FloatLabelInput from '../components/FloatLabelInput';
import ProductIcon from '../components/ProductIcon';
import RadioButton from '../components/RadioButton';
import RadioButtonGroup from '../components/RadioButtonGroup';
import Text from '../components/Text';

const Option = (props) => {
    const { label } = props;
    const [option1Value, onOption1ValueChange] = useState();
    return (
        <FloatLabelInput
            value={option1Value}
            onValueChange={onOption1ValueChange}
            maxWidth="column"
            label={label}
        />
    );
};

Option.propTypes = {
    label: PropTypes.string.isRequired,
};

const ProductOption = (props) => {
    const { product, productTitle, productDescription } = props;
    const content = (
        <>
            <Box isRow hGap="md" marginBottom="20px">
                <ProductIcon product={product} />
                <Box vGap="xs">
                    <Text type="title-item">{productTitle}</Text>
                    <Text>{productDescription}</Text>
                </Box>
            </Box>
            <RadioButtonGroup name={product}>
                <RadioButton
                    label="I have already set this up."
                    value={`${product}-option1`}
                    checkedContent={<Option label="Enter Admin URL" />}
                />
                <RadioButton
                    label="Show me how to deploy it myself."
                    value={`${product}-option2`}
                    checkedContent="Full step-by-step instructions will be available at the end of this wizard."
                />
            </RadioButtonGroup>
        </>
    );

    return (
        <Card marginBottom="40px">
            {content}
        </Card>
    );
};

ProductOption.propTypes = {
    product: PropTypes.string.isRequired,
    productTitle: PropTypes.string.isRequired,
    productDescription: PropTypes.string.isRequired,
};

const WizardStep2 = () => (
    <Box>
        <Text type="title-section" mb="lg">
            How are you deploying these services?
        </Text>
        <Box maxWidth="50%">
            <ProductOption
                product="pingfederate"
                productTitle="PingFederate"
                productDescription="This is a description for PingFederate as a product..."
            />
            <ProductOption
                product="pingid"
                productTitle="PingID"
                productDescription="This is a description for PingID as a product..."
            />
            <ProductOption
                product="p14C"
                productTitle="PingOne for Customers"
                productDescription="This is a description for PingOne for Customers as a product..."
            />
        </Box>
    </Box>
);

export default WizardStep2;
