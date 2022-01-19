import { useState } from 'react';

type useToggleReturnType = {
  visible: boolean;
  onShow: () => void;
  onHide: () => void;
  onToggle: () => void;
};

const useToggle = (): useToggleReturnType => {
  const [visible, setVisible] = useState<boolean>(false);

  const onShow = () => setVisible(true);

  const onHide = () => {
    setVisible(false);
  };

  const onToggle = () => {
    setVisible((value) => !value);
  };

  return {
    visible,
    onShow,
    onHide,
    onToggle,
  };
};

export { useToggle };
