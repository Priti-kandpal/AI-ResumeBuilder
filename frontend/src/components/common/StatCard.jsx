import React from 'react';
import { Card, Typography, Space } from 'antd';
import { motion } from 'framer-motion';

const { Text, Title } = Typography;

export const StatCard = ({ title, value, icon, color = '#1677ff', subtitle, trend }) => {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card
        style={{
          borderRadius: '16px',
          border: '1px solid #f0f3f8',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        }}
        bodyStyle={{ padding: '20px 24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Text type="secondary" style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {title}
            </Text>
            <Title level={2} style={{ margin: '4px 0 0 0', fontWeight: 800, color: '#0f172a' }}>
              {value}
            </Title>
            {subtitle && (
              <Space style={{ marginTop: '4px' }}>
                {trend && (
                  <span style={{ color: '#10b981', fontWeight: 700, fontSize: '12px' }}>
                    {trend}
                  </span>
                )}
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {subtitle}
                </Text>
              </Space>
            )}
          </div>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: `${color}15`,
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}
          >
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
