import { useUnsplashService } from '@talons/useUnsplashService';
import { FormEvent, useCallback, useEffect, useState } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  keyword: HTMLInputElement;
}

interface UnsplashSearchPhotoElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export const useCoverPhotoForm = () => {
  const [currentSearchPage, setCurrentSearchPage] = useState<number>(1);
  const [photos, setPhotos] = useState<any[]>([]);
  const [meta, setMeta] = useState<{
    [key: string]: any;
  }>({});
  const [keyword, setKeyword] = useState<string>('');

  const { searchPhotos } = useUnsplashService();

  const constructPhotoResults = (results: any) =>
    results
      ?.map((result: any) => ({
        id: result.id,
        url: result?.urls?.regular,
        description: result.description,
        alt: result.alt_description,
      }))
      .filter(Boolean);

  const fetchPhotos = useCallback(async () => {
    const { results, total } = await searchPhotos({
      keyword: keyword,
      page: currentSearchPage,
    });
    const photoResults = constructPhotoResults(results);
    setPhotos((prev) => [...prev, ...photoResults]);
    setMeta((prev) => ({
      ...prev,
      total,
    }));
  }, [keyword, currentSearchPage]);

  const submitSearchImageFromUnsplash = async (
    event: FormEvent<UnsplashSearchPhotoElements>,
  ) => {
    event.preventDefault();
    const { keyword } = event.currentTarget.elements;
    setKeyword(keyword.value);
    setCurrentSearchPage(1);
    setPhotos([]);
    setMeta({
      total: 0,
    });
  };

  const onFetchMore = () => {
    console.log('fetch more was called');
    setCurrentSearchPage((prev) => prev + 1);
  };

  useEffect(() => {
    console.log(keyword, currentSearchPage);
    fetchPhotos();
  }, [keyword, currentSearchPage]);

  const hasMore = photos.length < meta.total;

  return {
    photos,
    hasMore,
    onFetchMore,
    submitSearchImageFromUnsplash,
  };
};
