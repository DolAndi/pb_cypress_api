import faker from 'faker'

export default class Factory {
    static gerarProdutoBody() {

        return {
            "nome": `${faker.commerce.productAdjective()} ${faker.commerce.color()}`,
            "preco": faker.commerce.price(),
            "descricao": "Rosa Giz",
            "quantidade": 100            
        }
    }
}