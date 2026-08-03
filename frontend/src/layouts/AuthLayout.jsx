import React from 'react';
import { Row, Col, Typography } from 'antd';
import { motion } from 'framer-motion';
import { ThunderboltOutlined, CheckCircleFilled } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f5ff 0%, #e6f4ff 50%, #f5f7fb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: '1080px', width: '100%' }}>
        <Row
          gutter={[32, 32]}
          align="middle"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden',
            border: '1px solid rgba(22, 119, 255, 0.1)',
          }}
        >
          {/* Left Hero Section */}
          <Col xs={24} md={12} style={{ background: 'linear-gradient(135deg, #1677ff 0%, #003eb3 100%)', padding: '48px', color: '#fff' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    color: '#fff',
                  }}
                >
                  <ThunderboltOutlined />
                </div>
                <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                  Resum<span style={{ color: '#bae0ff' }}>AI</span>
                </span>
              </div>

              <Title level={2} style={{ color: '#fff', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
                Craft ATS-Friendly Resumes in Seconds with AI
              </Title>

              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '15px', marginBottom: '36px' }}>
                Stand out from thousands of applicants with modern templates, smart keyword suggestions, and instant PDF exports.
              </Paragraph>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Instant AI Content Enhancements',
                  'Multiple Modern & Classic Resume Templates',
                  'ATS Score Optimization & Recommendations',
                  'One-click PDF Export & Direct Print',
                ].map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircleFilled style={{ color: '#69b1ff', fontSize: '16px' }} />
                    <Text style={{ color: '#fff', fontSize: '14px' }}>{feat}</Text>
                  </div>
                ))}
              </div>
            </motion.div>
          </Col>

          {/* Right Form Section */}
          <Col xs={24} md={12} style={{ padding: '48px' }}>
            <div style={{ marginBottom: '28px' }}>
              {title && (
                <Title level={3} style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                  {title}
                </Title>
              )}
              {subtitle && <Text type="secondary" style={{ fontSize: '14px' }}>{subtitle}</Text>}
            </div>
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AuthLayout;
