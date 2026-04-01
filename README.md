# 在线简历生成器

基于 React + Ant Design + html2canvas + jsPDF 的在线简历生成器。

## 技术栈

- React 18
- Vite
- Ant Design 5.x
- html2canvas
- jsPDF
- React Router 6

## 项目结构

```
src/
├── components/       # 通用组件
│   ├── ui/          # UI组件（表单、按钮等）
│   └── preview/     # 预览组件
├── pages/           # 页面组件
├── utils/           # 工具函数
│   ├── pdfExport.js # PDF导出工具
│   └── validators.js # 表单验证
├── services/        # API服务
├── context/         # Context状态管理
├── hooks/           # 自定义Hooks
└── types/           # TypeScript类型定义
```

## 功能特性

- ✅ 简历信息管理
  - 个人信息编辑
  - 工作经历管理
  - 教育背景管理
  - 项目经历管理
  - 技能管理

- ✅ 简历导出
  - PDF格式导出
  - 图片格式导出
  - JSON数据导出

- ✅ 数据管理
  - 本地存储
  - 数据导入
  - 数据导出

## 安装依赖

```bash
npm install
```

## 启动开发服务器

```bash
npm run dev
```

## 构建生产版本

```bash
npm run build
```

## 预览生产构建

```bash
npm run preview
```

## 数据结构

### 个人信息
```javascript
{
  name: '',           // 姓名
  email: '',          // 邮箱
  phone: '',          // 电话
  address: '',        // 地址
  avatarUrl: '',      // 头像URL
  summary: ''         // 个人简介
}
```

### 工作经历
```javascript
{
  id: 1,
  company: '',      // 公司名称
  position: '',     // 职位
  startDate: '',    // 开始时间
  endDate: '',      // 结束时间
  description: ''   // 工作描述
}
```

### 教育背景
```javascript
{
  id: 1,
  school: '',       // 学校名称
  major: '',        // 专业
  degree: '',       // 学历
  startDate: '',    // 开始时间
  endDate: ''       // 结束时间
}
```

### 项目经历
```javascript
{
  id: 1,
  name: '',         // 项目名称
  role: '',         // 角色
  techStack: '',    // 技术栈
  description: '',  // 项目描述
  link: ''          // 项目链接
}
```

### 技能
```javascript
{
  id: 1,
  name: '',         // 技能名称
  level: '入门'     // 熟练度：入门/熟练/精通
}
```

## 工具函数

### PDF导出工具 (src/utils/pdfExport.js)

```javascript
import { exportToPDF } from './utils/pdfExport';

// 导出为PDF
const result = await exportToPDF(element, 'resume.pdf');
```

### 表单验证工具 (src/utils/validators.js)

```javascript
import { validators } from './utils/validators';

// 验证邮箱
validators.isEmail('test@example.com');

// 验证手机号
validators.isPhone('13800138000');

// 必填验证
validators.isRequired('value');
```

### 简历数据服务 (src/services/resumeService.js)

```javascript
import { resumeService } from './services/resumeService';

// 获取简历数据
const data = resumeService.getResumeData();

// 保存简历数据
await resumeService.saveResumeData(data);

// 导出简历数据
await resumeService.exportResumeData(data);

// 导入简历数据
await resumeService.importResumeData(file);
```

## 开发说明

### 添加新页面

1. 在 `src/pages/` 目录下创建页面组件
2. 在 `src/router/index.jsx` 中添加路由配置

### 添加新组件

- UI组件放在 `src/components/ui/`
- 预览组件放在 `src/components/preview/`

### 使用Context

```javascript
import { useResume } from './context/ResumeContext';

const { resumeData, saveResume } = useResume();
```

## 许可证

MIT
