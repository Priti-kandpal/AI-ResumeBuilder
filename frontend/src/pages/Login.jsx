import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import useAuth from '../hooks/useAuth';

const { Text } = Typography;

export const Login = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await login(values);
      navigate(from, { replace: true });
    } catch (err) {
      // Handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    form.setFieldsValue({
      email: 'alex.vance@example.com',
      password: 'password123',
    });
  };

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Sign in to manage your resumes and access AI suggestions."
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        size="large"
      >
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter your email address' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<MailOutlined style={{ color: '#94a3b8' }} />} placeholder="name@company.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password prefix={<LockOutlined style={{ color: '#94a3b8' }} />} placeholder="••••••••" />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="#forgot" style={{ fontSize: '13px', color: '#1677ff' }} onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{ height: '46px', fontWeight: 600, fontSize: '15px' }}
          >
            Sign In <ArrowRightOutlined />
          </Button>
        </Form.Item>

        <Button
          type="dashed"
          block
          onClick={handleDemoFill}
          style={{ marginBottom: '24px', color: '#475569', fontWeight: 500 }}
        >
          Fill Demo Account Credentials
        </Button>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#1677ff', fontWeight: 600 }}>
              Create an account
            </Link>
          </Text>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Login;
