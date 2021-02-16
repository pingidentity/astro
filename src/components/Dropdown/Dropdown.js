import React, { useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Select as RSelect } from '@rebass/forms';
import { useFocusRing } from '@react-aria/focus';

import useStatusClasses from '../../hooks/useStatusClasses';

/**
 * Basic dropdown menu input.
 * Accepts most styling props from [styled-system](https://styled-system.com/table).
 * Built on top of the [Select component from Rebass Forms](https://rebassjs.org/forms/select).
 */

const Dropdown = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    hasNoneOption,
    hasDisabledFirstOption,
    firstLabel,
    noneLabel,
    defaultValue,
    value,
    ...others
  } = props;

  const dropdownRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => dropdownRef.current);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
  });

  return (
    <RSelect
      ref={dropdownRef}
      className={classNames}
      defaultValue={value ? undefined : (defaultValue || '')}
      value={value}
      {...others}
      {...focusProps}
    >
      {
        !hasNoneOption &&
        <option
          key="__empty"
          value=""
          disabled={hasDisabledFirstOption}
        >
          {firstLabel}
        </option>
      }
      {
        hasNoneOption && (
          <>
            <option
              key="__empty"
              value=""
              disabled={hasDisabledFirstOption}
            >
              {noneLabel || firstLabel}
            </option>
            <option key="__spacer" disabled>--------</option>
          </>
        )
      }
      {children}
    </RSelect>
  );
});

Dropdown.propTypes = {
  /** Displays a none option within the dropdown options */
  hasNoneOption: PropTypes.bool,
  /** Whether the first option is disabled. Useful to prevent reselection of the first option. */
  hasDisabledFirstOption: PropTypes.bool,
  /** Id of the selected element */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Label for first option. */
  firstLabel: PropTypes.string,
  /** Label for none option. `firstLabel` prop can also be used. */
  noneLabel: PropTypes.string,
  /** Value of the select (controlled). */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Default value of the select (uncontrolled). */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Handler that is called when the element's selection state changes. */
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  hasNoneOption: false,
  firstLabel: 'Select an option',
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
