import { Request, Response } from "express";
import { CompanyRepository } from "../repositories/company/implementation/company.repository"
import { CompanyService } from "../services/company/implementation/company.service"
import { prisma } from "../utils/prisma.util"

class CompanyController {
    private constructor(){}

    static async saveCompany(request: Request, response: Response){
        const { name, description, cnpj, contacts, address } = request.body

        // Repository
        const repository = CompanyRepository.build(prisma)
        // Service
        const service = CompanyService.build(repository)

        // Calling service to this route
        const DTO = await service.save(name, description, cnpj, contacts, address)
    
        // Return DTO
        response.json(DTO).status(201).send()
    }

    static async listAllCompanies(request: Request, response: Response) {
        // Repository
        const repository = CompanyRepository.build(prisma)
        // Service
        const service = CompanyService.build(repository)

        // Calling service to this route
        const DTO = await service.view_all()
        
        // Return DTO
        response.json(DTO).status(200).send()
    }

    static async findOneCompany(request: Request, response: Response) {
        const { id } = request.params

        // Repository
        const repository = CompanyRepository.build(prisma)

        // Service
        const service = CompanyService.build(repository)

        const foundCompany = await service.view_one(id)

        response.json(foundCompany).status(200).send()
    }

    static async updateCompany(request: Request, response: Response) {
        const { id } = request.params
        const { name, description, cnpj, contacts, address } = request.body

        // Repository
        const repository = CompanyRepository.build(prisma)

        // Service
        const service = CompanyService.build(repository)

        const updatedCompany = await service.update(id, name, description, cnpj, contacts, address)

        response.json(updatedCompany).status(200).send()
    }

    static async deleteCompany(request: Request, response: Response) {
        const { id } = request.params

        // Repository
        const repository = CompanyRepository.build(prisma)

        // Service
        const service = CompanyService.build(repository)

        const deletedCompany = await service.delete(id)

        response.json(deletedCompany).status(200).send()
    }
}

export { CompanyController }