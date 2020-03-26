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
    <Row><TextInput format={textInputFormats.TEXT} placeholder="Ordinary text"/></Row>,
    <Row><TextInput format={textInputFormats.NUMERIC} placeholder="Numbers only"/></Row>,
    <Row><TextInput format={textInputFormats.EMAIL} placeholder="Type your email here"/></Row>,
];
