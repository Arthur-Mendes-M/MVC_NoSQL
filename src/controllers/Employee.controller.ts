import { Request, Response } from "express";
import { EmployeeRepository } from "../repositories/employee/implementation/employee.repository"
import { EmployeeService } from "../services/employee/implementation/employee.service"

import { prisma } from "../utils/prisma.util"
import { CustomError } from "../utils/custom.error.util";
import jwt from "jsonwebtoken"

require('dotenv').config()

class EmployeeController {
    private constructor(){}

    static async saveEmployee(request: Request, response: Response){
        const { name, email, password, company_id } = request.body

        // Repository
        const repository = EmployeeRepository.build(prisma)
        // Service
        const service = EmployeeService.build(repository)

        // Calling service to this route
        const DTO = await service.save(name, email, password, company_id)
    
        // Return DTO
        response.json(DTO).status(201).send()
    }

    static async findOneEmployee(request: Request, response: Response) {
        // Getting id of url
        const { id } = request.params
        let { company_id } = request.query

        if(!company_id) 
            // throw new Error('É necessário o identificador da empresa para a busca!')
            throw new CustomError(400)

        company_id = String(company_id)

        // Repository
        const repository = EmployeeRepository.build(prisma)
        // Service
        const service = EmployeeService.build(repository)

        // Calling service to this route
        const DTO = await service.view_one(id, company_id)

        // Return DTO
        response.json(DTO).status(200).send()
    }

    static async validateEmployee(request: Request, response: Response) {
        // Getting id of url
        const { email, password } = request.body

        // Repository
        const repository = EmployeeRepository.build(prisma)
        // Service
        const service = EmployeeService.build(repository)

        // Calling service to this route
        const validEmployeeFound = await service.check_credentials(email, password)

        // const dataToToken = validEmployeeFound?.id ?? validEmployeeFound
        const token = jwt.sign(
            {}, 
            process.env.JWT_SECRET_KEY ?? Math.random().toString(36),
            {
                subject: validEmployeeFound?.id,
                expiresIn: '1d'
            }
        )

        const DTO = {
            data: validEmployeeFound,
            token
        }

        // Return DTO
        response.json(DTO).status(200).send()
    }

    static async listAllEmployees(request: Request, response: Response) {
        let { company_id } = request.query

        if(!company_id) 
            // throw new Error('É necessário o identificador da empresa para a busca!')
            throw new CustomError(400)

        company_id = String(company_id)

        // Repository
        const repository = EmployeeRepository.build(prisma)
        // Service
        const service = EmployeeService.build(repository)

        // Calling service to this route
        const DTO = await service.view_all(company_id)
        
        // Return DTO
        response.json(DTO).status(200).send()
    }

    static async updateEmployee(request: Request, response: Response) {
        // Getting id of url
        const { id } = request.params
        
        // Getting Employee attributes
        const { name, email, password, company_id } = request.body
            
        // Repository
        const repository = EmployeeRepository.build(prisma)
        // Service
        const service = EmployeeService.build(repository)

        // Calling service to this route
        const DTO = await service.update(id, name, email, password, company_id)
        
        // Return DTO
        response.json(DTO).status(200).send()
    }

    static async deleteEmployee(request: Request, response: Response) {
        // Getting id of url
        const { id } = request.params
        let { company_id } = request.query

        if(!company_id) 
            // throw new Error('É necessário o identificador da empresa para a busca!')
            throw new CustomError(400)

        company_id = String(company_id)

        // Repository
        const repository = EmployeeRepository.build(prisma)

        // Service
        const service = EmployeeService.build(repository)

        // Calling service to this route
        const DTO = await service.delete(id, company_id)

        // Return DTO
        response.json(DTO).status(200).send()
    }
}

export { EmployeeController }