import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportarPDF = async (elementId, nomeArquivo = 'comprovante.pdf') => {
    const elemento = document.getElementById(elementId);
    
    if (!elemento) {
        console.error(`Elemento com ID "${elementId}" não encontrado.`);
        return;
    }

    try {
        //HTML para imagem
        const canvas = await html2canvas(elemento, {
            scale: 2, //Resolução
            useCORS: true, //Imagens externas
            logging: false
        });

        const imgData = canvas.toDataURL('image/png');

        //PDF 
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfLargura = pdf.internal.pageSize.getWidth();
        
        //Altura proporcional
        const pdfAltura = (canvas.height * pdfLargura) / canvas.width;

        //Adiciona imagem ao PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfLargura, pdfAltura);
        
        //download
        pdf.save(nomeArquivo);
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
    }
};

export const handlePrint = () => {
    window.print();
};

