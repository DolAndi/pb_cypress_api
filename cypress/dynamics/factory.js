import faker from 'faker'

export default class Factory {
    static gerarProdutoBody() {

        return {
            "nome": `Giz ${faker.commerce.color()}`,
            "preco": 470,
            "descricao": "Rosa Giz",
            "quantidade": 100            
        }
    }
}