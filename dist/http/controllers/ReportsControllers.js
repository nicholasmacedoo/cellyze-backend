"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
var _CreateReportService = _interopRequireDefault(require("../../services/CreateReportService"));
var _ReportRepository = _interopRequireDefault(require("../../services/ReportRepository"));
var _createReportPDF = require("../../utils/createReportPDF");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const prisma = new _client.PrismaClient();
class ReportsControllers {
  async create(request, response) {
    const {
      cell_id,
      number_of_members,
      cell_day,
      regulars,
      visitors,
      tenant_id
    } = request.body;
    const createReportsService = new _CreateReportService.default();
    const report = await createReportsService.execute({
      cell_id,
      number_of_members,
      cell_day,
      regulars,
      visitors,
      tenant_id
    });
    return response.status(201).json(report);
  }
  async index(request, response) {
    const {
      tenant_id
    } = request.params;
    const reports = await prisma.reports.findMany({
      where: {
        tenant_id
      }
    });
    return response.json(reports);
  }
  async createReportPDF(request, response) {
    const reportRepository = new _ReportRepository.default();
    const report = await reportRepository.getReportMonth();
    const formatData = report.map(item => [item.name, item.leader.name, item.report.number_of_members, item.report.regulars, item.report.visitors, item.report.countReport]);
    const {
      filename,
      buffer
    } = (0, _createReportPDF.createReportPDF)(formatData);
    return response.setHeader('Content-disposition', 'attachment; filename=' + filename).setHeader('Content-type', 'application/pdf').send(buffer);
    // return response.json({});
  }

  async createReportByCell(request, response) {
    const {
      cell_id
    } = request.params;
    const reportRepository = new _ReportRepository.default();
    const report = await reportRepository.getReportMonthByCell(cell_id);
    if (report) {
      const formatData = [[report.name, report.leader.name, report.report.number_of_members, report.report.regulars, report.report.visitors, report.report.countReport]];
      const {
        filename,
        buffer
      } = (0, _createReportPDF.createReportPDF)(formatData);
      return response.setHeader('Content-disposition', 'attachment; filename=' + filename).setHeader('Content-type', 'application/pdf').send(buffer);
    }
    return response.status(404).json({
      message: 'Houve um erro'
    });
  }
}
exports.default = ReportsControllers;