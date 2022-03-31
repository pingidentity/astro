import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import CloseIcon from 'mdi-react/CloseIcon';
import CheckIcon from 'mdi-react/CheckIcon';
import {
  TextAreaField,
  IconButton,
  Icon,
  Box,
} from '../index';

export default {
  title: 'Recipes/EditableInput',
};

const EditableAreaContext = createContext();
const EditableAreaProvider = EditableAreaContext.Provider;

const controlProps = {
  confirmBtn: {
    ariaLabel: 'Confirm',
    variant: 'invertedSquare',
  },
  cancelBtn: {
    ariaLabel: 'Cancel',
    variant: 'square',
  },
};

const inputProps = {
  label: 'Example label',
  ariaLabel: 'Example aria label',
};

export const Default = () => {
  return (
    <Editable value="Some value...">
      <EditablePreview />
      <EditableInput inputProps={inputProps} />
      <EditableControl controlProps={controlProps} />
    </Editable>
  );
};

/**
 * Editable
 * Wrapper component that provides context value for all editable components
 */

const Editable = (props) => {
  const { value, isEditing } = props;

  const editableContextValue = {
    isEditing: isEditing || false,
    prevValue: '',
    value: value || '',
  };
  const [editableContext, setEditableContext] = useState(editableContextValue);

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <EditableAreaProvider value={[editableContext, setEditableContext]}>
        {props.children}
      </EditableAreaProvider>
    </Box>
  );
};

/**
 * Editable preview
 * Read-only view of the component
 */

const EditablePreview = () => {
  const [editableContext, setEditableContext] = useContext(EditableAreaContext);
  const [hasFocus, setFocus] = useState(false);

  useEffect(() => {
    if (hasFocus && editableContext.isEditing) {
      setFocus(false);
    }
  }, [hasFocus, editableContext.isEditing]);

  const handleClick = () => {
    setEditableContext({ ...editableContext, isEditing: true });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditableContext({ ...editableContext, isEditing: true });
    }
  };

  return (
    <Box
      tabIndex={editableContext.isEditing ? '-1' : '0'}
      display={editableContext.isEditing ? 'none' : 'flex'}
      aria-hidden={editableContext.isEditing}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-readonly="false"
      aria-label="Inline editable text field"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      placeholder="Click or press enter to edit text"
      sx={{
        whiteSpace: 'pre-line',
        backgroundColor: hasFocus ? 'accent.95' : 'white',
        width: '100%',
        overflowWrap: 'break-word',
        minHeight: '45px',
        paddingLeft: 'xs',
        justifyContent: 'flex-end',
        paddingBottom: 'xs',
        borderBottom: editableContext.isEditing ? '0px' : '1px dashed',
        borderBottomColor: 'active',
        color: 'neutral.10',
        fontSize: 'md',
        fontWeight: 1,
        lineHeight: '18px',
        '&:hover': {
          background: editableContext.isEditing ? 'white' : 'accent.95',
        },
        '&:focus': {
          outline: 'none',
          boxShadow: 'focus',
          borderColor: 'active',
          borderWidth: '1px',
          borderStyle: 'solid',
        },
      }}
    >
      {editableContext.value}
    </Box>
  );
};

/**
 * Editable input
 * Swappable with TextField and TextAreaField component
 * Input view of the component
 */

const EditableInput = (props) => {
  const { inputProps: { ariaLabel } } = props;
  const editableInput = useRef(null);
  const [editableContext, setEditableContext] = useContext(EditableAreaContext);
  const [prevValue, setPrevValue] = useState(editableContext.value || '');
  const [editingValue, setEditingValue] = useState(editableContext.value || '');

  useEffect(() => {
    setEditingValue(editableContext.value);
  }, [editableContext.value]);

  useEffect(() => {
    if (editableContext.isEditing) {
      editableInput.current.focus();
    }
  }, [editableContext.isEditing]);

  const handleChange = (e) => {
    setEditingValue(e.target.value);
    setEditableContext({ ...editableContext, value: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditableContext({
        ...editableContext,
        prevValue,
        value: prevValue,
        isEditing: false,
      });
    } else if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      }
      setPrevValue(editableContext.value);
      setEditableContext({
        ...editableContext,
        prevValue: editableContext.value,
        value: editableContext.value,
        isEditing: false,
      });
    }
  };

  return (
    <Box
      display={editableContext.isEditing ? 'flex' : 'none'}
      aria-hidden={!editableContext.isEditing}
      sx={{
        marginRight: '30px',
        flexGrow: 1,
      }}
    >
      <TextAreaField
        rows={1}
        ref={editableInput}
        role="textbox"
        contenteditable="true"
        aria-multiline="true"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={editingValue}
        aria-label={ariaLabel}
        sx={{
          maxHeight: '150px',
        }}
        isUnresizable
      />
    </Box>
  );
};

/**
 * Editable controls
 * Use css to position buttons
 * Extend with more button controls as needed
 */

const EditableControl = (props) => {
  const { controlProps: { confirmBtn }, controlProps: { cancelBtn }, onPress } = props;
  const [editableContext, setEditableContext] = useContext(EditableAreaContext);
  const [prevValue, setPrevValue] = useState(editableContext.value || '');

  const handleCancel = () => {
    setEditableContext({
      ...editableContext,
      prevValue,
      value: prevValue,
      isEditing: false,
    });
  };

  const handleSubmit = () => {
    setPrevValue(editableContext.value);
    setEditableContext({
      ...editableContext,
      prevValue: editableContext.value,
      value: editableContext.value,
      isEditing: false,
    });
    if (onPress) {
      onPress();
    }
  };

  return (
    <Box
      display={editableContext.isEditing ? 'flex' : 'none'}
      aria-hidden={!editableContext.isEditing}
      isRow
      sx={{
        position: 'absolute',
        right: '0',
        top: '27.5%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <IconButton
        onPress={handleSubmit}
        aria-label={confirmBtn.ariaLabel}
        variant={confirmBtn.variant}
        mr="15px"
        sx={{
          width: '20px',
          height: '20px',
        }}
      >
        <Icon
          icon={CheckIcon}
        />
      </IconButton>
      <IconButton
        aria-label={cancelBtn.ariaLabel}
        onPress={handleCancel}
        variant={cancelBtn.variant}
      >
        <Icon icon={CloseIcon} />
      </IconButton>
    </Box>
  );
};
