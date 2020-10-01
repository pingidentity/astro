const disabledStyles = { opacity: 0.5, pointerEvents: 'none' };
export const getDisabledStyles = isDisabled => (isDisabled ? disabledStyles : {});
