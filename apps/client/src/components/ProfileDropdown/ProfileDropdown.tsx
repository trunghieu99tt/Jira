import Avatar from '@components/shared/Avatar';
import Dropdown from '@components/shared/Dropdown';
import useOnClickOutsideWithoutOverlay from '@hooks/useOnClickOutsideWithoutOverlay';
import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { RiAccountCircleFill, RiLogoutBoxRLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import classes from './profileDropdown.module.css';

const ProfileDropdown = () => {
  const user = {
    _id: 1,
    role: 'admin',
    name: '',
    avatar: '',
  };
  const { t } = useTranslation();
  const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);

  const myAccountControllerRef =
    useRef() as React.MutableRefObject<HTMLDivElement>;

  const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

  useOnClickOutsideWithoutOverlay(myAccountControllerRef, () =>
    setVisibleDropdown(false),
  );

  const handleLogout = () => {};

  const dropdownItems = useMemo(
    () => [
      <Link to={`/profile/${user?._id}`}>
        <RiAccountCircleFill></RiAccountCircleFill>
        <p>{t('profile')}</p>
      </Link>,
      ...((user?.role === 'admin' && [
        <Link to="/users">Go to dashboard</Link>,
      ]) ||
        []),
      <button onClick={handleLogout}>
        <RiLogoutBoxRLine></RiLogoutBoxRLine>
        <p>{t('logout')}</p>
      </button>,
    ],
    [t, user?._id, user?.role],
  );

  return (
    <div ref={myAccountControllerRef} className={classes.root}>
      <div className={classes.inner}>
        <Avatar src={user?.avatar || ''} alt={user?.name} size="MEDIUM" />
        <p className={classes.username}>{user?.name}</p>
        <button onClick={toggleDropdown} className={classes.toggleBtn}>
          <BsFillCaretDownFill />
        </button>
      </div>

      {/* <Dropdown isVisible={visibleDropdown} items={dropdownItems} /> */}
    </div>
  );
};

export default ProfileDropdown;
