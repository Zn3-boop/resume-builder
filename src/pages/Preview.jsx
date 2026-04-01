import { Card, Button, Space, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { exportToPDF } from '../utils/pdfExport';
import { useRef } from 'react';

const { Title } = Typography;

/**
 * 预览页面组件
 */
const Preview = () => {
  const resumeRef = useRef(null);

  const handleExportPDF = async () => {
    if (resumeRef.current) {
      const result = await exportToPDF(resumeRef.current);
      if (result.success) {
        console.log('PDF导出成功');
      } else {
        console.error('PDF导出失败:', result.error);
      }
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={2} style={{ margin: 0 }}>简历预览</Title>
          <Space>
            <Button 
              type="primary" 
              icon={<DownloadOutlined />}
              onClick={handleExportPDF}
            >
              导出PDF
            </Button>
          </Space>
        </div>

        <div ref={resumeRef} className="resume-preview">
          <p>简历内容将在此处显示</p>
        </div>
      </Card>
    </div>
  );
};

export default Preview;
