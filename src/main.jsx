import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { router } from './router';
import { ResumeProvider } from './context/ResumeContext';
import './index.css';

/**
 * Ant Design 主题配置
 */
const theme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 4,
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN} theme={theme}>
      <ResumeProvider>
        <RouterProvider router={router} />
      </ResumeProvider>
    </ConfigProvider>
  </React.StrictMode>
);
