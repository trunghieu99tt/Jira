import { useState, ChangeEvent, memo } from 'react';
import defaultClasses from './selfControlledInput.module.css';
import mergeClasses from '@utils/mergeClasses';

type Props = {
  placeholder?: string;
  label?: string;
  name: string;
  classes?: any;
};

const SelfControlledInput = ({
  name,
  classes: propClasses,
  placeholder = '',
  label,
}: Props) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div key={name} className={classes.root}>
      {label && (
        <label htmlFor={`${name}-input`} className={classes.label}>
          {name}:
        </label>
      )}
      <input
        className={classes.input}
        id={`${name}-input`}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default memo(SelfControlledInput);
