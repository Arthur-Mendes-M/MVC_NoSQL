import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.util";
import { ChangeStockSchema, PriceSchema, ValidStringSchema } from "../utils/zod.util";
import { CustomError } from "../utils/custom.error.util";

// get attributes of Product Prisma entity
type ProductAttributesType = Prisma.Args<typeof prisma.product, 'create'>['data']

class Product {
    private constructor(readonly attributes: ProductAttributesType){}

    static create(product: ProductAttributesType) {
        const { price } = product

        PriceSchema.parse(price)

        return new Product(product)
    }

    get id() { return this.attributes?.id }
    get company_id() { return this.attributes.company_id }

    get name() { return this.attributes?.name }
    set name(newName: string) {
        ValidStringSchema.parse(newName)

        this.attributes.name = newName
    }

    get description() { return this.attributes?.description }
    set description(newDescription: string) {
        ValidStringSchema.parse(newDescription)

        this.attributes.description = newDescription
    }
    
    get price() { return this.attributes?.price }
    set price(newPrice: number) { 
        PriceSchema.parse(newPrice)

        this.attributes.price = newPrice
    }
    
    get quantity_in_stock() { return this.attributes?.quantity_in_stock }

    increaseStock(amount: number) {
        ChangeStockSchema.parse(amount)

        this.attributes.quantity_in_stock += amount
    }

    decreaseStock(amount: number) {
        ChangeStockSchema.parse(amount)

        if(this.attributes.quantity_in_stock < amount) {
            // throw new Error('Quantidade em estoque insuficiente. ')
            throw new CustomError(409, `O produto de nome ${this.attributes.name} não possui estoque suficiente para essa venda.`)
        }

        this.attributes.quantity_in_stock -= amount
    }
}

export { Product, ProductAttributesType }