import React from 'react';
import { Select } from 'antd';
import { useResume } from '../../context/ResumeContext';

const { Option } = Select;

/**
 * 模板选择器组件
 * 用于切换不同的简历模板
 */
const TemplateSelector = ({ templates }) => {
  const { selectedTemplate, changeTemplate } = useResume();

  return (
    <Select
      value={selectedTemplate}
      onChange={changeTemplate}
      style={{ width: 200 }}
      placeholder="选择模板"
    >
      {templates.map(template => (
        <Option key={template.id} value={template.id}>
          {template.name}
        </Option>
      ))}
    </Select>
  );
};

export default TemplateSelector;
