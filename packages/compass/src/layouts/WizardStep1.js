import React, { useState } from 'react';
import { css } from '@emotion/core';

import {
    AutoGrid,
    Box,
    Text,
    Tile,
    Tab,
    Tabs,
    ProductIcon,
    HR,
    Chip,
    Button,
    Link,
    SolutionCard,
} from '../index';

const cardOptions = [
    {
        title: 'Workforce',
        text: 'I want to build a login experience for my organization and its employees',
    },
    {
        title: 'Customers',
        text: 'I want to build a login experience for my clients and consumers',
    },
    {
        title: 'Custom',
        text: 'I want to build a unique login experience tailor made for my business',
    },
];

const ProductCard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    return (
        <Tile
            css={css`width: 200px;`}
            onHighlight={() => setIsHovered(true)}
            onHighlightOut={() => setIsHovered(false)}
            isSelected={isSelected}
        >
            <Box gap="xs">
                <ProductIcon product="pingfederate" />
                <Text type="title-item">Ping Federate</Text>
                <Text>
                    Enable advanced authentication
                </Text>
            </Box>

            {isHovered ?
                <Box mt="auto" pt="md" alignItems="center" gap="xs">
                    <Button onClick={() => setIsSelected(!isSelected)} isInline type={isSelected ? undefined : 'primary'}>
                        { isSelected ? 'Remove' : 'Select' }
                    </Button>
                    <Link href="google.com" target="_blank">
                        Learn More
                    </Link>
                </Box> :
                <Box mt="auto" gap="xs" flexWrap="wrap" justifyContent="flex-end" isRow>
                    <HR gap="md" />
                    <Chip>Authentication</Chip>
                    <Chip>Single Sign-on</Chip>
                </Box>
            }

        </Tile>
    );
};

const WizardStep1 = () => {
    const [selected, setSelected] = useState(null);

    const selectItem = id => () => setSelected(id === selected ? null : id);

    return (
        <Box>
            <Text type="body-strong" mb="xl">Tell us about the Environment you want to build - we’ll identify services to match</Text>
            <div>
                <AutoGrid gap="lg" minColumnWidth={200} maxColumnWidth={300}>
                    {
                        cardOptions.map(card => (
                            <SolutionCard
                                key={card.title}
                                isSelected={selected === card.title}
                                onClick={selectItem(card.title)}
                                width="100%"
                            >
                                <Box height="100%" width="100%">
                                    {!selected &&
                                    <Text mb="md">
                                        {card.text}
                                    </Text>
                                    }
                                    <Box mt="auto">
                                        <Text type="title-section">{card.title}</Text>
                                    </Box>
                                </Box>
                            </SolutionCard>
                        ))
                    }
                </AutoGrid>
            </div>

            {selected &&
            <>
                <Text type="body-strong">Select a complete solution or individual service(s) </Text>
                <Tabs>
                    <Tab label="solutions" value={0} />
                    <Tab label="all" value={1} />
                    <Tab label="authentication" value={2} />
                </Tabs>
                <Box isRow flexWrap="wrap" gap="lg">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </Box>
            </>
            }

        </Box>
    );
};

export default WizardStep1;
