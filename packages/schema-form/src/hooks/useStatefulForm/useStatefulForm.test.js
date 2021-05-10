import { renderHook, act } from '@testing-library/react-hooks';
import useStatefulForm from './useStatefulForm';
import { FORM_MODE } from '../../utils/constants';

const schema = {
  type: 'object',
  properties: {
    value: {
      type: 'string',
      minLength: 3,
    },
  },
  $schema: 'http://json-schema.org/draft-04/schema#',
};
const uiSchema = {
  value: {
    'ui:options': {
      label: 'Label',
    },
  },
};

beforeEach(() => {
  jest.restoreAllMocks();
});

test('should return props object for default mode', () => {
  const { result } = renderHook(() => useStatefulForm({
    extraErrors: {},
    schema,
    uiSchema,
    rules: [],
  }));
  expect(result.current).toEqual(expect.objectContaining({
    statefulProps: expect.objectContaining({
      extraErrors: expect.any(Object),
      formState: expect.any(String),
      liveValidate: expect.anything(),
      onChange: expect.any(Function),
      onError: expect.any(Function),
      onSubmit: expect.any(Function),
      FormComponent: expect.any(Object),
    }),
  }));
});

test('should return valid JSON on submit', async () => {
  window.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    clone: jest.fn(() => ({ json: () => ({ status: 200 }) })),
  }));
  const newFetch = jest.spyOn(window, 'fetch');

  const { result } = renderHook(() => useStatefulForm({
    extraErrors: {},
    schema,
    uiSchema,
    endpoint: '/test',
    rules: [],
    onServerSuccess: jest.fn(),
  }));

  const formData = { foo: 'bar' };

  await act(async () => result.current.statefulProps.onSubmit({
    formData,
  }));

  expect(newFetch).toHaveBeenCalledWith('/test', {
    body: JSON.stringify(formData),
    method: 'post',
  });
});

test('should return empty object for simplified mode', () => {
  const { result } = renderHook(() => useStatefulForm({ mode: FORM_MODE.SIMPLIFIED }));
  expect(result.current).toEqual({});
});
