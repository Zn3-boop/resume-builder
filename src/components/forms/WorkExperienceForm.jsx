import React from 'react';
import { List, Button, Input, DatePicker, Space, Popconfirm, message } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useResume } from '../../context/ResumeContext';
import { validators } from '../../utils/validators';
import dayjs from 'dayjs';

/**
 * 工作经历表单组件
 */
const WorkExperienceForm = () => {
  const { resumeData, addWorkExperience, updateWorkExperience, deleteWorkExperience } = useResume();

  /**
   * 更新工作经历字段
   */
  const handleUpdate = (id, field, value) => {
    // 如果是日期对象，转换为字符串
    if (value && dayjs.isDayjs(value)) {
      value = value.format('YYYY-MM');
    }
    updateWorkExperience(id, field, value);
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
        onClick={addWorkExperience}
        style={{ marginBottom: 16 }}
      >
        添加工作经历
      </Button>

      <List
        dataSource={resumeData.workExperience}
        renderItem={(item, index) => (
          <List.Item key={item.id} className="work-experience-item">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div className="item-header">
                <span>工作经历 #{index + 1}</span>
                <Popconfirm
                  title="确定删除这条工作经历吗？"
                  onConfirm={() => deleteWorkExperience(item.id)}
                >
                  <Button type="text" danger icon={<DeleteOutlined />} size="small">
                    删除
                  </Button>
                </Popconfirm>
              </div>

              <Input
                placeholder="公司名称"
                value={item.company}
                onChange={(e) => handleUpdate(item.id, 'company', e.target.value)}
              />

              <Input
                placeholder="职位"
                value={item.position}
                onChange={(e) => handleUpdate(item.id, 'position', e.target.value)}
              />

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

              <Input.TextArea
                rows={3}
                placeholder="工作描述"
                value={item.description}
                onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
              />
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};

export default WorkExperienceForm;
