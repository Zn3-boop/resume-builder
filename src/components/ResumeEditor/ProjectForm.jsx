
import React, { useMemo } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FixedSizeList as List } from 'react-window';
import ProjectItem from './ProjectItem';

const ITEM_HEIGHT = 400; // 每个项目经验项的高度

const ProjectForm = ({ data, onChange }) => {
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

  // 使用useMemo缓存列表项的渲染函数
  const Row = useMemo(() => ({ index, style }) => (
    <div style={style}>
      <ProjectItem
        item={data[index]}
        index={index}
        onChange={handleChange}
        onDelete={handleDelete}
      />
    </div>
  ), [data, handleChange, handleDelete]);

  // 列表容器高度
  const listHeight = Math.min(data.length * ITEM_HEIGHT, 600);

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

      {data.length > 0 ? (
        <List
          height={listHeight}
          itemCount={data.length}
          itemSize={ITEM_HEIGHT}
          width="100%"
          itemData={data}
        >
          {Row}
        </List>
      ) : (
        <div style={{
          padding: '24px',
          textAlign: 'center',
          color: '#999',
          backgroundColor: '#fafafa',
          borderRadius: '8px',
          border: '1px dashed #d9d9d9'
        }}>
          暂无项目经验，点击上方"添加"按钮添加
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
