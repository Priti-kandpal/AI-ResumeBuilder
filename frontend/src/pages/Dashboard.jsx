import React, { useEffect } from 'react';
import { Row, Col, Typography, Card, Button, Space, Skeleton, Empty, Tag } from 'antd';
import {
  FileTextOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  RocketOutlined,
  FolderOpenOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import StatCard from '../components/common/StatCard';
import ResumeCard from '../components/resume/ResumeCard';
import useAuth from '../hooks/useAuth';
import useResume from '../hooks/useResume';

const { Title, Text, Paragraph } = Typography;

export const Dashboard = () => {
  const { user } = useAuth();
  const { resumes, loading, fetchResumes, deleteResume, createResume } = useResume();
  const navigate = useNavigate();

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

  return (
    <MainLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Welcome Hero Banner */}
        <Card
          style={{
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #1677ff 0%, #003eb3 100%)',
            border: 'none',
            color: '#ffffff',
            marginBottom: '28px',
            boxShadow: '0 12px 30px rgba(22, 119, 255, 0.25)',
          }}
          bodyStyle={{ padding: '32px 36px' }}
        >
          <Row align="middle" justify="space-between" gutter={[24, 24]}>
            <Col xs={24} md={16}>
              <Tag
                color="blue"
                icon={<ThunderboltOutlined />}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '4px 12px',
                  marginBottom: '12px',
                }}
              >
                AI Power-Suite Active
              </Tag>
              <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: 800 }}>
                Welcome back, {user?.name || 'Developer'}! 👋
              </Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '15px', marginTop: '8px', marginBottom: 0 }}>
                You have {resumes.length} active resume document{resumes.length === 1 ? '' : 's'}. Use our AI engine to optimize your applications for targeted job positions.
              </Paragraph>
            </Col>

            <Col xs={24} md={8} style={{ textAlign: 'right' }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button
                  type="default"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/create-resume')}
                  style={{
                    fontWeight: 700,
                    borderRadius: '12px',
                    height: '48px',
                    width: '100%',
                    background: '#ffffff',
                    color: '#1677ff',
                    border: 'none',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                  }}
                >
                  Build New Resume
                </Button>
                <Button
                  type="text"
                  icon={<ThunderboltOutlined style={{ color: '#fff' }} />}
                  onClick={() => navigate('/ai-suggestions')}
                  style={{ color: '#fff', fontWeight: 600, width: '100%' }}
                >
                  Generate AI Suggestions →
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Quick Stats Grid */}
        <Row gutter={[20, 20]} style={{ marginBottom: '32px' }}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Total Resumes"
              value={resumes.length.toString()}
              icon={<FileTextOutlined />}
              color="#1677ff"
              subtitle="Active documents"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Avg ATS Score"
              value="94%"
              icon={<CheckCircleOutlined />}
              color="#10b981"
              subtitle="ATS Screening Readiness"
              trend="+4%"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="AI Optimizations"
              value="18"
              icon={<ThunderboltOutlined />}
              color="#722ed1"
              subtitle="Suggestions generated"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Active Templates"
              value="4"
              icon={<RocketOutlined />}
              color="#f59e0b"
              subtitle="Available layouts"
            />
          </Col>
        </Row>

        {/* Recent Resumes Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <Title level={3} style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>
              Recent Resumes
            </Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              View and edit your recently modified resume documents
            </Text>
          </div>
          <Button icon={<FolderOpenOutlined />} onClick={() => navigate('/my-resumes')} style={{ fontWeight: 600 }}>
            View All Resumes ({resumes.length})
          </Button>
        </div>

        {/* Resumes Grid / Loading / Empty State */}
        {loading ? (
          <Row gutter={[20, 20]}>
            {[1, 2, 3].map((i) => (
              <Col xs={24} sm={12} lg={8} key={i}>
                <Card style={{ borderRadius: '16px' }}>
                  <Skeleton active avatar paragraph={{ rows: 3 }} />
                </Card>
              </Col>
            ))}
          </Row>
        ) : resumes.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: '48px 0', borderRadius: '16px' }}>
            <Empty
              description={<Text style={{ fontSize: '15px', color: '#64748b' }}>No resumes created yet.</Text>}
            >
              <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => navigate('/create-resume')}>
                Create Your First Resume
              </Button>
            </Empty>
          </Card>
        ) : (
          <Row gutter={[20, 20]}>
            {resumes.slice(0, 3).map((resume) => (
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

        {/* Quick Tips Section */}
        <Card
          style={{
            marginTop: '36px',
            borderRadius: '16px',
            border: '1px dashed #cbd5e1',
            background: '#ffffff',
          }}
          bodyStyle={{ padding: '24px 28px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
              }}
            >
              <BulbOutlined />
            </div>
            <div>
              <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>
                Pro Tip for ATS Scanning
              </Title>
              <Text type="secondary" style={{ fontSize: '13px' }}>
                Tailor your target job title and key competencies in step 1 & 4. Using strong action verbs can improve resume screening scores by up to 35%!
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
