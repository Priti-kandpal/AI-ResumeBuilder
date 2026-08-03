import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

export const Footer = () => {
  return (
    <AntFooter
      className="no-print"
      style={{
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '13px',
        background: 'transparent',
        padding: '24px 50px',
      }}
    >
      AI Resume Builder © {new Date().getFullYear()} — Powered by React 18, Ant Design & Advanced AI
    </AntFooter>
  );
};

export default Footer;
