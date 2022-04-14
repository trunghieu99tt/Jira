import React, { useCallback, useMemo, useRef, useState } from 'react';
import useOnClickOutsideWithoutOverlay from '@hooks/useOnClickOutsideWithoutOverlay';
import mergeClasses from '@utils/mergeClasses';
import { MdPublic } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';
import defaultClasses from './audience.module.css';

const AnimatedDropdown = React.lazy(
  () => import('@components/shared/AnimationDropdown'),
);

type Props = {
  audience: number;
  classes?: any;
  setAudience: (audience: number) => void;
  transformOrigin?: string;
};

const AudienceSelector = ({
  audience,
  setAudience,
  classes: propClasses,
  transformOrigin = 'top left',
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
      <AnimatedDropdown
        transformOrigin={transformOrigin}
        isVisible={visibleDropdown}
        items={selections}
      />
    </div>
  );
};

export default AudienceSelector;
