import React from 'react';
import { Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useResume } from '../../context/ResumeContext';
import { validators } from '../../utils/validators';

/**
 * 基本信息表单组件
 */
const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const [form] = Form.useForm();

  /**
   * 处理头像上传
   */
  const handleUpload = (info) => {
    console.log('=== handleUpload 被调用 ===');
    console.log('上传信息:', info);
    console.log('文件状态:', info.file.status);

    if (info.file.status === 'done') {
      console.log('文件上传完成，开始读取文件...');
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('文件读取完成，更新头像URL');
        updatePersonalInfo('avatarUrl', e.target.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  /**
   * 自定义上传处理
   */
  const customRequest = (options) => {
    console.log('=== customRequest 被调用 ===');
    const { file, onSuccess, onError } = options;
    console.log('文件信息:', file);

    try {
      // 验证文件类型
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        throw new Error('只能上传图片文件');
      }

      // 验证文件大小（2MB）
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        throw new Error('图片大小不能超过2MB');
      }

      // 模拟上传成功
      console.log('验证通过，调用onSuccess');
      if (typeof onSuccess === 'function') {
        onSuccess('ok');
      }
    } catch (error) {
      console.error('上传出错:', error);
      if (typeof onError === 'function') {
        onError(error);
      }
    }
  };

  /**
   * 上传前的验证
   */
  const beforeUpload = (file) => {
    console.log('=== beforeUpload 被调用 ===');
    console.log('文件信息:', file);
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2MB');
      return false;
    }
    console.log('文件验证通过');
    return true;
  };

  return (
    <div className="form-section">
      <Form
        form={form}
        layout="vertical"
        initialValues={resumeData.personalInfo}
        onValuesChange={(changedValues) => {
          Object.keys(changedValues).forEach(key => {
            updatePersonalInfo(key, changedValues[key]);
          });
        }}
      >
        <Form.Item
          label="头像"
        >
          {resumeData.personalInfo?.avatarUrl ? (
            <div style={{ textAlign: 'center' }}>
              <img 
                src={resumeData.personalInfo.avatarUrl} 
                alt="头像" 
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '8px', 
                  objectFit: 'cover',
                  border: '2px solid #d9d9d9'
                }} 
              />
              <div style={{ marginTop: '8px' }}>
                <Button 
                  type="link" 
                  onClick={() => updatePersonalInfo('avatarUrl', '')}
                  danger
                >
                  删除头像
                </Button>
              </div>
            </div>
          ) : (
            <Upload
              listType="picture-card"
              maxCount={1}
              customRequest={customRequest}
              beforeUpload={beforeUpload}
              onChange={handleUpload}
            >
              <Button icon={<PlusOutlined />}>上传头像</Button>
            </Upload>
          )}
        </Form.Item>

        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { validator: (_, value) => validators.isEmail(value) ? Promise.resolve() : Promise.reject('邮箱格式不正确') }
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          label="电话"
          name="phone"
          rules={[
            { required: true, message: '请输入电话' },
            { validator: (_, value) => validators.isPhone(value) ? Promise.resolve() : Promise.reject('手机号格式不正确') }
          ]}
        >
          <Input placeholder="请输入电话" />
        </Form.Item>

        <Form.Item
          label="地址"
          name="address"
        >
          <Input placeholder="请输入地址" />
        </Form.Item>

        <Form.Item
          label="个人简介"
          name="summary"
        >
          <Input.TextArea rows={4} placeholder="请输入个人简介" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;