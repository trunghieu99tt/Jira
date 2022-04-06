import classes from '@components/Task/Label/Create/createLabel.module.css';
import SelfControlledInput from '@components/shared/SelfControlledInput/SelfControlledInput';
import Button from '@components/shared/Button';
import { useCoverPhotoForm } from '@components/Task/CoverPhoto/Form/useCoverPhotoForm';
import CoverPhotoSuggestion from '@components/Task/CoverPhoto/Suggestions';

type Props = {
  onChange: (coverPhotoUrl: string) => void;
};

const CoverPhotoForm = ({ onChange }: Props) => {
  const { photos, hasMore, onFetchPhoto, submitSearchImageFromUnplash } =
    useCoverPhotoForm();

  return (
    <div>
      <form onSubmit={submitSearchImageFromUnplash}>
        <h4>Photo search</h4>
        <p className={classes.description}>Search Unplash for photos</p>
        <div>
          <SelfControlledInput
            name="keyword"
            placeholder={'Keyword...'}
            classes={{
              input: classes.input,
              label: classes.label,
            }}
          />
          <Button variant="primary" type="submit">
            Update
          </Button>
        </div>
      </form>
      {photos?.length > 0 && (
        <CoverPhotoSuggestion
          data={photos}
          fetchMore={onFetchPhoto}
          hasMore={hasMore}
          onClick={onChange}
        />
      )}
    </div>
  );
};

export default CoverPhotoForm;
