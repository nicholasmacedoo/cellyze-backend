import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import CreateTenantsService from "../../services/CreateTenantsService";

const prisma = new PrismaClient();


export default class TenantsControllers {
    public async create(request: Request, response: Response) {
        const { name, email, password } = request.body;
        
        const createTenantService = new CreateTenantsService();

        const tenant = await createTenantService.execute({
            name,
            email,
            password,
        });
        
        return response.json(tenant)
    }

    public async findByChurch(request: Request, response: Response) {
        const { nameChurch } = request.params;
        
        if(!nameChurch) return response.status(404).json({ message: 'Nome da igreja é obrigatório.'});

        const tenant = await prisma.tenants.findUnique({
            select: {
                id: true,
                name: true,
                cells: true,
            },
            where: {
                name_church: nameChurch,
            },
        })
        
        return response.json(tenant)
    }
}