import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import CreateReportService from "../../services/CreateReportService";
import ReportRepository from "../../services/ReportRepository";
import { createReportPDF } from "../../utils/createReportPDF";

const prisma = new PrismaClient();

export default class ReportsControllers
{
    public async create(request: Request, response: Response) {
        const { cell_id, number_of_members, cell_day, regulars, visitors, tenant_id } = request.body;
        
        const createReportsService = new CreateReportService();

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

    public async index(request: Request, response: Response) {
        const { tenant_id } = request.params;
        
        const reports = await prisma.reports.findMany({
            where: {
                tenant_id,
            }
        });
                
        return response.json(reports);
    }

    public async createReportPDF(request: Request, response: Response) {

        const reportRepository = new ReportRepository();
        const report = await reportRepository.getReportMonth();

        const formatData = report.map(item => [
            item.name,
            item.leader.name,
            item.report.number_of_members,
            item.report.regulars,
            item.report.visitors,
            item.report.countReport,
        ]);

        const { filename, buffer } = createReportPDF(formatData);

        

        return response
        .setHeader('Content-disposition', 'attachment; filename=' + filename)
        .setHeader('Content-type', 'application/pdf')
        .send(buffer);
        // return response.json({});
    }

    public async createReportByCell(request: Request, response: Response) {

        const { cell_id } = request.params;
        const reportRepository = new ReportRepository();
        const report = await reportRepository.getReportMonthByCell(cell_id);

        if(report) {
            const formatData = [[
                report.name,
                report.leader.name,
                report.report.number_of_members,
                report.report.regulars,
                report.report.visitors,
                report.report.countReport,
            ]];
    
            const { filename, buffer } = createReportPDF(formatData);
    
            return response
            .setHeader('Content-disposition', 'attachment; filename=' + filename)
            .setHeader('Content-type', 'application/pdf')
            .send(buffer);

        }

        return response.status(404).json({ message: 'Houve um erro'})
    }
}