import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import CheckSVG from '@mdi/svg/svg/check-bold.svg';
import PlusSVG from '@mdi/svg/svg/plus.svg';
import { between } from '@pingux/compass-core/lib/components/Between';

import Box from '../components/Box';
import Button from '../components/Button';
import Chip from '../components/Chip';
import HR from '../components/HR';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import PopOutMenu from '../components/PopOutMenu';
import ProductIcon from '../components/ProductIcon';
import RadioButton from '../components/RadioButton';
import RadioButtonGroup from '../components/RadioButtonGroup';
import Text from '../components/Text';

export default {
    title: 'Layouts/Add Service Panel',
};

const products = {
    P14C: {
        icon: 'p14C',
        title: 'PingOne for Customers',
        description: 'Cloud-delivered customer IAM for developers',
        tags: ['Authentication Authority', 'SSO', 'MFA'],
        isAdded: false,
    },
    PD: {
        icon: 'pingdirectory',
        title: 'PingDirectory',
        description: 'High performance data store for all user',
        tags: ['Authentication Authority'],
        isAdded: false,
    },
    PF: {
        icon: 'pingfederate',
        title: 'PingFederate',
        description: 'Authentication and Single Sign-on Authority',
        tags: ['Authentication Authority', 'SSO', 'Identity Federation'],
        isAdded: true,
    },
    PID: {
        icon: 'pingid',
        title: 'PingID',
        description: 'Cloud MFA for workforce and customers',
        tags: ['MFA'],
        isAdded: true,
    },
};

const Product = (props) => {
    const {
        icon,
        title,
        description,
        tags,
        isAdded,
    } = props.product;

    const addButton = (
        <Button isInline icon="plus" onClick={() => props.onClick(props.product)}>Add</Button>
    );
    const addedBox = (
        <Box padding="4px 25px" border="1px solid #ddd" borderRadius="15px">
            <Icon component={CheckSVG} size={20} color="success.bright" />
        </Box>
    );

    return (
        <Box isRow hGap="md" alignItems="center">
            <Box alignSelf="flex-start">
                <ProductIcon product={icon} />
            </Box>
            <Box vGap="xs" flexGrow={1}>
                <Text type="title-item">{title}</Text>
                <Text type="body-weak">{description}</Text>
                <Box isRow hGap="xs">
                    {tags.map(tag => <Chip type="label">{tag}</Chip>)}
                </Box>
            </Box>
            {
                props.hasAddOption
                && (
                    <Box marginLeft="md">
                        {isAdded ? addedBox : addButton}
                    </Box>
                )
            }
        </Box>
    );
};

Product.propTypes = {
    product: PropTypes.oneOf(Object.keys(products)),
    onClick: PropTypes.func,
    hasAddOption: PropTypes.bool,
};

Product.defaultProps = {
    onClick: noop,
    hasAddOption: true,
};

const DeploymentOption = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    const checkedContent = <>This is some content</>;
    return (
        <Box vGap="md">
            <Product product={props.selected} hasAddOption={false} />
            <RadioButtonGroup
                name="productOptions"
                onValueChange={setIsSelected}
            >
                <RadioButton
                    label="Deploy a sandbox environment"
                    value="sandbox"
                    checkedContent={checkedContent}
                />
                <RadioButton
                    label="Deploy a production environment"
                    value="production"
                    checkedContent={checkedContent}
                />
            </RadioButtonGroup>
            <Box isRow hGap="xs">
                <Button type="primary" isDisabled={!isSelected} onClick={() => props.setSelected(undefined)}>Finish</Button>
                <Button type="text" onClick={() => props.setSelected(undefined)}>Cancel</Button>
            </Box>
        </Box>
    );
};

DeploymentOption.propTypes = {
    selected: PropTypes.oneOf(Object.keys(products)),
    setSelected: PropTypes.func.isRequired,
};

export const AddServiceDropdown = () => {
    const [selected, setSelected] = useState();
    const handleProductSelect = product => setSelected(product);
    const productComponents = [
        <Product product={products.P14C} onClick={handleProductSelect} />,
        <Product product={products.PD} onClick={handleProductSelect} />,
        <Product product={products.PF} onClick={handleProductSelect} />,
        <Product product={products.PID} onClick={handleProductSelect} />,
    ];

    const title = (
        <Box padding="10px">
            <IconButton isInverted aria-label="add">
                <PlusSVG />
            </IconButton>
        </Box>
    );

    const productList = (
        <Box padding="20px" vGap="md">
            <Text type="title">
                Add a Service
            </Text>
            <HR />
            <Box paddingLeft="20px" vGap="md">
                {between(productComponents, <HR />)}
            </Box>
        </Box>
    );

    return (
        <Box isRow hGap="md">
            <PopOutMenu title={title}>
                {/* FIXME: Popper from Core does not update when children cause re-render */}
                {
                    selected
                        ? <DeploymentOption selected={selected} setSelected={setSelected} />
                        : productList
                }
            </PopOutMenu>
        </Box>
    );
};
