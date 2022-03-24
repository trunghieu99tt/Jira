import { useEffect } from 'react';

type Props = {
  handleKeyDown: (e: KeyboardEvent) => void;
};

const Protip = ({ handleKeyDown }: Props) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <p>
      Tips: Press <strong>M</strong> to comment
    </p>
  );
};

export default Protip;
