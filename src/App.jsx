import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { ResumeProvider } from './context/ResumeContext';
import ResumeEditor from './pages/ResumeEditor/ResumeEditor';
import './App.css';

/**
 * 应用主组件
 * 包含路由配置和全局设置
 */
function App() {
  return (
    <ConfigProvider 
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 4,
        },
      }}
    >
      <AntApp>
        <ResumeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<ResumeEditor />} />
              <Route path="/template/:templateId" element={<ResumeEditor />} />
            </Routes>
          </Router>
        </ResumeProvider>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
