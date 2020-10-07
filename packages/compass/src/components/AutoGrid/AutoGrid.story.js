
import React from 'react';
import CoreAutoGrid from '@pingux/compass-core/src/components/AutoGrid/emotion';
import {
    Card,
    AutoGrid,
} from '../../.';

export default {
    title: 'Auto Grid',
    component: CoreAutoGrid,
};

export const Default = () => (
    <AutoGrid minWidth={200}>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
    </AutoGrid>
);

export const Responsive = () => (
    <AutoGrid minWidth={[100, 100, 300]} gap={['lg', 'lg', 'xl']}>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
        <Card height={200}>Pick a card</Card>
    </AutoGrid>
);
