import React, { memo } from 'react';
import { Form, Input, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const itemStyle = {
  padding: '16px',
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  marginBottom: '16px',
  border: '1px solid #f0f0f0',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
};

const titleStyle = {
  fontSize: '16px',
  fontWeight: '600',
  margin: 0,
  color: '#333',
};

const ProjectItem = memo(({ item, index, onChange, onDelete }) => {
  const handleChange = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <div style={itemStyle}>
      <div style={headerStyle}>
        <h4 style={titleStyle}>项目经验 {index + 1}</h4>
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(item.id)}
        >
          删除
        </Button>
      </div>

      <Form layout="vertical">
        <Form.Item label="项目名称">
          <Input
            value={item.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="请输入项目名称"
            size="large"
          />
        </Form.Item>

        <Form.Item label="担任角色">
          <Input
            value={item.role}
            onChange={(e) => handleChange('role', e.target.value)}
            placeholder="请输入担任角色"
            size="large"
          />
        </Form.Item>

        <Form.Item label="时间段">
          <Input
            value={item.period}
            onChange={(e) => handleChange('period', e.target.value)}
            placeholder="例如：2020.09 - 2024.06"
            size="large"
          />
        </Form.Item>

        <Form.Item label="项目描述">
          <Input.TextArea
            value={item.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="请输入项目描述"
            rows={4}
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>
      </Form>
    </div>
  );
});

ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;
