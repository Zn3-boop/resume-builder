import React from 'react';
import { List, Button, Input, Select, Space, Popconfirm, Tag } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResume } from '../../context/ResumeContext';

const { Option } = Select;

// 技能熟练度选项
const skillLevels = [
  { value: '入门', label: '入门', color: 'default' },
  { value: '熟练', label: '熟练', color: 'processing' },
  { value: '精通', label: '精通', color: 'success' }
];

/**
 * 技能表单组件
 */
const SkillForm = () => {
  const { resumeData, addSkill, updateSkill, deleteSkill } = useResume();

  return (
    <div className="form-section">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={addSkill}
        style={{ marginBottom: 16 }}
      >
        添加技能
      </Button>

      <List
        dataSource={resumeData.skills}
        renderItem={(item, index) => (
          <List.Item key={item.id} className="skill-item">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div className="item-header">
                <span>技能 #{index + 1}</span>
                <Popconfirm
                  title="确定删除这个技能吗？"
                  onConfirm={() => deleteSkill(item.id)}
                >
                  <Button type="text" danger icon={<DeleteOutlined />} size="small">
                    删除
                  </Button>
                </Popconfirm>
              </div>

              <Input
                placeholder="技能名称"
                value={item.name}
                onChange={(e) => updateSkill(item.id, 'name', e.target.value)}
              />

              <Select
                placeholder="选择熟练度"
                value={item.level}
                onChange={(value) => updateSkill(item.id, 'level', value)}
                style={{ width: '100%' }}
              >
                {skillLevels.map(level => (
                  <Option key={level.value} value={level.value}>
                    {level.label}
                  </Option>
                ))}
              </Select>

              {/* 实时预览标签 */}
              {item.name && (
                <div style={{ marginTop: 8 }}>
                  <span style={{ fontSize: 12, color: '#999' }}>预览：</span>
                  <Tag
                    color={skillLevels.find(l => l.value === item.level)?.color}
                    style={{ marginLeft: 8 }}
                  >
                    {item.name} ({item.level})
                  </Tag>
                </div>
              )}
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SkillForm;
