"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReportPDF = createReportPDF;
var _jspdf = _interopRequireDefault(require("jspdf"));
var _jspdfAutotable = _interopRequireDefault(require("jspdf-autotable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function toBuffer(ab) {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; i++) {
    buf[i] = view[i];
  }
  return buf;
}
function createReportPDF(body) {
  const date = new Date().toLocaleDateString('pt-BR');
  const doc = new _jspdf.default({
    orientation: 'landscape',
    unit: 'px'
  }).setProperties({
    title: `Relatorio da Celula - ${date}`,
    author: 'cellyze'
  });
  const font = doc.getFont().fontName;
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
  doc.text('Data de emissão: ' + date, 30, 43);

  // Tabela do resultado
  (0, _jspdfAutotable.default)(doc, {
    head: [[{
      content: 'Celula'
    }, {
      content: 'Lider'
    }, {
      content: 'N. Membros'
    }, {
      content: 'Assiduos'
    }, {
      content: 'Visitantes'
    }, {
      content: 'Qtd. Mês'
    }]],
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
      textColor: "#484964"
    }
  });
  const arrayBuffer = doc.output('arraybuffer');
  const buffer = toBuffer(arrayBuffer);
  const filename = `Relatorio da Celula - ${date}`;
  return {
    filename,
    buffer
  };
}