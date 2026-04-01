
import React, { useState } from 'react';
import { Segmented } from 'antd';
import Template1 from '../../templates/Template1';
import Template2 from '../../templates/Template2';
import Template3 from '../../templates/Template3';
import Template4 from '../../templates/Template4';

const ResumePreview = ({ data, template, onTemplateChange }) => {
  // 调试信息
  console.log('ResumePreview 接收到的数据:', data);
  console.log('当前模板:', template);
  
  const [scale, setScale] = useState(1);

  const templates = [
    { key: 'template1', label: '模板1', component: Template1 },
    { key: 'template2', label: '模板2', component: Template2 },
    { key: 'template3', label: '模板3', component: Template3 },
    { key: 'template4', label: '模板4', component: Template4 },
  ];

  const currentTemplate = templates.find((t) => t.key === template);
  const TemplateComponent = currentTemplate?.component || Template1;

  const previewContainerStyle = {
    backgroundColor: '#f0f2f5',
    padding: '40px',
    borderRadius: '12px',
    overflow: 'auto',
    maxHeight: 'calc(100vh - 120px)',
    display: 'flex',
    justifyContent: 'center',
  };

  const previewWrapperStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    transform: `scale(${scale})`,
    transformOrigin: 'top center',
    transition: 'transform 0.3s ease',
    minHeight: '800px',
    width: '210mm',
    padding: '0',
  };

  const toolbarStyle = {
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  };

  const scaleButtonStyle = {
    padding: '6px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const scaleButtonStyleHover = {
    backgroundColor: '#667eea',
    color: 'white',
    borderColor: '#667eea',
  };

  return (
    <div>
      {/* 工具栏 */}
      <div style={toolbarStyle}>
        <Segmented
          options={templates.map((t) => t.label)}
          value={templates.find((t) => t.key === template)?.label}
          onChange={(value) => {
            const selectedTemplate = templates.find((t) => t.label === value);
            if (selectedTemplate) onTemplateChange(selectedTemplate.key);
          }}
          style={{ backgroundColor: '#f5f5f5', padding: '4px' }}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={scaleButtonStyle}
            onClick={() => setScale(Math.max(0.5, scale - 0.1))}
          >
            -
          </button>
          <span style={{ padding: '6px 12px' }}>{Math.round(scale * 100)}%</span>
          <button
            style={scaleButtonStyle}
            onClick={() => setScale(Math.min(1.5, scale + 0.1))}
          >
            +
          </button>
        </div>
      </div>

      {/* 预览区 */}
      <div style={previewContainerStyle}>
        <div style={previewWrapperStyle} id="resume-preview">
          <TemplateComponent data={data} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;