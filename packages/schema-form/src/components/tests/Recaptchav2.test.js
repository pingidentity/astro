import { fireEvent, screen } from '@testing-library/react';
import { useMediaQuery } from 'react-responsive';
import ReCAPTCHA from 'react-google-recaptcha';
import { generateSchema, renderSchemaForm } from './utils';

jest.mock('react-google-recaptcha');
jest.mock('react-responsive');

const schema = generateSchema({
  properties: {
    captchaKey: {
      type: 'string',
    },
  },
  required: ['captchaKey'],
});
const uiSchema = {
  captchaKey: {
    'ui:widget': 'recaptchaV2',
  },
};
const testString = 'this is a test';
const transformErrors = (errors) => {
  const newErrors = errors;

  return newErrors.map((err) => {
    const { name } = err;
    if (name === 'required') {
      return { ...err, message: testString };
    }

    return err;
  });
};

beforeEach(() => {
  jest.clearAllMocks();
});

test('it renders', () => {
  renderSchemaForm({ schema, uiSchema, sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' });
  screen.getByTestId('recaptcha');
});

test('it sends up data when it is interacted with', () => {
  const onError = jest.fn();
  const onSubmit = jest.fn();
  renderSchemaForm({
    onError,
    onSubmit,
    schema,
    uiSchema,
    sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  });
  const recaptcha = screen.getByTestId('recaptcha');
  const submitBtn = screen.getByRole('button');
  expect(onError).not.toHaveBeenCalled();
  expect(onSubmit).not.toHaveBeenCalled();

  fireEvent.click(recaptcha);
  fireEvent.click(submitBtn);
  expect(onError).not.toHaveBeenCalled();
  expect(onSubmit).toHaveBeenCalled();
});

test('it displays an error when the captcha fails validation', () => {
  const onError = jest.fn();
  const onSubmit = jest.fn();
  renderSchemaForm({
    onError,
    onSubmit,
    schema,
    uiSchema,
    sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    transformErrors,
  });
  const submitBtn = screen.getByRole('button');
  expect(onError).not.toHaveBeenCalled();

  fireEvent.click(submitBtn);
  expect(onError).toHaveBeenCalled();
  expect(onSubmit).not.toHaveBeenCalled();
  screen.getByText(testString);
});

// This test doesn't have much value beyond coverage
test('displays as compact when media query allows', () => {
  useMediaQuery.mockImplementationOnce(() => true);
  const spy = jest.spyOn(ReCAPTCHA, 'render');
  renderSchemaForm({
    schema,
    uiSchema,
    sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  });

  expect(spy).toHaveBeenCalledWith(
    expect.objectContaining({
      size: 'compact',
    }),
    expect.anything(),
  );
});
