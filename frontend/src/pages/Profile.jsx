import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload, Avatar, Row, Col, Typography, Tabs, message } from 'antd';
import { UserOutlined, UploadOutlined, SaveOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import useAuth from '../hooks/useAuth';

const { Title, Text } = Typography;
const { TextArea } = Input;

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');

  const handleProfileSubmit = (values) => {
    updateProfile({
      name: values.name,
      title: values.title,
      bio: values.bio,
      avatar: avatarUrl,
    });
  };

  const handlePasswordSubmit = () => {
    message.success('Security password updated successfully!');
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done' || info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target.result);
        message.success('Profile avatar uploaded');
      };
      reader.readAsDataURL(info.file.originFileObj || info.file);
    }
  };

  const tabItems = [
    {
      key: 'general',
      label: 'General Profile',
      children: (
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: user?.name || 'Alex Vance',
            email: user?.email || 'alex.vance@example.com',
            title: user?.title || 'Senior Software Engineer',
            bio: user?.bio || 'Passionate professional crafting high performance web applications.',
          }}
          onFinish={handleProfileSubmit}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                <Input size="large" prefix={<UserOutlined style={{ color: '#94a3b8' }} />} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="email" label="Email Address">
                <Input size="large" disabled prefix={<MailOutlined style={{ color: '#94a3b8' }} />} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="title" label="Job Role / Title">
            <Input size="large" placeholder="Senior Full Stack Engineer" />
          </Form.Item>

          <Form.Item name="bio" label="Short Professional Bio">
            <TextArea rows={4} placeholder="Brief summary about your skills and goals..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" style={{ fontWeight: 600 }}>
              Save Profile Changes
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'security',
      label: 'Security & Password',
      children: (
        <Form layout="vertical" onFinish={handlePasswordSubmit}>
          <Form.Item name="currentPassword" label="Current Password" rules={[{ required: true }]}>
            <Input.Password size="large" prefix={<LockOutlined style={{ color: '#94a3b8' }} />} />
          </Form.Item>
          <Form.Item name="newPassword" label="New Password" rules={[{ required: true, min: 6 }]}>
            <Input.Password size="large" prefix={<LockOutlined style={{ color: '#94a3b8' }} />} />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm New Password" rules={[{ required: true }]}>
            <Input.Password size="large" prefix={<LockOutlined style={{ color: '#94a3b8' }} />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" style={{ fontWeight: 600 }}>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <MainLayout>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>
            Account Settings & Profile
          </Title>
          <Text type="secondary">Manage your user profile details and credentials.</Text>
        </div>

        <Card
          style={{
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            marginBottom: '24px',
          }}
          bodyStyle={{ padding: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <Avatar
              size={80}
              src={avatarUrl}
              icon={<UserOutlined />}
              style={{ backgroundColor: '#1677ff', border: '3px solid #e6f4ff' }}
            />
            <div>
              <Title level={4} style={{ margin: 0, fontWeight: 700 }}>
                {user?.name || 'Alex Vance'}
              </Title>
              <Text type="secondary" style={{ display: 'block', marginBottom: '12px' }}>
                {user?.email || 'alex.vance@example.com'}
              </Text>
              <Upload customRequest={({ onSuccess }) => setTimeout(onSuccess, 0)} onChange={handleAvatarChange} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Upload New Avatar</Button>
              </Upload>
            </div>
          </div>
        </Card>

        <Card
          style={{
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          }}
          bodyStyle={{ padding: '24px 32px' }}
        >
          <Tabs items={tabItems} />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
