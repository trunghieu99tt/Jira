import { TTransformOrigin } from '@type/app.type';
import mergeClasses from '@utils/mergeClasses';
import cn from 'classnames';

// style
import defaultClasses from './dropdown.module.css';

interface Props {
  items?: any;
  isVisible?: boolean;
  classes?: any;
  options?: any;
  renderOption: ({ value }: { value: any }) => JSX.Element;
  onChange: (value: string) => void;
  transformOrigin?: TTransformOrigin;
}

const Dropdown = ({
  classes: propClasses,
  isVisible,
  options,
  onChange,
  renderOption,
}: Props) => {
  const classes = mergeClasses(defaultClasses, propClasses);
  return (
    <div
      className={cn(classes.wrapper, {
        [classes.visible]: isVisible,
      })}
    >
      <ul className={classes.dropdownList}>
        {options?.map((option: any, idx: number) => {
          return (
            <li
              key={`dropdown-item-${idx}`}
              className={classes.dropdownListItem}
              onClick={() => {
                onChange(option.value);
              }}
            >
              {renderOption({ value: option.value })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
