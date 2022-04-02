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
  return (
    <div className={classes.root}>
      <p className={classes.heading}>Colors</p>
      <div className={classes.list}>
        {COLORS.map((color: string) => (
          <button
            type="button"
            className={cn(classes.option, {
              [classes.selected]: color === selectedColor,
            })}
            style={{
              backgroundColor: color,
            }}
            onClick={() => onSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
