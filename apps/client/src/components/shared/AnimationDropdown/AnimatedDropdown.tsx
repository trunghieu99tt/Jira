import { motion, AnimatePresence } from 'framer-motion';

// utils
import mergeClasses from '@utils/mergeClasses';

// style
import defaultClasses from './animatedDropdown.module.css';
import { useMemo } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  items?: any;
  isVisible?: boolean;
  classes?: any;
  transformOrigin?: string;
}

const AnimatedDropdown = ({
  isVisible,
  items,
  children,
  classes: propsClasses,
  transformOrigin = 'top right',
}: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const motionConfig = useMemo(() => {
    return {
      initial: {
        opacity: 0,
        scale: 0,
      },
      animate: {
        opacity: 1,
        scale: 1,
        transformOrigin,
      },
      exit: {
        opacity: 0,
        scale: 0,
      },
    };
  }, [transformOrigin]);

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

export default AnimatedDropdown;
