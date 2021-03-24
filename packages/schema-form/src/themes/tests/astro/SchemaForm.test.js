import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { THEMES } from '../../utils';
import Form from '../../../components/SchemaForm';

const removeIds = (doc) => {
  const all = doc.querySelectorAll('*');
  for (let i = 0, max = all.length; i < max; i += 1) {
    all[i].removeAttribute('aria-labelledby');
    all[i].removeAttribute('id');
    all[i].removeAttribute('for');
  }
  return doc;
};

describe('form elements', () => {
  test('form success message', async () => {
    const onSubmit = (_form, _event, _onError, handleServerSuccess) => handleServerSuccess();
    const schema = {
      type: 'string',
      title: 'Label',
    };
    const { asFragment } = render(
      <Form
        theme={THEMES.ASTRO}
        schema={schema}
        onSubmit={onSubmit}
        formSuccessMessage="test"
      />,
    );
    const submitButton = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    await waitFor(() => fireEvent.change(input, { target: { value: '12' } }));
    fireEvent.click(submitButton);
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test('form success title', async () => {
    const onSubmit = (_form, _event, _onError, handleServerSuccess) => handleServerSuccess();
    const schema = {
      type: 'string',
      id: 'test',
      title: 'Label',
    };
    const { asFragment } = render(
      <Form
        theme={THEMES.ASTRO}
        schema={schema}
        onSubmit={onSubmit}
        formSuccessTitle="hi"
      />,
    );
    const submitButton = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    await waitFor(() => fireEvent.change(input, { target: { value: '12' } }));
    fireEvent.click(submitButton);
    expect(removeIds(asFragment())).toMatchSnapshot();
  });
});

describe('single fields', () => {
  describe('string field', () => {
    test('regular', () => {
      const schema = {
        type: 'string',
        id: 'test',
        title: 'Label',
      };
      const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
      expect(removeIds(asFragment())).toMatchSnapshot();
    });

    test('with help text', () => {
      const schema = {
        type: 'string',
        id: 'test',
        title: 'Label',
      };
      const uiSchema = {
        'ui:options': {
          help: 'help text',
        },
      };
      const { asFragment } = render(
        <Form theme={THEMES.ASTRO} schema={schema} uiSchema={uiSchema} />,
      );
      expect(removeIds(asFragment())).toMatchSnapshot();
    });

    test('with markdown errors', () => {
      const schema = {
        type: 'string',
        title: 'Test',
      };
      const uiSchema = {
        'ui:options': {
          hasMarkdownErrors: true,
        },
      };
      const { asFragment } = render(<Form
        theme={THEMES.ASTRO}
        schema={schema}
        uiSchema={uiSchema}
      />);
      expect(removeIds(asFragment())).toMatchSnapshot();
    });

    test('with custom errors as sentence', () => {
      const schema = {
        type: 'string',
        id: 'test',
        title: 'Label',
      };
      const validate = (_formData, errors) => {
        errors.addError('blah');
        return errors;
      };
      const { asFragment } = render(
        <Form theme={THEMES.ASTRO} schema={schema} validate={validate} />,
      );
      const submitButton = screen.getByRole('button');
      fireEvent.click(submitButton);
      expect(removeIds(asFragment())).toMatchSnapshot();
    });

    test('format email', () => {
      const schema = {
        type: 'string',
        id: 'test',
        format: 'email',
        title: 'Label',
      };
      const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
      expect(removeIds(asFragment())).toMatchSnapshot();
    });

    test('format uri', () => {
      const schema = {
        type: 'string',
        id: 'test',
        format: 'uri',
        title: 'Label',
      };
      const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
      expect(removeIds(asFragment())).toMatchSnapshot();
    });

    test.skip('format data-url', () => {
      const schema = {
        type: 'string',
        id: 'test',
        format: 'data-url',
        title: 'Label',
      };
      const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
      expect(removeIds(asFragment())).toMatchSnapshot();
    });
  });

  test('string field with placeholder', () => {
    const schema = {
      type: 'string',
      id: 'test',
      title: 'Label',
    };
    const uiSchema = {
      'ui:placeholder': 'placeholder',
    };
    const { asFragment } = render(
      <Form theme={THEMES.ASTRO} schema={schema} uiSchema={uiSchema} />,
    );
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test.skip('number field', () => {
    const schema = {
      type: 'number',
      id: 'test',
      title: 'Label',
    };
    const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test.skip('number field 0', () => {
    const schema = {
      type: 'number',
      title: 'Label',
      id: 'test',
    };
    const formData = 0;
    const { asFragment } = render(
      <Form theme={THEMES.ASTRO} schema={schema} formData={formData} />,
    );
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test.skip('null field', () => {
    const schema = {
      type: 'null',
    };
    const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test.skip('unsupported field', () => {
    const schema = {
      type: undefined,
    };
    const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test.skip('format color', () => {
    const schema = {
      type: 'string',
      format: 'color',
    };
    const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test.skip('format date', () => {
    const schema = {
      type: 'string',
      format: 'date',
    };
    const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test.skip('format datetime', () => {
    const schema = {
      type: 'string',
      format: 'datetime',
    };
    const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test('password field', () => {
    const schema = {
      type: 'string',
      id: 'test',
      title: 'Label',
    };
    const uiSchema = {
      'ui:widget': 'password',
    };
    const { asFragment } = render(
      <Form theme={THEMES.ASTRO} schema={schema} uiSchema={uiSchema} />,
    );
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test('textarea field', () => {
    const schema = {
      type: 'string',
      id: 'test',
      title: 'Label',
    };
    const uiSchema = {
      'ui:widget': 'textarea',
    };
    const { asFragment } = render(
      <Form theme={THEMES.ASTRO} schema={schema} uiSchema={uiSchema} />,
    );
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test('select field', () => {
    const schema = {
      type: 'string',
      id: 'test',
      title: 'Label',
      enum: ['foo', 'bar'],
    };
    const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test('select field with default', () => {
    const schema = {
      type: 'string',
      id: 'test',
      title: 'Label',
      enum: ['foo', 'bar'],
    };
    const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test('checkbox field', () => {
    const schema = {
      type: 'boolean',
      id: 'test',
      title: 'Label',
    };
    const { asFragment } = render(<Form theme={THEMES.ASTRO} schema={schema} />);
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  // NOTE: It won't work without an object wrapper. The default value is
  // an object, but should be an array according to the formData prop.
  test('checkboxes field', async () => {
    // React will warn about unhandled state changes if we don't wait for this promise on change.
    // The currentData has no visual update directly tied to it so we must work around it for now
    // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#an-alternative-waiting-for-the-mocked-promise
    const promise = Promise.resolve();
    const onChange = jest.fn(() => promise);
    const schema = {
      type: 'object',
      properties: {
        test: {
          type: 'array',
          id: 'test',
          title: 'Label',
          items: {
            type: 'string',
            enum: ['foo', 'bar', 'fuzz', 'qux'],
          },
          uniqueItems: true,
        },
      },
    };
    const uiSchema = {
      test: {
        'ui:widget': 'checkboxes',
      },
    };
    const { asFragment } = render((
      <Form
        theme={THEMES.ASTRO}
        onChange={onChange}
        schema={schema}
        uiSchema={uiSchema}
        formData={[]}
      />
    ));
    expect(removeIds(asFragment())).toMatchSnapshot();
    await act(() => promise);
  });

  test.skip('radio field', () => {
    const schema = {
      type: 'boolean',
    };
    const uiSchema = {
      'ui:widget': 'radio',
    };
    const { asFragment } = render(
      <Form theme={THEMES.ASTRO} schema={schema} uiSchema={uiSchema} />,
    );
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test.skip('slider field', () => {
    const schema = {
      type: 'integer',
      minimum: 42,
      maximum: 100,
    };
    const uiSchema = {
      'ui:widget': 'range',
    };
    const { asFragment } = render(
      <Form theme={THEMES.ASTRO} schema={schema} uiSchema={uiSchema} />,
    );
    expect(removeIds(asFragment())).toMatchSnapshot();
  });

  test.skip('hidden label', () => {
    const schema = {
      type: 'string',
    };
    const uiSchema = {
      'ui:options': {
        label: false,
      },
    };
    const { asFragment } = render(
      <Form theme={THEMES.ASTRO} schema={schema} uiSchema={uiSchema} />,
    );
    expect(removeIds(asFragment())).toMatchSnapshot();
  });
});
