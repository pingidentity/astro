import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import { omit } from '@styled-system/props';
import { valuePropType } from '@pingux/compass-core/lib/utils/PropUtils';
import { useProgStateful } from '@pingux/compass-core/lib/utils/StateUtils';

import useCompassTheme from '../../styles/useCompassTheme';
import { getTabsStyle } from './Tabs.styles';

const Tabs = React.forwardRef((props, ref) => {
    const {
        children: propsChildren,
        selectedTabValue,
        onChange,
        ...rest
    } = props;
    const theme = useCompassTheme();
    const nonStyleProps = omit(rest);
    const [
        selectedTab,
        setSelectedTab,
    ] = useProgStateful(selectedTabValue, propsChildren[0].props.value || 0);
    const handleTabChange = (tab) => {
        onChange(tab);
        setSelectedTab(tab.value);
    };

    const children = React.Children.map(propsChildren, (child, index) => {
        const value = child.props.value === undefined ? index : child.props.value;
        const isSelected = selectedTab === value;
        return React.cloneElement(child, {
            isSelected,
            onChange: handleTabChange,
            value,
        });
    });

    return (
        <ul
            ref={ref}
            role="tablist"
            css={getTabsStyle({ theme, ...rest })}
            {...nonStyleProps}
        >
            {children}
        </ul>
    );
});

Tabs.propTypes = {
    /** A list of Tab objects to be displayed */
    children: PropTypes.node.isRequired,
    /** The id of the initially selected tab */
    selectedTabValue: valuePropType,
    /** Callback to be invoked when the selected tab changes, receives a tab object */
    onChange: PropTypes.func,
};

Tabs.defaultProps = {
    selectedTabValue: undefined,
    onChange: noop,
};

export default Tabs;
