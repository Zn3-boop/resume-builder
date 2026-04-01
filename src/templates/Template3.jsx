
import React from 'react';
import './Template3.css';

const Template3 = ({ data, style = {} }) => {
  const containerStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
    backgroundColor: '#fafafa',
    color: '#333',
    display: 'flex',
    minHeight: '100vh',
    ...style,
  };

  const sidebarStyle = {
    width: '300px',
    background: 'linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
    padding: '40px 24px',
  };

  const photoStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: 'white',
    overflow: 'hidden',
    margin: '0 auto 24px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  };

  const nameStyle = {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 12px 0',
    textAlign: 'center',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const titleStyle = {
    fontSize: '16px',
    fontWeight: '500',
    margin: '0 0 24px 0',
    textAlign: 'center',
    opacity: 0.95,
  };

  const sectionStyle = {
    marginBottom: '32px',
  };

  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 16px 0',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const contactItemStyle = {
    marginBottom: '12px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const mainContentStyle = {
    flex: 1,
    padding: '40px 60px',
    maxWidth: '900px',
  };

  const mainSectionTitleStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#4facfe',
    margin: '0 0 24px 0',
    paddingBottom: '12px',
    borderBottom: '3px solid #4facfe',
  };

  const itemStyle = {
    marginBottom: '24px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
  };

  const itemTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: '#333',
  };

  const itemSubtitleStyle = {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 12px 0',
  };

  const itemDescStyle = {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#666',
    margin: '0',
  };

  const skillTagStyle = {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    margin: '0 8px 8px 0',
    fontSize: '13px',
  };

  return (
    <div style={containerStyle}>
      {/* 侧边栏 */}
      <div style={sidebarStyle}>
        {data.personalInfo?.avatarUrl && (
          <div style={photoStyle}>
            <img
              src={data.personalInfo.avatarUrl}
              alt="照片"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <h1 style={nameStyle}>{data.personalInfo?.name || '姓名'}</h1>
        <p style={titleStyle}>{data.personalInfo?.title || '职位名称'}</p>

        {/* 联系方式 */}
        {data.personalInfo && (
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>联系方式</h3>
            {data.personalInfo?.phone && (
              <div style={contactItemStyle}>
                <span>📞</span>
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo?.email && (
              <div style={contactItemStyle}>
                <span>✉️</span>
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo?.location && (
              <div style={contactItemStyle}>
                <span>📍</span>
                <span>{data.personalInfo.location}</span>
              </div>
            )}
          </div>
        )}

        {/* 技能 */}
        {data.skills && data.skills.length > 0 && (
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>技能特长</h3>
            <div>
              {data.skills.map((skill, index) => (
                <span key={index} style={skillTagStyle}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 兴趣爱好 */}
        {data.hobbies && data.hobbies.length > 0 && (
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>兴趣爱好</h3>
            <div>
              {data.hobbies.map((hobby, index) => (
                <span key={index} style={skillTagStyle}>
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 主内容区 */}
      <div style={mainContentStyle}>
        {/* 个人简介 */}
        {data.personalInfo?.summary && (
          <div>
            <h2 style={mainSectionTitleStyle}>个人简介</h2>
            <div style={itemStyle}>
              <p style={itemDescStyle}>{data.personalInfo.summary}</p>
            </div>
          </div>
        )}

        {/* 教育经历 */}
        {data.education && data.education.length > 0 && (
          <div>
            <h2 style={mainSectionTitleStyle}>教育经历</h2>
            {data.education.map((item, index) => (
              <div key={index} style={itemStyle}>
                <h3 style={itemTitleStyle}>{item.school}</h3>
                <p style={itemSubtitleStyle}>
                  {item.major} | {item.degree} | {item.period}
                </p>
                <p style={itemDescStyle}>{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* 工作经历 */}
        {data.workExperience && data.workExperience.length > 0 && (
          <div>
            <h2 style={mainSectionTitleStyle}>工作经历</h2>
            {data.workExperience.map((item, index) => (
              <div key={index} style={itemStyle}>
                <h3 style={itemTitleStyle}>{item.company}</h3>
                <p style={itemSubtitleStyle}>
                  {item.position} | {item.period}
                </p>
                <p style={itemDescStyle}>{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* 项目经验 */}
        {data.projects && data.projects.length > 0 && (
          <div>
            <h2 style={mainSectionTitleStyle}>项目经验</h2>
            {data.projects.map((item, index) => (
              <div key={index} style={itemStyle}>
                <h3 style={itemTitleStyle}>{item.name}</h3>
                <p style={itemSubtitleStyle}>
                  {item.role} | {item.period}
                </p>
                <p style={itemDescStyle}>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template3;