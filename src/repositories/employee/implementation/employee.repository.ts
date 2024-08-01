import { PrismaClient } from "@prisma/client";
import { Employee, EmployeeAttributesType } from "../../../entities/Employee";
import { EmployeeInterface } from "../employee.interface";
import { CustomError } from "../../../utils/custom.error.util";

class EmployeeRepository implements EmployeeInterface {
    private constructor(readonly dbClient: PrismaClient){}

    static build(dbClient: PrismaClient) {
        return new EmployeeRepository(dbClient)
    }

    async create(employee: Employee): Promise<EmployeeAttributesType> {
        if(employee.company_id == null || employee.company_id == undefined)
            // throw new Error('É necessário que o funcionário tenha o identificador da empresa em que trabalha!')
            throw new CustomError(400)

        return await this.dbClient.employee.create({
            data: {
                name: employee.name,
                email: employee.email,
                password: employee.password,
                company_id: employee.company_id
            }
        })
    }

    async find_one(id: string, company_id: string): Promise<EmployeeAttributesType | null> {
        return await this.dbClient.employee.findUnique({
            where: {
                id,
                company_id
            }
        })
    }

    async find_one_by_credentials(email: string): Promise<EmployeeAttributesType | null> {
        return await this.dbClient.employee.findUnique({
            where: {
                email
            }
        })
    }

    async find_all(company_id: string): Promise<EmployeeAttributesType[] | []> {
        return await this.dbClient.employee.findMany({
            where: {
                company_id
            }
        })
    }

    async update(employee: Employee): Promise<EmployeeAttributesType> {
        return await this.dbClient.employee.update({
            data: {
                name: employee.name,
                email: employee.email,
                password: employee.password
            },
            where: {
                id: employee.id,
                company_id: employee.company_id
            }
        })
    }

    async delete(id: string, company_id: string): Promise<EmployeeAttributesType> {
        return await this.dbClient.employee.delete({
            where: {
                id,
                company_id
            }
        })
    }
}

export { EmployeeRepository }