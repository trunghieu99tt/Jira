import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  data: any;
  fetchMore: () => void;
  hasMore: boolean;
  onClick: (url: string) => void;
};

const CoverPhotoSuggestion = ({ data, hasMore, fetchMore, onClick }: Props) => {
  const onClickPhoto = (url: string) => (event: any) => {
    event.preventDefault();
    onClick(url);
  };

  return (
    <InfiniteScroll
      next={fetchMore}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
      dataLength={data.length}
    >
      {data.map((item: any) => {
        return (
          <div
            className="cover-photo-suggestion"
            onClick={onClickPhoto(data?.urls?.regular ?? '')}
          >
            <div className="cover-photo-suggestion-image">
              <img src={item.image} alt={data?.description ?? ''} />
            </div>
            <div className="cover-photo-suggestion-title">{item.title}</div>
          </div>
        );
      })}
    </InfiniteScroll>
  );
};

export default CoverPhotoSuggestion;
