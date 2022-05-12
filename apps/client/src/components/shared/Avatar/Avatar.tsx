import { AVATAR_COLORS_BY_LETTER } from '@constants/common';
import { TSize, TTooltipPlacement } from '@type/app.type';
import mergeClasses from '@utils/mergeClasses';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import defaultClasses from './avatar.module.css';

type Props = {
  src: string;
  alt: string;
  size: TSize;
  classes?: any;
  tooltip?: string;
  tooltipPlacement?: TTooltipPlacement;

  onClick?: () => void;
};

const Avatar = ({
  src,
  alt,
  onClick,
  size,
  tooltip = '',
  tooltipPlacement = 'bottom',
  classes: propsClasses,
}: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleClick = () =>
    onClick && typeof onClick === 'function' && onClick();

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onerror = () => {
      setLoading(false);
      setHasError(true);
    };
    img.onload = () => {
      setLoading(false);
    };

    return () => {
      img.src = '';
    };
  }, [src]);

  return (
    <button className={classes.root} onClick={handleClick}>
      {tooltip?.length > 0 && (
        <div className={cn(classes.tooltip, classes[tooltipPlacement])}>
          {alt}
        </div>
      )}
      {loading && <Skeleton height={10}></Skeleton>}
      {!loading && !hasError && (
        <img src={src} alt={alt} className={cn(classes.image, classes[size])} />
      )}
      {!loading && hasError && (
        <div
          className={classes.placeholder}
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
    </button>
  );
};

export default Avatar;
