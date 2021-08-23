import { useEffect, useState } from 'react';

const useColumnStyles = ({ labelMode }) => {
  const [labelStyleProps, setlabelStyleProps] = useState(false);

  useEffect(() => {
    if (labelMode === 'left') {
      setlabelStyleProps({ sx: { gridTemplateColumns: '40% auto' } });
    }
  }, [labelMode]);
  return labelStyleProps;
};

export default useColumnStyles;
