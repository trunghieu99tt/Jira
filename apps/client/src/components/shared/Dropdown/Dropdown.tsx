import { motion, AnimatePresence } from 'framer-motion';

// utils
import mergeClasses from '@utils/mergeClasses';

// style
import defaultClasses from './dropdown.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  items?: any;
  isVisible?: boolean;
  classes?: any;
}

const motionConfig = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transformOrigin: 'top right',
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

const Dropdown = ({
  isVisible,
  items,
  children,
  classes: propsClasses,
}: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div {...motionConfig}>
          <div className={classes.wrapper}>
            <ul className={classes.dropdownList}>
              {items?.map((item: any, idx: number) => {
                return (
                  <li
                    key={item.id || `dropdown-item-${idx}`}
                    className={classes.dropdownListItem}
                  >
                    {item}
                  </li>
                );
              })}
              {children}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
