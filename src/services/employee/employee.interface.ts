type SaveEmployeeOutputDTO = {
    id?: string,
    name: string,
    email: string
}

type ViewOneEmployeeOutputDTO = {
    id?: string,
    name: string,
    email: string,
    password: string
}

type EmployeeValidatedOutputDTO = {
    id?: string,
    name: string,
    email: string,
    company_id?: string
}

type ViewAllEmployeeOutputDTO = {
    id?: string,
    name: string,
    email: string
}

type UpdateEmployeeOutputDTO = {
    id?: string,
    name: string,
    email: string
}

type DeleteEmployeeOutputDTO = {
    id?: string,
    name: string,
    email: string
}


interface EmployeeInterface {
    save(name: string, email: string, password: string, company_id: string): Promise<SaveEmployeeOutputDTO>
    view_one(id: string, company_id: string): Promise<ViewOneEmployeeOutputDTO | null>
    check_credentials(email: string, password: string): Promise<EmployeeValidatedOutputDTO>
    view_all(company_id: string): Promise<ViewAllEmployeeOutputDTO[] | []>
    update(id: string, name: string, email: string, password: string, company_id: string): Promise<UpdateEmployeeOutputDTO>
    delete(id: string, company_id: string): Promise<DeleteEmployeeOutputDTO>
}

export { 
    EmployeeInterface, 
    ViewAllEmployeeOutputDTO,
    ViewOneEmployeeOutputDTO,
    EmployeeValidatedOutputDTO,
    SaveEmployeeOutputDTO, 
    UpdateEmployeeOutputDTO, 
    DeleteEmployeeOutputDTO
}