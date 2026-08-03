import React from 'react';
import { Tag, Divider } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from '@ant-design/icons';

export const ResumePreview = ({ data, template = 'modern', id = 'resume-preview-container' }) => {
  const {
    personalInfo = {},
    skills = [],
    experience = [],
    education = [],
    projects = [],
    certifications = [],
    languages = [],
  } = data || {};

  const activeTemplate = template || data?.template || 'modern';

  return (
    <div
      id={id}
      className="printable-area"
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '36px 40px',
        minHeight: '842px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
        color: '#1e293b',
        fontFamily: "'Inter', sans-serif",
        lineHeight: 1.5,
        fontSize: '13px',
      }}
    >
      {/* ================= MODERN TEMPLATE ================= */}
      {activeTemplate === 'modern' && (
        <div>
          {/* Header */}
          <div style={{ borderBottom: '2px solid #1677ff', paddingBottom: '16px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#1677ff', margin: '4px 0 12px 0' }}>
              {personalInfo.jobTitle || 'Target Professional Title'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#64748b' }}>
              {personalInfo.email && (
                <span><MailOutlined style={{ color: '#1677ff', marginRight: 4 }} />{personalInfo.email}</span>
              )}
              {personalInfo.phone && (
                <span><PhoneOutlined style={{ color: '#1677ff', marginRight: 4 }} />{personalInfo.phone}</span>
              )}
              {personalInfo.location && (
                <span><EnvironmentOutlined style={{ color: '#1677ff', marginRight: 4 }} />{personalInfo.location}</span>
              )}
              {personalInfo.website && (
                <span><GlobalOutlined style={{ color: '#1677ff', marginRight: 4 }} />{personalInfo.website}</span>
              )}
              {personalInfo.linkedin && (
                <span><LinkedinOutlined style={{ color: '#1677ff', marginRight: 4 }} />{personalInfo.linkedin}</span>
              )}
              {personalInfo.github && (
                <span><GithubOutlined style={{ color: '#1677ff', marginRight: 4 }} />{personalInfo.github}</span>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {personalInfo.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#1677ff', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '8px' }}>
                Professional Summary
              </h3>
              <p style={{ color: '#334155', lineHeight: 1.6 }}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#1677ff', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '12px' }}>
                Work Experience
              </h3>
              {experience.map((exp, index) => (
                <div key={exp.id || index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{exp.role || 'Job Title'}</span>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1677ff', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
                    <span>{exp.company}</span>
                    <span style={{ color: '#64748b', fontWeight: 400, fontSize: '12px' }}>{exp.location}</span>
                  </div>
                  {exp.description && (
                    <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#1677ff', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '8px' }}>
                Core Competencies & Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((skill, idx) => (
                  <Tag key={idx} color="blue" style={{ borderRadius: '6px', padding: '4px 10px', fontSize: '12px' }}>
                    {typeof skill === 'string' ? skill : skill.name}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#1677ff', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '12px' }}>
                Education
              </h3>
              {education.map((edu, index) => (
                <div key={edu.id || index} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>{edu.degree}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div style={{ color: '#475569', fontSize: '12px' }}>
                    {edu.institution} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#1677ff', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '12px' }}>
                Key Projects
              </h3>
              {projects.map((proj, index) => (
                <div key={proj.id || index} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{proj.name}</span>
                    {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: '#1677ff' }}>View Project</a>}
                  </div>
                  <p style={{ color: '#475569', fontSize: '12px' }}>{proj.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications & Languages */}
          <div style={{ display: 'flex', gap: '32px' }}>
            {certifications.length > 0 && (
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#1677ff', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '8px' }}>
                  Certifications
                </h3>
                {certifications.map((cert, idx) => (
                  <div key={idx} style={{ fontSize: '12px', color: '#334155' }}>
                    <strong>{cert.title}</strong> - {cert.issuer} ({cert.date})
                  </div>
                ))}
              </div>
            )}
            {languages.length > 0 && (
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#1677ff', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '8px' }}>
                  Languages
                </h3>
                <div style={{ fontSize: '12px', color: '#334155' }}>
                  {languages.join(', ')}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= EXECUTIVE / OTHER TEMPLATE FALLBACK ================= */}
      {activeTemplate !== 'modern' && (
        <div>
          <div style={{ textAlign: 'center', borderBottom: '1px solid #cbd5e1', paddingBottom: '20px', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '30px', fontWeight: 700, color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p style={{ fontSize: '15px', fontWeight: 500, color: '#475569', margin: '6px 0 14px 0' }}>
              {personalInfo.jobTitle || 'Target Professional Title'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#64748b' }}>
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
            </div>
          </div>

          {personalInfo.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
                Executive Profile
              </h3>
              <p style={{ color: '#334155', lineHeight: 1.6 }}>{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px' }}>
                Professional Experience
              </h3>
              {experience.map((exp, index) => (
                <div key={exp.id || index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '14px', color: '#0f172a' }}>{exp.company}</strong>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div style={{ fontStyle: 'italic', color: '#475569', marginBottom: '6px' }}>{exp.role}</div>
                  <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.5 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
                Core Competencies
              </h3>
              <p style={{ color: '#334155', fontSize: '12px' }}>
                {skills.map(s => (typeof s === 'string' ? s : s.name)).join(' • ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
