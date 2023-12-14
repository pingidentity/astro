import useCopyToClipboard from './useCopyToClipboard';

const mockCopyText = 'test';

const originalClipboard = { ...global.navigator.clipboard };
const originalExecCommand = global.document.execCommand;

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).navigator.clipboard = {
    writeText: jest.fn(),
  };
  global.document.execCommand = jest.fn(() => true);
});

afterEach(() => {
  jest.resetAllMocks();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).navigator.clipboard = originalClipboard;
  global.document.execCommand = originalExecCommand;
});

test('default return', () => {
  const copyToClipboard = useCopyToClipboard();

  expect(copyToClipboard).toEqual(expect.any(Function));
});

test('should copy text that passed in props', () => {
  const copyToClipboard = useCopyToClipboard(mockCopyText);
  copyToClipboard();
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCopyText);
});

test('should call setIsCopied once function will be called', async () => {
  const mockSetIsCopied = jest.fn();
  const copyToClipboard = useCopyToClipboard(mockCopyText, mockSetIsCopied);
  await copyToClipboard();
  expect(mockSetIsCopied).toHaveBeenCalledWith(true);
});
