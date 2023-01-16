import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import CreateTenantsService from "../../services/CreateTenantsService";
import UpdateTenantsService from "../../services/UpdateTenantsService";

const prisma = new PrismaClient();


export default class TenantsControllers {
    public async index(request: Request, response: Response) {
        const tenants = await prisma.tenants.findMany();

        return response.json(tenants)
    }
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

    public async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name_church, name, email, password } = request.body;
        
        const updateTenantService = new UpdateTenantsService();

        const tenant = await updateTenantService.execute({
            id, 
            name_church, 
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