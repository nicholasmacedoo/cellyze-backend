import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { authConfig } from '../shared/config/auth';
import { AppError } from '../shared/errors/AppError';

const prisma = new PrismaClient();

interface IRequest {
    email: string;
    password: string;
}

export default class CreateSessionService
{
    public async execute({ email, password }: IRequest) {
        const tenant = await prisma.tenants.findUnique({
            where: {
                email,
            },
        });

        if(!tenant) throw new AppError('Email/Senha não parece válida');

        const checkPasswordMatched = await compare(password, tenant.password);

        if(!checkPasswordMatched) throw new AppError('Email/Senha não parece válida');

        const token = sign({}, authConfig.jwt.secret, {
            subject: tenant.id,
        });

        return {
            token,
            user: tenant,
        }
    }
}   