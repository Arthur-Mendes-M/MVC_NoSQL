import { Router, Request, Response, NextFunction } from "express"
import { ProductController } from "./controllers/Product.controller"
import { EmployeeController } from "./controllers/Employee.controller"
import { CompanyController } from "./controllers/Company.controller"
import { CustomError } from "./utils/custom.error.util"

import { protectedRoute } from "./utils/auth.util"

const routes = Router()

routes.get('/', protectedRoute, (request: Request, response: Response) => {
    response.json('ok! :)').status(200)
})

// Products
routes.get('/products', protectedRoute, ProductController.listAllProducts)
routes.get('/products/:id', protectedRoute, ProductController.findOneProduct)
routes.post('/products', protectedRoute, ProductController.saveProduct)
routes.post('/products/buy/:id', protectedRoute, ProductController.buyProduct)
routes.post('/products/sell/:id', protectedRoute, ProductController.sellProduct)
routes.put('/products/:id', protectedRoute, ProductController.updateProduct)
routes.delete('/products/:id', protectedRoute, ProductController.deleteProduct)

// Employee
routes.get('/employees', protectedRoute, EmployeeController.listAllEmployees)
routes.get('/employees/:id', protectedRoute, EmployeeController.findOneEmployee)
routes.post('/employees/validate', EmployeeController.validateEmployee) // unprotected route -> to be possible validate an user
routes.post('/employees', protectedRoute, EmployeeController.saveEmployee)
routes.put('/employees/:id', protectedRoute, EmployeeController.updateEmployee)
routes.delete('/employees/:id', protectedRoute, EmployeeController.deleteEmployee)

// Company
routes.get('/companies', protectedRoute, CompanyController.listAllCompanies)
routes.get('/companies/:id', protectedRoute, CompanyController.findOneCompany)
routes.post('/companies', protectedRoute, CompanyController.saveCompany)
routes.put('/companies/:id', protectedRoute, CompanyController.updateCompany)
routes.delete('/companies/:id', protectedRoute, CompanyController.deleteCompany)


routes.use((error: Error | CustomError, request: Request, response: Response, next: NextFunction) => {
    if(error instanceof CustomError){
        console.log(`------ NOVO ERRO CUSTOMIZADO (${error.code}) ------`)
        console.log(error.toString())

        return response.json({
            error
        }).status(error.code ?? response.statusCode ?? 500).send()
    }

    console.log(`------ NOVO ERRO NÃO CUSTOMIZADO (${response.statusCode}) ------`)
    console.log(error)
    console.log(response.statusCode)

    return response.json({
        error
    }).status(response.statusCode ?? 500).send()
})

export { routes }