import ReactQuill from 'react-quill';

type Props = {
  classes?: any;
  placeHolder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (event: any) => void;
  getEditor?: () => any;
};

const TextEditor = ({
  classes: propClasses,
  placeHolder,
  defaultValue,

  // because re-rendering is very expensive so we'll let quill takes care of state itself
  // but we'll still be able to pass in a value for it if we want
  value: alsoDefaultValue,
  onChange,
  getEditor,
}: Props) => {
  const handleChange = (value: any) => {
    onChange && onChange(value);
  };

  return (
    <ReactQuill
      defaultValue={defaultValue || alsoDefaultValue || ''}
      onChange={handleChange}
      {...quillConfig}
    />
  );
};

const quillConfig = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  },
};

export default TextEditor;
