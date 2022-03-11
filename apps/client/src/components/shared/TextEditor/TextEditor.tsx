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
    console.log('value', value);
    onChange && onChange(value);
  };

  return (
    <ReactQuill
      defaultValue={defaultValue || alsoDefaultValue || ''}
      onChange={handleChange}
    />
  );
};

export default TextEditor;
