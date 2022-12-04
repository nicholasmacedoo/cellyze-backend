import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import CreateShepherdsService from "../../services/CreateShepherdsService";


const prisma = new PrismaClient();

export default class ShepherdsControllers {
    public async create(request: Request, response: Response) {
        const tenant_id = request.user.id;
        const { name } = request.body;
        
        const createShepherdsService = new CreateShepherdsService();

        const shepherd = await createShepherdsService.execute({
            name,
            tenant_id,
        });
        
        return response.status(201).json(shepherd);
    }

    public async index(request: Request, response: Response) {
        const tenant_id = request.user.id;
        
        const shepherds = await prisma.shepherds.findMany({
            where: {
                tenant_id,
            }
        });
                
        return response.json(shepherds);
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params;

        await prisma.shepherds.delete({
            where: {
                id,
            }
        });
                
        return response.status(204).json();
    }
}