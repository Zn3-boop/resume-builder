import React, { useRef } from 'react';
import { Layout, Tabs, Button, Space, message } from 'antd';
import { DownloadOutlined, SaveOutlined, ReloadOutlined, PrinterOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { useResume } from '../context/ResumeContext';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import WorkExperienceForm from '../components/forms/WorkExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import ProjectForm from '../components/forms/ProjectForm';
import SkillForm from '../components/forms/SkillForm';
import ResumePreview from '../components/preview/ResumePreview';
import TemplateSelector from '../components/ui/TemplateSelector';
import './ResumeEditor.css';

const { Header, Content, Sider } = Layout;

/**
 * 简历编辑器主页面
 * 包含编辑区和预览区
 */
const ResumeEditor = () => {
  const { resumeData, isExporting, exportPDF, togglePreviewMode, isPreviewMode, resetResume } = useResume();
  const previewRef = useRef(null);

  // 模板选项
  const templates = [
    { id: 'simple', name: '简约风格' },
    { id: 'professional', name: '专业风格' },
    { id: 'creative', name: '创意风格' }
  ];

  // 导出PDF
  const handleExportPDF = async () => {
    const result = await exportPDF(previewRef);
    if (result.success) {
      message.success('PDF导出成功');
    } else {
      message.error('PDF导出失败');
    }
  };

  // 打印
  const handlePrint = () => {
    window.print();
  };

  // 保存草稿
  const handleSave = () => {
    message.success('草稿已保存');
  };

  // 重置
  const handleReset = () => {
    resetResume();
  };

  return (
    <Layout className="resume-editor">
      {/* 顶部工具栏 */}
      <Header className="editor-header">
        <div className="header-left">
          <h1 className="logo">简历生成器</h1>
          <TemplateSelector templates={templates} />
        </div>
        <div className="header-right">
          <Space>
            <Button icon={<EditOutlined />} onClick={togglePreviewMode}>
              {isPreviewMode ? '编辑' : '预览'}
            </Button>
            <Button icon={<SaveOutlined />} onClick={handleSave}>
              保存
            </Button>
            <Button icon={<PrinterOutlined />} onClick={handlePrint}>
              打印
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              loading={isExporting}
              onClick={handleExportPDF}
            >
              导出PDF
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              重置
            </Button>
          </Space>
        </div>
      </Header>

      <Layout>
        {/* 左侧编辑区 */}
        {!isPreviewMode && (
          <Sider width={400} className="editor-sider">
            <Tabs
              defaultActiveKey="personal"
              items={[
                {
                  key: 'personal',
                  label: '基本信息',
                  children: <PersonalInfoForm />
                },
                {
                  key: 'work',
                  label: '工作经历',
                  children: <WorkExperienceForm />
                },
                {
                  key: 'education',
                  label: '教育背景',
                  children: <EducationForm />
                },
                {
                  key: 'projects',
                  label: '项目经历',
                  children: <ProjectForm />
                },
                {
                  key: 'skills',
                  label: '技能',
                  children: <SkillForm />
                }
              ]}
            />
          </Sider>
        )}

        {/* 右侧预览区 */}
        <Content className="editor-content">
          <div ref={previewRef} className="resume-preview-container">
            <ResumePreview resumeData={resumeData} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ResumeEditor;
