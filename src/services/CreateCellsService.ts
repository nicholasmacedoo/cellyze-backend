import { PrismaClient } from '@prisma/client';
import { AppError } from '../shared/errors/AppError';

interface IRequest {
    name: string;
    tenant_id: string;
    leader_id: string;
    place?: string;
}

const prisma = new PrismaClient();

export default class CreateCellsService
{
    public async execute({ name, tenant_id, leader_id, place }: IRequest) 
    {
        const leader = await prisma.leaders.findUnique({
            where: {
                id: leader_id,
            }
        });

        if(!leader) throw new AppError('Líder informado não existe')

        const cell = await prisma.cells.create({
            data: {
                name,
                tenant_id,
                leader_id,
                place,
            }
        })

        return {
            ...cell,
            leader,
        };
    }
}