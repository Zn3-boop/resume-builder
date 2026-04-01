/**
 * 个人信息类型
 */
export interface PersonalInfo {
  name: string;           // 姓名
  email: string;          // 邮箱
  phone: string;          // 电话
  address: string;        // 地址
  avatarUrl: string;      // 头像URL
  summary: string;        // 个人简介
}

/**
 * 工作经历类型
 */
export interface WorkExperience {
  id: number;
  company: string;        // 公司名称
  position: string;       // 职位
  startDate: string;      // 开始时间
  endDate: string;        // 结束时间
  description: string;    // 工作描述
}

/**
 * 教育背景类型
 */
export interface Education {
  id: number;
  school: string;         // 学校名称
  major: string;          // 专业
  degree: string;         // 学历
  startDate: string;      // 开始时间
  endDate: string;        // 结束时间
}

/**
 * 项目经历类型
 */
export interface Project {
  id: number;
  name: string;           // 项目名称
  role: string;           // 角色
  techStack: string;      // 技术栈
  description: string;    // 项目描述
  link: string;           // 项目链接
}

/**
 * 技能类型
 */
export interface Skill {
  id: number;
  name: string;           // 技能名称
  level: '入门' | '熟练' | '精通';  // 熟练度
}

/**
 * 完整简历数据类型
 */
export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
}

/**
 * 服务响应类型
 */
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: any;
}
