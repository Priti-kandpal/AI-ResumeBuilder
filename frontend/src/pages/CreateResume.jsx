import React, { useState } from 'react';
import { Row, Col, Typography, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import MultiStepForm from '../components/resume/MultiStepForm';
import ResumePreview from '../components/resume/ResumePreview';
import useResume from '../hooks/useResume';
import { INITIAL_RESUME_STATE } from '../utils/constants';

const { Title, Text } = Typography;

export const CreateResume = () => {
  const { createResume } = useResume();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_RESUME_STATE);

  const handleFormChange = (allValues) => {
    setFormData((prev) => ({
      ...prev,
      ...allValues,
      personalInfo: {
        ...prev.personalInfo,
        ...(allValues.personalInfo || {}),
      },
    }));
  };

  const handleSubmit = async (values) => {
    const finalData = {
      ...formData,
      ...values,
    };
    const created = await createResume(finalData);
    if (created && (created.id || created._id)) {
      navigate(`/resume/${created.id || created._id}`);
    } else {
      navigate('/my-resumes');
    }
  };

  return (
    <MainLayout>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Breadcrumb Header */}
        <div style={{ marginBottom: '20px' }}>
          <Breadcrumb
            items={[
              { title: <Link to="/dashboard"><HomeOutlined /> Dashboard</Link> },
              { title: 'Create Resume' },
            ]}
            style={{ marginBottom: '8px' }}
          />
          <Title level={3} style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>
            Resume Builder Wizard
          </Title>
          <Text type="secondary">Follow the step-by-step form to build your custom resume with live preview.</Text>
        </div>

        <Row gutter={[24, 24]}>
          {/* Left Form */}
          <Col xs={24} lg={13}>
            <MultiStepForm
              initialData={formData}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
            />
          </Col>

          {/* Right Live Preview */}
          <Col xs={24} lg={11}>
            <div style={{ position: 'sticky', top: '88px' }}>
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '12px', color: '#64748b', letterSpacing: '0.5px' }}>
                  Live Resume Preview
                </Text>
              </div>
              <div style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto', borderRadius: '12px' }}>
                <ResumePreview data={formData} template={formData.template} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default CreateResume;
