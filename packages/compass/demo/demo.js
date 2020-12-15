import React, { useState } from 'react';
import ReactDOM from 'react-dom';


import { v4 as uuidv4 } from 'uuid';
import { Flex, Box } from 'reflexbox';
import { css } from '@emotion/core';

import {
    Button,
    CompassWrapper,
    Header,
    ListBox,
    ListHeader,
    Row,
    RowTitle,
    Text,
    ProductButton,
    InfoPanel,
    ScrollBox,
} from '../src/index.js';

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
        url={products[productItemProps.id].url}
        product={productItemProps.id}
        selected={productItemProps.selected}
    />
);

const App = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [selected, setSelected] = useState(null);

    return (
        <CompassWrapper>
            <Menu />
            <Flex flexDirection="column" flexGrow={1}>
                <Header />
                <ListHeader>
                    <Text type="title" inline>Environments</Text>
                    <Button icon="plus">
                        Add Environment
                    </Button>
                </ListHeader>
                <Box flexGrow={1} css={css`overflow: hidden;`}>
                    <Flex height="100%">
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
                                                selected={isRowSelected}
                                                flexWrap="wrap"
                                            >
                                                <RowTitle icon="users" title={name} subtitle={type} flex="2 1 0" />
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

                        <InfoPanel width="33%" show={showDetails}>
                            {showDetails &&
                            <Row>
                                <RowTitle
                                    title={environmentData[selected].name}
                                    subtitle={environmentData[selected].type}
                                    panel
                                />
                            </Row>
                            }
                        </InfoPanel>
                    </Flex>
                </Box>
            </Flex>
        </CompassWrapper>


    );
};

const entry = document.getElementById('entry');

ReactDOM.render(<App />, entry);
