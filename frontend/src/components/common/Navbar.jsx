import React from 'react';
import { Layout, Button, Avatar, Dropdown, Space, Badge } from 'antd';
import {
  MenuOutlined,
  PlusOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const { Header } = Layout;

export const Navbar = ({ onMobileMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      danger: true,
      label: 'Sign Out',
      onClick: logout,
    },
  ];

  return (
    <Header
      className="glass-panel"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '64px',
        borderBottom: '1px solid #edf2f7',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onMobileMenuToggle}
          className="mobile-menu-btn"
          style={{ fontSize: '18px', display: 'none' }}
        />
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(22, 119, 255, 0.3)',
            }}
          >
            <ThunderboltOutlined />
          </div>
          <div>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
              Resum<span style={{ color: '#1677ff' }}>AI</span>
            </span>
          </div>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/create-resume')}
          style={{ fontWeight: 600 }}
        >
          Create Resume
        </Button>

        <Badge count={2} size="small" offset={[-2, 4]}>
          <Button
            type="text"
            icon={<BellOutlined style={{ fontSize: '18px', color: '#64748b' }} />}
            style={{ borderRadius: '50%', width: '40px', height: '40px' }}
          />
        </Badge>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '4px 8px', borderRadius: '8px', transition: 'background 0.2s' }}>
            <Avatar
              size="medium"
              src={user?.avatar}
              icon={<UserOutlined />}
              style={{ backgroundColor: '#1677ff' }}
            />
            <div className="user-info-text" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', lineHeight: '1.2' }}>
                {user?.name || 'Alex Vance'}
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                {user?.title || 'Job Seeker'}
              </span>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
