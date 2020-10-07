import React, { Fragment, useRef } from 'react';

import Popper from './Popper';

export default {
    title: 'Popper',
    component: Popper,

};

export const Default = () => {
    const reference = useRef(null);

    return (
        <Fragment>
            <span ref={reference}>Reference</span>
            <Popper getReference={reference}>
                <div style={{ border: '1px solid #000' }}>Popper content</div>
            </Popper>
        </Fragment>
    );
};
