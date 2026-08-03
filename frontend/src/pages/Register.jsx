import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import useAuth from '../hooks/useAuth';

const { Text } = Typography;

export const Register = () => {
  const [form] = Form.useForm();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      // Handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start building professional, ATS-optimized resumes in seconds."
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input prefix={<UserOutlined style={{ color: '#94a3b8' }} />} placeholder="Alex Vance" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<MailOutlined style={{ color: '#94a3b8' }} />} placeholder="name@company.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters' },
          ]}
        >
          <Input.Password prefix={<LockOutlined style={{ color: '#94a3b8' }} />} placeholder="••••••••" />
        </Form.Item>

        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('You must accept the Terms and Conditions')),
            },
          ]}
        >
          <Checkbox>
            I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> & <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          </Checkbox>
        </Form.Item>

        <Form.Item style={{ marginTop: '24px' }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{ height: '46px', fontWeight: 600, fontSize: '15px' }}
          >
            Create Account <ArrowRightOutlined />
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1677ff', fontWeight: 600 }}>
              Sign in here
            </Link>
          </Text>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Register;
