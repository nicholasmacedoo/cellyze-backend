import { PrismaClient } from '@prisma/client';

interface IRequest {
    name: string;
    tenant_id: string;
}

const prisma = new PrismaClient();

export default class CreateShepherdsService
{
    public async execute({ name, tenant_id }: IRequest) 
    {
        const shepherd = await prisma.shepherds.create({
            data: {
                name,
                tenant_id,                
            },
        });

        return shepherd;
    }
}