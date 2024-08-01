import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { CustomError } from "./custom.error.util";
require('dotenv').config()

function protectedRoute(request: Request, response: Response, next: NextFunction) {
    const authorizationHeader = request.headers?.authorization
    console.log('Rota protegida por autenticação')

    if(!authorizationHeader)
        throw new CustomError(401)

    const [, token] = authorizationHeader.split(' ')
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY ?? Math.random().toString(36))

    if(!decodedToken)
        throw new CustomError(401, "JWT inválido.")

    next()
}

export { protectedRoute }