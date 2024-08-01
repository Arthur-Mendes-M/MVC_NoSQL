import { Company } from "../../../entities/Company";
import { CompanyRepository } from "../../../repositories/company/implementation/company.repository";
import { Address, CompanyInterface, Contacts, DeleteCompanyOutputDTO, SaveCompanyOutputDTO, UpdateCompanyOutputDTO, ViewCompanyOutputDTO } from "../company.interface";

class CompanyService implements CompanyInterface {
    private constructor(readonly repository: CompanyRepository){}

    static build(repository: CompanyRepository){
        return new CompanyService(repository)
    }

    async save(name: string, description: string, cnpj: string, contacts: Contacts, address: Address): Promise<SaveCompanyOutputDTO> {
        const company = Company.create({
            name,
            description,
            cnpj,
            address,
            contacts
        })

        const savedCompany = await this.repository.create(company)

        const DTO: SaveCompanyOutputDTO = {
            id: savedCompany?.id,
            name: savedCompany.name,
            description: savedCompany.description
        }

        return DTO
    }

    async view_one(id: string): Promise<ViewCompanyOutputDTO | null> {
        const foundCompany = await this.repository.find_one(id)

        if(!foundCompany) return null

        const DTO: ViewCompanyOutputDTO = {
            name: foundCompany.name,
            description: foundCompany.description,
            cnpj: foundCompany.cnpj,
            address: {
                neighborhood: foundCompany.address.neighborhood ?? "",
                state: foundCompany.address.state ?? "",
                street: foundCompany.address.street ?? "",
                street_number: foundCompany.address.street_number ?? 0,
                zip: foundCompany.address.zip ?? ""
            },
            contacts: {
                principal_cellphone_number: foundCompany.contacts.principal_cellphone_number ?? "",
                principal_email: foundCompany.contacts.principal_email ?? "",
                principal_phone_number: foundCompany.contacts.principal_phone_number ?? "",
                second_cellphone_number: foundCompany.contacts.second_cellphone_number ?? "",
                second_email: foundCompany.contacts.second_email ?? "",
                second_phone_number: foundCompany.contacts.second_phone_number ?? ""
            }
        }

        return DTO
    }

    async view_all(): Promise<[] | ViewCompanyOutputDTO[]> {
        const foundCompanies = await this.repository.find_all()

        const DTO: ViewCompanyOutputDTO[] = foundCompanies.map(company => {
            return {
                name: company.name,
                cnpj: company.cnpj,
                description: company.description,
                address: {
                    state: company.address.state ?? "",
                    neighborhood: company.address.neighborhood ?? "",
                    street: company.address.street ?? "",
                    street_number: company.address.street_number ?? 0,
                    zip: company.address.zip ?? "",
                },
                contacts: {
                    principal_cellphone_number: company.contacts.principal_cellphone_number ?? "",
                    principal_email: company.contacts.principal_email ?? "",
                    principal_phone_number: company.contacts.principal_phone_number ?? "",
                    second_cellphone_number: company.contacts?.second_cellphone_number ?? "",
                    second_email: company.contacts?.second_email ?? "",
                    second_phone_number: company.contacts?.second_phone_number ?? "",
                },
                id: company.id
            }
        })

        return DTO
    }

    async update(id: string, name: string, description: string, cnpj: string, contacts: Contacts, address: Address): Promise<UpdateCompanyOutputDTO> {
        const company = Company.create({
            id,
            name,
            address,
            cnpj,
            contacts,
            description
        })
        
        const updatedCompany = await this.repository.update(company)

        const DTO: UpdateCompanyOutputDTO = {
            name: updatedCompany.name,
            description: updatedCompany.description,
            cnpj: updatedCompany.cnpj,
            address: {
                state: updatedCompany.address.state ?? "",
                neighborhood: updatedCompany.address.neighborhood ?? "",
                street: updatedCompany.address.street ?? "",
                street_number: updatedCompany.address.street_number ?? 0,
                zip: updatedCompany.address.zip ?? "",
            },
            contacts: {
                principal_cellphone_number: updatedCompany.contacts.principal_cellphone_number ?? "",
                principal_email: updatedCompany.contacts.principal_email ?? "",
                principal_phone_number: updatedCompany.contacts.principal_phone_number ?? "",
                second_cellphone_number: updatedCompany.contacts?.second_cellphone_number ?? "",
                second_email: updatedCompany.contacts?.second_email ?? "",
                second_phone_number: updatedCompany.contacts?.second_phone_number ?? "",
            },
        }

        return DTO
    }

    async delete(id: string): Promise<DeleteCompanyOutputDTO> {
        const deletedCompany = await this.repository.delete(id)

        const DTO: DeleteCompanyOutputDTO = {
            name: deletedCompany.name
        }

        return DTO
    }
}

export { CompanyService }