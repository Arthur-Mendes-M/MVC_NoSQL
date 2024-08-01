type SaveProductOutputDTO = {
    id?: string,
    name: string,
    stock: number 
}

type ViewProductOutputDTO = {
    id?: string,
    name: string,
    description: string,
    price: number,
    stock: number
}

type UpdateProductOutputDTO = {
    name: string,
    description: string,
    price: number,
    stock: number
}

type BoughtProductOutputDTO = {
    name: string,
    stock: number
}

type SoldProductOutputDTO = {
    name: string,
    stock: number
}

type DeleteProductOutputDTO = {
    name: string
}

interface ProductInterface {
    save(name: string, description: string, price: number, company_id: string): Promise<SaveProductOutputDTO>
    view_one(id: string, company_id: string): Promise<ViewProductOutputDTO | null>
    view_all(company_id: string): Promise<ViewProductOutputDTO[] | []>
    update(id: string, name: string, description: string, price: number, stock: number, company_id: string): Promise<UpdateProductOutputDTO>
    delete(id: string, company_id: string): Promise<DeleteProductOutputDTO>

    buy(id: string, amount: number, company_id: string): Promise<BoughtProductOutputDTO>
    sell(id: string, amount: number, company_id: string): Promise<SoldProductOutputDTO>
}

export { 
    ProductInterface, 
    ViewProductOutputDTO, 
    SaveProductOutputDTO, 
    UpdateProductOutputDTO, 
    DeleteProductOutputDTO,
    BoughtProductOutputDTO,
    SoldProductOutputDTO
}