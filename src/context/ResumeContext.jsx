import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { resumeService } from '../services/resumeService';

/**
 * 简历上下文
 * 用于全局管理简历数据状态和业务逻辑
 */
const ResumeContext = createContext(null);

/**
 * 默认简历数据结构
 */
const defaultResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatarUrl: '',
    summary: ''
  },
  workExperience: [],
  education: [],
  projects: [],
  skills: []
};

/**
 * 简历上下文Provider组件
 * 提供简历数据的状态管理和业务逻辑方法
 */
export const ResumeProvider = ({ children }) => {
  // ==================== 简历数据状态 ====================
  const [resumeData, setResumeData] = useState(defaultResumeData);

  // ==================== UI状态 ====================
  const [selectedTemplate, setSelectedTemplate] = useState('simple');  // 当前选中的模板
  const [isPreviewMode, setIsPreviewMode] = useState(false);           // 是否为预览模式
  const [isExporting, setIsExporting] = useState(false);               // 是否正在导出

  // ==================== 自动加载本地数据 ====================
  useEffect(() => {
    const savedData = resumeService.getResumeData();
    if (savedData) {
      setResumeData(savedData);
    }
  }, []);

  // ==================== 自动保存（防抖500ms） ====================
  useEffect(() => {
    const timer = setTimeout(() => {
      resumeService.saveResumeData(resumeData);
    }, 500);

    // 清除定时器，避免内存泄漏
    return () => clearTimeout(timer);
  }, [resumeData]);

  // ==================== 个人信息操作 ====================

  /**
   * 更新个人信息字段
   * @param {string} field - 字段名
   * @param {any} value - 字段值
   */
  const updatePersonalInfo = useCallback((field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  }, []);

  // ==================== 工作经历CRUD操作 ====================

  /**
   * 添加新的工作经历
   */
  const addWorkExperience = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          id: Date.now(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }));
  }, []);

  /**
   * 更新工作经历
   * @param {number} id - 工作经历ID
   * @param {string} field - 字段名
   * @param {any} value - 字段值
   */
  const updateWorkExperience = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  /**
   * 删除工作经历
   * @param {number} id - 工作经历ID
   */
  const deleteWorkExperience = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(item => item.id !== id)
    }));
  }, []);

  // ==================== 教育背景CRUD操作 ====================

  /**
   * 添加新的教育背景
   */
  const addEducation = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          school: '',
          major: '',
          degree: '',
          startDate: '',
          endDate: ''
        }
      ]
    }));
  }, []);

  /**
   * 更新教育背景
   * @param {number} id - 教育背景ID
   * @param {string} field - 字段名
   * @param {any} value - 字段值
   */
  const updateEducation = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  /**
   * 删除教育背景
   * @param {number} id - 教育背景ID
   */
  const deleteEducation = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  }, []);

  // ==================== 项目经历CRUD操作 ====================

  /**
   * 添加新的项目经历
   */
  const addProject = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          name: '',
          role: '',
          techStack: '',
          description: '',
          link: ''
        }
      ]
    }));
  }, []);

  /**
   * 更新项目经历
   * @param {number} id - 项目经历ID
   * @param {string} field - 字段名
   * @param {any} value - 字段值
   */
  const updateProject = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  /**
   * 删除项目经历
   * @param {number} id - 项目经历ID
   */
  const deleteProject = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  }, []);

  // ==================== 技能CRUD操作 ====================

  /**
   * 添加新的技能
   */
  const addSkill = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: Date.now(),
          name: '',
          level: '熟练'
        }
      ]
    }));
  }, []);

  /**
   * 更新技能
   * @param {number} id - 技能ID
   * @param {string} field - 字段名
   * @param {any} value - 字段值
   */
  const updateSkill = useCallback((id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  /**
   * 删除技能
   * @param {number} id - 技能ID
   */
  const deleteSkill = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id)
    }));
  }, []);

  // ==================== 模板和UI操作 ====================

  /**
   * 切换简历模板
   * @param {string} templateId - 模板ID
   */
  const changeTemplate = useCallback((templateId) => {
    setSelectedTemplate(templateId);
  }, []);

  /**
   * 切换预览模式
   */
  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode(prev => !prev);
  }, []);

  /**
   * 导出PDF
   * @param {React.RefObject} elementRef - 要导出的DOM元素引用
   * @returns {Promise<{success: boolean, error?: any}>} 导出结果
   */
  const exportPDF = useCallback(async (elementRef) => {
    setIsExporting(true);
    try {
      const { exportToPDF } = await import('../utils/pdfExport');
      const result = await exportToPDF(elementRef.current, `resume_${Date.now()}.pdf`);
      return result;
    } finally {
      setIsExporting(false);
    }
  }, []);

  /**
   * 重置简历数据
   */
  const resetResume = useCallback(() => {
    if (window.confirm('确定要重置所有数据吗？此操作不可恢复。')) {
      setResumeData(defaultResumeData);
    }
  }, []);

  // ==================== Context值 ====================
  const value = {
    // 状态
    resumeData,
    selectedTemplate,
    isPreviewMode,
    isExporting,

    // 个人信息
    updatePersonalInfo,

    // 工作经历
    addWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,

    // 教育背景
    addEducation,
    updateEducation,
    deleteEducation,

    // 项目经历
    addProject,
    updateProject,
    deleteProject,

    // 技能
    addSkill,
    updateSkill,
    deleteSkill,

    // 模板和UI
    changeTemplate,
    togglePreviewMode,

    // 导出和重置
    exportPDF,
    resetResume
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

/**
 * 使用简历上下文的Hook
 * @returns {object} 简历上下文值
 * @throws {Error} 如果在Provider外部使用
 */
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
};
