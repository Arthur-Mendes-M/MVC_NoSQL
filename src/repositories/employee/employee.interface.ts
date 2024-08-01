import { Employee, EmployeeAttributesType } from "../../entities/Employee"

interface EmployeeInterface {
    create(employee: Employee): Promise<EmployeeAttributesType>
    find_one(id: string, company_id: string): Promise<EmployeeAttributesType | null>
    find_one_by_credentials(email: string): Promise<EmployeeAttributesType | null>
    find_all(company_id: string): Promise<EmployeeAttributesType[] | []>
    update(employee: Employee): Promise<EmployeeAttributesType>
    delete(id: string, company_id: string): Promise<EmployeeAttributesType>
}

export { EmployeeInterface }