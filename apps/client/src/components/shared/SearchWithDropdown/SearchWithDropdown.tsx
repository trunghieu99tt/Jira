import defaultClasses from './searchWithDropdown.module.css';
import mergeClasses from '@utils/mergeClasses';
import React, { useCallback, useRef, useState } from 'react';
import Input from '@components/shared/Input';
import useOnOutsideClick from '@hooks/useOnClickOutside';
import debounce from 'lodash.debounce';

const Dropdown = React.lazy(() => import('@components/shared/Dropdown'));

type Props = {
  classes?: Record<string, any>;
  onSearch: (search: string) => void;
  onClickResult: (value: any) => void;
  renderResult: ({ value }: { value: any }) => JSX.Element;
  options: any;
};

function SearchWithDropdown({
  classes: propsClasses,
  onSearch,
  renderResult,
  onClickResult,
  options,
}: Props) {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const $rootRef = useRef<HTMLDivElement>(null);

  const onCloseDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);
  useOnOutsideClick($rootRef, isDropdownOpen, onCloseDropdown);

  const handleSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
      setIsDropdownOpen(true);
    }, 1000),
    [],
  );

  const onChangeSearch = (search: string) => {
    if (search?.trim()?.length) {
      handleSearch(search);
    }
  };

  return (
    <div className={classes.root} ref={$rootRef}>
      <Input onChange={onChangeSearch} name={'search'} />
      {options?.length > 0 && (
        <Dropdown
          renderOption={renderResult}
          onChange={onClickResult}
          options={options}
          isVisible={isDropdownOpen}
        />
      )}
    </div>
  );
}

export default SearchWithDropdown;
