import React from 'react';
import { Card, Form, Input, Select, Switch, Button, Divider, Typography, message } from 'antd';
import { SaveOutlined, ApiOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';

const { Title, Text } = Typography;
const { Option } = Select;

export const Settings = () => {
  const [form] = Form.useForm();

  const handleSaveSettings = () => {
    message.success('Settings saved successfully!');
  };

  return (
    <MainLayout>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>
            System Settings
          </Title>
          <Text type="secondary">Configure API endpoints, default resume export parameters, and application preferences.</Text>
        </div>

        <Card
          style={{
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          }}
          bodyStyle={{ padding: '32px' }}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              apiUrl: 'http://localhost:5000/api',
              defaultTemplate: 'modern',
              autoSave: true,
              pdfQuality: 'high',
            }}
            onFinish={handleSaveSettings}
          >
            <Title level={4} style={{ fontWeight: 700, color: '#1677ff', marginBottom: '16px' }}>
              <ApiOutlined /> Backend API Connection
            </Title>
            <Form.Item
              name="apiUrl"
              label="API Base URL"
              extra="Default endpoint: http://localhost:5000/api"
            >
              <Input size="large" />
            </Form.Item>

            <Divider />

            <Title level={4} style={{ fontWeight: 700, color: '#1677ff', marginBottom: '16px' }}>
              Resume Export Defaults
            </Title>
            <Form.Item name="defaultTemplate" label="Default Resume Template">
              <Select size="large">
                <Option value="modern">Modern Tech</Option>
                <Option value="executive">Executive Sleek</Option>
                <Option value="minimalist">Clean Minimalist</Option>
                <Option value="creative">Creative Sidebar</Option>
              </Select>
            </Form.Item>

            <Form.Item name="pdfQuality" label="PDF Export Resolution">
              <Select size="large">
                <Option value="high">High Definition (2x Canvas DPI)</Option>
                <Option value="standard">Standard (Compact File Size)</Option>
              </Select>
            </Form.Item>

            <Divider />

            <Form.Item name="autoSave" valuePropName="checked" label="Automatic Local Drafting">
              <Switch defaultChecked />
            </Form.Item>

            <Form.Item style={{ marginTop: '24px' }}>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" style={{ fontWeight: 600 }}>
                Save Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
