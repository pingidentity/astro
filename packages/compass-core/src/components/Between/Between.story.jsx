import React from 'react';

import Between from './Between';

export default {
    title: 'Between',
    component: Between,

};

export const Default = () => (
    <Between
        insert={<span> ~**~ </span>}
    >
        <span>Hello</span>
        <span>There</span>
        <span>Friend</span>
        <span>!!!</span>
    </Between>
);

