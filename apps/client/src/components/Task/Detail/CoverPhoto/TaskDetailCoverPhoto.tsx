import CoverPhotoForm from '@components/Task/CoverPhoto/Form';
import { useCallback, useState } from 'react';

type Props = {
  taskId: number;
  onChange: (coverPhoto: string) => void;
};

const TaskDetailCoverPhoto = ({ taskId, onChange }: Props) => {
  const [showCoverPhotoForm, setShowCoverPhotoForm] = useState(false);

  const toggleCoverPhotoForm = useCallback(() => {
    setShowCoverPhotoForm((prev) => !prev);
  }, []);

  return (
    <div>
      <button onClick={toggleCoverPhotoForm}>Change cover photo</button>
      {showCoverPhotoForm && <CoverPhotoForm onChange={onChange} />}
    </div>
  );
};

export default TaskDetailCoverPhoto;
