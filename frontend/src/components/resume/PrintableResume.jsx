import React from 'react';
import { Button, Space, Card } from 'antd';
import {
  PrinterOutlined,
  DownloadOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ResumePreview from './ResumePreview';
import { handleNativePrint, exportToPdf } from '../../utils/exportPdf';

export const PrintableResume = ({ resumeData, onEdit }) => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 0' }}>
      {/* Top Action Bar */}
      <Card
        className="no-print"
        style={{
          marginBottom: '24px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/my-resumes')}>
            Back to Resumes
          </Button>

          <Space size="middle">
            {onEdit && (
              <Button icon={<EditOutlined />} onClick={onEdit}>
                Edit Data
              </Button>
            )}
            <Button icon={<PrinterOutlined />} onClick={handleNativePrint}>
              Print Resume
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => exportToPdf('printable-resume-wrapper', `${resumeData?.title || 'Resume'}.pdf`)}
              style={{ fontWeight: 600 }}
            >
              Download PDF
            </Button>
          </Space>
        </div>
      </Card>

      {/* Main Printable Area */}
      <div id="printable-resume-wrapper">
        <ResumePreview data={resumeData} template={resumeData?.template} id="printable-resume-inner" />
      </div>
    </div>
  );
};

export default PrintableResume;
