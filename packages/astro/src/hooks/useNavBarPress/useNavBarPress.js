/**
 * A custom hook that will call an onPressCallback function, if the function is provided.
 * @param {Object} params The accepted parameters object
 * @param {string} props.key The unique identifier that is assigned to the element being pressed
 * @param {Object} state The state object tracking selected keys
 * @param {function} state.setSelectedKey The function that sets the selected keys
 * @callback props.onPressCallback The callback that will be called only if provided
 */
const useNavBarPress = ({ key, onPressCallback }, state) => {
  const { setSelectedKey } = state;
  const onNavPress = () => {
    setSelectedKey(key);
    if (onPressCallback) {
      onPressCallback();
    }
  };
  return {
    onNavPress,
  };
};

export default useNavBarPress;
