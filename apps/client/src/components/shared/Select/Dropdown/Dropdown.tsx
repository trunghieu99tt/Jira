import { TTransformOrigin } from '@type/app.type';
import mergeClasses from '@utils/mergeClasses';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

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
  transformOrigin = 'top right',
  options,
  onChange,
  renderOption,
}: Props) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  const motionConfig = useMemo(
    () => ({
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
    }),
    [transformOrigin],
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div {...motionConfig}>
          <div className={classes.wrapper}>
            <ul className={classes.dropdownList}>
              {options?.map((option: any, idx: number) => {
                return (
                  <li
                    key={`dropdown-item-${idx}`}
                    className={classes.dropdownListItem}
                    onClick={() => onChange(option.value)}
                  >
                    {renderOption({ value: option.value })}
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
