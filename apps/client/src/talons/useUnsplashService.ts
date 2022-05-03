import client from '../api/client';

export const useUnsplashService = () => {
  const searchPhotos = async ({
    keyword,
    page,
    perPage = 12,
  }: {
    keyword: string;
    page: number;
    perPage?: number;
  }) => {
    console.log('input keyword', keyword);
    const url = `https://api.unsplash.com/search/photos/?query=${keyword}&page=${page}&per_page=${perPage}`;
    console.log(url);
    const response = await client.get(url, {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNPLASH_ACCESS_KEY}`,
      },
    });

    return response?.data || [];
  };

  return {
    searchPhotos,
  };
};
