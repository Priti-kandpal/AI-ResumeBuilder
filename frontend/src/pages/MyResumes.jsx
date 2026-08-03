import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Input, Select, Button, Card, Empty, Skeleton } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ResumeCard from '../components/resume/ResumeCard';
import useResume from '../hooks/useResume';

const { Title, Text } = Typography;
const { Option } = Select;

export const MyResumes = () => {
  const { resumes, loading, fetchResumes, deleteResume, createResume } = useResume();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [templateFilter, setTemplateFilter] = useState('all');

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleDuplicate = async (resume) => {
    const duplicated = {
      ...resume,
      title: `${resume.title} (Copy)`,
      id: undefined,
      _id: undefined,
    };
    await createResume(duplicated);
  };

  const filteredResumes = resumes.filter((r) => {
    const matchesSearch =
      !searchTerm ||
      r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.personalInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.personalInfo?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTemplate = templateFilter === 'all' || r.template === templateFilter;

    return matchesSearch && matchesTemplate;
  });

  return (
    <MainLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <Title level={2} style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>
              My Resumes
            </Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              Manage, edit, duplicate, and download your ATS resume collection.
            </Text>
          </div>

          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => navigate('/create-resume')}
            style={{ fontWeight: 600 }}
          >
            Create New Resume
          </Button>
        </div>

        {/* Filter Controls */}
        <Card
          style={{
            marginBottom: '28px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          }}
          bodyStyle={{ padding: '16px 24px' }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={16} md={18}>
              <Input
                size="large"
                placeholder="Search resumes by title, candidate name, or job role..."
                prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Select
                size="large"
                value={templateFilter}
                onChange={(value) => setTemplateFilter(value)}
                style={{ width: '100%' }}
              >
                <Option value="all">All Templates</Option>
                <Option value="modern">Modern Tech</Option>
                <Option value="executive">Executive Sleek</Option>
                <Option value="minimalist">Clean Minimalist</Option>
                <Option value="creative">Creative Sidebar</Option>
              </Select>
            </Col>
          </Row>
        </Card>

        {/* Grid Content */}
        {loading ? (
          <Row gutter={[20, 20]}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Col xs={24} sm={12} lg={8} key={i}>
                <Card style={{ borderRadius: '16px' }}>
                  <Skeleton active paragraph={{ rows: 4 }} />
                </Card>
              </Col>
            ))}
          </Row>
        ) : filteredResumes.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: '60px 0', borderRadius: '16px' }}>
            <Empty description={<Text style={{ color: '#64748b', fontSize: '15px' }}>No resumes match your search filter.</Text>}>
              <Button type="primary" onClick={() => { setSearchTerm(''); setTemplateFilter('all'); }}>
                Reset Filters
              </Button>
            </Empty>
          </Card>
        ) : (
          <Row gutter={[20, 20]}>
            {filteredResumes.map((resume) => (
              <Col xs={24} sm={12} lg={8} key={resume.id || resume._id}>
                <ResumeCard
                  resume={resume}
                  onDelete={deleteResume}
                  onDuplicate={handleDuplicate}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </MainLayout>
  );
};

export default MyResumes;
