
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// 保存简历到本地存储
export const saveResumeToStorage = (data, key = 'resume-data', message) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    if (message) message.success('保存成功');
    return true;
  } catch (error) {
    if (message) message.error('保存失败: ' + error.message);
    return false;
  }
};

// 从本地存储加载简历
export const loadResumeFromStorage = (key = 'resume-data', message) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    if (message) message.error('加载失败: ' + error.message);
    return null;
  }
};

// 导出简历为PDF
export const exportResumeToPDF = async (data, template, message) => {
  try {
    if (message) message.loading({ content: '正在生成PDF...', key: 'export' });

    // 获取预览元素
    const previewElement = document.getElementById('resume-preview');
    if (!previewElement) {
      throw new Error('预览元素不存在');
    }

    // 使用html2canvas生成图片
    const canvas = await html2canvas(previewElement, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // 计算PDF尺寸
    const imgWidth = 210; // A4宽度（mm）
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // 创建PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

    // 下载PDF
    const fileName = `${data.personalInfo?.name || 'resume'}.pdf`;
    pdf.save(fileName);

    if (message) message.success({ content: '导出成功！', key: 'export' });
    return true;
  } catch (error) {
    if (message) message.error({ content: '导出失败: ' + error.message, key: 'export' });
    return false;
  }
};

// 导出简历数据为JSON
export const exportResumeData = (data, message) => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.personalInfo?.name || 'resume'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (message) message.success('导出成功');
    return true;
  } catch (error) {
    if (message) message.error('导出失败: ' + error.message);
    return false;
  }
};
