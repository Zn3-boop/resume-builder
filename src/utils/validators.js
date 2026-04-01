/**
 * 表单验证工具集
 */

/**
 * 验证器对象
 */
export const validators = {
  /**
   * 邮箱验证
   * @param {string} email - 待验证的邮箱地址
   * @returns {boolean} 是否有效
   */
  isEmail: (email) => {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
   * 手机号验证
   * @param {string} phone - 待验证的手机号
   * @returns {boolean} 是否有效
   */
  isPhone: (phone) => {
    if (!phone) return false;
    const regex = /^1[3-9]\d{9}$/;
    return regex.test(phone);
  },

  /**
   * 必填验证
   * @param {any} value - 待验证的值
   * @returns {boolean} 是否有效
   */
  isRequired: (value) => {
    return value !== null && value !== undefined && String(value).trim() !== '';
  },

  /**
   * 时间逻辑验证（结束时间不能早于开始时间）
   * @param {string} startDate - 开始时间
   * @param {string} endDate - 结束时间
   * @returns {boolean} 是否有效
   */
  isValidDateRange: (startDate, endDate) => {
    if (!startDate || !endDate) return true;
    return new Date(startDate) <= new Date(endDate);
  },

  /**
   * URL验证
   * @param {string} url - 待验证的URL
   * @returns {boolean} 是否有效
   */
  isUrl: (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * 最小长度验证
   * @param {string} value - 待验证的值
   * @param {number} min - 最小长度
   * @returns {boolean} 是否有效
   */
  minLength: (value, min) => {
    if (!value) return false;
    return String(value).length >= min;
  },

  /**
   * 最大长度验证
   * @param {string} value - 待验证的值
   * @param {number} max - 最大长度
   * @returns {boolean} 是否有效
   */
  maxLength: (value, max) => {
    if (!value) return true;
    return String(value).length <= max;
  }
};

/**
 * 获取验证错误消息
 * @param {string} type - 验证类型
 * @param {object} params - 验证参数
 * @returns {string} 错误消息
 */
export const getValidationMessage = (type, params = {}) => {
  const messages = {
    required: '此项为必填项',
    email: '请输入有效的邮箱地址',
    phone: '请输入有效的手机号',
    url: '请输入有效的URL',
    minLength: `最少需要${params.min}个字符`,
    maxLength: `最多允许${params.max}个字符`,
    dateRange: '结束时间不能早于开始时间'
  };
  return messages[type] || '输入无效';
};
