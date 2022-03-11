import useOnOutsideClick from '@hooks/useOnClickOutside';
import mergeClasses from '@utils/mergeClasses';
import { useCallback, useRef, useState } from 'react';
import Dropdown from './Dropdown';
import defaultClasses from './select.module.css';

import { BsChevronCompactDown } from 'react-icons/bs';

type Props = {
  classes?: any;
  options: any;
  value: any;
  defaultValue?: any;
  onChange: (value: string) => void;
  renderOption: ({ value }: { value: any }) => JSX.Element;
  renderValue: ({ value }: { value: any }) => JSX.Element;
};

const Select = ({
  classes: propClasses,
  renderOption,
  renderValue,
  onChange,
  options,
  defaultValue,
  value: propValue,
}: Props) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [stateValue, setStateValue] = useState<any>(defaultValue);

  const $selectRef = useRef<HTMLSelectElement>(null);

  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : stateValue;

  const onCloseDropdown = useCallback(() => setIsDropdownOpen(false), []);
  const onOpenDropdown = () => {
    console.log('clicked selection');
    setIsDropdownOpen(true);
  };

  useOnOutsideClick($selectRef, isDropdownOpen, onCloseDropdown);
  // console.log('options', options);
  // console.log('isDropdownOpen', isDropdownOpen);

  return (
    <section className={classes.root} ref={$selectRef} onClick={onOpenDropdown}>
      <div className={classes.value}>
        {renderValue({ value })}
        <span>
          <BsChevronCompactDown />
        </span>
      </div>
      <Dropdown
        isVisible={isDropdownOpen}
        onChange={onChange}
        options={options}
        renderOption={renderOption}
      />
    </section>
  );
};

export default Select;
