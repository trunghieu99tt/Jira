import Avatar from '@components/shared/Avatar';
import Image from '@components/shared/Image';
import { IBoard, IBoardUser } from '@type/board.type';

import classes from './boardList.module.css';

type Props = {
  data: IBoard[];
};

const BoardList = ({ data }: Props) => {
  return (
    <section className={classes.root}>
      {data?.map((board: IBoard) => {
        const { boardUsers } = board;
        return (
          <article className={classes.item} key={`board-list-item-${board.id}`}>
            <Image
              src={board.coverPhoto}
              alt={`${board.name}`}
              height="200px"
              classes={{ root: classes.itemImage }}
            />
            <div className={classes.info}>
              <h3 className={classes.name}>{board.name}</h3>
              <p className={classes.description}>{board.description}</p>
              <div className={classes.boardUsers}>
                {boardUsers?.map((boardUser: IBoardUser) => {
                  const { user } = boardUser;
                  return (
                    <Avatar
                      src={user?.avatar}
                      alt={user?.name}
                      tooltip={user?.name}
                      size="MEDIUM"
                      key={`board-list-item-user-avatar-${user?.id}`}
                    ></Avatar>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default BoardList;
