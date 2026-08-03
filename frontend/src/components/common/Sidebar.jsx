import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FileAddOutlined,
  FolderOpenOutlined,
  RobotOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

export const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined style={{ fontSize: '18px' }} />,
      label: 'Dashboard',
    },
    {
      key: '/create-resume',
      icon: <FileAddOutlined style={{ fontSize: '18px' }} />,
      label: 'Create Resume',
    },
    {
      key: '/my-resumes',
      icon: <FolderOpenOutlined style={{ fontSize: '18px' }} />,
      label: 'My Resumes',
    },
    {
      key: '/ai-suggestions',
      icon: <RobotOutlined style={{ fontSize: '18px' }} />,
      label: 'AI Enhancer',
    },
    {
      type: 'divider',
    },
    {
      key: '/profile',
      icon: <UserOutlined style={{ fontSize: '18px' }} />,
      label: 'Profile',
    },
    {
      key: '/settings',
      icon: <SettingOutlined style={{ fontSize: '18px' }} />,
      label: 'Settings',
    },
  ];

  const currentKey = location.pathname.startsWith('/edit-resume')
    ? '/create-resume'
    : location.pathname;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      collapsedWidth="80"
      theme="light"
      style={{
        borderRight: '1px solid #edf2f7',
        boxShadow: '2px 0 8px rgba(0,0,0,0.02)',
        background: '#ffffff',
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[currentKey]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{
          borderRight: 0,
          paddingTop: '16px',
          fontWeight: 500,
        }}
      />
    </Sider>
  );
};

export default Sidebar;
