import { lazy, useCallback, useState, Suspense } from 'react';
import Button from '@components/shared/Button';

type Props = {
  taskId: number;
  onChange: (coverPhoto: string) => void;
};

const CoverPhotoForm = lazy(() => import('@components/Task/CoverPhoto/Form'));

const TaskDetailCoverPhoto = ({ taskId, onChange }: Props) => {
  const [showCoverPhotoForm, setShowCoverPhotoForm] = useState(false);

  const toggleCoverPhotoForm = useCallback(() => {
    setShowCoverPhotoForm((prev) => !prev);
  }, []);

  return (
    <div>
      <Button variant={'primary'} onClick={toggleCoverPhotoForm}>
        Change cover photo
      </Button>
      {showCoverPhotoForm && (
        <Suspense fallback={<div> Loading... </div>}>
          <CoverPhotoForm onChange={onChange} />
        </Suspense>
      )}
    </div>
  );
};

export default TaskDetailCoverPhoto;
