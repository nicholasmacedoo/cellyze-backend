import { PrismaClient } from '@prisma/client';
import { AppError } from '../shared/errors/AppError';

interface IRequest {
    name: string;
    tenant_id: string;
    discipler_id: string;
}

const prisma = new PrismaClient();

export default class CreateLeadersService
{
    public async execute({ name, tenant_id, discipler_id }: IRequest) 
    {
        const discipler = await prisma.disciplers.findUnique({
            where: {
                id: discipler_id,
            }
        })

        if(!discipler) throw new AppError('Discipulador informado não existe')

        const leader = await prisma.leaders.create({
            data: {
                name,
                tenant_id,
                discipler_id,
                shepherd_id: discipler.shepherd_id,
            }
        })

        return {
            ...leader,
            discipler,
        };
    }
}