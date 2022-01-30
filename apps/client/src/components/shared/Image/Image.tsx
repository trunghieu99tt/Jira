import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

// utils
import mergeClasses from '@utils/mergeClasses';

// styles
import defaultClasses from './image.module.css';

type Props = {
  src: string;
  alt: string;
  height: string;
  classes?: any;
};

const Image = ({ classes: propsClasses, alt, height, src }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const [loaded, setLoaded] = useState<boolean>(false);

  const onLoaded = () => setLoaded(true);

  return (
    <figure className={classes.root}>
      <img
        src={src}
        alt={alt}
        className={classes.image}
        onLoad={onLoaded}
        style={{
          display: loaded ? 'block' : 'none',
          maxHeight: `${height}`,
          objectFit: 'cover',
        }}
      />
      {!loaded && <Skeleton height={height} />}
    </figure>
  );
};

export default Image;
