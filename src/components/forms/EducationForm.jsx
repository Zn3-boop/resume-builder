import React from 'react';
import { List, Button, Input, DatePicker, Space, Popconfirm, message, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResume } from '../../context/ResumeContext';
import { validators } from '../../utils/validators';
import dayjs from 'dayjs';

const { Option } = Select;

// 学历选项
const degrees = [
  { value: '本科', label: '本科' },
  { value: '硕士', label: '硕士' },
  { value: '博士', label: '博士' },
  { value: '大专', label: '大专' },
  { value: '高中', label: '高中' }
];

/**
 * 教育背景表单组件
 */
const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, deleteEducation } = useResume();

  /**
   * 更新教育背景字段
   */
  const handleUpdate = (id, field, value) => {
    // 如果是日期对象，转换为字符串
    if (value && dayjs.isDayjs(value)) {
      value = value.format('YYYY-MM');
    }
    updateEducation(id, field, value);
  };

  /**
   * 验证时间范围
   */
  const validateDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return true;
    return validators.isValidDateRange(startDate, endDate);
  };

  return (
    <div className="form-section">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={addEducation}
        style={{ marginBottom: 16 }}
      >
        添加教育背景
      </Button>

      <List
        dataSource={resumeData.education}
        renderItem={(item, index) => (
          <List.Item key={item.id} className="education-item">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div className="item-header">
                <span>教育背景 #{index + 1}</span>
                <Popconfirm
                  title="确定删除这条教育背景吗？"
                  onConfirm={() => deleteEducation(item.id)}
                >
                  <Button type="text" danger icon={<DeleteOutlined />} size="small">
                    删除
                  </Button>
                </Popconfirm>
              </div>

              <Input
                placeholder="学校名称"
                value={item.school}
                onChange={(e) => handleUpdate(item.id, 'school', e.target.value)}
              />

              <Input
                placeholder="专业"
                value={item.major}
                onChange={(e) => handleUpdate(item.id, 'major', e.target.value)}
              />

              <Select
                placeholder="选择学历"
                value={item.degree}
                onChange={(value) => handleUpdate(item.id, 'degree', value)}
                style={{ width: '100%' }}
              >
                {degrees.map(degree => (
                  <Option key={degree.value} value={degree.value}>
                    {degree.label}
                  </Option>
                ))}
              </Select>

              <Space>
                <DatePicker
                  picker="month"
                  placeholder="开始时间"
                  value={item.startDate ? dayjs(item.startDate) : null}
                  onChange={(date) => {
                    if (!validateDateRange(date, item.endDate)) {
                      message.error('开始时间不能晚于结束时间');
                      return;
                    }
                    handleUpdate(item.id, 'startDate', date);
                  }}
                />
                <DatePicker
                  picker="month"
                  placeholder="结束时间"
                  value={item.endDate ? dayjs(item.endDate) : null}
                  onChange={(date) => {
                    if (!validateDateRange(item.startDate, date)) {
                      message.error('结束时间不能早于开始时间');
                      return;
                    }
                    handleUpdate(item.id, 'endDate', date);
                  }}
                />
              </Space>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};

export default EducationForm;
