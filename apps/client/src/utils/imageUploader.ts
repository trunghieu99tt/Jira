import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL,
} from '@config/secret';
import client from 'api/client';
import axios from 'axios';

export const checkImage = (file: File) => {
  let err = '';
  if (!file) return (err = 'File does not exist.');

  if (file.size > 1024 * 1024)
    // 1mb
    err = 'The largest image size is 1mb.';

  if (file.type !== 'image/jpeg' && file.type !== 'image/png')
    err = 'Image format is incorrect.';

  return err;
};

export const imageUpload = async (
  images: FileList | never[] | File[],
): Promise<string[]> => {
  const imageUrls = await Promise.all(
    Array.from(images).map(async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response?.data?.secure_url || '';
    }),
  );

  return imageUrls;
};

export const uploadFiles = async (
  files: FileList | never[] | File[],
): Promise<number[]> => {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('files', file));
  formData.append('uploadStrategy', 'ipfs');
  console.log(files);
  const response = await client.post('file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
