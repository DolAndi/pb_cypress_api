import faker from 'faker';

export default class Factory {

    static gerarUsuarioBody() {
        return {
            "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
            "email": `${faker.internet.email()}`,
            "password": `${faker.internet.password()}`,
            "administrador": "true"
        }
    }

    static usuarioEmailJaCadastrado() {
        return{
            "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
            "email": "augusto@qa.com",
            "password": `${faker.internet.password()}`,
            "administrador": "true"
        }
    }

    static gerarProdutoBody() {
        return {
            "nome": `${faker.commerce.productName()}`,
            "preco": `${faker.datatype.number()}`,
            "descricao": `${faker.commerce.productDescription()}`,
            "quantidade": `${faker.datatype.number()}`
        }
    }

    static gerarProdutoInvalido() {
        return {
            "nome": `${faker.datatype.number()}`,
            "preco": `${faker.commerce.productName()}`,
            "descricao": `${faker.commerce.productDescription()}`,
            "quantidade": `${faker.commerce.productName()}`
        }
    }

    static UsuarioNaoAdmin() {
        return {
            "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
            "email": `${faker.internet.email()}`,
            "password": "senha",
            "administrador": "false"
        }
    }
}