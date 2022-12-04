import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import CreateCellsService from "../../services/CreateCellsService";

const prisma = new PrismaClient();

export default class CellControllers
{
    public async create(request: Request, response: Response) {
        const tenant_id = request.user.id;
        const { name, leader_id, place } = request.body;
        
        const createCellsService = new CreateCellsService();

        const shepherd = await createCellsService.execute({
            name,
            tenant_id,
            leader_id,
            place
        });
        
        return response.status(201).json(shepherd);
    }

    public async index(request: Request, response: Response) {
        const tenant_id = request.user.id;
        
        const cells = await prisma.cells.findMany({
            where: {
                tenant_id,
            },
            include: {
                leader: true,
            }
        });
                
        return response.json(cells);
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params;

        await prisma.cells.delete({
            where: {
                id,
            }
        });
                
        return response.status(204).json();
    }
}