import { renderHook } from '@testing-library/react-hooks';
import useRecaptchaReset from './useRecaptchaReset';
import { FORM_STATE } from '../../utils/constants';

const onChange = jest.fn();
const resetRecaptcha = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test('should reset the recaptcha when form state is error', () => {
  expect(resetRecaptcha).not.toHaveBeenCalled();
  renderHook(() => useRecaptchaReset({
    formState: FORM_STATE.ERROR,
    onChange,
    resetRecaptcha,
    value: 'test',
  }));
  expect(resetRecaptcha).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalled();
});

test('should not reset the recaptcha when form state is not error', () => {
  expect(resetRecaptcha).not.toHaveBeenCalled();
  renderHook(() => useRecaptchaReset({
    formState: FORM_STATE.DEFAULT,
    onChange,
    resetRecaptcha,
    value: 'test',
  }));
  expect(resetRecaptcha).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});
