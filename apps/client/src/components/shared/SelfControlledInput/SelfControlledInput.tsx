import { useState, ChangeEvent, memo } from 'react';

type Props = {
  name: string;
};

const SelfControlledInput = ({ name }: Props) => {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div key={name}>
      <label htmlFor={`${name}-input`}>{name}:</label>
      <input
        id={`${name}-input`}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        pattern="[a-z]{3,10}"
        required
      />
    </div>
  );
};

export default memo(SelfControlledInput);
