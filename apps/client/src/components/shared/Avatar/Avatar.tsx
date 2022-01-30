import mergeClasses from '@utils/mergeClasses';
import { AVATAR_COLORS_BY_LETTER } from 'constants/constant';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import defaultClasses from './avatar.module.css';

type Props = {
  src: string;
  alt: string;
  classes?: any;
};

const Avatar = ({ src, alt, classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onerror = () => {
      setLoading(false);
      setHasError(true);
    };
    img.onload = () => {
      setLoading(true);
    };
  }, [src]);

  return (
    <figure className={classes.root}>
      {loading && <Skeleton height={10}></Skeleton>}
      {!loading && !hasError && (
        <img src={src} alt={alt} className={classes.image} />
      )}
      {!loading && hasError && (
        <div
          style={{
            backgroundColor: `${
              AVATAR_COLORS_BY_LETTER[
                alt[0] as keyof typeof AVATAR_COLORS_BY_LETTER
              ]
            }`,
          }}
        >
          {alt.charAt(0)}
        </div>
      )}
    </figure>
  );
};

export default Avatar;
