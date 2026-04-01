
import React from 'react';
import './Template4.css';

const Template4 = ({ data, style = {} }) => {
  const containerStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
    backgroundColor: '#fafafa',
    color: '#333',
    ...style,
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '40px 60px',
    position: 'relative',
    overflow: 'hidden',
  };

  const waveStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '60px',
    background: 'url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23fafafa' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom',
    backgroundSize: 'cover',
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
  };

  const nameStyle = {
    fontSize: '40px',
    fontWeight: '700',
    margin: '0 0 12px 0',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '500',
    margin: '0 0 24px 0',
    opacity: 0.95,
  };

  const contactStyle = {
    fontSize: '15px',
    opacity: 0.9,
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  };

  const bodyStyle = {
    padding: '60px',
    maxWidth: '900px',
    margin: '0 auto',
  };

  const sectionStyle = {
    marginBottom: '48px',
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  };

  const sectionIconStyle = {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '18px',
  };

  const sectionTitleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#333',
    margin: 0,
  };

  const itemStyle = {
    marginBottom: '24px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    borderLeft: '4px solid #667eea',
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

  const skillBarContainerStyle = {
    marginBottom: '16px',
  };

  const skillBarLabelStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
  };

  const skillBarStyle = {
    height: '8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    overflow: 'hidden',
  };

  const skillBarFillStyle = (level) => ({
    height: '100%',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '4px',
    width: `${level}%`,
    transition: 'width 0.3s ease',
  });

  return (
    <div style={containerStyle}>
      {/* 头部 */}
      <div style={headerStyle}>
        <div style={waveStyle}></div>
        <div style={contentStyle}>
          <h1 style={nameStyle}>{data.personalInfo?.name || '姓名'}</h1>
          <p style={titleStyle}>{data.personalInfo?.title || '职位名称'}</p>
          <div style={contactStyle}>
            {data.personalInfo?.phone && (
              <span>📞 {data.personalInfo.phone}</span>
            )}
            {data.personalInfo?.email && (
              <span>✉️ {data.personalInfo.email}</span>
            )}
            {data.personalInfo?.location && (
              <span>📍 {data.personalInfo.location}</span>
            )}
          </div>
        </div>
      </div>

      {/* 主体 */}
      <div style={bodyStyle}>
        {/* 个人简介 */}
        {data.personalInfo?.summary && (
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={sectionIconStyle}>👤</div>
              <h2 style={sectionTitleStyle}>个人简介</h2>
            </div>
            <div style={itemStyle}>
              <p style={itemDescStyle}>{data.personalInfo.summary}</p>
            </div>
          </div>
        )}

        {/* 技能 */}
        {data.skills && data.skills.length > 0 && (
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={sectionIconStyle}>💪</div>
              <h2 style={sectionTitleStyle}>技能特长</h2>
            </div>
            <div>
              {data.skills.map((skill, index) => (
                <div key={index} style={skillBarContainerStyle}>
                  <div style={skillBarLabelStyle}>
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div style={skillBarStyle}>
                    <div style={skillBarFillStyle(skill.level)}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 教育经历 */}
        {data.education && data.education.length > 0 && (
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={sectionIconStyle}>🎓</div>
              <h2 style={sectionTitleStyle}>教育经历</h2>
            </div>
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
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={sectionIconStyle}>💼</div>
              <h2 style={sectionTitleStyle}>工作经历</h2>
            </div>
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
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={sectionIconStyle}>🚀</div>
              <h2 style={sectionTitleStyle}>项目经验</h2>
            </div>
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

export default Template4;