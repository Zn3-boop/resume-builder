import React, { memo } from 'react';
import './ProfessionalTemplate.css';

/**
 * 专业风格简历模板
 * 采用左右分栏布局，左侧为个人信息和技能，右侧为工作经历和项目
 * 使用React.memo进行性能优化
 */
const ProfessionalTemplate = memo(({ data }) => {
  const { personalInfo, workExperience, education, projects, skills } = data;

  return (
    <div className="resume-template professional-template">
      {/* 左侧栏 */}
      <div className="left-column">
        {/* 头像和基本信息 */}
        <div className="profile-section">
          {personalInfo.avatarUrl && (
            <div className="avatar-container">
              <img src={personalInfo.avatarUrl} alt="头像" className="avatar" />
            </div>
          )}

          <h1 className="name">{personalInfo.name || '姓名'}</h1>

          <div className="contact-info">
            {personalInfo.email && (
              <div className="contact-item">
                <span className="label">邮箱：</span>
                <span className="value">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="contact-item">
                <span className="label">电话：</span>
                <span className="value">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="contact-item">
                <span className="label">地址：</span>
                <span className="value">{personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* 技能 */}
        {skills.length > 0 && (
          <div className="skills-section">
            <h2 className="section-title">专业技能</h2>
            <div className="skills-list">
              {skills.map((item) => (
                <div key={item.id} className="skill-item">
                  <div className="skill-name">{item.name}</div>
                  <div className="skill-level">{item.level}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 教育背景 */}
        {education.length > 0 && (
          <div className="education-section">
            <h2 className="section-title">教育背景</h2>
            {education.map((item) => (
              <div key={item.id} className="education-item">
                <div className="school">{item.school}</div>
                <div className="major">{item.major}</div>
                <div className="degree">{item.degree}</div>
                <div className="date">
                  {item.startDate} - {item.endDate || '至今'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 右侧栏 */}
      <div className="right-column">
        {/* 个人简介 */}
        {personalInfo.summary && (
          <div className="summary-section">
            <h2 className="section-title">个人简介</h2>
            <p className="summary">{personalInfo.summary}</p>
          </div>
        )}

        {/* 工作经历 */}
        {workExperience.length > 0 && (
          <div className="experience-section">
            <h2 className="section-title">工作经历</h2>
            {workExperience.map((item) => (
              <div key={item.id} className="experience-item">
                <div className="item-header">
                  <div className="company">{item.company}</div>
                  <div className="date">
                    {item.startDate} - {item.endDate || '至今'}
                  </div>
                </div>
                <div className="position">{item.position}</div>
                {item.description && (
                  <div className="description">{item.description}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 项目经历 */}
        {projects.length > 0 && (
          <div className="projects-section">
            <h2 className="section-title">项目经历</h2>
            {projects.map((item) => (
              <div key={item.id} className="project-item">
                <div className="project-name">{item.name}</div>
                <div className="project-role">{item.role}</div>
                {item.techStack && (
                  <div className="tech-stack">技术栈：{item.techStack}</div>
                )}
                {item.description && (
                  <div className="description">{item.description}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default ProfessionalTemplate;
