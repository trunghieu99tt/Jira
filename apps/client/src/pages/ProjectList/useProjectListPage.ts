import { useProjectService } from '@talons/useProjectService';

export const useProjectListPage = () => {
  const {
    getProjectListResponse: { data, loading, error },
  } = useProjectService();

  const projects = data?.projects;

  return {
    loading,
    data: projects,
    error,
  };
};
