import { Address, Contacts } from "@prisma/client"

type SaveCompanyOutputDTO = {
    id?: string,
    name: string,
    description: string 
}

type ViewCompanyOutputDTO = {
    id?: string,
    name: string,
    description: string,
    cnpj: string,
    contacts: Contacts,
    address: Address
}

type UpdateCompanyOutputDTO = {
    name: string,
    description: string,
    cnpj: string,
    contacts: Contacts,
    address: Address
}

type DeleteCompanyOutputDTO = {
    name: string
}

interface CompanyInterface {
    save(name: string, description: string, cnpj: string, contacts: Contacts, address: Address): Promise<SaveCompanyOutputDTO>
    view_one(id: string): Promise<ViewCompanyOutputDTO | null>
    view_all(): Promise<ViewCompanyOutputDTO[] | []>
    update(id: string, name: string, description: string, cnpj: string, contacts: Contacts, address: Address): Promise<UpdateCompanyOutputDTO>
    delete(id: string): Promise<DeleteCompanyOutputDTO>
}

export {
    CompanyInterface,
    Address,
    Contacts,
    DeleteCompanyOutputDTO,
    SaveCompanyOutputDTO,
    UpdateCompanyOutputDTO,
    ViewCompanyOutputDTO
}