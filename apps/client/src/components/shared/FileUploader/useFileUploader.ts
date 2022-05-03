import { useRef, useState } from 'react';
import mime from 'mime-types';
import { ACCEPT_FILE_FORMATS, MAX_FILE_SIZE } from '@constants/common';

type Props = {
  handleFiles: (files: File[]) => void;
  maxNumberOfFiles: number;
};

export const useFileUploader = ({
  handleFiles: handleFilesProp,
  maxNumberOfFiles,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploaded, setUploaded] = useState<
    {
      file: File;
      preview: string;
    }[]
  >([]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (ref?.current && !ref.current.classList.contains('active')) {
      ref.current.classList.add('active');
    }
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (ref && ref.current && e.target === ref.current) {
      ref.current.classList.remove('active');
    }
  };

  const onDropFile = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const isValid = (files: FileList): Boolean => {
    let hasErrors = [];

    if (files.length > maxNumberOfFiles) {
      hasErrors.push(
        `You can only upload ${maxNumberOfFiles} files at the same time`,
      );
      setErrors(hasErrors);
      return false;
    }

    for (const file of Array.from(files)) {
      const lookup = mime.lookup(file.name);
      if (!lookup) {
        // Error
        hasErrors.push('Invalid file');
        continue;
      }

      if (lookup && ACCEPT_FILE_FORMATS.includes(lookup)) {
        if (file.size > MAX_FILE_SIZE) {
          hasErrors.push('Your image is too big, it should be less thant 5mb');
        }
      }
    }
    if (hasErrors.length > 0) {
      setErrors(hasErrors);
    }
    return hasErrors.length === 0;
  };

  const handleFiles = (files: FileList) => {
    if (!isValid(files)) {
      return;
    }
    const newUploaded = Array.from(files).map((file: File) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploaded(newUploaded);
  };

  const onSubmit = () => {
    setIsEditing(false);
    handleFilesProp(uploaded.map((file) => file.file));
  };

  const removeFile = (index: number) => {
    const newUploaded = uploaded.filter((_, i) => i !== index);
    setUploaded(newUploaded);
  };

  return {
    ref,
    errors,
    uploaded,
    isEditing,

    onSubmit,
    onDropFile,
    onDragOver,
    removeFile,
    onDragLeave,
    onInputChange,
  };
};
