import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * 将HTML元素导出为PDF文件
 * @param {HTMLElement} element - 要导出的DOM元素
 * @param {string} fileName - 导出的文件名，默认为'resume.pdf'
 * @returns {Promise<{success: boolean, error?: any}>} 导出结果
 */
export const exportToPDF = async (element, fileName = 'resume.pdf') => {
  try {
    // 配置html2canvas
    const canvas = await html2canvas(element, {
      scale: 2,              // 提高清晰度
      useCORS: true,         // 支持跨域图片
      logging: false,        // 关闭日志输出
      allowTaint: true,      // 允许跨域图片
      backgroundColor: '#ffffff'  // 设置白色背景
    });

    // 获取Canvas尺寸
    const imgData = canvas.toDataURL('image/png');
    const { width, height } = canvas;

    // 创建PDF（A4尺寸：210mm × 297mm）
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (height * pdfWidth) / width;

    // 添加图片到PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);

    return { success: true };
  } catch (error) {
    console.error('PDF导出失败:', error);
    return { success: false, error };
  }
};

/**
 * 将HTML元素导出为图片
 * @param {HTMLElement} element - 要导出的DOM元素
 * @param {string} fileName - 导出的文件名，默认为'resume.png'
 * @returns {Promise<{success: boolean, error?: any}>} 导出结果
 */
export const exportToImage = async (element, fileName = 'resume.png') => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    link.click();

    return { success: true };
  } catch (error) {
    console.error('图片导出失败:', error);
    return { success: false, error };
  }
};
