
import React from 'react';
import './Template2.css';

const Template2 = ({ data, style = {} }) => {
  const containerStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
    backgroundColor: '#fafafa',
    color: '#333',
    ...style,
  };

  const headerStyle = {
    background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '40px 60px',
    textAlign: 'center',
  };

  const nameStyle = {
    fontSize: '36px',
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
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  };

  const bodyStyle = {
    padding: '40px 60px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const sectionStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#667eea',
    margin: '0 0 20px 0',
    paddingBottom: '12px',
    borderBottom: '2px solid #667eea',
  };

  const itemStyle = {
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f0f0f0',
  };

  const itemStyleLast = {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottom: 'none',
  };

  const itemTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 6px 0',
    color: '#333',
  };

  const itemSubtitleStyle = {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 8px 0',
  };

  const itemDescStyle = {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#666',
    margin: '0',
  };

  const getItemStyle = (index, total) => {
    return index === total - 1 ? itemStyleLast : itemStyle;
  };

  return (
    <div style={containerStyle}>
      {/* 头部 */}
      <div style={headerStyle}>
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

      {/* 主体 */}
      <div style={bodyStyle}>
        {/* 个人简介 */}
        {data.personalInfo?.summary && (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>个人简介</h2>
            <p style={itemDescStyle}>{data.personalInfo.summary}</p>
          </div>
        )}

        {/* 教育经历 */}
        {data.education && data.education.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>教育经历</h2>
            {data.education.map((item, index) => (
              <div
                key={index}
                style={getItemStyle(index, data.education.length)}
              >
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
            <h2 style={sectionTitleStyle}>工作经历</h2>
            {data.workExperience.map((item, index) => (
              <div
                key={index}
                style={getItemStyle(index, data.workExperience.length)}
              >
                <h3 style={itemTitleStyle}>{item.company}</h3>
                <p style={itemSubtitleStyle}>
                  {item.position} | {item.period}
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

export default Template2;