import React from 'react';

// talons
import { useProjectItem } from './useProjectItem';

// utils
import mergeClasses from '@utils/mergeClasses';

// styles
import defaultClasses from './projectItem.module.css';
import { useQuery } from '@apollo/client';
import { GET_PROJECT_BY_ID } from 'graphql/queries/project.queries';

interface Props {
  classes?: object;
}

const Board = ({ classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
    variables: {
      id: 1,
    },
  });

  if (error) console.log('error', error);
  console.log('data', data);

  return <div>Hello From Board</div>;
};

export default Board;
