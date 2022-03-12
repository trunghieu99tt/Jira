import { useCallback, useRef, useState } from 'react';

// talons
import useOnOutsideClick from '@hooks/useOnClickOutside';

// utils
import mergeClasses from '@utils/mergeClasses';

// components
import Dropdown from './Dropdown';

// icons
import { RiArrowDownSLine } from 'react-icons/ri';

// styles
import defaultClasses from './select.module.css';

type Props = {
  value: any;
  options: any;
  classes?: any;
  selectable?: boolean;
  defaultValue?: any;
  onChange: (value: string | number) => void;
  renderOption: ({ value }: { value: any }) => JSX.Element;
  renderValue: ({ value }: { value: any }) => JSX.Element;
};

const Select = ({
  classes: propClasses,
  renderOption,
  renderValue,
  onChange,
  options,
  selectable = true,
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
  const toggleOpenDropdown = () => {
    setIsDropdownOpen((v) => !v);
  };

  useOnOutsideClick($selectRef, isDropdownOpen, onCloseDropdown);

  return (
    <section
      className={classes.root}
      ref={$selectRef}
      onClick={toggleOpenDropdown}
    >
      <div className={classes.value}>
        {renderValue({ value })}
        {selectable && options?.length > 0 && (
          <span>
            <RiArrowDownSLine />
          </span>
        )}
      </div>
      <Dropdown
        isVisible={isDropdownOpen && selectable}
        onChange={onChange}
        options={options}
        renderOption={renderOption}
      />
    </section>
  );
};

export default Select;
