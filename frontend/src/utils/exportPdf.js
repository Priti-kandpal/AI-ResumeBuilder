import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { message } from 'antd';

export const handleNativePrint = () => {
  window.print();
};

export const exportToPdf = async (elementId, filename = 'Resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    message.error('Resume container not found for export');
    return;
  }

  const hideHideables = element.querySelectorAll('.no-print');
  hideHideables.forEach(el => (el.style.display = 'none'));

  const hideLoading = message.loading('Generating high-resolution PDF...', 0);

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width mm
    const pageHeight = 297; // A4 height mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
    hideLoading();
    message.success('Resume downloaded successfully!');
  } catch (error) {
    hideLoading();
    console.error('PDF Generation Error:', error);
    message.error('Failed to generate PDF. Falling back to browser print dialog.');
    window.print();
  } finally {
    hideHideables.forEach(el => (el.style.display = ''));
  }
};
