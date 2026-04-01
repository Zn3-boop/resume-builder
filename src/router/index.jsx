import { createBrowserRouter } from 'react-router-dom';
import ResumeEditor from '../pages/ResumeEditor';

/**
 * 路由配置
 * 定义应用的所有路由
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <ResumeEditor />
  }
]);
