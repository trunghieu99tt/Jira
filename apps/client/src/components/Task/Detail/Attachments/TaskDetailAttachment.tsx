import Slider from 'react-slick';

// components
import Image from '@components/shared/Image';
import FileUploader from '@components/shared/FileUploader';

// types
import { iAttachment } from '@type/attachment.type';

// styles
import classes from './taskDetailAttachment.module.css';
import Button from '@components/shared/Button';

type Props = {
  defaultValue: iAttachment[];
  onChange: (files: File[]) => void;
};

const TaskDetailAttachment = ({ defaultValue, onChange }: Props) => {
  const attachmentLength = defaultValue.length;
  const slickSettings = {
    dots: true,
    speed: 500,
    infinity: false,
    slidesToShow: Math.min(3, attachmentLength),
    slidesToScroll: Math.min(3, attachmentLength),
    variableWidth: true,
  };

  return (
    <section>
      <Slider {...slickSettings}>
        {defaultValue?.map((attachment: iAttachment) => {
          let el = null;
          if (attachment.type.includes('image')) {
            el = (
              <Image
                src={attachment.url}
                alt={attachment.name}
                height="100%"
                classes={{
                  root: classes.image,
                }}
              />
            );
          }

          if (!el) return null;

          return (
            <article className={classes.item}>
              <div className={classes.itemMain}>{el}</div>
              <div className={classes.itemMeta}>{attachment.name}</div>
            </article>
          );
        })}
      </Slider>
      <FileUploader
        handleFiles={onChange}
        title="Add attachment"
        maxNumberOfFiles={5}
      />
    </section>
  );
};

export default TaskDetailAttachment;
