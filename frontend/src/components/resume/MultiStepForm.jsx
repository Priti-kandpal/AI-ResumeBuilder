import React, { useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Button,
  Card,
  Space,
  Select,
  Row,
  Col,
  Divider,
  Tag,
  message,
} from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  RocketOutlined,
  BankOutlined,
  BuildOutlined,
  CodeOutlined,
  SafetyCertificateOutlined,
  LayoutOutlined,
  PlusOutlined,
  DeleteOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { RESUME_TEMPLATES } from '../../utils/constants';
import useResume from '../../hooks/useResume';

const { Option } = Select;
const { TextArea } = Input;

export const MultiStepForm = ({ initialData, onChange, onSubmit, isEditing = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const { generateAISuggestions } = useResume();
  const [aiGenerating, setAiGenerating] = useState(false);

  const steps = [
    { title: 'Personal Info', icon: <UserOutlined /> },
    { title: 'Summary', icon: <SolutionOutlined /> },
    { title: 'Experience', icon: <RocketOutlined /> },
    { title: 'Education', icon: <BankOutlined /> },
    { title: 'Skills', icon: <CodeOutlined /> },
    { title: 'Projects', icon: <BuildOutlined /> },
    { title: 'Certifications', icon: <SafetyCertificateOutlined /> },
    { title: 'Template', icon: <LayoutOutlined /> },
  ];

  const handleFieldChange = (changedValues, allValues) => {
    if (onChange) {
      onChange(allValues);
    }
  };

  const handleAiGenerateSummary = async () => {
    const jobTitle = form.getFieldValue(['personalInfo', 'jobTitle']);
    if (!jobTitle) {
      message.warning('Please enter a Target Job Title first to generate an AI summary.');
      return;
    }
    setAiGenerating(true);
    try {
      const result = await generateAISuggestions({ jobRole: jobTitle });
      if (result && result.summary) {
        form.setFieldValue(['personalInfo', 'summary'], result.summary);
        handleFieldChange({}, form.getFieldsValue());
        message.success('AI summary inserted successfully!');
      }
    } catch (e) {
      message.error('Failed to generate AI summary');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    } catch (error) {
      message.error('Please complete required fields before advancing.');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Card
      style={{
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      }}
      bodyStyle={{ padding: '28px' }}
    >
      <Steps
        current={currentStep}
        onChange={(step) => setCurrentStep(step)}
        size="small"
        style={{ marginBottom: '32px' }}
        items={steps.map((item) => ({ title: item.title, icon: item.icon }))}
      />

      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
        onValuesChange={handleFieldChange}
        onFinish={handleFinish}
      >
        {/* STEP 0: Personal Info */}
        {currentStep === 0 && (
          <div>
            <Divider orientation="left" style={{ margin: '0 0 20px 0', color: '#1677ff', fontWeight: 700 }}>
              Personal Information
            </Divider>
            <Form.Item
              name="title"
              label="Resume Document Title"
              rules={[{ required: true, message: 'Please enter a title for this resume' }]}
            >
              <Input size="large" placeholder="e.g. Senior Full Stack Engineer - 2026" />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={['personalInfo', 'fullName']}
                  label="Full Name"
                  rules={[{ required: true, message: 'Full Name is required' }]}
                >
                  <Input size="large" placeholder="Alex Vance" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={['personalInfo', 'jobTitle']}
                  label="Target Job Title"
                  rules={[{ required: true, message: 'Target Job Title is required' }]}
                >
                  <Input size="large" placeholder="Senior Software Engineer" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name={['personalInfo', 'email']}
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Email address is required' },
                    { type: 'email', message: 'Enter a valid email' },
                  ]}
                >
                  <Input size="large" placeholder="alex.vance@example.com" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name={['personalInfo', 'phone']} label="Phone Number">
                  <Input size="large" placeholder="+1 (555) 000-0000" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name={['personalInfo', 'location']} label="Location (City, Country)">
                  <Input size="large" placeholder="San Francisco, CA" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name={['personalInfo', 'website']} label="Portfolio / Website URL">
                  <Input size="large" placeholder="https://alexvance.dev" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name={['personalInfo', 'linkedin']} label="LinkedIn Profile">
                  <Input size="large" placeholder="linkedin.com/in/alexvance" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name={['personalInfo', 'github']} label="GitHub Profile">
                  <Input size="large" placeholder="github.com/alexvance" />
                </Form.Item>
              </Col>
            </Row>
          </div>
        )}

        {/* STEP 1: Professional Summary */}
        {currentStep === 1 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Divider orientation="left" style={{ margin: 0, color: '#1677ff', fontWeight: 700 }}>
                Professional Summary & Objective
              </Divider>
              <Button
                type="primary"
                ghost
                icon={<ThunderboltOutlined />}
                loading={aiGenerating}
                onClick={handleAiGenerateSummary}
                style={{ fontWeight: 600 }}
              >
                AI Auto-Generate
              </Button>
            </div>
            <Form.Item
              name={['personalInfo', 'summary']}
              extra="Describe your core professional background, years of experience, and key achievements."
            >
              <TextArea
                rows={6}
                placeholder="Results-driven Senior Engineer with 6+ years of experience constructing scalable web applications..."
              />
            </Form.Item>
          </div>
        )}

        {/* STEP 2: Work Experience */}
        {currentStep === 2 && (
          <div>
            <Divider orientation="left" style={{ margin: '0 0 20px 0', color: '#1677ff', fontWeight: 700 }}>
              Work Experience
            </Divider>
            <Form.List name="experience">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card
                      key={key}
                      type="inner"
                      title={`Position #${name + 1}`}
                      extra={
                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(name)}>
                          Remove
                        </Button>
                      }
                      style={{ marginBottom: '16px', borderRadius: '12px', background: '#fafafa' }}
                    >
                      <Row gutter={16}>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'company']}
                            label="Company Name"
                            rules={[{ required: true, message: 'Company is required' }]}
                          >
                            <Input placeholder="TechCorp Solutions" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'role']}
                            label="Role / Title"
                            rules={[{ required: true, message: 'Role is required' }]}
                          >
                            <Input placeholder="Senior Software Engineer" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col xs={24} sm={8}>
                          <Form.Item {...restField} name={[name, 'startDate']} label="Start Date">
                            <Input placeholder="e.g. 2022-03" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                          <Form.Item {...restField} name={[name, 'endDate']} label="End Date (or Present)">
                            <Input placeholder="e.g. Present" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                          <Form.Item {...restField} name={[name, 'location']} label="Location">
                            <Input placeholder="San Francisco, CA" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item {...restField} name={[name, 'description']} label="Key Responsibilities & Impact">
                        <TextArea rows={3} placeholder="Built microservices architecture handling 500k+ daily users..." />
                      </Form.Item>
                    </Card>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ borderRadius: '8px' }}>
                    Add Experience Position
                  </Button>
                </>
              )}
            </Form.List>
          </div>
        )}

        {/* STEP 3: Education */}
        {currentStep === 3 && (
          <div>
            <Divider orientation="left" style={{ margin: '0 0 20px 0', color: '#1677ff', fontWeight: 700 }}>
              Education
            </Divider>
            <Form.List name="education">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card
                      key={key}
                      type="inner"
                      title={`Education #${name + 1}`}
                      extra={
                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(name)}>
                          Remove
                        </Button>
                      }
                      style={{ marginBottom: '16px', borderRadius: '12px', background: '#fafafa' }}
                    >
                      <Row gutter={16}>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'institution']}
                            label="University / Institution"
                            rules={[{ required: true, message: 'Institution is required' }]}
                          >
                            <Input placeholder="UC Berkeley" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'degree']}
                            label="Degree / Program"
                            rules={[{ required: true, message: 'Degree is required' }]}
                          >
                            <Input placeholder="B.S. in Computer Science" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col xs={24} sm={8}>
                          <Form.Item {...restField} name={[name, 'startDate']} label="Start Year">
                            <Input placeholder="2015" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                          <Form.Item {...restField} name={[name, 'endDate']} label="Graduation Year">
                            <Input placeholder="2019" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                          <Form.Item {...restField} name={[name, 'gpa']} label="GPA (Optional)">
                            <Input placeholder="3.8 / 4.0" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ borderRadius: '8px' }}>
                    Add Education Record
                  </Button>
                </>
              )}
            </Form.List>
          </div>
        )}

        {/* STEP 4: Skills */}
        {currentStep === 4 && (
          <div>
            <Divider orientation="left" style={{ margin: '0 0 20px 0', color: '#1677ff', fontWeight: 700 }}>
              Technical & Soft Skills
            </Divider>
            <Form.Item
              name="skills"
              label="Key Competencies (Select or type custom skill tags)"
              extra="Type skill name and press Enter to create tags."
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="e.g. React, Node.js, TypeScript, AWS, Docker"
                tokenSeparators={[',']}
                size="large"
              />
            </Form.Item>
          </div>
        )}

        {/* STEP 5: Projects */}
        {currentStep === 5 && (
          <div>
            <Divider orientation="left" style={{ margin: '0 0 20px 0', color: '#1677ff', fontWeight: 700 }}>
              Featured Projects
            </Divider>
            <Form.List name="projects">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card
                      key={key}
                      type="inner"
                      title={`Project #${name + 1}`}
                      extra={
                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(name)}>
                          Remove
                        </Button>
                      }
                      style={{ marginBottom: '16px', borderRadius: '12px', background: '#fafafa' }}
                    >
                      <Row gutter={16}>
                        <Col xs={24} sm={12}>
                          <Form.Item {...restField} name={[name, 'name']} label="Project Title">
                            <Input placeholder="AI Resume Builder" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item {...restField} name={[name, 'link']} label="Live Link / Repository">
                            <Input placeholder="https://github.com/..." />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item {...restField} name={[name, 'description']} label="Project Description">
                        <TextArea rows={2} placeholder="Created React 18 frontend with Ant Design..." />
                      </Form.Item>
                    </Card>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ borderRadius: '8px' }}>
                    Add Project Entry
                  </Button>
                </>
              )}
            </Form.List>
          </div>
        )}

        {/* STEP 6: Certifications */}
        {currentStep === 6 && (
          <div>
            <Divider orientation="left" style={{ margin: '0 0 20px 0', color: '#1677ff', fontWeight: 700 }}>
              Certifications & Languages
            </Divider>
            <Form.List name="certifications">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item {...restField} name={[name, 'title']} rules={[{ required: true, message: 'Missing title' }]}>
                        <Input placeholder="Certificate Title" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'issuer']}>
                        <Input placeholder="Issuing Body (e.g. AWS)" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'date']}>
                        <Input placeholder="Year (2023)" />
                      </Form.Item>
                      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                      Add Certification
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Divider />

            <Form.Item name="languages" label="Languages Spoken">
              <Select mode="tags" placeholder="e.g. English (Native), Spanish (Conversational)" size="large" />
            </Form.Item>
          </div>
        )}

        {/* STEP 7: Template Selection */}
        {currentStep === 7 && (
          <div>
            <Divider orientation="left" style={{ margin: '0 0 20px 0', color: '#1677ff', fontWeight: 700 }}>
              Select Resume Layout Template
            </Divider>
            <Form.Item name="template" initialValue="modern">
              <Row gutter={[16, 16]}>
                {RESUME_TEMPLATES.map((tmpl) => (
                  <Col xs={24} sm={12} key={tmpl.id}>
                    <Form.Item noStyle name="template">
                      {({ getFieldValue, setFieldValue }) => {
                        const isSelected = getFieldValue('template') === tmpl.id;
                        return (
                          <Card
                            hoverable
                            onClick={() => setFieldValue('template', tmpl.id)}
                            style={{
                              borderRadius: '14px',
                              border: isSelected ? `2px solid ${tmpl.color}` : '1px solid #e2e8f0',
                              background: isSelected ? `${tmpl.color}08` : '#fff',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <strong style={{ fontSize: '16px', color: '#0f172a' }}>{tmpl.name}</strong>
                              <Tag color="blue">{tmpl.badge}</Tag>
                            </div>
                            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{tmpl.description}</p>
                          </Card>
                        );
                      }}
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </Form.Item>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
          <Button disabled={currentStep === 0} onClick={handlePrev} icon={<ArrowLeftOutlined />}>
            Previous Step
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button type="primary" onClick={handleNext} style={{ fontWeight: 600 }}>
              Next Step <ArrowRightOutlined />
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" icon={<CheckOutlined />} style={{ fontWeight: 700, backgroundColor: '#10b981', borderColor: '#10b981' }}>
              {isEditing ? 'Update & Save Resume' : 'Complete & Generate Resume'}
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default MultiStepForm;
