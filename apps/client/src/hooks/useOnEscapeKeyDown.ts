import { KeyCodes } from '@constants/common';
import { useEffect } from 'react';

const useOnEscapeKeyDown = (
  isListening: boolean,
  onEscapeKeyDown: Function,
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KeyCodes.ESCAPE.toString()) {
        onEscapeKeyDown();
      }
    };

    if (isListening) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isListening, onEscapeKeyDown]);
};

export default useOnEscapeKeyDown;
