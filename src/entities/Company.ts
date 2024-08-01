import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.util";

type CompanyAttributesType = Prisma.Args<typeof prisma.company, 'create'>['data']

type AddressType = CompanyAttributesType['address']
type ContactsType = CompanyAttributesType['contacts']

class Company {
    private constructor(readonly attributes: CompanyAttributesType){}

    static create(company: CompanyAttributesType) {
        return new Company(company)
    }

    get id() { return this.attributes.id }
    get name() { return this.attributes.name }
    get description() { return this.attributes.description }
    get cnpj() { return this.attributes.cnpj }
    get address() { return this.attributes.address }
    get contacts() { return this.attributes.contacts }
    get employees() { return this.attributes.employees }
}

export { Company, CompanyAttributesType, AddressType, ContactsType }