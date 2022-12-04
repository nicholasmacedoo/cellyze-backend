import { PrismaClient } from '@prisma/client';
import { AppError } from '../shared/errors/AppError';

interface IRequest {
    cell_day: string;
    number_of_members: number;
    regulars: number;
    visitors: number;
    cell_id: string;
    tenant_id: string;
}

const prisma = new PrismaClient();

export default class CreateReportService
{
    public async execute({ cell_id, number_of_members, cell_day, regulars, visitors, tenant_id }: IRequest) 
    {   
        const cell = await prisma.cells.findUnique({
            where: {
                id: cell_id
            },
        });

        if(!cell) throw new AppError('Célula informada não foi encontrada')

        const report = await prisma.reports.create({
            data: {
                cell_day: new Date(cell_day),
                number_of_members,
                regulars, 
                visitors,
                cell_id: cell_id,
                tenant_id: tenant_id,
            }
        })

        return report;
    }
}