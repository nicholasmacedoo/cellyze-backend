import { PrismaClient } from '@prisma/client';
import { AppError } from '../shared/errors/AppError';

interface IRequest {
    name: string;
    tenant_id: string;
    shepherd_id: string;
}

const prisma = new PrismaClient();

export default class CreateDisciplersService
{
    public async execute({ name, tenant_id, shepherd_id }: IRequest) 
    {   
        const shepherd = await prisma.shepherds.findUnique({
            where: {
                id: shepherd_id,
            }
        });

        if(!shepherd) throw new AppError('Pastor informado não existe')
        
        const discipler = await prisma.disciplers.create({
            data: {
                name,
                tenant_id,
                shepherd_id,
            }
        })

        return {
            ...discipler,
            shepherd,
        };
    }
}