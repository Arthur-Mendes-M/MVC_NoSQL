import { Product, ProductAttributesType } from "../../entities/Product";

interface ProductInterface {
    create(product: Product): Promise<ProductAttributesType>
    find_one(id: string, company_id: string): Promise<ProductAttributesType | null>
    find_all(company_id: string): Promise<ProductAttributesType[] | []>
    update(product: Product): Promise<ProductAttributesType>
    delete(id: string, company_id: string): Promise<ProductAttributesType>
}

export { ProductInterface }