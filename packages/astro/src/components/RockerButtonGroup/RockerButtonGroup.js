import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useTabList } from '@react-aria/tabs';
import { useTabListState } from '@react-stately/tabs';
import { usePropWarning } from '../../hooks';
import Box from '../Box';
import { CollectionRockerButton } from '../RockerButton';

export const RockerContext = React.createContext({});

/**
 * This component handles a single selection state for a group of rocker buttons.
 * It is intended to be used with < RockerButton > as children.
*/

const RockerButtonGroup = forwardRef((props, ref) => {
  const {
    children,
    isDisabled,
    onSelectionChange,
    tabListProps, // eslint-disable-line
    ...others
  } = props;
  const buttonGroupRef = useRef();
  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonGroupRef.current);
  const state = useTabListState({ ...props, onSelectionChange });
  const {
    tabListProps: raTabListProps,
  } = useTabList(props, state, buttonGroupRef);
  // removed tabList role for now as this isn't really the role we are looking for
  delete raTabListProps.role;

  return (
    <RockerContext.Provider value={state}>
      <Box variant="rockerbutton.rockerContainer" {...others}>
        <Box
          variant="rockerbutton.rockerContainerInner"
          isRow
          {...tabListProps}
          {...raTabListProps}
          ref={buttonGroupRef}
        >
          {Array.from(state.collection).map(item => (
            <CollectionRockerButton
              key={item.key}
              item={item}
              isDisabled={isDisabled}
            />
          ))}
        </Box>
      </Box>
    </RockerContext.Provider>
  );
});

RockerButtonGroup.propTypes = {
  /** The default button key to be selected. (uncontrolled) */
  defaultSelectedKey: PropTypes.string,
  /** The button key that is currently selected. (controlled) */
  selectedKey: PropTypes.string,
  /** Whether the entire button group is disabled. */
  isDisabled: PropTypes.bool,
  /** Handler that is called when the selected button has changed. */
  onSelectionChange: PropTypes.func,
};

RockerButtonGroup.defaultProps = {
  isDisabled: false,
};

RockerButtonGroup.displayName = 'RockerButtonGroup';
export default RockerButtonGroup;
