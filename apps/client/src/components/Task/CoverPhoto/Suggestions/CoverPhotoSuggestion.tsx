import InfiniteScroll from 'react-infinite-scroll-component';
import defaultClasses from './coverPhotoSuggestion.module.css';
import mergeClasses from '@utils/mergeClasses';

type Props = {
  data: any;
  fetchMore: () => void;
  hasMore: boolean;
  onClick: (url: string) => void;
  classes?: any;
};

const CoverPhotoSuggestion = ({
  data,
  hasMore,
  fetchMore,
  onClick,
  classes: propsClasses,
}: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const onClickPhoto = (url: string) => (event: any) => {
    event.preventDefault();
    onClick(url);
  };

  return (
    <div className={classes.root}>
      <InfiniteScroll
        next={fetchMore}
        hasMore={hasMore}
        loader={hasMore && <p>Loading...</p>}
        dataLength={data.length}
        height={150}
      >
        <div className={classes.list}>
          {data.map((item: any) => {
            return (
              <div
                className={classes.item}
                onClick={onClickPhoto(item?.url || '')}
                key={`cover-photo-suggestion-${item.id}`}
              >
                <figure className={classes.imageWrapper}>
                  <img
                    className={classes.img}
                    src={item?.url || ''}
                    alt={data?.alt_description ?? ''}
                    loading={'lazy'}
                  />
                  <figcaption className={classes.alt}>
                    {item.alt_description}
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CoverPhotoSuggestion;
