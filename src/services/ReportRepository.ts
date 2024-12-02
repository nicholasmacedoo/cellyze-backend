import { PrismaClient, Reports } from "@prisma/client";
import { lastDayOfMonth, startOfMonth } from 'date-fns'
const prisma = new PrismaClient();

interface QueryParams { month: number; year: number }
interface MonthlyReport {
    month: Date;              
    total_reports: number;    
    total_members: number;    
    total_regulars: number;   
    total_visitors: number;   
    avg_members: number;
    avg_regulars: number;
    avg_visitors: number;
}

export default class ReportRepository {
    public async getReportMonth(tenant_id: string, { month, year }: QueryParams) {
        const startDayOfMonth = startOfMonth(new Date(year, month))
        const lastDayMonth = lastDayOfMonth(new Date(year, month))

        const cells = await prisma.cells.findMany({ 
            where: {
                tenant_id,
            },
            include: {
                leader: {
                    select: {
                        name: true,
                        discipler: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            },
        });

        const reports = await prisma.reports.findMany({
            where: {
                tenant_id,
                cell_day: {
                    gte: startDayOfMonth,
                    lte: lastDayMonth
                }
            },
            include: {
                cell: {
                    select: {
                        name: true,
                    }
                },
            }
        })
        // const reports: Reports[] = await prisma.$queryRaw`
        //     SELECT *
        //     FROM reports r
        //     WHERE TO_CHAR(r.created_at, 'MM-YYYY') = to_char(now() , 'MM-YYYY')
        // `;

        const groupReportByCell = cells.map(cell => {
            const reportsCell = reports.filter(report => report.cell_id === cell.id);
            
            const calculateMiddle = reportsCell.reduce((accumulator, currentReport) => {
                accumulator.number_of_members += currentReport.number_of_members;
                accumulator.regulars += currentReport.regulars;
                accumulator.visitors += currentReport.visitors;
                return accumulator;
            }, { number_of_members: 0, regulars: 0, visitors: 0 });

            return {
                ...cell,
                report: {
                    number_of_members: calculateMiddle.number_of_members > 0 ? Math.ceil(calculateMiddle.number_of_members / reportsCell.length) : 0, 
                    regulars: calculateMiddle.regulars > 0 ? Math.ceil(calculateMiddle.regulars / reportsCell.length) : 0, 
                    visitors: calculateMiddle.visitors > 0 ? Math.ceil(calculateMiddle.visitors / reportsCell.length) : 0,
                    countReport: reportsCell.length,
                }
            };
        });

        return groupReportByCell;
    }

    public async getReportMonthByCell(cell_id: string, { month, year }: QueryParams) {
        
        const startDayOfMonth = startOfMonth(new Date(year, month))
        const lastDayMonth = lastDayOfMonth(new Date(year, month))
    
        const cell = await prisma.cells.findUnique({
            where: {
                id: cell_id,
            },
            include: {
                leader: {
                    select: {
                        name: true,
                        discipler: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            },
        });

        if(cell) {
         
            const reports = await prisma.reports.findMany({
                where: {
                    cell_id,
                    cell_day: {
                        gte: startDayOfMonth,
                        lte: lastDayMonth
                    }
                },
                include: {
                    cell: {
                        include: {
                            leader: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    },
                }
            })
    
            const calculateMiddle = reports.reduce((accumulator, currentReport) => {
                accumulator.number_of_members += currentReport.number_of_members;
                accumulator.regulars += currentReport.regulars;
                accumulator.visitors += currentReport.visitors;
                return accumulator;
            }, { number_of_members: 0, regulars: 0, visitors: 0 });
    
            
    
            return {
                ...cell,
                report: {
                    number_of_members: calculateMiddle.number_of_members > 0 ? Math.ceil(calculateMiddle.number_of_members / reports.length) : 0, 
                    regulars: calculateMiddle.regulars > 0 ? Math.ceil(calculateMiddle.regulars / reports.length) : 0, 
                    visitors: calculateMiddle.visitors > 0 ? Math.ceil(calculateMiddle.visitors / reports.length) : 0,
                    countReport: reports.length,
                }
            };
        }
    }

    public async getMonthlyReports(tenant_id: string, startDate: string, endDate: string) {
        const reports = await prisma.$queryRaw<MonthlyReport[]>`
            SELECT 
                DATE_TRUNC('month', "cell_day") AS month,
                "tenant_id",
                COUNT(*) AS total_reports,
                SUM("number_of_members") AS total_members,
                SUM("regulars") AS total_regulars,
                SUM("visitors") AS total_visitors,
                AVG("number_of_members")::numeric(10,2) AS avg_members,
                AVG("regulars")::numeric(10,2) AS avg_regulars,
                AVG("visitors")::numeric(10,2) AS avg_visitors
            FROM "reports"
            WHERE "cell_day" >= ${startDate}::timestamp AND "cell_day" <= ${endDate}::timestamp
            AND "tenant_id" = ${tenant_id}
            GROUP BY month, "tenant_id"
            ORDER BY month;
        `
        return reports.map(report => ({
            ...report,
            total_reports: Number(report.total_reports),
            total_members: Number(report.total_members),
            total_regulars: Number(report.total_regulars),
            total_visitors: Number(report.total_visitors),
            avg_members: Number(report.avg_members),
            avg_regulars: Number(report.avg_regulars),
            avg_visitors: Number(report.avg_visitors),
        }));
    }
}
