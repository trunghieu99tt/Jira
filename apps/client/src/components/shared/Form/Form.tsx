import {
  Formik,
  Form as FormikForm,
  Field as FormikField,
  FieldProps,
} from 'formik';

// utils
import { generateErrors, is } from '@utils/validation';
import { ObjectTool } from 'tools';

import Field from './Fields';

const Form = ({ validate, validations, ...otherProps }: any) => {
  const form = (
    <Formik
      {...otherProps}
      validate={(value) => {
        if (validate) {
          return validate(value);
        }
        if (validations) {
          return generateErrors(value, validations);
        }

        return {};
      }}
    />
  );

  return form;
};

Form.Element = (props: any) => <FormikForm noValidate {...props} />;

Form.Field = ObjectTool.mapValues(
  Field,
  (FieldComponent) =>
    ({ name, validate, ...props }: any) => {
      return (
        <FormikField name={name} validate={validate}>
          {({
            field,
            form: { touched, errors, setFieldValue },
          }: FieldProps) => (
            <FieldComponent
              {...field}
              {...props}
              name={name}
              error={
                ObjectTool.get(touched, name) && ObjectTool.get(errors, name)
              }
              onChange={(value: any) => setFieldValue(name, value)}
            />
          )}
        </FormikField>
      );
    },
);

Form.initialValues = (data: any, getFieldValues: Function) =>
  getFieldValues((key: string, defaultValue = '') => {
    return ObjectTool.get(data, key, defaultValue);
  });

Form.is = is;

export default Form;
