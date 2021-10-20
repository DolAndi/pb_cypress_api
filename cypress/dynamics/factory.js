import faker from 'faker'

export default class factory {
    static gerarProdutoBory(){
        return{
                "nome": `${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.commerce.color()}`,
                "preco": 400,
                "descricao": `${faker.commerce.price()}`,
                "quantidade": 400
        }
    }
    static gerarNovoUsuario(){
        return{
            "nome": `${faker.name.firstName()} Teste`,
            "email":`${faker.name.firstName()}@qa.com`,
            "password": "teste",
            "administrador": "true"
        }
    }
}