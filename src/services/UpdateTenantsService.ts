import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { AppError } from '../shared/errors/AppError';

interface IRequest {
    id: string;
    name?: string;
    email?: string;
    name_church?: string;
    password?: string;
}

const prisma = new PrismaClient();

export default class UpdateTenantsService
{
    public async execute({ id, name_church, name, email, password }: IRequest) 
    {
        
        try {
            const passwordHashed = password ? await hash(password, 10) : undefined;
            
            const tenant = await prisma.tenants.update({
                where: {
                    id,
                },
                data: {
                    name_church,
                    name,
                    email,
                    ...passwordHashed && { password: passwordHashed },
                }
            });
    
    
            return tenant;
        } catch (error) {
            throw new AppError('Error ao atualizar usuário')
        }
    }
}