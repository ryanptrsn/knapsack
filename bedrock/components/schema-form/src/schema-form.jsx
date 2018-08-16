import React from 'react';
import PT from 'prop-types';
import Form from 'react-jsonschema-form';
import { getRandomInt } from '../../../packages/utils/src/index';
import CustomArrayField from './custom-templates/array-field';
import CustomField from './custom-templates/custom-field';
import './form.styles.css';

/* eslint-disable no-console */
export default class SchemaForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
  }

  onChange(data) {
    if (this.props.isDebug) {
      console.log('Form Data changed ', data);
    }
    this.props.onChange(data);
  }

  onSubmit(data) {
    if (this.props.isDebug) {
      console.log('Form Data submitted ', data);
    }
    this.props.onSubmit(data);
  }

  onError(data) {
    if (this.props.isDebug) {
      console.log('Form Data error ', data);
    }
    this.props.onError(data);
  }

  render() {
    return (
      <Form
        {...this.props}
        formData={this.props.formData}
        schema={this.props.schema}
        uiSchema={this.props.uiSchema}
        onSubmit={this.onSubmit}
        onError={this.onError}
        onChange={this.onChange}
        ArrayFieldTemplate={CustomArrayField}
        FieldTemplate={CustomField}
        className={this.props.isInline ? 'rjsf rjsf--inline' : 'rjsf'}
      >
        <span />
        {/* @todo make it easier to disable SchemaForm submit button */}
      </Form>
    );
  }
}

SchemaForm.defaultProps = {
  idPrefix: `schema-form--${getRandomInt(10000)}`,
  isDebug: false,
  uiSchema: {},
  isInline: false,
  formData: {},
  onChange: () => {},
  onSubmit: () => {},
  onError: () => {},
};

SchemaForm.propTypes = {
  schema: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
  uiSchema: PT.object, // eslint-disable-line react/forbid-prop-types
  onChange: PT.func,
  onError: PT.func,
  onSubmit: PT.func,
  isDebug: PT.bool,
  idPrefix: PT.string,
  isInline: PT.bool, // @todo implement `isInline` form for left-to-right mini-forms
  formData: PT.object,
};