import { useLabelService } from '@talons/useLabelService';
import { iLabel } from '@type/label.types';
import classes from './labelList.module.css';

const LabelList = () => {
  const { labels } = useLabelService();

  return (
    <div className={classes.root}>
      <p>Available Labels</p>
      <div>
        {labels.map((label: iLabel) => (
          <div
            key={label.id}
            style={{
              background: label.color,
            }}
          >
            {label.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelList;
