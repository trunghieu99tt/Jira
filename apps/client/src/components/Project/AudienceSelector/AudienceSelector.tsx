import React, { useState, useRef, useCallback, useMemo } from 'react';

// talons
import useOnClickOutsideWithoutOverlay from '@hooks/useOnClickOutsideWithoutOverlay';

// utils
import mergeClasses from '@utils/mergeClasses';

// components
import Dropdown from '@components/shared/Dropdown';

// icons
import { MdPublic } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';

// styles
import defaultClasses from './audience.module.css';

type Props = {
  audience: number;
  setAudience: (audience: number) => void;
  classes?: any;
};

const AudienceSelector = ({
  audience,
  setAudience,
  classes: propClasses,
}: Props) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
  const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;

  const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);
  const closeDropdown = useCallback(() => setVisibleDropdown(false), []);

  useOnClickOutsideWithoutOverlay(dropdownRef, closeDropdown);

  const audiences = [
    {
      text: 'Public',
      icon: <MdPublic />,
      value: 0,
    },
    {
      text: 'Private',
      icon: <BsFillPeopleFill />,
      value: 1,
    },
  ];

  const renderAudience = useMemo(() => {
    const { text, icon } = audiences[audience];
    return (
      <div className={classes.audience} onClick={toggleDropdown}>
        <div className={classes.audienceIcon}>{icon}</div>
        <p className={classes.audienceText}>{text}</p>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selections = audiences.map((audience, index) => {
    return (
      <div
        className={classes.audienceSelectionItem}
        onClick={() => setAudience(audience.value)}
      >
        {audience.icon}
        <span>{audience.text}</span>
      </div>
    );
  });

  return (
    <div className={classes.root} ref={dropdownRef}>
      {renderAudience}
      <Dropdown isVisible={visibleDropdown} items={selections} />
    </div>
  );
};

export default AudienceSelector;
