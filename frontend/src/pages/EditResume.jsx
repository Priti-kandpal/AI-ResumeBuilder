import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Row, Col, Typography, Spin, Breadcrumb } from 'antd';
import { HomeOutlined, FolderOpenOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import MultiStepForm from '../components/resume/MultiStepForm';
import ResumePreview from '../components/resume/ResumePreview';
import useResume from '../hooks/useResume';

const { Title, Text } = Typography;

export const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchResumeById, updateResume, loading } = useResume();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchResumeById(id);
      if (data) {
        setFormData(data);
      }
    };
    load();
  }, [id, fetchResumeById]);

  const handleFormChange = (allValues) => {
    setFormData((prev) => ({
      ...prev,
      ...allValues,
      personalInfo: {
        ...prev?.personalInfo,
        ...(allValues.personalInfo || {}),
      },
    }));
  };

  const handleSubmit = async (values) => {
    const finalData = {
      ...formData,
      ...values,
    };
    await updateResume(id, finalData);
    navigate(`/resume/${id}`);
  };

  if (loading && !formData) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <Spin size="large" tip="Loading resume details..." />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <Breadcrumb
            items={[
              { title: <Link to="/dashboard"><HomeOutlined /> Dashboard</Link> },
              { title: <Link to="/my-resumes"><FolderOpenOutlined /> My Resumes</Link> },
              { title: 'Edit Resume' },
            ]}
            style={{ marginBottom: '8px' }}
          />
          <Title level={3} style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>
            Edit Resume: {formData?.title || 'Document'}
          </Title>
          <Text type="secondary">Modify sections and inspect changes in real-time.</Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={13}>
            {formData && (
              <MultiStepForm
                initialData={formData}
                onChange={handleFormChange}
                onSubmit={handleSubmit}
                isEditing={true}
              />
            )}
          </Col>

          <Col xs={24} lg={11}>
            <div style={{ position: 'sticky', top: '88px' }}>
              <div style={{ marginBottom: '12px' }}>
                <Text style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '12px', color: '#64748b', letterSpacing: '0.5px' }}>
                  Live Preview
                </Text>
              </div>
              <div style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto', borderRadius: '12px' }}>
                <ResumePreview data={formData} template={formData?.template} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default EditResume;
