import {
  Fragment,
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactElement,
} from 'react';
import ReactDOM from 'react-dom';
import mergeClasses from '@utils/mergeClasses';
import cn from 'classnames';

// hooks
import useOnOutsideClick from '@hooks/useOnClickOutside';
import useOnEscapeKeyDown from '@hooks/useOnEscapeKeyDown';

// types
import { TModalPosition } from '@type/app.type';

// styles
import defaultClasses from './modal.module.css';

type Props = {
  testid: string;
  width?: number;
  withCloseIcon?: boolean;
  variant?: TModalPosition;
  isOpen?: boolean | undefined;
  onClose?: () => void;
  renderLink?: (el: any) => any;
  renderContent: (el: any) => ReactElement;
  classes?: any;
};

const Modal = ({
  testid,
  variant = 'center',
  width = 600,
  withCloseIcon = true,
  isOpen: propsIsOpen = false,
  onClose: tellParentToClose = () => {},
  renderContent = () => <div />,
  renderLink = () => {},
  classes: propsClasses = {},
}: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const [stateIsOpen, setStateOpen] = useState(false);
  const isControlled = typeof propsIsOpen === 'boolean';
  const isOpen = isControlled ? propsIsOpen : stateIsOpen;

  let $modalRef = useRef<HTMLDivElement | null>(null);
  let $clickableOverlayRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useCallback(() => {
    if (!isControlled) {
      setStateOpen(false);
    } else {
      tellParentToClose();
    }
  }, [isControlled, tellParentToClose]);

  useOnOutsideClick($modalRef, isOpen, closeModal, $clickableOverlayRef);
  useOnEscapeKeyDown(isOpen, closeModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  return (
    <Fragment>
      {!isControlled && renderLink({ open: () => setStateOpen(true) })}

      {isOpen &&
        ReactDOM.createPortal(
          <div className={classes.scrollOverlay}>
            <div
              className={cn(classes.clickableOverlay, classes[variant])}
              data-testid={testid}
              ref={$clickableOverlayRef}
            >
              <div
                className={cn(classes.modal, classes[variant])}
                ref={$modalRef}
              >
                {withCloseIcon && <button className={classes.close}>X</button>}
                {renderContent({ close: closeModal })}
              </div>
            </div>
          </div>,
          $root!,
        )}
    </Fragment>
  );
};

const $root = document.getElementById('root');

export default Modal;
