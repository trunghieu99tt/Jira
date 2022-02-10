import mergeClasses from '@utils/mergeClasses';
import React, { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

import defaultClasses from './input.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classes?: any;
  value: string | number;
  icon: string;
  invalid: boolean;
  filter: RegExp | undefined;
  onChange: (el?: any, value?: any) => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      classes: propsClasses,
      icon = undefined,
      filter = undefined,
      onChange,
      ...otherProps
    },
    ref,
  ) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const handleChange = (event: ChangeEvent) => {
      if (
        !filter ||
        (event?.target?.nodeValue && filter.test(event.target.nodeValue))
      ) {
        onChange(event.target.nodeValue, event);
      }
    };

    return (
      <div className={classes.wrapper}>
        {icon && <div className={classes.icon}>{icon}</div>}
        <input {...otherProps} onChange={handleChange} ref={ref} />
      </div>
    );
  },
);

export default Input;
