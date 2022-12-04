import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import CreateDisciplersService from "../../services/CreateDisciplersService";

const prisma = new PrismaClient();

export default class DisciplersControllers
{
    public async create(request: Request, response: Response) {
        const tenant_id = request.user.id;
        const { name, shepherd_id } = request.body;
        
        const createDisciplersService = new CreateDisciplersService();
        
        const shepherd = await createDisciplersService.execute({
            name,
            tenant_id,
            shepherd_id
        });
        
        return response.status(201).json(shepherd);
    }

    public async index(request: Request, response: Response) {
        const tenant_id = request.user.id;
        
        const disciplers = await prisma.disciplers.findMany({
            where: {
                tenant_id,
            },
            include: {
                shepherd: true
            }
        });
                
        return response.json(disciplers);
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params;

        await prisma.disciplers.delete({
            where: {
                id,
            }
        });
                
        return response.status(204).json();
    }
}