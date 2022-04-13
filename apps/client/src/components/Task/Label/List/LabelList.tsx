import { iLabel } from '@type/label.types';
import classes from './labelList.module.css';

type Props = {
  onClick?: (labelId: number) => void;
  data: iLabel[];
};

const LabelList = ({ data, onClick }: Props) => {
  const onClickLabelHandler = (event: any) => {
    const labelId = Number(event.currentTarget.dataset.labelid);
    console.log(event.currentTarget.dataset);
    onClick && typeof onClick === 'function' && onClick(labelId);
  };

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        {data.map((label: iLabel) => (
          <div
            key={`label-${label.id || Math.random()}`}
            style={{
              background: label.color,
            }}
            className={classes.label}
            onClick={onClickLabelHandler}
            data-labelid={label.id}
          >
            {label.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelList;
