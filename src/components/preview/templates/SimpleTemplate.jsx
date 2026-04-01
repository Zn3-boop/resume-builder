import React from 'react';
import './SimpleTemplate.css';

/**
 * 简约风格简历模板
 */
const SimpleTemplate = ({ data }) => {
  const { personalInfo, workExperience, education, projects, skills } = data;

  return (
    <div className="resume-template simple-template">
      {/* 头部 */}
      <header className="template-header">
        {personalInfo.avatarUrl && (
          <div className="avatar-container">
            <img src={personalInfo.avatarUrl} alt="头像" className="avatar" />
          </div>
        )}
        <h1 className="name">{personalInfo.name || '姓名'}</h1>
        <div className="contact-info">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.address}</span>
        </div>
        {personalInfo.summary && <p className="summary">{personalInfo.summary}</p>}
      </header>

      {/* 工作经历 */}
      {workExperience.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">工作经历</h2>
          {workExperience.map((item) => (
            <div key={item.id} className="experience-item">
              <div className="item-header">
                <h3>{item.company}</h3>
                <span className="date">
                  {item.startDate} - {item.endDate || '至今'}
                </span>
              </div>
              <p className="position">{item.position}</p>
              {item.description && <p className="description">{item.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* 教育背景 */}
      {education.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">教育背景</h2>
          {education.map((item) => (
            <div key={item.id} className="education-item">
              <div className="item-header">
                <h3>{item.school}</h3>
                <span className="date">
                  {item.startDate} - {item.endDate || '至今'}
                </span>
              </div>
              <p className="major">{item.major} · {item.degree}</p>
            </div>
          ))}
        </section>
      )}

      {/* 项目经历 */}
      {projects.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">项目经历</h2>
          {projects.map((item) => (
            <div key={item.id} className="project-item">
              <h3>{item.name}</h3>
              <p className="role">{item.role}</p>
              <p className="tech-stack">技术栈：{item.techStack}</p>
              {item.description && <p className="description">{item.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* 技能 */}
      {skills.length > 0 && (
        <section className="template-section">
          <h2 className="section-title">技能</h2>
          <div className="skills-list">
            {skills.map((item) => (
              <span key={item.id} className="skill-tag">
                {item.name} ({item.level})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SimpleTemplate;
