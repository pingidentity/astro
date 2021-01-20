import React from 'react';
import PropTypes from 'prop-types';
import { omit } from '@styled-system/props';
import { Flex } from 'reflexbox';
import { withBackground, iconStyle } from './ProductIcon.styles.js';

import p14c from '../../icons/P14C_basic.svg';
import p14e from '../../icons/P14E_basic.svg';
import pingdirectory from '../../icons/PingDirectory_basic.svg';
import datagov from '../../icons/DataGov_basic.svg';
import pingcentral from '../../icons/PingCentral_basic.svg';
import pingaccess from '../../icons/PingAccess_basic.svg';
import mfa from '../../icons/MFA_basic.svg';
import pingfederate from '../../icons/PF_basic.svg';
import idproofing from '../../icons/ID_Proofing_basic.svg';
import workforce360 from '../../icons/WorkForce_360.svg';
import risk from '../../icons/Risk_basic.svg';
import customer360 from '../../icons/Customer_360.svg';
import pingintelligence from '../../icons/PingIntelligence_basic.svg';
import verify from '../../icons/Verify.svg';

import p14cBox from '../../icons/P14C_box.svg';
import p14eBox from '../../icons/P14E_box.svg';
import pingdirectoryBox from '../../icons/PingDirectory_box.svg';
import datagovBox from '../../icons/DataGov_box.svg';
import pingcentralBox from '../../icons/PingCentral_box.svg';
import pingaccessBox from '../../icons/PingAccess_box.svg';
import mfaBox from '../../icons/MFA_box.svg';
import pingfederateBox from '../../icons/PF_box.svg';
import idproofingBox from '../../icons/ID_Proofing_box.svg';
import riskBox from '../../icons/Risk_box.svg';
import pingintelligenceBox from '../../icons/PingIntelligence_box.svg';


export const products = {
    'pingfederate': {
        component: pingfederate,
        component_box: pingfederateBox,
        color: '#B63C3C',
    },
    'pingid': {
        component: mfa,
        component_box: mfaBox,
        color: '#9DAD40',
    },
    'pingdirectory': {
        component: pingdirectory,
        component_box: pingdirectoryBox,
        color: '#61528B',
    },
    'pingcentral': {
        component: pingcentral,
        component_box: pingcentralBox,
        color: '#F15858',
    },
    'pingaccess': {
        component: pingaccess,
        component_box: pingaccessBox,
        color: '#A0AC52',
    },
    'idproofing': {
        component: idproofing,
        component_box: idproofingBox,
        color: '#899D96',
    },
    'workforce360': {
        component: workforce360,
        component_box: workforce360,
        color: '#fff',
    },
    'customer360': {
        component: customer360,
        component_box: customer360,
        color: '#fff',
    },
    'p14C': {
        component: p14c,
        component_box: p14cBox,
        color: '#104D3C',
    },
    'p14e': {
        component: p14e,
        component_box: p14eBox,
        color: '#2C80C2',
    },
    'risk': {
        component: risk,
        component_box: riskBox,
        color: '#F58044',
    },
    'pingintelligence': {
        component: pingintelligence,
        component_box: pingintelligenceBox,
        color: '#437D9B',
    },
    'datagov': {
        component: datagov,
        component_box: datagovBox,
        color: '#B49636',
    },
    'mfa': {
        component: mfa,
        component_box: mfaBox,
        color: '#9DAD40',
    },
    'verify': {
        component: verify,
        component_box: verify,
        color: '#899D96',
    },
};


const ProductIcon = React.forwardRef((props, ref) => {
    const { product, className, icon, hasBackground } = props;
    const nonStyleProps = omit(props);
    const { component: Component, component_box: ComponentBox, color } = products[product];

    return (
        <Flex
            {...nonStyleProps}
            ref={ref}
            className={className}
            css={iconStyle(color)}
        >
            {icon || (hasBackground ? <ComponentBox css={withBackground} /> : <Component />) }

        </Flex>
    );
});


ProductIcon.propTypes = {
    /** Which product to show */
    product: PropTypes.oneOf(Object.keys(products)).isRequired,
    /** Background Style */
    hasBackground: PropTypes.bool,
    /** Optional Icon to display instead of product icon */
    icon: PropTypes.node,
};

ProductIcon.defaultProps = {
    hasBackground: false,
};

export default ProductIcon;
