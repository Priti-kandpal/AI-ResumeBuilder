import React from 'react';
import { Card, Tag, Typography, Dropdown, Button, Popconfirm, Space } from 'antd';
import {
  FileTextOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const { Text, Title } = Typography;

export const ResumeCard = ({ resume, onDelete, onDuplicate }) => {
  const navigate = useNavigate();

  const id = resume.id || resume._id;
  const atsScore = resume.atsScore || 88;
  const title = resume.title || 'Untitled Resume';
  const template = resume.template || 'modern';
  const updatedAt = resume.updatedAt
    ? new Date(resume.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently';

  const menuItems = [
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: 'View / Download',
      onClick: () => navigate(`/resume/${id}`),
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit Content',
      onClick: () => navigate(`/edit-resume/${id}`),
    },
    {
      key: 'duplicate',
      icon: <CopyOutlined />,
      label: 'Duplicate',
      onClick: () => onDuplicate && onDuplicate(resume),
    },
  ];

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card
        style={{
          borderRadius: '16px',
          border: '1px solid #f0f3f8',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: '24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#e6f4ff',
                color: '#1677ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
              }}
            >
              <FileTextOutlined />
            </div>
            <div>
              <Tag color="blue" style={{ borderRadius: '4px', textTransform: 'capitalize', fontSize: '11px' }}>
                {template} template
              </Tag>
              <Tag color={atsScore >= 90 ? 'success' : 'processing'} style={{ borderRadius: '4px', fontSize: '11px' }}>
                <CheckCircleOutlined /> {atsScore}% ATS Score
              </Tag>
            </div>
          </div>

          <Dropdown menu={{ items: menuItems }} placement="bottomRight">
            <Button type="text" icon={<MoreOutlined style={{ fontSize: '18px' }} />} />
          </Dropdown>
        </div>

        <Title
          level={4}
          onClick={() => navigate(`/resume/${id}`)}
          style={{
            margin: '0 0 8px 0',
            fontWeight: 700,
            color: '#0f172a',
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Title>

        <Text type="secondary" style={{ fontSize: '13px', display: 'block', marginBottom: '20px' }}>
          {resume.personalInfo?.jobTitle || 'Target Position Not Specified'}
        </Text>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid #f1f5f9',
          }}
        >
          <Space size="small" style={{ color: '#94a3b8', fontSize: '12px' }}>
            <ClockCircleOutlined />
            <span>Updated {updatedAt}</span>
          </Space>

          <Space size="small">
            <Button size="small" icon={<EyeOutlined />} onClick={() => navigate(`/resume/${id}`)}>
              View
            </Button>
            <Button size="small" type="primary" ghost icon={<EditOutlined />} onClick={() => navigate(`/edit-resume/${id}`)}>
              Edit
            </Button>
            {onDelete && (
              <Popconfirm
                title="Delete Resume"
                description="Are you sure you want to delete this resume?"
                onConfirm={() => onDelete(id)}
                okText="Yes, Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
              >
                <Button size="small" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            )}
          </Space>
        </div>
      </Card>
    </motion.div>
  );
};

export default ResumeCard;
