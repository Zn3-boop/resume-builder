
import React, { useState } from 'react';
import { Layout, Tabs, Button, App, Modal } from 'antd';
import { SaveOutlined, DownloadOutlined, EyeOutlined, FileAddOutlined } from '@ant-design/icons';
import PersonalInfoForm from '../../components/ResumeEditor/PersonalInfoForm';
import EducationForm from '../../components/ResumeEditor/EducationForm';
import WorkExperienceForm from '../../components/ResumeEditor/WorkExperienceForm';
import ProjectForm from '../../components/ResumeEditor/ProjectForm';
import SkillsForm from '../../components/ResumeEditor/SkillsForm';
import ResumePreview from '../../components/ResumeEditor/ResumePreview';
import { exportResumeToPDF, saveResumeToStorage, loadResumeFromStorage } from '../../utils/resumeExport';

const { message } = App.useApp();

const { Sider, Content } = Layout;

const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      title: '',
      phone: '',
      email: '',
      location: '',
      avatarUrl: '',
      summary: '',
    },
    education: [],
    workExperience: [],
    projects: [],
    skills: [],
    hobbies: [],
  });

  const [activeTemplate, setActiveTemplate] = useState('template1');
  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    saveResumeToStorage(resumeData, 'resume-data', message);
  };

  const handleExport = () => {
    exportResumeToPDF(resumeData, activeTemplate, message);
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  const handleNew = () => {
    Modal.confirm({
      title: '确认新建',
      content: '新建简历将清空当前编辑内容，确定继续吗？',
      onOk: () => {
        setResumeData({
          personalInfo: {
            name: '',
            title: '',
            phone: '',
            email: '',
            location: '',
            avatarUrl: '',
            summary: '',
          },
          education: [],
          workExperience: [],
          projects: [],
          skills: [],
          hobbies: [],
        });
        message.success('已创建新简历');
      },
    });
  };

  const layoutStyle = {
    minHeight: '100vh',
  };

  const headerStyle = {
    height: '64px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    borderBottom: '1px solid #e0e0e0',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(245, 87, 108, 0.4)',
  };

  const outlineButtonStyle = {
    ...buttonStyle,
    background: 'white',
    color: '#667eea',
    border: '1px solid #667eea',
    boxShadow: 'none',
  };

  const siderStyle = {
    width: '480px',
    backgroundColor: '#f5f5f5',
    borderRight: '1px solid #e0e0e0',
    overflowY: 'auto',
  };

  const contentStyle = {
    flex: 1,
    backgroundColor: '#fafafa',
    overflowY: 'auto',
    padding: '24px',
  };

  const tabsStyle = {
    marginBottom: '24px',
  };

  const tabPaneStyle = {
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  };

  return (
    <Layout style={layoutStyle}>
      {/* 头部 */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>简历编辑器</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            style={outlineButtonStyle}
            onClick={handleNew}
            icon={<FileAddOutlined />}
          >
            新建
          </Button>
          <Button
            style={primaryButtonStyle}
            onClick={handleSave}
            icon={<SaveOutlined />}
          >
            保存
          </Button>
          <Button
            style={secondaryButtonStyle}
            onClick={handleExport}
            icon={<DownloadOutlined />}
          >
            导出
          </Button>
          <Button
            style={outlineButtonStyle}
            onClick={handlePreview}
            icon={<EyeOutlined />}
          >
            {previewMode ? '编辑' : '预览'}
          </Button>
        </div>
      </div>

      {/* 主体 */}
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        {/* 左侧编辑区 */}
        {!previewMode && (
          <Sider style={siderStyle}>
            <div style={{ padding: '24px' }}>
              <Tabs
                defaultActiveKey="personal"
                style={tabsStyle}
                items={[
                  {
                    key: 'personal',
                    label: '个人信息',
                    children: (
                      <div style={tabPaneStyle}>
                        <PersonalInfoForm
                          data={resumeData.personalInfo}
                          onChange={(personalInfo) =>
                            setResumeData({ 
                              ...resumeData, 
                              personalInfo: { ...resumeData.personalInfo, ...personalInfo }
                            })
                          }
                        />
                      </div>
                    ),
                  },
                  {
                    key: 'education',
                    label: '教育经历',
                    children: (
                      <div style={tabPaneStyle}>
                        <EducationForm
                          data={resumeData.education}
                          onChange={(education) =>
                            setResumeData({ ...resumeData, education })
                          }
                        />
                      </div>
                    ),
                  },
                  {
                    key: 'work',
                    label: '工作经历',
                    children: (
                      <div style={tabPaneStyle}>
                        <WorkExperienceForm
                          data={resumeData.workExperience}
                          onChange={(workExperience) =>
                            setResumeData({ ...resumeData, workExperience })
                          }
                        />
                      </div>
                    ),
                  },
                  {
                    key: 'project',
                    label: '项目经验',
                    children: (
                      <div style={tabPaneStyle}>
                        <ProjectForm
                          data={resumeData.projects}
                          onChange={(projects) =>
                            setResumeData({ ...resumeData, projects })
                          }
                        />
                      </div>
                    ),
                  },
                  {
                    key: 'skills',
                    label: '技能爱好',
                    children: (
                      <div style={tabPaneStyle}>
                        <SkillsForm
                          skills={resumeData.skills}
                          hobbies={resumeData.hobbies}
                          onChange={(skills, hobbies) =>
                            setResumeData({ ...resumeData, skills, hobbies })
                          }
                        />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </Sider>
        )}

        {/* 右侧预览区 */}
        <Content style={contentStyle}>
          {previewMode ? (
            <ResumePreview
              data={resumeData}
              template={activeTemplate}
              onTemplateChange={setActiveTemplate}
            />
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: '#999',
              fontSize: '16px'
            }}>
              点击"预览"按钮查看简历效果
            </div>
          )}
        </Content>
      </div>
    </Layout>
  );
};

export default ResumeEditor;