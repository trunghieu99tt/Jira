import BaseLayout from '@layout/Base.layout';
import ProjectListPage from '@pages/ProjectList/ProjectListPage';
import ProjectPage from '@pages/ProjectPage';
import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProjectListPage />} />
        <Route path="/project" element={<ProjectPage />}>
          <Route path=":projectId" element={<ProjectPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default BaseLayout(App);
