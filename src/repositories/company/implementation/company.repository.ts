import { PrismaClient } from "@prisma/client";
import { Company, CompanyAttributesType } from "../../../entities/Company";
import { CompanyInterface } from "../company.interface";

class CompanyRepository implements CompanyInterface {
    private constructor(readonly dbClient: PrismaClient) {}

    static build(dbClient: PrismaClient) {
        return new CompanyRepository(dbClient)
    }

    create(company: Company): Promise<CompanyAttributesType> {
        return this.dbClient.company.create({
            data: {
                name: company.name,
                description: company.description,
                cnpj: company.cnpj,
                address: company.address,
                contacts: company.contacts
            }
        })
    }

    find_one(id: string): Promise<CompanyAttributesType | null> {
        return this.dbClient.company.findUnique({
            where: {
                id
            }
        })
    }

    find_all(): Promise<CompanyAttributesType[] | []> {
        return this.dbClient.company.findMany()
    }
    
    update(company: Company): Promise<CompanyAttributesType> {
        return this.dbClient.company.update({
            data: {
                name: company.name,
                description: company.description,
                cnpj: company.cnpj,
                address: company.address,
                contacts: company.contacts
            },
            where: {
                id: company.id
            }
        })
    }

    delete(id: string): Promise<CompanyAttributesType> {
        return this.dbClient.company.delete({
            where: {
                id
            }
        })
    }
}

export { CompanyRepository }