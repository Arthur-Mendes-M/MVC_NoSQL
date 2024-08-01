import { Request, Response, NextFunction } from "express"
import { ProductRepository } from "../repositories/product/implementation/product.repository"
import { prisma } from "../utils/prisma.util"
import { ProductService } from "../services/product/implementation/product.service"
import { CustomError } from "../utils/custom.error.util"

class ProductController {
    private constructor(){}

    static build() {
        return new ProductController()
    }
    
    static async saveProduct(request: Request, response: Response) {
        // Getting product attributes
        const { name, description, price, stock, company_id } = request.body
            
        // Repository
        const repository = ProductRepository.build(prisma)
        // Service
        const service = ProductService.build(repository)

        // Calling service to this route
        const DTO = await service.save(name, description, price, company_id, stock)
        
        // Return DTO
        response.json(DTO).status(201).send()
    }

    static async findOneProduct(request: Request, response: Response) {
        // Getting id of url
        const { id } = request.params
        let { company_id } = request.query

        if(!company_id) 
            // throw new Error('É necessário o identificador da empresa para a busca!')
            throw new CustomError(400)

        company_id = String(company_id)
                    
        // Repository
        const repository = ProductRepository.build(prisma)
        // Service
        const service = ProductService.build(repository)

        // Calling service to this route
        const DTO = await service.view_one(id, company_id)

        // Return DTO
        response.json(DTO).status(200).send()
    }

    static async listAllProducts(request: Request, response: Response) {
        let { company_id } = request.query

        if(!company_id) 
            // throw new Error('É necessário o identificador da empresa para a busca!')
            throw new CustomError(400)

        company_id = String(company_id)

        // Repository
        const repository = ProductRepository.build(prisma)
        // Service
        const service = ProductService.build(repository)

        // Calling service to this route
        const DTO = await service.view_all(company_id)
        
        // Return DTO
        response.json(DTO).status(200).send()
    }

    static async updateProduct(request: Request, response: Response) {
        // Getting id of url
        const { id } = request.params
        let { company_id } = request.query

        if(!company_id) 
            // throw new Error('É necessário o identificador da empresa para a busca!')
            throw new CustomError(400)

        company_id = String(company_id)

        // Getting product attributes
        const { name, description, price, stock } = request.body
            
        // Repository
        const repository = ProductRepository.build(prisma)
        // Service
        const service = ProductService.build(repository)

        // Calling service to this route
        const DTO = await service.update(id, name, description, price, stock, company_id)
        
        // Return DTO
        response.json(DTO).status(200).send()
    }

    static async deleteProduct(request: Request, response: Response) {
        // Getting id of url
        const { id } = request.params
        let { company_id } = request.query

        if(!company_id) 
            // throw new Error('É necessário o identificador da empresa para a busca!')
            throw new CustomError(400)

        company_id = String(company_id)

        // Repository
        const repository = ProductRepository.build(prisma)

        // Service
        const service = ProductService.build(repository)

        // Calling service to this route
        const DTO = await service.delete(id, company_id)

        // Return DTO
        response.json(DTO).status(200).send()
    }

    static async buyProduct(request: Request, response: Response) {
        // Getting id of url
        const { id } = request.params
        // Getting product attributes
        const { amount } = request.body
        let { company_id } = request.query

        if(!company_id) 
            // throw new Error('É necessário o identificador da empresa para a busca!')
            throw new CustomError(400)

        company_id = String(company_id)

        // Repository
        const repository = ProductRepository.build(prisma)

        // Service
        const service = ProductService.build(repository)

        // Calling service to this route
        const DTO = await service.buy(id, amount, company_id)

        // Return DTO
        response.json(DTO).status(200).send()
    }

    static async sellProduct(request: Request, response: Response) {
        // Getting id of url
        const { id } = request.params
        // Getting product attributes
        const { amount } = request.body
        let { company_id } = request.query

        if(!company_id) 
            // throw new Error('É necessário o identificador da empresa para a busca!')
            throw new CustomError(400)

        company_id = String(company_id)

        // Repository
        const repository = ProductRepository.build(prisma)

        // Service
        const service = ProductService.build(repository)

        // Calling service to this route
        const DTO = await service.sell(id, amount, company_id)

        // Return DTO
        response.json(DTO).status(200).send()
    }
}

export { ProductController }