import React, { useState } from 'react';

import {
    Tile,
    ProductIcon,
} from '../../.';

export default {
    title: 'Tile',
    component: Tile,

};

export const Default = () => (
    <Tile id="default">
        <ProductIcon product="pingfederate" />
    </Tile>
);

export const Selected = () => (
    <Tile id="selected" isSelected>
        <ProductIcon product="pingfederate" />
    </Tile>
);

export const HighlightCallbacks = () => {
    const id = 'highlight';
    const [isHighlighted, setIsHighlighted] = useState(false);
    const onHighlight = tile => tile.id === id && setIsHighlighted(true);
    const onHighlightOut = tile => tile.id === id && setIsHighlighted(false);
    return (
        <Tile
            id={id}
            onHighlight={onHighlight}
            onHighlightOut={onHighlightOut}
        >
            <ProductIcon product={isHighlighted ? 'pingdirectory' : 'pingfederate'} />
        </Tile>
    );
};
