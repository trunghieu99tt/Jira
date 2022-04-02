import { useLabelService } from '@talons/useLabelService';
import { useState, FormEvent } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface LabelFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export const useCreateLabel = () => {
  const { createLabel } = useLabelService();
  const [color, setColor] = useState('');

  const submitCreateLabel = async (event: FormEvent<LabelFormElements>) => {
    event.preventDefault();
    const { name } = event.currentTarget.elements;
    console.log('name', name.value);
    createLabel({
      name: name.value,
      color,
    });
  };

  const changeColor = (color: string) => setColor(color);

  return {
    color,
    changeColor,
    submitCreateLabel,
  };
};
