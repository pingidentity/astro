/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddButton from '@rjsf/core/lib/components/AddButton';
import _ from 'lodash';

import {
  orderProperties,
  retrieveSchema,
  getDefaultRegistry,
  ADDITIONAL_PROPERTY_FLAG,
} from '@rjsf/core/lib/utils';

import {
  Modal,
  Box,
  Button,
  OverlayProvider,
  AstroWrapper,
  SelectField,
  Item,
} from '@pingux/astro';

const DefaultObjectFieldTemplate = ({
  description,
  DescriptionField,
  disabled,
  formContext,
  idSchema,
  onAddClick,
  properties,
  readonly,
  required,
  schema,
  title,
  TitleField,
  uiSchema,
}) => (
  <fieldset id={idSchema.$id}>
    {(uiSchema['ui:title'] || title) && (
      <TitleField
        id={`${idSchema.$id}__title`}
        title={title || uiSchema['ui:title']}
        required={required}
        formContext={formContext}
      />
    )}
    {description && (
      <DescriptionField
        id={`${idSchema.$id}__description`}
        description={description}
        formContext={formContext}
      />
    )}
    {properties.map(prop => prop.content)}
    <AddButton
      className="object-property-expand"
      onClick={onAddClick(schema)}
      disabled={disabled || readonly}
    />
  </fieldset>
);

DefaultObjectFieldTemplate.propTypes = {
  description: PropTypes.string.isRequired,
  DescriptionField: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  formContext: PropTypes.shape({}).isRequired,
  idSchema: PropTypes.shape({
    $id: PropTypes.string,
  }).isRequired,
  onAddClick: PropTypes.func.isRequired,
  properties: PropTypes.shape({}).isRequired,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  schema: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  TitleField: PropTypes.func.isRequired,
  uiSchema: PropTypes.shape({
    'ui:title': PropTypes.string,
  }).isRequired,
};

DefaultObjectFieldTemplate.defaultProps = {
  disabled: false,
  readonly: false,
  required: false,
};

const ObjectField = ({
  uiSchema,
  formData,
  errorSchema,
  idSchema,
  name,
  required,
  disabled,
  readonly,
  idPrefix,
  onBlur,
  onFocus,
  onChange,
  schema,
  registry = getDefaultRegistry(),
}) => {
  const [wasPropertyKeyModified, setWasPropertyKeyModified] = useState(false);

  /**
   * NOTE: Modal states used for adding a new property
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState('');

  const isRequired = itemName => Array
    .isArray(schema.required)
    && schema.required.indexOf(itemName) !== -1;

  const onPropertyChange = (
    itemName,
    addedByAdditionalProperties = false,
  ) => (val, curErrorSchema) => {
    let value = val;
    if (!value && addedByAdditionalProperties) {
      value = '';
    }

    const newFormData = { ...formData, [itemName]: value };

    onChange(
      newFormData,
      curErrorSchema
      && curErrorSchema
      && {
        ...curErrorSchema,
        [itemName]: curErrorSchema,
      },
    );
  };

  const onDropPropertyClick = key => {
    onChange(_.omit(formData, key));
  };

  const getAvailableKey = (preferredKey, curFormData) => {
    let index = 0;
    let newKey = preferredKey;
    while (curFormData.hasOwnProperty(newKey)) {
      // eslint-disable-next-line no-plusplus
      newKey = `${preferredKey}-${++index}`;
    }
    return newKey;
  };

  const onKeyChange = oldValue => (val, curErrorSchema) => {
    let value = val;
    if (oldValue === value) {
      return;
    }

    value = getAvailableKey(value, formData);
    const newFormData = { ...formData };
    const newKeys = { [oldValue]: value };
    const keyValues = Object.keys(newFormData).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: newFormData[key] };
    });
    const renamedObj = Object.assign({}, ...keyValues);

    setWasPropertyKeyModified(true);

    onChange(
      renamedObj,
      curErrorSchema
      && curErrorSchema
      && {
        ...curErrorSchema,
        [value]: curErrorSchema,
      },
    );
  };

  const getDefaultValue = type => {
    switch (type) {
      case 'string':
        return 'New Value';
      case 'array':
        return [];
      case 'boolean':
        return false;
      case 'null':
        return null;
      case 'number':
        return 0;
      case 'object':
        return {};
      default:
        return 'New Value';
    }
  };

  const handleAddClick = () => () => setIsModalOpen(true);

  const addNewProperty = () => {
    let { type } = schema.additionalProperties;
    const newFormData = { ...formData };

    if (schema.additionalProperties.hasOwnProperty('$ref')) {
      const refSchema = retrieveSchema(
        { $ref: schema.additionalProperties.$ref },
        registry.rootSchema,
        formData,
      );
      type = refSchema.type;
    }

    newFormData[
      getAvailableKey(modalValue, newFormData)
    ] = getDefaultValue(type);

    setIsModalOpen(false);
    setModalValue('');

    onChange(newFormData);
  };

  const { rootSchema, fields, formContext } = registry;
  const { SchemaField, TitleField, DescriptionField } = fields;
  const refSchema = retrieveSchema(schema, rootSchema, formData);

  const title = refSchema.title === undefined ? name : refSchema.title;
  const description = uiSchema['ui:description'] || refSchema.description;
  let orderedProperties;

  try {
    const properties = Object.keys(refSchema.properties || {});
    orderedProperties = orderProperties(properties, uiSchema['ui:order']);
  } catch (err) {
    return (
      <Box>
        <p className="config-error" style={{ color: 'red' }}>
          Invalid&npsp;
          {name || 'root'}
          &nbsp;
          object field configuration:
          <em>
            {err.message}
          </em>
          .
        </p>
        <pre>{JSON.stringify(schema)}</pre>
      </Box>
    );
  }

  const Template = uiSchema['ui:ObjectFieldTemplate']
    || registry.ObjectFieldTemplate
    || DefaultObjectFieldTemplate;

  const templateProps = {
    title: uiSchema['ui:title'] || title,
    description,
    TitleField,
    DescriptionField,
    properties: orderedProperties.map(curName => {
      const addedByAdditionalProperties = refSchema.properties[
        curName
      ].hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);

      /**
       * Note: Added the `grabLatestFormData` prop as the component needs to update
       * when formData updates in order to have the proper ref when it comes time
       * to use `onDropPropertyClick`, otherwise it will only use formData as it
       * was upon property init
       */
      return {
        content: (
          <SchemaField
            name={curName}
            required={isRequired(curName)}
            schema={refSchema.properties[curName]}
            uiSchema={
              addedByAdditionalProperties
                ? uiSchema.additionalProperties
                : uiSchema[curName]
            }
            errorSchema={errorSchema[curName]}
            idSchema={idSchema[curName]}
            idPrefix={idPrefix}
            formData={formData[curName]}
            grabLatestFormData={formData}
            wasPropertyKeyModified={wasPropertyKeyModified}
            onKeyChange={onKeyChange(curName)}
            onChange={onPropertyChange(
              curName,
              addedByAdditionalProperties,
            )}
            onBlur={onBlur}
            onFocus={onFocus}
            registry={registry}
            disabled={disabled}
            readonly={readonly}
            onDropPropertyClick={() => onDropPropertyClick(curName)}
          />
        ),
        name: curName,
        readonly,
        disabled,
        required,
      };
    }),
    readonly,
    disabled,
    required,
    idSchema,
    uiSchema,
    schema: refSchema,
    formContext,
  };

  return (
    <>
      {isModalOpen && (
        <AstroWrapper>
          <OverlayProvider>
            <Modal
              title="Add Property"
              isOpen={isModalOpen}
              onClose={() => { setModalValue(''); setIsModalOpen(false); }}
              isDismissable
              hasCloseButton
            >
              <Box isRow pt="lg" mr="auto" width="300px">
                <SelectField
                  selectedKey={modalValue}
                  onSelectionChange={key => setModalValue(key)}
                  label="Property Key"
                  width="100%"
                >
                  {
                    schema.additionalOptions
                      .filter(prop => !Object.keys(formData).includes(prop) && !isRequired(prop))
                      .map(itemName => (
                        <Item key={itemName}>{itemName}</Item>
                      ))
                  }
                </SelectField>
              </Box>
              <Box isRow pt="lg" mr="auto">
                <Button
                  variant="primary"
                  onPress={addNewProperty}
                  mr="md"
                >
                  Add
                </Button>
              </Box>
            </Modal>
          </OverlayProvider>
        </AstroWrapper>
      )}

      <Template {...templateProps} formData={formData} onAddClick={handleAddClick} />
    </>
  );
};

ObjectField.propTypes = {
  uiSchema: PropTypes.shape({}),
  formData: PropTypes.shape({}),
  errorSchema: PropTypes.shape({}),
  idSchema: PropTypes.shape({}),
  name: PropTypes.string.isRequired,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  idPrefix: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  schema: PropTypes.shape({}),
  registry: PropTypes.shape({}).isRequired,
};

ObjectField.defaultProps = {
  schema: {},
  uiSchema: {},
  formData: {},
  errorSchema: {},
  idSchema: {},
  required: false,
  disabled: false,
  readonly: false,
  onFocus: _.noop,
  onBlur: _.noop,
  onChange: _.noop,
};

export default ObjectField;
