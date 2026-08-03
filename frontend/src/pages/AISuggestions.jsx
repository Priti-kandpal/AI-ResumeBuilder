import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Select, Typography } from 'antd';
import { ThunderboltOutlined, RocketOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import AISuggestionCard from '../components/ai/AISuggestionCard';
import useResume from '../hooks/useResume';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const AISuggestions = () => {
  const [form] = Form.useForm();
  const { generateAISuggestions } = useResume();
  const [loading, setLoading] = useState(false);
  const [suggestionData, setSuggestionData] = useState(null);
  const [targetRole, setTargetRole] = useState('');

  const onFinish = async (values) => {
    setLoading(true);
    setTargetRole(values.jobRole);
    try {
      const data = await generateAISuggestions(values);
      setSuggestionData(data);
    } catch (err) {
      // Handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <Title level={2} style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>
            AI Content Enhancer & Keywords Generator
          </Title>
          <Text type="secondary" style={{ fontSize: '15px' }}>
            Input your target position and experience to receive tailored resume summaries, bullet points, and ATS keywords.
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={11}>
            <Card
              style={{
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  experienceLevel: 'Mid-Senior (3-6 yrs)',
                }}
              >
                <Form.Item
                  name="jobRole"
                  label="Target Job Position / Role"
                  rules={[{ required: true, message: 'Please enter a target position' }]}
                >
                  <Input size="large" placeholder="e.g. Senior Full Stack Engineer" />
                </Form.Item>

                <Form.Item name="experienceLevel" label="Experience Level">
                  <Select size="large">
                    <Option value="Entry Level (0-2 yrs)">Entry Level (0-2 yrs)</Option>
                    <Option value="Mid-Senior (3-6 yrs)">Mid-Senior (3-6 yrs)</Option>
                    <Option value="Lead / Executive (7+ yrs)">Lead / Executive (7+ yrs)</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="skills" label="Key Skills (Comma separated)">
                  <Input size="large" placeholder="React, Node.js, TypeScript, AWS" />
                </Form.Item>

                <Form.Item name="objective" label="Key Career Objective / Highlights">
                  <TextArea rows={3} placeholder="Passionate about cloud systems, microservices, and leading tech teams..." />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    icon={<ThunderboltOutlined />}
                    style={{ height: '46px', fontWeight: 700, fontSize: '15px' }}
                  >
                    Generate AI Suggestions
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} md={13}>
            {suggestionData ? (
              <AISuggestionCard suggestionData={suggestionData} targetRole={targetRole} />
            ) : (
              <Card
                style={{
                  borderRadius: '16px',
                  border: '1px dashed #cbd5e1',
                  textAlign: 'center',
                  padding: '48px 24px',
                  background: '#ffffff',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: '#e6f4ff',
                    color: '#1677ff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    marginBottom: '16px',
                  }}
                >
                  <RocketOutlined />
                </div>
                <Title level={4} style={{ fontWeight: 700, color: '#0f172a' }}>
                  Ready to Enhance Your Resume Content
                </Title>
                <Paragraph style={{ color: '#64748b', fontSize: '14px', maxWidth: '360px', margin: '0 auto' }}>
                  Fill in your target position details on the left form and click "Generate AI Suggestions" to receive tailored bullet points & summary.
                </Paragraph>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default AISuggestions;
