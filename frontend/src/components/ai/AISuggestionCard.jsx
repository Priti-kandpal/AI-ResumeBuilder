import React from 'react';
import { Card, Tag, Typography, Button, Space, Divider, message } from 'antd';
import { ThunderboltOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;

export const AISuggestionCard = ({ suggestionData, targetRole }) => {
  const [copiedSection, setCopiedSection] = React.useState(null);

  if (!suggestionData) return null;

  const { summary, bulletPoints = [], skills = [] } = suggestionData;

  const handleCopy = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    message.success(`${sectionName} copied to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card
        style={{
          borderRadius: '16px',
          border: '1px solid rgba(22, 119, 255, 0.2)',
          boxShadow: '0 8px 30px rgba(22, 119, 255, 0.06)',
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        }}
        bodyStyle={{ padding: '28px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              <ThunderboltOutlined />
            </div>
            <div>
              <Title level={4} style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>
                AI Tailored Suggestions
              </Title>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Optimized for {targetRole || 'Target Job Role'}
              </Text>
            </div>
          </div>

          <Tag color="processing" icon={<ThunderboltOutlined />} style={{ borderRadius: '6px', padding: '4px 10px' }}>
            High ATS Match
          </Tag>
        </div>

        {/* Executive Summary */}
        {summary && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text style={{ fontWeight: 700, color: '#1677ff', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.5px' }}>
                Recommended Summary
              </Text>
              <Button
                type="text"
                size="small"
                icon={copiedSection === 'Summary' ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
                onClick={() => handleCopy(summary, 'Summary')}
              >
                Copy Summary
              </Button>
            </div>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '10px', border: '1px solid #edf2f7' }}>
              <Paragraph style={{ margin: 0, color: '#334155', fontSize: '13px', lineHeight: 1.6 }}>{summary}</Paragraph>
            </div>
          </div>
        )}

        {/* Action Bullet Points */}
        {bulletPoints.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text style={{ fontWeight: 700, color: '#1677ff', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.5px' }}>
                High Impact Accomplishment Bullets
              </Text>
              <Button
                type="text"
                size="small"
                icon={copiedSection === 'Bullet Points' ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
                onClick={() => handleCopy(bulletPoints.map((bp) => `• ${bp}`).join('\n'), 'Bullet Points')}
              >
                Copy All Bullets
              </Button>
            </div>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '10px', border: '1px solid #edf2f7' }}>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '13px', lineHeight: 1.6 }}>
                {bulletPoints.map((bp, idx) => (
                  <li key={idx} style={{ marginBottom: idx < bulletPoints.length - 1 ? '8px' : 0 }}>
                    {bp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Recommended Skills */}
        {skills.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text style={{ fontWeight: 700, color: '#1677ff', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.5px' }}>
                High-Demand ATS Keywords & Skills
              </Text>
              <Button
                type="text"
                size="small"
                icon={copiedSection === 'Skills' ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
                onClick={() => handleCopy(skills.join(', '), 'Skills')}
              >
                Copy Skills
              </Button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, idx) => (
                <Tag key={idx} color="blue" style={{ borderRadius: '6px', padding: '4px 10px', fontSize: '12px' }}>
                  {skill}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default AISuggestionCard;
