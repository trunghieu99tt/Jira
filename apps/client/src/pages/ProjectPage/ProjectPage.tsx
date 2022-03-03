import React from 'react';
import { useProjectPage } from './useProjectPage';
import { DragDropContext } from 'react-beautiful-dnd';

type Props = {};

const ProjectPage = (props: Props) => {
  const { data, error, loading } = useProjectPage();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;
  
  const boards = data?.boards || [];

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div>
        
      </div>
    </DragDropContext>
  );
};

export default ProjectPage;
