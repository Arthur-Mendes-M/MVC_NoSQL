const codes = {
    200: {
        name: "Tudo certo!",
        description: "A requisição foi realizada com sucesso.",
        success: true
    },
    201: {
        name: "Criação realizada!",
        description: "A requisição realizou a criação da informação com sucesso.",
        success: true
    },
    204: {
        name: "Sucesso!",
        description: "Tudo ocorreu como esperado. A ação solicitada não possui retorno.",
        success: true
    },
    400: {
        name: "Solicitação incorreta!",
        description: "O servidor não pode processar a solicitação por ter sido enviada incorretamente.",
        success: false
    },
    401: {
        name: "Erro de autorização!",
        description: "As informações de autorização passadas não estão corretas.",
        success: false
    },
    404: {
        name: "Rota da solicitação não foi encontrada!",
        description: "O servidor não possui nenhuma rota de tratativa para a solicitação realizada.",
        success: false
    },
    409: {
        name: "Conflito!",
        description: "O servidor identificou um conflito em processar a solicitação desejada.",
        success: false
    },
    500: {
        name: "Algo deu errado!",
        description: "Ocorreu um erro interno no servidor, tente novamente.",
        success: false
    }
}

// type CustomErrorAttributes = {
//     message?: string, 
//     options?: {
//         cause: unknown
//     },
//     code?: number,
//     error?: string
// }

class CustomError extends Error {
    error: string
    code: number
    description: string
    status: boolean

    time: Date
    custom_message: string | false

    constructor(code: keyof typeof codes, message?: string) {        
        super(codes[code].description)
        
        this.error = codes[code].name
        this.code = code
        this.description = codes[code].description
        this.status = codes[code].success

        this.time = new Date()

        message ? this.custom_message = message : this.custom_message = false
    }

    toString() {
        const log = `\n
            --------------------------------
            Código: ${this.code}
            Descrição: ${this.description}
            Requisição bem sucedida? ${this.status ? 'Sim' : 'Não'}

            Ocorreu em: ${this.time}
            --------------------------------
        `

        return log.replace(/^\s+/gm, '')
    }
}

export { CustomError }