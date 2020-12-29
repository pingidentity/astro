import { renderHook } from '@testing-library/react-hooks';
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
  jest.clearAllMocks();
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

test('should return empty object for simplified mode', () => {
  const { result } = renderHook(() => useStatefulForm({ mode: FORM_MODE.SIMPLIFIED }));
  expect(result.current).toEqual({});
});
