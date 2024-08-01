import { z } from "zod"

const EmailSchema = z.string().email({message: "Email inválido!"})
// type emailType = z.infer<typeof EmailSchema>

const PasswordSchema = z.string().min(7, {message: "A senha deve ter no mínimo 7 caracteres!"})
// type passwordType = z.infer<typeof PasswordSchema>

const PriceSchema = z.number().nonnegative({message: "O valor deve ser maior ou igual a 0!"})

const ChangeStockSchema = z.number().positive({message: "O valor deve ser maior que 0!"}).int({message: "O valor deve ser um número inteiro!"})

const ValidStringSchema = z.string().trim().min(1)

export { EmailSchema, PasswordSchema, PriceSchema, ChangeStockSchema, ValidStringSchema }