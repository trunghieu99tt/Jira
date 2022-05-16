import { TButtonVariant } from '@type/app.type';
import mergeClasses from '@utils/mergeClasses';
import cn from 'classnames';
import { ButtonHTMLAttributes, forwardRef, ReactElement } from 'react';
import defaultClasses from './button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: any;
  children: any;
  variant: TButtonVariant;
  icon?: string | ReactElement;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      icon,
      children,
      disabled = false,
      isLoading = false,
      variant = 'secondary',
      classes: propsClasses,
      onClick,
      ...otherProps
    },
    ref,
  ) => {
    const classes = mergeClasses(defaultClasses, propsClasses);
    const handleClick = () => !disabled && !isLoading && onClick && onClick();

    return (
      <button
        {...otherProps}
        onClick={handleClick}
        disabled={disabled || isLoading}
        ref={ref}
        className={cn(classes.root, classes[variant])}
      >
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </button>
    );
  },
);

export default Button;
