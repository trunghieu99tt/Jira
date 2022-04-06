import client from '../api/client';

export const useUnplashService = () => {
  const searchPhotos = async ({
    keyword,
    page,
    perPage = 15,
  }: {
    keyword: string;
    page: number;
    perPage?: number;
  }) => {
    const response = await client.get(
      `https://api.unsplash.com/search/photos`,
      {
        params: {
          query: keyword,
          page,
          per_page: perPage,
        },
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNPLASH_ACCESS_KEY}`,
        },
      },
    );

    return response?.data || [];
  };

  return {
    searchPhotos,
  };
};
