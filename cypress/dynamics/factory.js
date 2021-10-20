import faker from 'faker';

export default class Factory{
    static bodyProduto(){
        return{
            "nome": `${faker.commerce.product()} ${faker.commerce.color()}`,
            "preco": 10,
            "descricao": "Canetas coloridas",
            "quantidade": 500
        }
    }
}