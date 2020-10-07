import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SchoolSVG from '@mdi/svg/svg/school.svg';

import {
    BinocularsIcon,
    Box,
    Chip,
    DividedBox,
    HR,
    Icon,
    Link,
    PopOutMenu,
    ProductIcon,
    RotatingCaret as Caret,
    Text,
} from '../index';

export default {
    title: 'Layouts/Explore Panel',
};

const products = {
    P14C: {
        icon: 'p14C',
        title: 'PingOne for Customers',
        subtitle: 'Cloud-delivered customer IAM for developers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra sapien lectus. Pellentesque sit amet dolor suscipit, vestibulum mauris sit amet, iaculis ipsum. Cras ultricies tellus et nunc luctus, non varius mi pellentesque. Sed elementum, augue sed scelerisque dapibus, ipsum ligula consequat sem, ut pellentesque enim tellus ac neque.',
        tags: ['Authentication Authority', 'SSO', 'MFA'],
    },
    PF: {
        icon: 'pingfederate',
        title: 'PingFederate',
        subtitle: 'Authentication and Single Sign-on Authority',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra sapien lectus. Pellentesque sit amet dolor suscipit, vestibulum mauris sit amet, iaculis ipsum. Cras ultricies tellus et nunc luctus, non varius mi pellentesque. Sed elementum, augue sed scelerisque dapibus, ipsum ligula consequat sem, ut pellentesque enim tellus ac neque.',
        tags: ['Authentication Authority', 'SSO', 'Identity Federation'],
    },
    PID: {
        icon: 'pingid',
        title: 'PingID',
        subtitle: 'Cloud MFA for workforce and customers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra sapien lectus. Pellentesque sit amet dolor suscipit, vestibulum mauris sit amet, iaculis ipsum. Cras ultricies tellus et nunc luctus, non varius mi pellentesque. Sed elementum, augue sed scelerisque dapibus, ipsum ligula consequat sem, ut pellentesque enim tellus ac neque.',
        tags: ['MFA'],
    },
    PD: {
        icon: 'pingdirectory',
        title: 'PingDirectory',
        subtitle: 'High performance data store for all user',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra sapien lectus. Pellentesque sit amet dolor suscipit, vestibulum mauris sit amet, iaculis ipsum. Cras ultricies tellus et nunc luctus, non varius mi pellentesque. Sed elementum, augue sed scelerisque dapibus, ipsum ligula consequat sem, ut pellentesque enim tellus ac neque.',
        tags: ['Authentication Authority'],
    },
    PC: {
        icon: 'pingcentral',
        title: 'PingCentral',
        subtitle: 'Lorem ipsum dolor...',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra sapien lectus. Pellentesque sit amet dolor suscipit, vestibulum mauris sit amet, iaculis ipsum. Cras ultricies tellus et nunc luctus, non varius mi pellentesque. Sed elementum, augue sed scelerisque dapibus, ipsum ligula consequat sem, ut pellentesque enim tellus ac neque.',
        tags: ['Test Tag'],
    },
};

const Product = (props) => {
    const {
        title,
        subtitle,
        description,
        tags,
    } = products[props.product];

    return (
        <Box isRow hGap="md" alignItems="center">
            <Box vGap="xs" flexGrow={1}>
                <Text type="title">{title}</Text>
                <Text type="subtitle">{subtitle}</Text>
                <Box isRow hGap="xs" padding="10px 0">
                    {tags.map(tag => <Chip type="label" key={tag}>{tag}</Chip>)}
                </Box>
                <Box maxWidth="300px">
                    <Text type="body-weak">{description}</Text>
                </Box>
                <HR gap="md" />
                <Box vGap="sm">
                    <Box gap="sm" isRow>
                        <BinocularsIcon size={20} />
                        <Text type="title-item">Product Resources</Text>
                    </Box>
                    <DividedBox gap="sm" isRow>
                        <Link href="#">Documentation</Link>
                        <Link href="#">Support</Link>
                        <Link href="#">Integrations</Link>
                        <Link href="#">Community</Link>
                    </DividedBox>
                </Box>
                <Box vGap="sm" paddingTop="10px">
                    <Box gap="sm" isRow>
                        <Icon component={SchoolSVG} size={20} />
                        <Text type="title-item">Learn</Text>
                    </Box>
                    <DividedBox gap="sm" isRow>
                        <Link href="#">Training</Link>
                        <Link href="#">Data Sheet</Link>
                        <Link href="#">Videos</Link>
                        <Link href="#">Case Studies</Link>
                    </DividedBox>
                </Box>
            </Box>
        </Box>
    );
};

Product.propTypes = {
    product: PropTypes.oneOf(Object.keys(products)).isRequired,
};

const ProductSelector = (props) => {
    return (
        <Box isRow justifyContent="space-between">
            {
                Object.values(products).map((product) => {
                    return (
                        <Box alignItems="center">
                            <ProductIcon
                                key={product.icon}
                                product={product.icon}
                                isSelected={props.selected.icon === product.icon}
                                onClick={() => props.onChange(product)}
                            />
                            {
                                props.selected.icon === product.icon
                                    ? <Box width="100%" borderBottom="2px solid blue" marginTop="sm" />
                                    : <Caret color="text.primary" size={15} />
                            }
                        </Box>
                    );
                })
            }
        </Box>
    );
};

ProductSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.oneOf(Object.keys(products)).isRequired,
};

export const AddServiceDropdown = () => {
    const [selected, setSelected] = useState('P14C');
    const handleProductSelect = product => setSelected(product);

    const title = menuProps => (
        <Box isRow alignItems="center" hGap="xs" padding="10px">
            <BinocularsIcon size={20} />
            <Text>Resources</Text>
            <Caret color="text.primary" size={15} isRotated={menuProps.isOpen} />
        </Box>
    );

    return (
        <Box isRow hGap="md" bg="accent.99" padding="xx">
            <PopOutMenu title={title}>
                <Box padding="20px" vGap="md">
                    <ProductSelector onChange={handleProductSelect} selected={selected} />
                    <Product product={selected} />
                </Box>
            </PopOutMenu>
        </Box>
    );
};
