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
    noneLabel,
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
      {...others}
      {...focusProps}
    >
      {
        hasNoneOption && (
          <>
            <option value="">{noneLabel}</option>
            <option disabled>--------</option>
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
  /** Id of the selected element */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Label for none option */
  noneLabel: PropTypes.string,
  /** Value of the option input */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Handler that is called when the element's selection state changes. */
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  hasNoneOption: false,
  noneLabel: 'None',
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
