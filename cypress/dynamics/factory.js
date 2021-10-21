import faker from 'faker'

export default class Factory {
    static gerarProduto() {

        return {
            "nome": `${faker.commerce.product()} ${faker.commerce.color()} ${faker.commerce.productAdjective()}}`,
            "preco": 480,
            "descricao": `${faker.commerce.productDescription} ${faker.commerce.color()} `,
            "quantidade": 7
        }
    }

    static gerarUsuario() {

        return {
            "nome": `${faker.name.findName()} ${faker.name.findName()}`,
            "email": `${faker.internet.email()}`,
            "password": `${faker.internet.password()}`,
            "administrador": "true"
        }
    }
}