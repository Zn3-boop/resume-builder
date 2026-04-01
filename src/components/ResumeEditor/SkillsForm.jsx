
import React, { useState, memo } from 'react';
import { Form, Input, Button, Select, Slider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

// 使用memo优化技能项组件
const SkillItem = memo(({ skill, index, onDelete }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
    padding: '12px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    border: '1px solid #f0f0f0',
  }}>
    <span style={{ flex: '0 0 120px', fontWeight: '500' }}>{skill.name}</span>
    <div style={{
      flex: 1,
      height: '8px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      overflow: 'hidden',
    }}>
      <div style={{
        height: '100%',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '4px',
        width: `${skill.level}%`,
      }} />
    </div>
    <span style={{ flex: '0 0 40px', textAlign: 'right', fontSize: '14px', color: '#666' }}>
      {skill.level}%
    </span>
    <Button
      type="text"
      danger
      icon={<DeleteOutlined />}
      onClick={() => onDelete(index)}
      size="small"
    />
  </div>
));

SkillItem.displayName = 'SkillItem';

// 使用memo优化爱好项组件
const HobbyItem = memo(({ hobby, index, onDelete }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#fafafa',
    borderRadius: '20px',
    margin: '0 8px 8px 0',
    border: '1px solid #f0f0f0',
  }}>
    <span>{hobby}</span>
    <Button
      type="text"
      danger
      icon={<DeleteOutlined />}
      onClick={() => onDelete(index)}
      size="small"
      style={{ padding: '0 4px' }}
    />
  </div>
));

HobbyItem.displayName = 'HobbyItem';

const SkillsForm = ({ skills, hobbies, onChange }) => {
  const [newSkill, setNewSkill] = useState({ name: '', level: 80 });
  const [newHobby, setNewHobby] = useState('');

  const handleAddSkill = () => {
    if (newSkill.name) {
      onChange([...skills, newSkill], hobbies);
      setNewSkill({ name: '', level: 80 });
    }
  };

  const handleDeleteSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    onChange(newSkills, hobbies);
  };

  const handleAddHobby = () => {
    if (newHobby) {
      onChange(skills, [...hobbies, newHobby]);
      setNewHobby('');
    }
  };

  const handleDeleteHobby = (index) => {
    const newHobbies = hobbies.filter((_, i) => i !== index);
    onChange(skills, newHobbies);
  };

  const sectionStyle = {
    marginBottom: '32px',
  };

  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 16px 0',
    color: '#333',
  };

  return (
    <div>
      {/* 技能部分 */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>技能特长</h3>

        {/* 添加技能 */}
        <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
          <Form layout="vertical">
            <Form.Item label="技能名称">
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="请输入技能名称"
                size="large"
              />
            </Form.Item>
            <Form.Item label="熟练度">
              <Slider
                value={newSkill.level}
                onChange={(value) => setNewSkill({ ...newSkill, level: value })}
                marks={{
                  0: '0%',
                  20: '20%',
                  40: '40%',
                  60: '60%',
                  80: '80%',
                  100: '100%',
                }}
              />
            </Form.Item>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddSkill}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '6px',
              }}
            >
              添加技能
            </Button>
          </Form>
        </div>

        {/* 技能列表 */}
        {skills.map((skill, index) => (
          <SkillItem
            key={index}
            skill={skill}
            index={index}
            onDelete={handleDeleteSkill}
          />
        ))}
      </div>

      {/* 兴趣爱好部分 */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>兴趣爱好</h3>

        {/* 添加爱好 */}
        <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
          <Form layout="vertical">
            <Form.Item label="兴趣爱好">
              <Input
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder="请输入兴趣爱好"
                size="large"
                onPressEnter={handleAddHobby}
              />
            </Form.Item>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddHobby}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '6px',
              }}
            >
              添加爱好
            </Button>
          </Form>
        </div>

        {/* 爱好列表 */}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {hobbies.map((hobby, index) => (
            <HobbyItem
              key={index}
              hobby={hobby}
              index={index}
              onDelete={handleDeleteHobby}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
