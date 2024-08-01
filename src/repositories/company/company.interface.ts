import { Company, CompanyAttributesType } from "../../entities/Company";

interface CompanyInterface {
    create(company: Company): Promise<CompanyAttributesType>
    find_one(id: string): Promise<CompanyAttributesType | null>
    find_all(): Promise<CompanyAttributesType[] | []>
    update(company: Company): Promise<CompanyAttributesType>
    delete(id: string): Promise<CompanyAttributesType>
}

export { CompanyInterface }