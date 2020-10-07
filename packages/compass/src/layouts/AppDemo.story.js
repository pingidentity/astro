
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Flex, Box } from 'reflexbox';
import { linkTo } from '@storybook/addon-links';
import { css } from '@emotion/core';
import { ListBox } from '@pingux/compass-core/lib/components/List';
import ScrollBox from '@pingux/compass-core/lib/components/ScrollBox/emotion';
import Earth from '@mdi/svg/svg/earth.svg';


import {
    Button,
    CloseButton,
    CompassWrapper,
    Header,
    HR,
    ListHeader,
    Row,
    RowTitle,
    Text,
    ProductButton,
    InfoPanel,
    Icon,
} from '../index';

export default {
    title: 'Layouts/App Demo',
};

const baseURL = 'https://www.google.com/search?q=';

const environmentData = {
    [uuidv4()]: {
        name: 'Customer Banking Dev',
        created: 'November 21, 2019',
        products: {
            p14C: {
                url: `${baseURL}p14c`,
            },
            mfa: {
                url: `${baseURL}pingid`,
            },
        },
    },
    [uuidv4()]: {
        name: 'Customer Banking Test',
        created: 'August 18, 2018',
        products: {
            p14C: {
                url: `${baseURL}p14c`,
            },
            mfa: {
                url: `${baseURL}pingid`,
            },
        },
    },
    [uuidv4()]: {
        name: 'Customer Banking Staging',
        created: 'April 4, 2018',
        products: {
            p14C: {
                url: `${baseURL}p14c`,
            },
            mfa: {
                url: `${baseURL}pingid`,
            },
        },
    },
    [uuidv4()]: {
        name: 'Customer Banking Production',
        created: 'January 30, 2020',
        products: {
            p14C: {
                url: `${baseURL}p14c`,
            },
            mfa: {
                url: `${baseURL}pingid`,
            },
        },
    },
    [uuidv4()]: {
        name: 'Employee Login Dev',
        type: 'Workforce 360',
        created: 'November 24, 2019',
        products: {
            pingfederate: {
                url: `${baseURL}pingfederate`,
            },
            pingid: {
                url: `${baseURL}pingid`,
            },
            p14e: {
                url: `${baseURL}p14e`,
            },
            pingdirectory: {
                url: `${baseURL}pingdirectory`,
            },
            pingcentral: {
                url: `${baseURL}pingcentral`,
            },
        },
    },
    [uuidv4()]: {
        name: 'Employee Login Test',
        type: 'Workforce 360',
        created: 'February 15, 2018',
        products: {
            pingfederate: {
                url: `${baseURL}pingfederate`,
            },
            pingid: {
                url: `${baseURL}pingid`,
            },
            p14e: {
                url: `${baseURL}p14e`,
            },
            pingdirectory: {
                url: `${baseURL}pingdirectory`,
            },
            pingcentral: {
                url: `${baseURL}pingcentral`,
            },
        },
    },
    [uuidv4()]: {
        name: 'Employee Login Staging',
        type: 'Workforce 360',
        created: 'December 12, 2018',
        products: {
            pingfederate: {
                url: `${baseURL}pingfederate`,
            },
            pingid: {
                url: `${baseURL}pingid`,
            },
            p14e: {
                url: `${baseURL}p14e`,
            },
            pingdirectory: {
                url: `${baseURL}pingdirectory`,
            },
            pingcentral: {
                url: `${baseURL}pingcentral`,
            },
        },
    },


};

const Menu = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Box width={collapsed ? 40 : 200} sx={{ bg: 'menu' }} css={css`transition: width 0.25s;`}>
            <button onClick={() => setCollapsed(!collapsed)}>Menu</button>
        </Box>
    );
};

const renderProductList = isRowSelected => listProps => (
    <Flex
        {...listProps}
        flex="0"
        justifyContent="flex-end"
        tabIndex={isRowSelected ? 0 : '-1'}
    />
);

const renderProductItem = products => productItemProps => (
    <ProductButton
        {...productItemProps}
        css={css`width: 50px; height: 50px; flex-basis: 50px; margin-left: 15px;`}
        url={products[productItemProps.id].url}
        product={productItemProps.id}
        selected={productItemProps.selected}
        hasBackground
    />
);


export const AppDemo = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [selected, setSelected] = useState(null);

    return (
        <CompassWrapper>
            <Menu />
            <Flex flexDirection="column" flexGrow={1}>
                <Header />
                <Flex height="100%">
                    <Box flexGrow={1} css={css`overflow: hidden;`}>
                        <ListHeader>
                            <Text type="title" inline>Environments</Text>
                            <Box marginLeft="auto">
                                <Button icon="plus" onClick={linkTo('Layouts/Wizard')}>
                                    Add Environment
                                </Button>
                            </Box>
                        </ListHeader>
                        <Box flex="1 1 0px" css={css`overflow: auto;`}>
                            <ScrollBox tabIndex="-1">
                                <ListBox
                                    items={Object.keys(environmentData).map(key => key)}
                                    onEnter={
                                        (select) => {
                                            if (select === selected && showDetails) {
                                                setShowDetails(false);
                                            } else {
                                                setShowDetails(true);
                                            }
                                        }
                                    }
                                    onSelect={(select) => {
                                        setSelected(select);
                                    }}
                                    renderItem={(itemProps) => {
                                        const {
                                            name, type, created, products,
                                        } = environmentData[itemProps.id];
                                        const isRowSelected = itemProps.id === selected;
                                        return (
                                            <Row
                                                {...itemProps}

                                                onClick={() => {
                                                    if (selected === itemProps.id) {
                                                        setShowDetails(!showDetails);
                                                    } else {
                                                        setSelected(itemProps.id);
                                                        setShowDetails(true);
                                                    }
                                                }}
                                                isSelected={isRowSelected}
                                                flexWrap="wrap"
                                            >
                                                <RowTitle
                                                    icon={<Icon

                                                        component={Earth}
                                                        size={32}
                                                    />}
                                                    title={name}
                                                    subtitle={type}
                                                    flex="2 1 0"
                                                />
                                                {
                                                    !showDetails &&
                                                    <Box justifyContent="center" flex="3 1 0">
                                                        <Text type="label">Created</Text>
                                                        <Text type="body-strong">{created}</Text>
                                                    </Box>
                                                }

                                                {
                                                    (!isRowSelected || !showDetails) ?
                                                        <ListBox
                                                            items={Object.keys(products)}
                                                            renderList={
                                                                renderProductList(isRowSelected)
                                                            }
                                                            renderItem={renderProductItem(products)}
                                                        /> :
                                                        <div>Arrow</div>

                                                }
                                            </Row>
                                        );
                                    }}
                                />
                            </ScrollBox>
                        </Box>
                    </Box>
                    <InfoPanel width="33%" show={showDetails}>
                        {showDetails && (
                            <Box px="lg" py="xl">
                                <CloseButton right="auto" left="xs" onClick={() => setShowDetails(false)} />
                                <Text type="title-section">{environmentData[selected].name}</Text>
                                <Text type="subtitle">{environmentData[selected].type}</Text>
                                <HR my="lg" />
                                <Text>
                                    Here is more content below.
                                </Text>
                            </Box>
                        )}
                    </InfoPanel>
                </Flex>
            </Flex>
        </CompassWrapper>
    );
};
