import React from 'react';
import { List, Button, Input, Space, Popconfirm, Tag } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResume } from '../../context/ResumeContext';
import { validators } from '../../utils/validators';

/**
 * 项目经历表单组件
 */
const ProjectForm = () => {
  const { resumeData, addProject, updateProject, deleteProject } = useResume();

  /**
   * 验证URL格式
   */
  const validateUrl = (url) => {
    if (!url) return true;
    return validators.isUrl(url);
  };

  return (
    <div className="form-section">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={addProject}
        style={{ marginBottom: 16 }}
      >
        添加项目经历
      </Button>

      <List
        dataSource={resumeData.projects}
        renderItem={(item, index) => (
          <List.Item key={item.id} className="project-item">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div className="item-header">
                <span>项目经历 #{index + 1}</span>
                <Popconfirm
                  title="确定删除这个项目经历吗？"
                  onConfirm={() => deleteProject(item.id)}
                >
                  <Button type="text" danger icon={<DeleteOutlined />} size="small">
                    删除
                  </Button>
                </Popconfirm>
              </div>

              <Input
                placeholder="项目名称"
                value={item.name}
                onChange={(e) => updateProject(item.id, 'name', e.target.value)}
              />

              <Input
                placeholder="角色"
                value={item.role}
                onChange={(e) => updateProject(item.id, 'role', e.target.value)}
              />

              <Input
                placeholder="技术栈（用逗号分隔）"
                value={item.techStack}
                onChange={(e) => updateProject(item.id, 'techStack', e.target.value)}
              />
              {item.techStack && (
                <div style={{ marginTop: 8 }}>
                  <span style={{ fontSize: 12, color: '#999' }}>预览：</span>
                  <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {item.techStack.split(/[,，]/).map((tech, index) => (
                      <Tag key={index} color="blue">{tech.trim()}</Tag>
                    ))}
                  </div>
                </div>
              )}

              <Input
                placeholder="项目链接"
                value={item.link}
                onChange={(e) => {
                  if (!validateUrl(e.target.value)) {
                    return;
                  }
                  updateProject(item.id, 'link', e.target.value);
                }}
              />

              <Input.TextArea
                rows={3}
                placeholder="项目描述"
                value={item.description}
                onChange={(e) => updateProject(item.id, 'description', e.target.value)}
              />
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProjectForm;
