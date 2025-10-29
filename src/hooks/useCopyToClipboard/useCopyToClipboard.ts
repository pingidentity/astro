interface UseCopyToClipboard {
  (value?: string, setIsCopied?: React.Dispatch<React.SetStateAction<boolean>>): () => Promise<void>
}

const useCopyToClipboard: UseCopyToClipboard = (
  value = '',
  setIsCopied = () => undefined,
) => {
  return async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(value);
        setIsCopied(true);
      } else {
        // Workaround for copying in insecure origin
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const isSuccessful = document.execCommand('copy');
        textArea.remove();
        if (isSuccessful) {
          setIsCopied(isSuccessful);
        } else {
          throw new Error('Unable to copy message');
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy: ', err);
    }
  };
};

export default useCopyToClipboard;
