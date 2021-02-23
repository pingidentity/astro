import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useSingleSelectListState } from '@react-stately/list';
import { useTabs } from '@react-aria/tabs';
import Box from '../Box';
import RockerButton from '../RockerButton';

export { Item } from '@react-stately/collections';
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
  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonGroupRef.current);
  const state = useSingleSelectListState({ ...props, onSelectionChange });
  const {
    tabListProps: raTabListProps,
  } = useTabs(props, state, buttonGroupRef);
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
            <RockerButton
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
