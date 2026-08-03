import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import MainLayout from '../layouts/MainLayout';
import PrintableResume from '../components/resume/PrintableResume';
import useResume from '../hooks/useResume';

export const ResumeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchResumeById, loading } = useResume();
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchResumeById(id);
      if (data) {
        setResumeData(data);
      }
    };
    load();
  }, [id, fetchResumeById]);

  if (loading && !resumeData) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <Spin size="large" tip="Loading print preview..." />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PrintableResume
        resumeData={resumeData}
        onEdit={() => navigate(`/edit-resume/${id}`)}
      />
    </MainLayout>
  );
};

export default ResumeDetails;
