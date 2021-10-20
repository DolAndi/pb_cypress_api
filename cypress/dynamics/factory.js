import faker from "faker"


export default class Factory{
    static gerarProdutoBody(){
        return{
            "nome": `${faker.commerce.productAdjective()}, ${faker.commerce.product()}, ${faker.commerce.color()}`,
            "preco": faker.commerce.price(),
            "descricao": `${faker.commerce.productDescription()}`,
            "quantidade": faker.datatype.number()
        }
    }

    static gerarUsuarioBody(){
        return{
            "nome": `${faker.name.firstName()}`,
            "email": `${faker.name.firstName()}@qa.com.br`,
            "password": `${faker.internet.password()}`,
            "administrador": "true"
        }
    }
}