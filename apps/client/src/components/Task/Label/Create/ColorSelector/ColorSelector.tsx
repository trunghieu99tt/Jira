import cn from 'classnames';

import classes from './colorSelector.module.css';

const COLORS = [
  '#219653',
  '#F2C94C',
  '#F2994A',
  '#EB5757',
  '#2F80ED',
  '#56CCF2',
  '#6FCF97',
  '#333333',
  '#4F4F4F',
  '#828282',
  '#BDBDBD',
  '#E0E0E0',
];

type Props = {
  selectedColor: string;
  onSelect: (color: string) => void;
};

const ColorSelector = ({ selectedColor, onSelect }: Props) => {
  const onClickHandler = (event: any) => {
    event.preventDefault();
    const color = event.currentTarget.dataset.color;
    onSelect && typeof onSelect === 'function' && onSelect(color);
  };

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        {COLORS.map((color: string, idx: number) => (
          <button
            type="button"
            className={cn(classes.option, {
              [classes.selected]: color === selectedColor,
            })}
            style={{
              backgroundColor: color,
            }}
            onClick={onClickHandler}
            key={`color-selector-${idx}`}
            data-color={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
