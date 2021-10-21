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
}