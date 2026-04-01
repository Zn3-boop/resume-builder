import React, { memo } from 'react';
import './CreativeTemplate.css';

/**
 * 创意风格简历模板
 * 采用现代设计风格，包含彩色标签和视觉元素
 * 使用React.memo进行性能优化
 */
const CreativeTemplate = memo(({ data }) => {
  const { personalInfo, workExperience, education, projects, skills } = data;

  return (
    <div className="resume-template creative-template">
      {/* 顶部彩色头部 */}
      <header className="template-header">
        <div className="header-content">
          <div className="profile-info">
            {personalInfo.avatarUrl && (
              <div className="avatar-wrapper">
                <img src={personalInfo.avatarUrl} alt="头像" className="avatar" />
              </div>
            )}
            <div className="info-content">
              <h1 className="name">{personalInfo.name || '姓名'}</h1>
              <div className="contact-details">
                {personalInfo.email && (
                  <div className="contact-item">
                    <span className="icon">✉</span>
                    <span className="text">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="contact-item">
                    <span className="icon">📱</span>
                    <span className="text">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.address && (
                  <div className="contact-item">
                    <span className="icon">📍</span>
                    <span className="text">{personalInfo.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 个人简介 */}
      {personalInfo.summary && (
        <section className="summary-section">
          <h2 className="section-title">关于我</h2>
          <p className="summary">{personalInfo.summary}</p>
        </section>
      )}

      {/* 技能 */}
      {skills.length > 0 && (
        <section className="skills-section">
          <h2 className="section-title">技能专长</h2>
          <div className="skills-container">
            {skills.map((item) => (
              <div key={item.id} className="skill-card">
                <div className="skill-name">{item.name}</div>
                <div className="skill-level">
                  <div className="level-bar">
                    <div 
                      className="level-fill" 
                      style={{ 
                        width: item.level === '精通' ? '100%' : 
                               item.level === '熟练' ? '70%' : '40%' 
                      }}
                    />
                  </div>
                  <span className="level-text">{item.level}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 工作经历 */}
      {workExperience.length > 0 && (
        <section className="experience-section">
          <h2 className="section-title">工作经历</h2>
          <div className="timeline">
            {workExperience.map((item, index) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <div className="item-header">
                    <h3 className="company">{item.company}</h3>
                    <span className="date">
                      {item.startDate} - {item.endDate || '至今'}
                    </span>
                  </div>
                  <p className="position">{item.position}</p>
                  {item.description && (
                    <p className="description">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 项目经历 */}
      {projects.length > 0 && (
        <section className="projects-section">
          <h2 className="section-title">项目经历</h2>
          <div className="projects-grid">
            {projects.map((item) => (
              <div key={item.id} className="project-card">
                <h3 className="project-name">{item.name}</h3>
                <p className="project-role">{item.role}</p>
                {item.techStack && (
                  <div className="tech-stack">
                    {item.techStack.split(/[,，]/).map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                {item.description && (
                  <p className="description">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 教育背景 */}
      {education.length > 0 && (
        <section className="education-section">
          <h2 className="section-title">教育背景</h2>
          <div className="education-list">
            {education.map((item) => (
              <div key={item.id} className="education-card">
                <div className="school-info">
                  <h3 className="school">{item.school}</h3>
                  <span className="date">
                    {item.startDate} - {item.endDate || '至今'}
                  </span>
                </div>
                <div className="education-details">
                  <p className="major">{item.major}</p>
                  <p className="degree">{item.degree}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

export default CreativeTemplate;
