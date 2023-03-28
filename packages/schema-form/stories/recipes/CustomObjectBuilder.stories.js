/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Text,
} from '@pingux/astro';
import SchemaForm from '../../src/components/SchemaForm';
import ObjectField from './CustomObjectField';
import FieldTemplate from './CustomFieldTemplate';

/**
 * ObjectFieldTemplate
 */
const ObjectFieldTemplate = ({
  TitleField,
  properties,
  title,
  schema,
  description,
  onAddClick,
}) => (
  <div style={{ marginBottom: '20px' }}>
    <TitleField title={title} />
    <div className="row">
      {properties.map(prop => (
        <div
          className="col-lg-2 col-md-4 col-sm-6 col-xs-12"
          key={prop.content.key}
        >
          {prop.content}
        </div>
      ))}
    </div>
    {schema.additionalProperties && (
    <Button
      mb="sm"
      variant="link"
      className="object-property-expand"
      onClick={onAddClick(schema)}
    >
      <Text variant="label" color="active"> + Add Property</Text>
    </Button>
    )}
    {description}
  </div>
);

export const CustomObjectBuilder = () => {
  const schema = {
    type: 'object',
    required: [
      'firstName',
      'lastName',
    ],
    additionalProperties: {
      type: 'string',
    },
    additionalOptions: [
      'username',
      'address',
      'email',
    ],
    properties: {
      firstName: {
        type: 'string',
        title: 'firstname',
        default: 'John',
      },
      lastName: {
        type: 'string',
        title: 'lastname',
        default: 'Doe',
      },
    },
  };

  const uiSchema = {
    'ui:ObjectFieldTemplate': ObjectFieldTemplate,
  };

  /**
   * NOTE: Using Astro theme as custom components are built with Astro itself
   */
  return (
    <SchemaForm
      theme="astro"
      schema={('Schema', schema)}
      uiSchema={('uiSchema', uiSchema)}
      fieldTemplate={FieldTemplate}
      fields={{ ObjectField }}
    />
  );
};
