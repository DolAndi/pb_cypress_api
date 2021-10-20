import faker from 'faker'

export default class factory{
    
    static gerarProdutoBody() {
        return {
            "nome": `${faker.commerce.product()} ${faker.commerce.color()}`,
            "preco": faker.commerce.price(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number()
        }
    }

    static gerarUsuarioBody() {
        return {
                "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                "email": `${faker.internet.email()}`,
                "password": faker.internet.password(),
                "administrador": "true"
        }
    }

    static gerarUsuarioInvalido() {
        return {
            "nome": "Fulano da Silva",
            "email": "beltrano@qa.com.br",
            "password": "teste",
            "administrador": "true"
        }
    }
    static gerarProdutoSemNome() {
        return {
            "preco": faker.commerce.price(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number()
        }
    }
}


    
   


