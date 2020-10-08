import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import Form from '../../../components/SchemaForm';

describe('form elements', () => {
  test('form success message', async () => {
    const onSubmit = (_form, _event, _onError, handleServerSuccess) => handleServerSuccess();
    const schema = {
      type: 'string',
    };
    const { asFragment } = render(
      <Form
        schema={schema}
        onSubmit={onSubmit}
        formSuccessMessage="test"
      />,
    );
    const submitButton = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    await waitFor(() => fireEvent.change(input, { target: { value: '12' } }));
    fireEvent.click(submitButton);
    expect(asFragment()).toMatchSnapshot();
  });

  test('form success title', async () => {
    const onSubmit = (_form, _event, _onError, handleServerSuccess) => handleServerSuccess();
    const schema = {
      type: 'string',
    };
    const { asFragment } = render(
      <Form
        schema={schema}
        onSubmit={onSubmit}
        formSuccessTitle="hi"
      />,
    );
    const submitButton = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    await waitFor(() => fireEvent.change(input, { target: { value: '12' } }));
    fireEvent.click(submitButton);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('single fields', () => {
  describe('string field', () => {
    test('regular', () => {
      const schema = {
        type: 'string',
      };
      const { asFragment } = render(<Form schema={schema} />);
      expect(asFragment()).toMatchSnapshot();
    });

    test('with help text', () => {
      const schema = {
        type: 'string',
      };
      const uiSchema = {
        'ui:options': {
          help: 'help text',
        },
      };
      const { asFragment } = render(<Form schema={schema} uiSchema={uiSchema} />);
      expect(asFragment()).toMatchSnapshot();
    });

    test('with markdown errors', () => {
      const schema = {
        type: 'string',
      };
      const uiSchema = {
        'ui:options': {
          hasMarkdownErrors: true,
        },
      };
      const { asFragment } = render(<Form schema={schema} uiSchema={uiSchema} />);
      expect(asFragment()).toMatchSnapshot();
    });

    test('format email', () => {
      const schema = {
        type: 'string',
        format: 'email',
      };
      const { asFragment } = render(<Form schema={schema} />);
      expect(asFragment()).toMatchSnapshot();
    });

    test.skip('format uri', () => {
      const schema = {
        type: 'string',
        format: 'uri',
      };
      const { asFragment } = render(<Form schema={schema} />);
      expect(asFragment()).toMatchSnapshot();
    });

    test.skip('format data-url', () => {
      const schema = {
        type: 'string',
        format: 'data-url',
      };
      const { asFragment } = render(<Form schema={schema} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test('string field with placeholder', () => {
    const schema = {
      type: 'string',
    };
    const uiSchema = {
      'ui:placeholder': 'placeholder',
    };
    const { asFragment } = render(<Form schema={schema} uiSchema={uiSchema} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test.skip('number field', () => {
    const schema = {
      type: 'number',
    };
    const { asFragment } = render(<Form schema={schema} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test.skip('number field 0', () => {
    const schema = {
      type: 'number',
    };
    const formData = 0;
    const { asFragment } = render(<Form schema={schema} formData={formData} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test.skip('null field', () => {
    const schema = {
      type: 'null',
    };
    const { asFragment } = render(<Form schema={schema} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test.skip('unsupported field', () => {
    const schema = {
      type: undefined,
    };
    const { asFragment } = render(<Form schema={schema} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test.skip('format color', () => {
    const schema = {
      type: 'string',
      format: 'color',
    };
    const { asFragment } = render(<Form schema={schema} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test.skip('format date', () => {
    const schema = {
      type: 'string',
      format: 'date',
    };
    const { asFragment } = render(<Form schema={schema} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test.skip('format datetime', () => {
    const schema = {
      type: 'string',
      format: 'datetime',
    };
    const { asFragment } = render(<Form schema={schema} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('password field', () => {
    const schema = {
      type: 'string',
    };
    const uiSchema = {
      'ui:widget': 'password',
    };
    const { asFragment } = render(<Form schema={schema} uiSchema={uiSchema} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('textarea field', () => {
    const schema = {
      type: 'string',
    };
    const uiSchema = {
      'ui:widget': 'textarea',
    };
    const { asFragment } = render(<Form schema={schema} uiSchema={uiSchema} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('select field', () => {
    const schema = {
      type: 'string',
      enum: ['foo', 'bar'],
    };
    const { asFragment } = render(<Form schema={schema} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('checkbox field', () => {
    const schema = {
      type: 'boolean',
    };
    const { asFragment } = render(<Form schema={schema} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // NOTE: It won't work without an object wrapper. The default value is
  // an object, but should be an array according to the formData prop.
  test('checkboxes field', () => {
    const schema = {
      type: 'object',
      properties: {
        test: {
          type: 'array',
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
    const { asFragment } = render(<Form schema={schema} uiSchema={uiSchema} formData={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test.skip('radio field', () => {
    const schema = {
      type: 'boolean',
    };
    const uiSchema = {
      'ui:widget': 'radio',
    };
    const { asFragment } = render(<Form schema={schema} uiSchema={uiSchema} />);
    expect(asFragment()).toMatchSnapshot();
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
    const { asFragment } = render(<Form schema={schema} uiSchema={uiSchema} />);
    expect(asFragment()).toMatchSnapshot();
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
    const { asFragment } = render(<Form schema={schema} uiSchema={uiSchema} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
