import { useState, useCallback } from 'react';
import { validators } from '../utils/validators';

/**
 * 表单管理Hook
 * 用于管理表单状态、验证和提交
 * @param {object} initialValues - 表单初始值
 * @param {object} validationRules - 验证规则对象
 * @returns {object} 表单状态和方法
 */
export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * 更新表单值
   */
  const setValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  /**
   * 批量更新表单值
   */
  const setValues = useCallback((newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }));
  }, []);

  /**
   * 验证单个字段
   */
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return null;

    for (const rule of rules) {
      if (rule.required && !validators.isRequired(value)) {
        return rule.message || '此项为必填项';
      }
      if (rule.email && !validators.isEmail(value)) {
        return rule.message || '请输入有效的邮箱地址';
      }
      if (rule.phone && !validators.isPhone(value)) {
        return rule.message || '请输入有效的手机号';
      }
      if (rule.url && !validators.isUrl(value)) {
        return rule.message || '请输入有效的URL';
      }
      if (rule.minLength && !validators.minLength(value, rule.minLength)) {
        return rule.message || `最少需要${rule.minLength}个字符`;
      }
      if (rule.maxLength && !validators.maxLength(value, rule.maxLength)) {
        return rule.message || `最多允许${rule.maxLength}个字符`;
      }
      if (rule.custom && !rule.custom(value)) {
        return rule.message || '输入无效';
      }
    }
    return null;
  }, [validationRules]);

  /**
   * 验证整个表单
   */
  const validate = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validateField]);

  /**
   * 处理字段变化
   */
  const handleChange = useCallback((name, value) => {
    setValue(name, value);

    // 如果字段已经被触摸过，则实时验证
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [setValue, touched, validateField]);

  /**
   * 处理字段失去焦点
   */
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, values[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [values, validateField]);

  /**
   * 重置表单
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  /**
   * 提交表单
   */
  const handleSubmit = useCallback((onSubmit) => {
    return (e) => {
      e.preventDefault();

      // 标记所有字段为已触摸
      setTouched(
        Object.keys(validationRules).reduce((acc, name) => {
          acc[name] = true;
          return acc;
        }, {})
      );

      // 验证表单
      if (validate()) {
        onSubmit(values);
      }
    };
  }, [values, validationRules, validate]);

  return {
    values,
    errors,
    touched,
    setValue,
    setValues,
    handleChange,
    handleBlur,
    validate,
    reset,
    handleSubmit
  };
};
