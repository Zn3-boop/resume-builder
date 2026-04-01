
import React from 'react';
import './Template1.css';

const Template1 = ({ data, style = {} }) => {
  // 调试信息
  console.log('Template1 接收到的数据:', data);
  console.log('个人信息数据:', data.personalInfo);
  
  const containerStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
    backgroundColor: '#fafafa',
    color: '#333',
    ...style,
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
    padding: '40px 60px',
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  };

  const photoStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '8px',
    backgroundColor: 'white',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  };

  const nameStyle = {
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '500',
    margin: '0 0 16px 0',
    opacity: 0.95,
  };

  const contactStyle = {
    fontSize: '14px',
    opacity: 0.9,
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const bodyStyle = {
    padding: '40px 60px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#4facfe',
    margin: '32px 0 20px 0',
    paddingBottom: '8px',
    borderBottom: '2px solid #4facfe',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const sectionTitleIconStyle = {
    width: '24px',
    height: '24px',
    backgroundColor: '#4facfe',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '14px',
  };

  const itemStyle = {
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
  };

  const itemTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 8px 0',
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

  return (
    <div style={containerStyle}>
      {/* 头部 */}
      <div style={headerStyle}>
        {data.personalInfo?.avatarUrl && (
          <div style={photoStyle}>
            <img
              src={data.personalInfo.avatarUrl}
              alt="照片"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <div>
          <h1 style={nameStyle}>{data.personalInfo?.name || '姓名'}</h1>
          <p style={titleStyle}>{data.personalInfo?.title || '职位名称'}</p>
          <div style={contactStyle}>
            {data.personalInfo?.phone && data.personalInfo.phone.trim() ? (
              <div style={contactItemStyle}>
                <span>📞</span>
                <span>{data.personalInfo.phone}</span>
              </div>
            ) : null}
            {data.personalInfo?.email && data.personalInfo.email.trim() ? (
              <div style={contactItemStyle}>
                <span>✉️</span>
                <span>{data.personalInfo.email}</span>
              </div>
            ) : null}
            {data.personalInfo?.location && data.personalInfo.location.trim() ? (
              <div style={contactItemStyle}>
                <span>📍</span>
                <span>{data.personalInfo.location}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* 主体 */}
      <div style={bodyStyle}>
        {/* 教育经历 */}
        {data.education && data.education.length > 0 && (
          <div>
            <h2 style={sectionTitleStyle}>
              <span style={sectionTitleIconStyle}>🎓</span>
              教育经历
            </h2>
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
            <h2 style={sectionTitleStyle}>
              <span style={sectionTitleIconStyle}>💼</span>
              工作经历
            </h2>
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
            <h2 style={sectionTitleStyle}>
              <span style={sectionTitleIconStyle}>🚀</span>
              项目经验
            </h2>
            {data.projects.map((item, index) => (
              <div key={index} style={itemStyle}>
                <h3 style={itemTitleStyle}>{item.name}</h3>
                <p style={itemSubtitleStyle}>{item.role} | {item.period}</p>
                <p style={itemDescStyle}>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template1;