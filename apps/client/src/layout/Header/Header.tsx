// images
import logo from '@images/Logo.svg';
import { Link } from 'react-router-dom';

import { BsFillGrid3X3GapFill } from 'react-icons/bs';

// styles
import classes from './header.module.css';
import ProfileDropdown from '@components/ProfileDropdown';

const Header = () => {
  return (
    <header className={classes.root}>
      <section className={classes.left}>
        <figure className={classes.logoWrapper}>
          <img src={logo} alt="logo" className={classes.logo} />
        </figure>
        <div className={classes.info}>
          <h3 className={classes.siteName}>Jira</h3>
          <Link to="/">
            <button className={classes.allBoardLink}>
              <BsFillGrid3X3GapFill />
              <span>All Projects</span>
            </button>
          </Link>
        </div>
      </section>
      <section className={classes.right}>
        <ProfileDropdown />
      </section>
    </header>
  );
};

export default Header;
