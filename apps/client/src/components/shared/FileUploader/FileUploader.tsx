// utils
import mergeClasses from '@utils/mergeClasses';

// talons
import { useFileUploader } from './useFileUploader';

// constants
import { MAX_NUMBER_OF_FILES } from '@constants/common';

// icons
import { AiOutlineCloudUpload } from 'react-icons/ai';

// styles
import defaultClasses from './fileUploader.module.css';

interface FileUploaderProps {
  classes?: any;
  maxNumberOfFiles?: number;
  shouldHavePreview?: boolean;
  handleFiles: (files: File[]) => void;
}

const FileUploader = ({
  handleFiles,
  classes: propsClasses,
  shouldHavePreview = false,
  maxNumberOfFiles = MAX_NUMBER_OF_FILES,
}: FileUploaderProps) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const {
    ref,
    errors,
    uploaded,
    isEditing,

    onDragLeave,
    onDragOver,
    onDropFile,
    onInputChange,
    onSubmit,
  } = useFileUploader({
    handleFiles,
    maxNumberOfFiles,
  });

  return (
    <section className={classes.root}>
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
      {shouldHavePreview && uploaded?.length > 0 && (
        <section className={classes.previewSection}>
          {uploaded?.slice(0, 3).map(({ file, preview }, idx: number) => {
            return (
              <figure
                key={`file-${file.name}-${idx}`}
                className={classes.previewItem}
              >
                <img
                  src={preview}
                  alt={`file-${file.name}`}
                  className={classes.previewImage}
                />
              </figure>
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
            Drag & Drop your image here
          </h3>
          <span className={classes.uploadMaximumNumber}>
            ( Maximum {maxNumberOfFiles} )
          </span>
        </div>

        <p className={classes.text}>or</p>
        <label className="btn btn-primary" htmlFor="file-uploader">
          Choose files
          <input
            className="hidden"
            type="file"
            id="file-uploader"
            onChange={onInputChange}
            multiple
          />
        </label>
      </div>
      {isEditing && <button onClick={onSubmit}>OK</button>}
    </section>
  );
};

export default FileUploader;
