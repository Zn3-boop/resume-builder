/**
 * 简历数据服务
 * 负责简历数据的CRUD操作和导入导出功能
 */

const STORAGE_KEY = 'resumeData';

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
 * 简历服务对象
 */
export const resumeService = {
  /**
   * 获取本地存储的简历数据
   * @returns {object|null} 简历数据，如果没有则返回null
   */
  getResumeData: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('读取简历数据失败:', error);
      return null;
    }
  },

  /**
   * 保存简历数据到本地
   * @param {object} data - 要保存的简历数据
   * @returns {Promise<{success: boolean, error?: any}>} 保存结果
   */
  saveResumeData: (data) => {
    try {
      const dataToSave = {
        ...defaultResumeData,
        ...data
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      return Promise.resolve({ success: true });
    } catch (error) {
      console.error('保存简历数据失败:', error);
      return Promise.resolve({ success: false, error });
    }
  },

  /**
   * 导出简历数据为JSON文件
   * @param {object} data - 要导出的简历数据
   * @returns {Promise<{success: boolean, error?: any}>} 导出结果
   */
  exportResumeData: (data) => {
    try {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume_data_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return Promise.resolve({ success: true });
    } catch (error) {
      console.error('导出简历数据失败:', error);
      return Promise.resolve({ success: false, error });
    }
  },

  /**
   * 从JSON文件导入简历数据
   * @param {File} file - 要导入的JSON文件
   * @returns {Promise<{success: boolean, data?: object, error?: any}>} 导入结果
   */
  importResumeData: (file) => {
    return new Promise((resolve) => {
      // 验证文件类型
      if (!file || file.type !== 'application/json') {
        resolve({ success: false, error: '请选择有效的JSON文件' });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          // 验证数据结构
          if (!data.personalInfo) {
            resolve({ success: false, error: '无效的简历数据格式' });
            return;
          }
          resolve({ success: true, data });
        } catch (error) {
          console.error('解析简历数据失败:', error);
          resolve({ success: false, error: '文件解析失败，请确保是有效的JSON文件' });
        }
      };
      reader.onerror = () => {
        resolve({ success: false, error: '文件读取失败' });
      };
      reader.readAsText(file);
    });
  },

  /**
   * 清除本地存储的简历数据
   * @returns {Promise<{success: boolean, error?: any}>} 清除结果
   */
  clearResumeData: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return Promise.resolve({ success: true });
    } catch (error) {
      console.error('清除简历数据失败:', error);
      return Promise.resolve({ success: false, error });
    }
  },

  /**
   * 获取默认简历数据
   * @returns {object} 默认的简历数据结构
   */
  getDefaultResumeData: () => {
    return JSON.parse(JSON.stringify(defaultResumeData));
  }
};
