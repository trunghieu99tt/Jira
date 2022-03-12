import { useProjectService } from '@talons/useProjectService';
import { useEffect } from 'react';

export const useProjectListPage = () => {
  const {
    getProjectList,
    getProjectListResponse: { data, loading, error },
  } = useProjectService();

  useEffect(() => {
    getProjectList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projects = data?.projects;

  return {
    loading,
    data: projects,
    error,
  };
};
