import React, { memo } from 'react';
import { useResume } from '../../context/ResumeContext';
import SimpleTemplate from './templates/SimpleTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

/**
 * 简历预览主组件
 * 使用 React.memo 优化性能
 * 根据选中的模板显示不同的简历样式
 */
const ResumePreview = memo(() => {
  const { resumeData, selectedTemplate } = useResume();

  // 模板映射
  const templateComponents = {
    simple: SimpleTemplate,
    professional: ProfessionalTemplate,
    creative: CreativeTemplate
  };

  // 获取当前模板组件
  const TemplateComponent = templateComponents[selectedTemplate] || SimpleTemplate;

  return (
    <div className="resume-preview-container">
      <TemplateComponent data={resumeData} />
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
