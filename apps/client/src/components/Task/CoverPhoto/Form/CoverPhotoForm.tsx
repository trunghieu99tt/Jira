import { lazy, Suspense, useMemo } from 'react';
import SelfControlledInput from '@components/shared/SelfControlledInput/SelfControlledInput';
import { useCoverPhotoForm } from '@components/Task/CoverPhoto/Form/useCoverPhotoForm';
import defaultClasses from './coverPhoto.module.css';
import mergeClasses from '@utils/mergeClasses';

const CoverPhotoSuggestion = lazy(
  () => import('@components/Task/CoverPhoto/Suggestions'),
);

type Props = {
  onChange: (coverPhotoUrl: string) => void;
  classes?: any;
};

const CoverPhotoForm = ({ onChange, classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const { photos, hasMore, onFetchMore, submitSearchImageFromUnsplash } =
    useCoverPhotoForm();

  const coverPhotoSuggestionProps = useMemo(() => {
    return {
      data: photos,
      hasMore,
      fetchMore: onFetchMore,
      onChange,
      onClick: onChange,
    };
  }, [photos, hasMore, onFetchMore, onChange]);

  return (
    <div className={classes.root}>
      <form onSubmit={submitSearchImageFromUnsplash} className={classes.form}>
        <h4 className={classes.heading}>Photo search</h4>
        <p className={classes.description}>Search Unsplash for photos</p>
        <div className={classes.formItem}>
          <SelfControlledInput name="keyword" placeholder={'Keyword...'} />
        </div>
      </form>
      {photos?.length > 0 && (
        <Suspense fallback={<div>Loading...</div>}>
          <CoverPhotoSuggestion {...coverPhotoSuggestionProps} />
        </Suspense>
      )}
    </div>
  );
};

export default CoverPhotoForm;
