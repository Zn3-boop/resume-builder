
import React from 'react';
import { Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const PersonalInfoForm = ({ data, onChange }) => {
  const [form] = Form.useForm();

  // 自定义上传处理（本地预览）
  const customRequest = (options) => {
    const { file, onSuccess, onError } = options;
    
    console.log('=== 照片上传开始 ===');
    console.log('上传文件信息:', file);
    console.log('文件类型:', file.type);
    console.log('文件大小:', file.size);
    console.log('onSuccess函数:', onSuccess);
    console.log('onError函数:', onError);

    try {
      // 验证文件类型
      console.log('开始验证文件类型...');
      const isImage = file.type.startsWith('image/');
      console.log('是否为图片:', isImage);
      if (!isImage) {
        throw new Error('只能上传图片文件！');
      }

      // 验证文件大小（5MB）
      console.log('开始验证文件大小...');
      const isLt5M = file.size / 1024 / 1024 < 5;
      console.log('文件大小是否小于5MB:', isLt5M);
      if (!isLt5M) {
        throw new Error('图片大小不能超过 5MB！');
      }

      // 生成预览URL
      console.log('开始生成预览URL...');
      const previewUrl = URL.createObjectURL(file);
      console.log('预览URL:', previewUrl);

      console.log('准备调用onChange更新数据...');
      onChange({ ...data, avatarUrl: previewUrl });
      console.log('onChange调用完成');

      // 确保onSuccess被调用以结束上传状态
      console.log('准备调用onSuccess...');
      if (typeof onSuccess === 'function') {
        console.log('onSuccess是函数，正在调用...');
        onSuccess('ok');
        console.log('onSuccess调用完成');
      } else {
        console.error('onSuccess不是函数:', onSuccess);
      }

      message.success('照片上传成功！');
      console.log('=== 照片上传成功 ===');
    } catch (error) {
      console.error('照片上传出错:', error);
      if (typeof onError === 'function') {
        console.log('准备调用onError...');
        onError(error);
        console.log('onError调用完成');
      } else {
        console.error('onError不是函数:', onError);
      }
      message.error(error.message);
    }
  };

  // 删除照片
  const handleDeletePhoto = () => {
    onChange({ ...data, avatarUrl: null });
    message.success('照片已删除');
  };

  // 上传前的验证
  const beforeUpload = (file) => {
    console.log('=== beforeUpload 被调用 ===');
    console.log('文件信息:', file);
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件！');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片大小不能超过 5MB！');
      return false;
    }
    console.log('文件验证通过，允许上传');
    return true;
  };

  const handleValuesChange = (changedValues) => {
    onChange({
      ...data,
      ...changedValues,
    });
  };

  const uploadButtonStyle = {
    width: '100%',
    height: '120px',
    border: '2px dashed #d9d9d9',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#fafafa',
  };

  const photoPreviewStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#333' }}>
          个人信息
        </h3>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={data}
        onValuesChange={handleValuesChange}
      >
        <Form.Item label="照片">
          {data.avatarUrl ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={photoPreviewStyle}>
                <img
                  src={data.avatarUrl}
                  alt="照片"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Upload
                  showUploadList={false}
                  customRequest={customRequest}
                  beforeUpload={beforeUpload}
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>更换照片</Button>
                </Upload>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeletePhoto}
                >
                  删除照片
                </Button>
              </div>
            </div>
          ) : (
            <Upload
              showUploadList={false}
              customRequest={customRequest}
              beforeUpload={beforeUpload}
              accept="image/*"
            >
              <div style={uploadButtonStyle}>
                <UploadOutlined style={{ fontSize: '32px', color: '#999' }} />
                <p style={{ margin: '8px 0 0 0', color: '#999' }}>点击上传照片</p>
              </div>
            </Upload>
          )}
        </Form.Item>

        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" size="large" />
        </Form.Item>

        <Form.Item
          label="职位名称"
          name="title"
          rules={[{ required: true, message: '请输入职位名称' }]}
        >
          <Input placeholder="请输入职位名称" size="large" />
        </Form.Item>

        <Form.Item
          label="手机号码"
          name="phone"
          rules={[{ required: true, message: '请输入手机号码' }]}
        >
          <Input placeholder="请输入手机号码" size="large" />
        </Form.Item>

        <Form.Item
          label="邮箱地址"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱地址' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Input placeholder="请输入邮箱地址" size="large" />
        </Form.Item>

        <Form.Item label="居住地" name="location">
          <Input placeholder="请输入居住地" size="large" />
        </Form.Item>

        <Form.Item label="个人简介" name="summary">
          <Input.TextArea
            placeholder="请输入个人简介"
            rows={6}
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;