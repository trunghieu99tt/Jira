import { useProjects } from '@talons/useProjects';
import { useEffect } from 'react';

export const useProjectListPage = () => {
  const {
    getProjectList,
    getProjectListResponse: { data, loading, error },
  } = useProjects();

  useEffect(() => {
    getProjectList();
  }, []);

  const projects = data?.projects;

  console.log('boards', projects);
  console.log('loading', loading);

  return {
    loading,
    data: projects,
    error,
  };
};
