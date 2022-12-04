import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import CreateLeadersService from "../../services/CreateLeadersService";

const prisma = new PrismaClient();

export default class LeadersControllers
{
    public async create(request: Request, response: Response) {
        const tenant_id = request.user.id;
        const { name, discipler_id } = request.body;
        
        const createLeadersService = new CreateLeadersService();

        const leader = await createLeadersService.execute({
            name,
            discipler_id,
            tenant_id
        });
        
        return response.status(201).json(leader);
    }

    public async index(request: Request, response: Response) {
        const tenant_id = request.user.id;
        
        const leaders = await prisma.leaders.findMany({
            where: {
                tenant_id,
            },
            include: {
                discipler: true,
                cells: true,
            }
        });
                
        return response.json(leaders);
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params;

        await prisma.leaders.delete({
            where: {
                id,
            }
        });
                
        return response.status(204).json();
    }
}