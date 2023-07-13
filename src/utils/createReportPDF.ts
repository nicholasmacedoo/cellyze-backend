import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function toBuffer(ab: ArrayBuffer) {
    const buf = Buffer.alloc(ab.byteLength);

    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) {
        buf[i] = view[i];
    }

    return buf;
}

interface ReferenceDate { month: number; year: number }
interface SummaryProps { totalMembers: number, totalRegulars: number, totalVisitors: number, totalQtdMonth: number}
export function createReportPDF(body: (string | number)[][], dateReference: ReferenceDate, summary?: SummaryProps) {

    const date = `${dateReference.month + 1}/${dateReference.year}`;

    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'px'
    })
    .setProperties({
        title: `Relatorio da Celula - ${date}`,
        author: 'cellyze',
    });

    const font = (doc.getFont()).fontName;
    /** Header */
    doc.setFontSize(14);
    doc.setTextColor('#004FA4');
    doc.setFont(font, 'bold');
    doc.text("Relatorio da célula", 30, 16);
    /** name  */
    doc.setFontSize(12);
    doc.setTextColor('#484964');
    doc.setFont(font, 'bold');
    doc.text('Tipo: Mensal', 30, 32);
    /** address */
    doc.setFont(font, 'normal');
    doc.setTextColor('#484964');
    doc.setFontSize(12);
    doc.text('Mês do relatório: ' + date, 30, 43);

    // Tabela do resultado
    if(summary) {
        autoTable(doc, {
            head: [
                [
                    { content: 'Celula' },
                    { content: 'Discipulador' },
                    { content: 'Lider' },
                    { content: 'N. Membros' },
                    { content: 'Assiduos' },
                    { content: 'Visitantes' },
                    { content: 'Qtd. Mês' },
                ]
            ],
            body: [
                ...body,
                [
                    { title: '', colSpan: 2, styles: { fillColor: '#484964', textColor: '#ffffff',fontStyle: 'bold', halign: 'left' }},
                    { title: 'Total membros', styles: { fillColor: '#484964', textColor: '#ffffff',fontStyle: 'bold', halign: 'left' }},
                    { title: 'Total Assíduos', styles: { fillColor: '#484964', textColor: '#ffffff',fontStyle: 'bold', halign: 'left' }},
                    { title: 'Total Visitantes', styles: { fillColor: '#484964', textColor: '#ffffff',fontStyle: 'bold', halign: 'left' }},
                    { title: 'Total Mês', styles: { fillColor: '#484964', textColor: '#ffffff',fontStyle: 'bold', halign: 'left' }},    
                ],
                [
                    { title: '', colSpan: 2, styles: { textColor: '#484964',fontStyle: 'bold', halign: 'left' }},
                    { title: summary.totalMembers.toString(), styles: { textColor: '#484964',fontStyle: 'bold', halign: 'left' }},
                    { title: summary.totalRegulars.toString(), styles: { textColor: '#484964',fontStyle: 'bold', halign: 'left' }},
                    { title: summary.totalVisitors.toString(), styles: { textColor: '#484964',fontStyle: 'bold', halign: 'left' }},
                    { title: summary.totalQtdMonth.toString(), styles: { textColor: '#484964',fontStyle: 'bold', halign: 'left' }},
                ]
            ],
            startY: 70,
            tableWidth: "auto",
            headStyles: {
                fontStyle: 'bold',
                fillColor: '#004FA4'
            },
            bodyStyles: {
                lineWidth: .3,
                lineColor: '#B8D5F3',
                textColor: "#484964",
            },
        });
    } else {
        autoTable(doc, {
            head: [
                [
                    { content: 'Celula' },
                    { content: 'Lider' },
                    { content: 'N. Membros' },
                    { content: 'Assiduos' },
                    { content: 'Visitantes' },
                    { content: 'Qtd. Mês' },
                ]
            ],
            body,
            startY: 70,
            tableWidth: "auto",
            headStyles: {
                fontStyle: 'bold',
                fillColor: '#004FA4'
            },
            bodyStyles: {
                lineWidth: .3,
                lineColor: '#B8D5F3',
                textColor: "#484964",
            },
        });
    }

    const arrayBuffer = doc.output('arraybuffer');
    const buffer = toBuffer(arrayBuffer);

    const filename = `Relatorio da Celula - ${date}`;

    return {
        filename,
        buffer,
    }
}