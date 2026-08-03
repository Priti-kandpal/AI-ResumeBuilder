import React, { useState } from 'react';
import { Layout, Drawer } from 'antd';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { Footer } from '../components/common/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const { Content } = Layout;

export const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fb' }}>
      <Navbar onMobileMenuToggle={() => setMobileDrawerVisible(true)} />
      <Layout>
        <Sidebar collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} />

        <Drawer
          title="Navigation"
          placement="left"
          onClose={() => setMobileDrawerVisible(false)}
          open={mobileDrawerVisible}
          bodyStyle={{ padding: 0 }}
        >
          <Sidebar collapsed={false} />
        </Drawer>

        <Content
          style={{
            margin: '24px',
            padding: '0',
            minHeight: 'calc(100vh - 120px)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
          <Footer />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
