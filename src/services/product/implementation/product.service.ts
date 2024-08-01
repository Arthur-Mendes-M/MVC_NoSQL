import { Product } from "../../../entities/Product";
import { ProductRepository } from "../../../repositories/product/implementation/product.repository";
import { CustomError } from "../../../utils/custom.error.util";
import { ProductInterface, DeleteProductOutputDTO, SaveProductOutputDTO, UpdateProductOutputDTO, ViewProductOutputDTO, BoughtProductOutputDTO, SoldProductOutputDTO } from "../product.interface";

class ProductService implements ProductInterface {
    private constructor(readonly repository: ProductRepository) {}

    static build(repository: ProductRepository) {
        return new ProductService(repository)
    }

    async save(name: string, description: string, price: number, company_id: string, stock?: number): Promise<SaveProductOutputDTO> {        
        // Format the data to Product instance
        const inputProduct = Product.create({
            name,
            description,
            price,
            quantity_in_stock: stock ?? 0,
            company_id
        })

        // Call repository passing the Product instance
        // Receive the repository response (if exists)
        const savedProduct = await this.repository.create(inputProduct)

        // Format the repository response (if exists)
        // or
        // Crate a DTO of this method (if repository response not exists)
        const DTO: SaveProductOutputDTO = {
            id: savedProduct.id,
            name: savedProduct.name,
            stock: savedProduct.quantity_in_stock
        }

        // Return DTO
        return DTO
    }

    async view_one(id: string, company_id: string): Promise<ViewProductOutputDTO | null> {
        const foundProduct = await this.repository.find_one(id, company_id)

        if(!foundProduct) return null

        const DTO:ViewProductOutputDTO = {
            name: foundProduct.name,
            description: foundProduct.description,
            price: foundProduct.price,
            stock: foundProduct.quantity_in_stock
        }

        return DTO
    }
    
    async view_all(company_id: string): Promise<ViewProductOutputDTO[]> {
        const foundProducts = await this.repository.find_all(company_id)

        const DTO: ViewProductOutputDTO[] = foundProducts.map(product => {
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.quantity_in_stock
            }
        })

        return DTO
    }

    async update(id: string, name: string, description: string, price: number, stock: number, company_id: string): Promise<UpdateProductOutputDTO> {
        const product = Product.create({
            id,
            name,
            description,
            price,
            quantity_in_stock: stock,
            company_id
        })

        const updatedProduct = await this.repository.update(product)

        const DTO: UpdateProductOutputDTO = {
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            stock: updatedProduct.quantity_in_stock
        }

        return DTO
    }

    async delete(id: string, company_id: string): Promise<DeleteProductOutputDTO> {
        const deletedProduct = await this.repository.delete(id, company_id)

        const DTO: DeleteProductOutputDTO = {
            name: deletedProduct.name
        }

        return DTO
    }

    async buy(id: string, amount: number, company_id: string): Promise<BoughtProductOutputDTO> {
        const foundProduct = await this.repository.find_one(id, company_id)
        
        if(!foundProduct)
            // throw new Error('Produto não encontrado!')
            throw new CustomError(404)

        const product = Product.create(foundProduct)
        product.increaseStock(amount)

        const updatedProduct = await this.repository.update(product)

        const DTO: BoughtProductOutputDTO = {
            name: updatedProduct.name,
            stock:updatedProduct.quantity_in_stock 
        }

        return DTO
    }

    async sell(id: string, amount: number, company_id: string): Promise<SoldProductOutputDTO> {
        const foundProduct = await this.repository.find_one(id, company_id)
        
        if(!foundProduct)
            // throw new Error('Produto não encontrado!')
            throw new CustomError(404)

        const product = Product.create(foundProduct)
        product.decreaseStock(amount)

        const updatedProduct = await this.repository.update(product)

        const DTO: BoughtProductOutputDTO = {
            name: updatedProduct.name,
            stock:updatedProduct.quantity_in_stock 
        }

        return DTO
    }
}

export { ProductService }