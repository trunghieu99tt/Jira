// utils
import { StringTool } from 'tools';
import mergeClasses from '@utils/mergeClasses';

// components
import Input from '../Input';

// styles
import defaultClasses from './form.module.css';

const generateField = (FormComponent: any) => {
  const FieldComponent = ({
    classes: propsClasses,
    label,
    tip,
    error,
    name,
    ...otherProps
  }: any) => {
    const classes = mergeClasses(defaultClasses, propsClasses);
    const fieldId = StringTool.makeId('form-field');

    return (
      <div
        className={classes.fieldWrapper}
        data-testid={name ? `form-field:${name}` : 'form-field'}
      >
        {label && <label htmlFor={fieldId}>{label}</label>}
        <FormComponent
          id={fieldId}
          invalid={!!error}
          name={name}
          {...otherProps}
        />
        {tip && <div className={classes.tip}>{tip}</div>}
        {error && <div className={classes.error}>{error}</div>}
      </div>
    );
  };

  return FieldComponent;
};

const exportObject = {
  Input: generateField(Input),
};

export default exportObject;