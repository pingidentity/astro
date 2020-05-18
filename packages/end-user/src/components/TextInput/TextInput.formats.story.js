import React from 'react';
import TextInput, { textInputFormats } from './TextInput';
import styled from 'styled-components';

const Row = styled.div`
    margin: 10px 0;
`;

export default {
    title: 'Components/Inputs/Text/Formats',
    component: TextInput,
};

export const Default = () => [
    <Row key="simple"><TextInput format={textInputFormats.TEXT} placeholder="Ordinary text" /></Row>,
    <Row key="numeric"><TextInput format={textInputFormats.NUMERIC} placeholder="Numbers only" /></Row>,
    <Row key="email"><TextInput format={textInputFormats.EMAIL} placeholder="Type your email here" /></Row>,
];
