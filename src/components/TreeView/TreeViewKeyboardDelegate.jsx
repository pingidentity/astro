const focusPrevious = (index, refArray, flatKeyList) => {
  if (index !== 0) {
    const { key } = flatKeyList[index - 1];
    const { thisRef } = refArray.find(item => item.key === key);
    thisRef.current.focus();
  }
};

const focusNext = (index, refArray, flatKeyList) => {
  if (index !== flatKeyList.length - 1) {
    const { key } = flatKeyList[index + 1];
    const { thisRef } = refArray.find(item => item.key === key);
    thisRef.current.focus();
  }
};

export const verifyIndex = (thisIndex, interval, length) => {
  const newIndex = thisIndex + interval;

  if (newIndex < 0) {
    return 0;
  }

  if (newIndex >= length) {
    return length - 1;
  }
  return newIndex;
};

export const onHomePress = (key, flatKeyArray, refArray) => {
  const firstKey = flatKeyArray[0];
  if (firstKey.key === key) {
    return;
  }
  const { thisRef } = refArray.find(_item => _item.key === firstKey.key);

  thisRef.current?.focus();
};

export const onEndPress = (key, flatKeyArray, refArray) => {
  const lastKey = flatKeyArray[flatKeyArray.length - 1];
  if (lastKey.key === key) {
    return;
  }
  const { thisRef } = refArray.find(_item => _item.key === lastKey.key);

  thisRef.current?.focus();
};

export const pageUpOrDown = (key, flatKeyArray, refArray, pageLength) => {
  const thisIndex = flatKeyArray.findIndex(item => item.key === key);

  const newIndex = verifyIndex(thisIndex, pageLength, flatKeyArray.length);


  const foundKey = flatKeyArray[newIndex].key;

  const { thisRef } = refArray.find(_item => _item.key === foundKey);

  thisRef.current?.focus();
};

export const onEnterPress = (e, state, key) => {
  state.toggleKey(key);
  e.preventDefault();
  e.stopPropagation();
};

export const onLeftPress = (e, focusManager, state, key, isExpanded, refArray) => {
  const isEventTargetAKey = refArray.find(_item => {
    return _item.thisRef.current === e.target;
  });

  if (isExpanded && isEventTargetAKey) {
    state.toggleKey(key);
  }


  if (isExpanded && !isEventTargetAKey) {
    focusManager.focusPrevious();
  }

  e.preventDefault();
  e.stopPropagation();
};

export const onSpacePress = (e, tree, key, isSelected) => {
  if (isSelected) {
    tree.setSelectedKeys([]);
  } else {
    tree.setSelectedKeys([key]);
  }
  e.preventDefault();
  e.stopPropagation();
};

export const onUpPress = (e, key, refArray, flatKeyList) => {
  const foundIndex = flatKeyList.findIndex(item => item.key === key);
  focusPrevious(foundIndex, refArray, flatKeyList);
  e.preventDefault();
  e.stopPropagation();
};

export const onTabPress = (e, refArray, focusManager, isSection) => {
  const isEventTargetAKey = refArray.find(_item => {
    return _item.thisRef.current === e.target;
  });

  if (isEventTargetAKey && isSection) {
    focusManager.focusNext();
    e.preventDefault();
    e.stopPropagation();
  }
};

export const onRightPress = (e, focusManager, state, key, isExpanded, refArray) => {
  if (!isExpanded) {
    state.toggleKey(key);
    return;
  }
  const isEventTargetAKey = refArray.find(_item => {
    return _item.thisRef.current === e.target;
  });

  if (isExpanded && isEventTargetAKey) {
    focusManager.focusNext();
  }
  e.preventDefault();
  e.stopPropagation();
};

export const onDownPress = (e, key, refArray, flatKeyList) => {
  // find the key
  const foundIndex = flatKeyList.findIndex(item => item.key === key);
  focusNext(foundIndex, refArray, flatKeyList);
  // check if first or last
  e.preventDefault();
  e.stopPropagation();
};

export const onRightLeftItemPress = e => {
  e.preventDefault();
  e.stopPropagation();
};

export const onPageUpPress = (e, key, flatKeyArray, refArray, pageLength) => {
  pageUpOrDown(key, flatKeyArray, refArray, -Math.abs(pageLength));
  e.preventDefault();
  e.stopPropagation();
};

export const onPageDownPress = (e, key, flatKeyArray, refArray, pageLength) => {
  pageUpOrDown(key, flatKeyArray, refArray, Math.abs(pageLength));
  e.preventDefault();
  e.stopPropagation();
};

export const sectionPressHandlers = {
  onEnterPress,
  onSpacePress,
  onLeftPress,
  onRightPress,
  onUpPress,
  onDownPress,
  onTabPress,
  onPageUpPress,
  onPageDownPress,
  onHomePress,
  onEndPress,
};

export const itemPressHandlers = {
  onSpacePress,
  onDownPress,
  onUpPress,
  onRightLeftItemPress,
  onTabPress,
  onPageUpPress,
  onPageDownPress,
  onHomePress,
  onEndPress,
};
