import { DeleteEmployeeOutputDTO, EmployeeInterface, EmployeeValidatedOutputDTO, SaveEmployeeOutputDTO, UpdateEmployeeOutputDTO, ViewAllEmployeeOutputDTO, ViewOneEmployeeOutputDTO } from "../employee.interface";
import { EmployeeRepository } from "../../../repositories/employee/implementation/employee.repository"
import { Employee } from "../../../entities/Employee";
import { verifyHashedPassword } from "../../../utils/bcrypt.util";
import { CustomError } from "../../../utils/custom.error.util";

class EmployeeService implements EmployeeInterface {
    private constructor(readonly repository: EmployeeRepository){}

    static build(repository: EmployeeRepository) {
        return new EmployeeService(repository)
    }

    async save(name: string, email: string, password: string, company_id: string): Promise<SaveEmployeeOutputDTO> {
        const employee = Employee.create({
            name,
            email,
            password,
            company_id
        })

        const savedEmployee = await this.repository.create(employee)

        const DTO:SaveEmployeeOutputDTO = {
            id: savedEmployee.id,
            name: savedEmployee.name,
            email: savedEmployee.email
        }

        return DTO
    }

    async view_one(id: string, company_id: string): Promise<ViewOneEmployeeOutputDTO | null> {
        const foundEmployee = await this.repository.find_one(id, company_id)

        if(!foundEmployee) return null


        const DTO:ViewOneEmployeeOutputDTO = {
            id: foundEmployee.id,
            name: foundEmployee.name,
            email: foundEmployee.email,
            password: foundEmployee.password
        }

        return DTO
    }

    async check_credentials(email: string, password: string): Promise<EmployeeValidatedOutputDTO> {
        const foundEmployee = await this.repository.find_one_by_credentials(email)
        
        if(!foundEmployee) 
            throw new CustomError(400, "E-mail incorreto!")
        
        const isValidPassword = await verifyHashedPassword(password, foundEmployee.password)

        if(!isValidPassword) 
            throw new CustomError(400, "Senha incorreta!")

        const DTO:EmployeeValidatedOutputDTO = {
            id: foundEmployee.id,
            name: foundEmployee.name,
            email: foundEmployee.email,
            company_id: foundEmployee.company_id
        }

        return DTO
    }

    async view_all(company_id: string): Promise<[] | ViewAllEmployeeOutputDTO[]> {
        const foundEmployees = await this.repository.find_all(company_id)

        const DTO:ViewAllEmployeeOutputDTO[] = foundEmployees.map(employee => {
            return {
                id: employee.id,
                name: employee.name,
                email: employee.email
            }
        })

        return DTO
    }

    async update(id: string, name: string, email: string, password: string, company_id: string): Promise<UpdateEmployeeOutputDTO> {
        const employee = Employee.create({
            id,
            name,
            email,
            password,
            company_id
        })

        const updatedEmployee = await this.repository.update(employee)

        const DTO: UpdateEmployeeOutputDTO = {
            name: updatedEmployee.name,
            email: updatedEmployee.email
        }

        return DTO
    }

    async delete(id: string, company_id: string): Promise<DeleteEmployeeOutputDTO> {
        const deletedEmployee = await this.repository.delete(id, company_id)

        const DTO: DeleteEmployeeOutputDTO = {
            name: deletedEmployee.name,
            email: deletedEmployee.email
        }

        return DTO
    }

}

export { EmployeeService }