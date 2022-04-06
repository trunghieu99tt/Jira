import { useUnplashService } from '@talons/useUnplashService';
import { FormEvent, useState } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  keyword: HTMLInputElement;
}

interface UnplashSearchPhotoElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export const useCoverPhotoForm = () => {
  const [currentSearchPage, setCurrentSearchPage] = useState<number>(1);
  const [photosOnPage, setPhotosOnPage] = useState<{
    [key: string]: any;
  }>({});
  const [searchMeta, setSearchMeta] = useState<{
    [key: string]: any;
  }>({});
  const [keyword, setKeyword] = useState<string>('');

  const { searchPhotos } = useUnplashService();

  const submitSearchImageFromUnplash = async (
    event: FormEvent<UnplashSearchPhotoElements>,
  ) => {
    event.preventDefault();
    const { keyword } = event.currentTarget.elements;
    setKeyword(keyword.value);
    setCurrentSearchPage(1);
    await fetchPhotos();
  };

  const fetchPhotos = async () => {
    const { results, total } = await searchPhotos({
      keyword,
      page: currentSearchPage,
    });
    setPhotosOnPage((prev) => ({
      ...prev,
      [currentSearchPage]: results,
    }));
    setCurrentSearchPage(currentSearchPage + 1);
    setSearchMeta((prev) => ({
      ...prev,
      total,
    }));
  };

  const photos = Object.values(photosOnPage).flat();
  const hasMore = photos.length < searchMeta.total;

  return {
    photos,
    hasMore,
    onFetchPhoto: fetchPhotos,
    submitSearchImageFromUnplash,
  };
};
