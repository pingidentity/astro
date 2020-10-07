import React from 'react';
import PlusIcon from '@mdi/svg/svg/plus.svg';
import {
    DividedBox,
    Link,
    Pipe,
    Text,
} from '../../.';

export default {
    title: 'DividedBox',
    component: DividedBox,
};

export const Default = () => (
    <DividedBox gap="lg" isRow>
        <span>One</span>
        <span>Two</span>
        <span>Three</span>
        <span>Four</span>
    </DividedBox>
);

export const LinkRow = () => (
    <DividedBox
        divider={<Pipe color="line.regular" height={30} />}
        gap="md"
        height={30}
        isRow
    >
        <Link href="/nowhere">One</Link>
        <Link href="/nowhere">Two</Link>
        <Link href="/nowhere">Three</Link>
        <Link href="/nowhere">Four</Link>
    </DividedBox>
);

export const SmallLinkRow = () => (
    <DividedBox
        divider={<Pipe color="line.regular" height={10} />}
        gap="sm"
        isRow
    >
        <Link href="/nowhere" fontSize="sm" color="text.secondary">One</Link>
        <Link href="/nowhere" fontSize="sm" color="text.secondary">Two</Link>
        <Link href="/nowhere" fontSize="sm" color="text.secondary">Three</Link>
        <Link href="/nowhere" fontSize="sm" color="text.secondary">Four</Link>
    </DividedBox>
);

export const PlusRow = () => (
    <DividedBox
        divider={<PlusIcon />}
        gap="sm"
        isRow
    >
        <Text>One</Text>
        <Text>Two</Text>
        <Text>Three</Text>
        <Text>Four</Text>
    </DividedBox>
);

export const DividedList = () => (
    <DividedBox gap="lg">
        <Text>One</Text>
        <Text>Two</Text>
        <Text>Three</Text>
        <Text>Four</Text>
    </DividedBox>
);

export const NullChildren = () => (
    <DividedBox
        divider={<Pipe color="line.regular" height={30} />}
        gap="md"
        height={30}
        isRow
    >
        {null}
        <Link href="/nowhere">Filter</Link>
        <Link href="/nowhere">Out</Link>
        {null}
        {null}
        <Link href="/nowhere">Null</Link>
        {null}
        <Link href="/nowhere">Children</Link>
    </DividedBox>
);
