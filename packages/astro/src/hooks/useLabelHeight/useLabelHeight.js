import { useEffect, useState } from 'react';

const useLabelHeight = ({ labelRef, inputRef }) => {
  const [isLabelHigher, setIsLabelHigher] = useState(false);

  useEffect(() => {
    if (labelRef?.current?.offsetHeight > inputRef?.current?.offsetHeight) {
      setIsLabelHigher(true);
    } else {
      setIsLabelHigher(false);
    }
  }, [labelRef?.current?.offsetHeight, inputRef?.current?.offsetHeight]);


  return { isLabelHigher };
};

export default useLabelHeight;
