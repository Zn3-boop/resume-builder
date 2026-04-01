
import React from 'react';
import { Form, Input, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const ProjectForm = ({ data, onChange }) => {
  const [form] = Form.useForm();

  const handleAdd = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      role: '',
      period: '',
      description: '',
    };
    onChange([...data, newProject]);
  };

  const handleDelete = (id) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };

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

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#333' }}>
          项目经验
        </h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '6px',
          }}
        >
          添加
        </Button>
      </div>

      {data.map((item, index) => (
        <div key={item.id} style={itemStyle}>
          <div style={headerStyle}>
            <h4 style={titleStyle}>项目经验 {index + 1}</h4>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(item.id)}
            >
              删除
            </Button>
          </div>

          <Form layout="vertical">
            <Form.Item label="项目名称">
              <Input
                value={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                placeholder="请输入项目名称"
                size="large"
              />
            </Form.Item>

            <Form.Item label="担任角色">
              <Input
                value={item.role}
                onChange={(e) => handleChange(index, 'role', e.target.value)}
                placeholder="请输入担任角色"
                size="large"
              />
            </Form.Item>

            <Form.Item label="时间段">
              <Input
                value={item.period}
                onChange={(e) => handleChange(index, 'period', e.target.value)}
                placeholder="例如：2020.09 - 2024.06"
                size="large"
              />
            </Form.Item>

            <Form.Item label="项目描述">
              <Input.TextArea
                value={item.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                placeholder="请输入项目描述"
                rows={4}
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>
          </Form>
        </div>
      ))}
    </div>
  );
};

export default ProjectForm;
