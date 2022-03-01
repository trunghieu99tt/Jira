import React from 'react';

// talons
import { useBoard } from './useBoard';

// utils
import mergeClasses from '@utils/mergeClasses';

// styles
import defaultClasses from './board.module.css';
import { useQuery } from '@apollo/client';
import { GET_BOARD_BY_ID } from 'queries/board.queries';

interface Props {
  classes?: object;
}

const Board = ({ classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const { loading, error, data } = useQuery(GET_BOARD_BY_ID, {
    variables: {
      id: 1,
    },
  });

  if (error) console.log('error', error);
  console.log('data', data);

  return <div>Hello From Board</div>;
};

export default Board;