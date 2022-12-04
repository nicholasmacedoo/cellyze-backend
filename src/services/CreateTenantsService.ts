import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

const prisma = new PrismaClient();

export default class CreateTenantsService
{
    public async execute({ name, email, password }: IRequest) 
    {
        const checkExitsTenant = await prisma.tenants.findUnique({
            where: {
                email,
            }
        });

        if(checkExitsTenant) throw new Error('Este usuário já existe')

        const passwordHashed = await hash(password, 10);

        const tenant = await prisma.tenants.create({
            data: {
                name,
                email,
                password: passwordHashed,
            },
        });

        return tenant;
    }
}