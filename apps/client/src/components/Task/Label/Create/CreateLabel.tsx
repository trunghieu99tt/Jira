import { useCreateLabel } from '@components/Task/Label/Create/useCreateLabel';
import SelfControlledInput from '@components/shared/SelfControlledInput/SelfControlledInput';
import Button from '@components/shared/Button';
import ColorSelector from '@components/Task/Label/Create/ColorSelector';

const CreateLabel = () => {
  const { submitCreateLabel, color, changeColor } = useCreateLabel();

  return (
    <form onSubmit={submitCreateLabel}>
      <p>Select a name and color</p>
      <SelfControlledInput name="name" />
      <ColorSelector selectedColor={color} onSelect={changeColor} />
      <Button variant="primary" type="submit">
        Create label
      </Button>
    </form>
  );
};

export default CreateLabel;
