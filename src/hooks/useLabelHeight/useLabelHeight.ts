import React, { useEffect, useState } from 'react';

interface UseLabelHeightProps {
  labelRef: React.RefObject<HTMLLabelElement>,
  inputRef: React.RefObject<HTMLInputElement>,
}

interface UseLabelHeight {
  ({ labelRef, inputRef }: UseLabelHeightProps): { isLabelHigher: boolean }

}

const useLabelHeight: UseLabelHeight = ({ labelRef, inputRef }) => {
  const [isLabelHigher, setIsLabelHigher] = useState<boolean>(false);

  useEffect(() => {
    const labelOffsetHeight = labelRef?.current?.offsetHeight || 0;
    const inputOffsetHeight = inputRef?.current?.offsetHeight || 0;

    if (labelOffsetHeight > inputOffsetHeight) {
      setIsLabelHigher(true);
    } else {
      setIsLabelHigher(false);
    }
  }, [labelRef, inputRef]);


  return { isLabelHigher };
};

export default useLabelHeight;
