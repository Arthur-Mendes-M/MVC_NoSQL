import { PrismaClient } from "@prisma/client";
import { Product, ProductAttributesType } from "../../../entities/Product";
import { ProductInterface } from "../product.interface";
import { CustomError } from "../../../utils/custom.error.util";

class ProductRepository implements ProductInterface {
    private constructor(readonly dbClient: PrismaClient) {}

    static build(dbClient: PrismaClient) {
        return new ProductRepository(dbClient)
    }

    async create(product: Product): Promise<ProductAttributesType> {
        if(product.company_id == null || product.company_id == undefined)
            // throw new Error("É necessário que o produto tenha o identificador da empresa em que esta sendo vendido!")
            throw new CustomError(400)

        return await this.dbClient.product.create({
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                quantity_in_stock: product.quantity_in_stock,
                company_id: product.company_id
            }
        })
    }

    async find_one(id: string, company_id: string): Promise<ProductAttributesType | null> {
        return await this.dbClient.product.findUnique({
            where: {
                id,
                company_id
            }
        })
    }

    async find_all(company_id: string): Promise<ProductAttributesType[] | []> {
        return await this.dbClient.product.findMany({
            where: {
                company_id
            }
        })
    }

    async update(product: Product): Promise<ProductAttributesType> {
        return await this.dbClient.product.update({
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                quantity_in_stock: product.quantity_in_stock
            },
            where: {
                id: product.id,
                company_id: product.company_id
            }
        })
    }

    async delete(id: string, company_id: string): Promise<ProductAttributesType> {
        return await this.dbClient.product.delete({
            where: {
                id,
                company_id
            }
        })
    }
}

export { ProductRepository }