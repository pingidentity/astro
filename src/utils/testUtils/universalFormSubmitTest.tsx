import React, { ReactNode, useState } from 'react';
import { CalendarDate } from '@internationalized/date';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../index';

interface ComponentWithFormUncontrolled {
  renderComponent: (props:{
    controlProps?: { name, value },
    name?: string,
    value?: string | number | null| undefined,
    isDisabled?: boolean,
   }) => ReactNode,
  testValue: string | number | null| undefined;
  componentType: string,
  isDisabled?: boolean;
}

interface ComponentWithFormControlled {
  renderComponent: (props: {
    controlProps?: { name }
    selectedKey?: string | undefined;
    onSelectionChange?: (key: string) => void;
    value?: string | number | CalendarDate| null| undefined;
    onChange?: (value: string) => void;
  }) => ReactNode,
  componentType: string,
}

interface UserFile {
  id: string;
  name: string;
  downloadLink: string;
}

const handleFormSubmit = jest.fn();

const mockOnSubmit = jest.fn(e => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const entries = {};
  formData.forEach((value, key) => {
    entries[key] = value;
  });
  handleFormSubmit(entries);
});

const name = 'testName';

const useDefaultProps = componentType => {
  const [value, setValue] = useState('');
  const [userFiles, setUserFiles] = useState<UserFile[]>([]);

  const handleFileSelect = (e, files) => {
    setUserFiles([{
      id: 'test',
      name: files[0].name,
      downloadLink: 'link for testing purposes',
    }]);
  };

  const handleChange = jest.fn();
  switch (componentType) {
    case 'CheckboxField':
    case 'SwitchField':
      return {
        value,
        onChange: setValue,
        name,
        isSelected: true,
      };
    case 'ComboBoxField':
    case 'LinkSelectField':
    case 'SelectField':
    case 'MultivaluesField':
      return {
        selectedKey: value,
        onSelectionChange: setValue,
        name,
      };
    case 'ColorField':
      return {
        value,
        onChange: handleChange,
        name,
      };
    case 'DatePicker':
      return {
        value: new CalendarDate(2022, 8, 10),
        onChange: setValue,
        name,
      };
    case 'FileInputField':

      return {
        fileList: userFiles,
        onFileSelect: handleFileSelect,
        name,
      };
    case 'ImageUploadField':
      return {
        previewImage: 'https://picsum.photos/id/1025/200/300',
        onChange: handleChange,
        name,
      };
    case 'NumberField':
      return {
        value: 12,
        onChange: setValue,
        name,
      };
    case 'PasswordField':
      return {
        value,
        onChange: e => setValue(e.target.value),
        name,
      };
    case 'RadioGroupField':
    case 'SearchField':
      return {
        value,
        onChange: setValue,
        name,
      };
    case 'TextAreaField':
    case 'TextField':
      return {
        value,
        onChange: e => setValue((e.target as HTMLInputElement).value),
        name,
      };
    default:
      return {};
  }
};

const getDefaultProps = (componentType, testValue) => {
  switch (componentType) {
    case 'CheckboxField':
      return {
        isSelected: true,
        name,
        value: testValue,
      };
    case 'SwitchField':
      return {
        isDefaultSelected: true,
        name,
        value: testValue,
      };
    case 'LinkSelectField':
    case 'SelectField':
      return {
        name,
        defaultSelectedKey: 'a',
        value: testValue,
      };
    case 'DatePicker':
      return {
        defaultValue: testValue,
        name,
      };
    case 'FileInputField':
      return {
        defaultFileList: [
          {
            id: 'test-id3',
            name: 'PingId Desktop (Windows)',
            downloadLink:
              'https://download.pingidentity.com/public/PingID/PingID_1.7.2.zip',
          },
        ],
        name,
      };
    case 'ImageUploadField':
      return {
        previewImage: 'https://picsum.photos/id/1025/200/300',
        name,
      };
    case 'PasswordField':
    case 'ComboBoxField':
    case 'NumberField':
    case 'MultivaluesField':
    case 'SearchField':
    case 'ColorField':
    case 'RadioGroupField':
    case 'TextAreaField':
    case 'TextField':
      return {
        name,
        value: testValue,
      };
    default:
      return null;
  }
};

const ComponentWithFormUncontrolled = ({
  renderComponent,
  testValue,
  componentType,
  isDisabled,
}: ComponentWithFormUncontrolled) => {
  const defaultProps = getDefaultProps(componentType, testValue);
  return (
    <form onSubmit={mockOnSubmit} aria-label="Test Form 1">
      {renderComponent({
        ...defaultProps,
        isDisabled,
      })}
      <Button type="submit">Submit</Button>
    </form>
  );
};

const ComponentWithFormControlled = ({
  renderComponent,
  componentType,
}: ComponentWithFormControlled) => {
  const defaultProps = useDefaultProps(componentType);

  return (
    <form onSubmit={mockOnSubmit} aria-label="Test Form 2">
      {renderComponent({
        ...defaultProps,
      })}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const universalFieldComponentTests = ({
  renderComponent,
  testValue,
  testLabel,
  componentType,
}) => {
  describe('Universal Form Submit Tests', () => {
    test('uncontrolled component should not submit when disabled', () => {
      render(
        <ComponentWithFormUncontrolled
          renderComponent={renderComponent}
          testValue={testValue}
          componentType={componentType}
          isDisabled
        />,
      );
      fireEvent.submit(screen.getByRole('form', { name: 'Test Form 1' }));

      if (componentType === 'FileInputField' || componentType === 'ImageUploadField') {
        expect(handleFormSubmit).not.toHaveBeenCalledWith({
          testName: expect.any(File),
        });
        return;
      }

      expect(handleFormSubmit).not.toHaveBeenCalledWith({
        testName: String(testValue),
      });
    });

    test('uncontrolled component should have render correct value on submission', () => {
      render(
        <ComponentWithFormUncontrolled
          renderComponent={renderComponent}
          testValue={testValue}
          componentType={componentType}
        />,
      );
      fireEvent.submit(screen.getByRole('form', { name: 'Test Form 1' }));

      if (componentType === 'FileInputField' || componentType === 'ImageUploadField') {
        expect(handleFormSubmit).toHaveBeenCalledWith({
          testName: expect.any(File),
        });
        return;
      }

      expect(handleFormSubmit).toHaveBeenCalledWith({
        testName: String(testValue),
      });
    });

    test('controlled component should have render correct value on submission', async () => {
      render(
        <ComponentWithFormControlled
          renderComponent={renderComponent}
          componentType={componentType}
        />,
      );

      if (componentType === 'FileInputField') {
        userEvent.click(screen.getByTestId('file-input-field__file-select'));

        fireEvent.change(screen.getByLabelText('file-input-test-label'), {
          target: { files: [testValue] },
        });

        fireEvent.submit(screen.getByRole('form', { name: /test form 2/i }));

        expect(handleFormSubmit).toHaveBeenCalledWith({
          testName: expect.any(File),
        });

        return;
      } if (componentType === 'ImageUploadField') {
        fireEvent.click(screen.getByRole('button', { name: 'Image preview' }));

        fireEvent.change(screen.getAllByLabelText(testLabel)[0], {
          target: { files: [testValue] },
        });

        fireEvent.submit(screen.getByRole('form', { name: /test form 2/i }));

        expect(handleFormSubmit).toHaveBeenCalledWith({
          testName: expect.any(File),
        });

        return;
      } if (componentType === 'LinkSelectField') {
        fireEvent.click(screen.getByRole('button', { name: testLabel }));

        fireEvent.click(screen.getAllByRole('option', { name: testValue })[0]);
      } else if (componentType === 'NumberField') {
        fireEvent.change(screen.getAllByLabelText(testLabel)[1], { target: { value: testValue } });
      } else if (componentType === 'RadioGroupField') {
        fireEvent.click(screen.getByLabelText(testValue));
      } else if (componentType === 'PasswordField') {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: testValue } });
      } else if (componentType === 'DatePicker') {
        const iconButton = screen.queryAllByRole('button');
        userEvent.click(iconButton[0]);

        const cells = screen.getAllByRole('gridcell');
        const selected = cells.find(cell => cell.getAttribute('aria-selected') === 'true');

        expect(selected?.children[0]).toHaveAttribute('aria-label', 'Wednesday, August 10, 2022 selected');
      } else {
        fireEvent.change(screen.getAllByLabelText(testLabel)[0], { target: { value: testValue } });
      }

      fireEvent.submit(screen.getByRole('form', { name: /test form 2/i }));

      expect(handleFormSubmit).toHaveBeenCalledWith({
        testName: String(testValue),
      });
    });
  });
};
