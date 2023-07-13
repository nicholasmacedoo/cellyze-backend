import { PrismaClient, Reports } from "@prisma/client";
import { lastDayOfMonth, startOfMonth } from 'date-fns'
const prisma = new PrismaClient();

interface QueryParams { month: number; year: number }
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
                    },
                    include: {
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
                created_at: {
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
                    }
                }
            },
        });

        if(cell) {
         
            const reports = await prisma.reports.findMany({
                where: {
                    cell_id,
                    created_at: {
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
}
