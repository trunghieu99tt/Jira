import { MAX_NUMBER_OF_FILES } from '@constants/common';
import mergeClasses from '@utils/mergeClasses';
import {
  AiFillFileImage,
  AiFillFilePdf,
  AiFillFileZip,
  AiOutlineCloudUpload,
} from 'react-icons/ai';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import Button from '../Button';
import defaultClasses from './fileUploader.module.css';
import { useFileUploader } from './useFileUploader';

interface FileUploaderProps {
  title: string;
  classes?: any;
  maxNumberOfFiles?: number;
  shouldHavePreview?: boolean;
  handleFiles: (files: File[]) => void;
}

const FileUploader = ({
  title,
  handleFiles,
  classes: propsClasses,
  maxNumberOfFiles = MAX_NUMBER_OF_FILES,
}: FileUploaderProps) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const {
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
  } = useFileUploader({
    handleFiles,
    maxNumberOfFiles,
  });

  return (
    <section className={classes.root}>
      <p className={classes.title}>{title}</p>
      {errors.length > 0 && (
        <ul className={classes.errorList}>
          {errors.map((error: string, idx: number) => (
            <li
              className={classes.errorItem}
              key={`file-uploader-error-${idx}`}
            >
              {error}
            </li>
          ))}
        </ul>
      )}
      {uploaded?.length > 0 && (
        <section className={classes.uploadedItemList}>
          {uploaded?.map(({ file, preview }, idx: number) => {
            let icon = null;

            switch (file.type) {
              case 'application/zip':
                icon = <AiFillFileZip />;
                break;
              case 'application/pdf':
                icon = <AiFillFilePdf />;
                break;
              default:
                icon = <AiFillFileImage />;
            }

            return (
              <article
                key={`file-${file.name}-${idx}`}
                className={classes.uploadedItem}
              >
                {icon}
                <span className={classes.uploadItemName}>{file.name}</span>
                <button
                  className={classes.removeUploadedItemBtn}
                  onClick={() => removeFile(idx)}
                >
                  <IoMdRemoveCircleOutline />
                </button>
              </article>
            );
          })}
        </section>
      )}
      <div className={classes.uploadZone}>
        <div
          ref={ref}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDropFile}
          className={classes.uploadZoneInner}
        >
          <AiOutlineCloudUpload className={classes.uploadIcon} />

          <h3 className="text-sm text-gray4 pointer-events-none">
            Drag & Drop your file(s) here
          </h3>
          <span className={classes.uploadMaximumNumber}>
            ( Maximum {maxNumberOfFiles} )
          </span>
        </div>
        {/* <p className={classes.text}>or</p>
        <label className="btn btn-primary" htmlFor="file-uploader">
          Choose files
          <AiFillFileAdd />
          <input
            className="hidden"
            type="file"
            id="file-uploader"
            onChange={onInputChange}
            multiple
          />
        </label> */}
      </div>
      <Button
        variant="primary"
        onClick={onSubmit}
        disabled={!uploaded || uploaded?.length === 0}
      >
        Upload
      </Button>
    </section>
  );
};

export default FileUploader;
