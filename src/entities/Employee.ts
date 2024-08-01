import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.util";
import { hashPassword } from "../utils/bcrypt.util";
import { EmailSchema, PasswordSchema } from "../utils/zod.util"

// get attributes of Employee Prisma entity
type EmployeeAttributesType = Prisma.Args<typeof prisma.employee, 'create'>['data']

class Employee {
    private constructor(readonly attributes: EmployeeAttributesType){}

    static create(employee: EmployeeAttributesType) {
        const {
            email,
            password
        } = employee

        EmailSchema.parse(email)
        PasswordSchema.parse(password)

        return new Employee(employee)
    }

    get id() { return this.attributes?.id }
    
    get name() { return this.attributes?.name }
    set name(newName: string) { this.attributes.name = newName }

    get email() { return this.attributes?.email }
    set email(newEmail: string) {
        EmailSchema.parse(newEmail)

        this.attributes.email = newEmail
    }

    get password() { return hashPassword(this.attributes?.password) }
    set password(newPassword: string) {
        PasswordSchema.parse(newPassword)

        this.attributes.email = newPassword
    }

    get company() { return this.attributes?.company }
    get company_id() { return this.attributes?.company_id }
}

export { Employee, EmployeeAttributesType }