import faker from 'faker'

export default class Factory {

    static retornaProduto(tipo) {
        switch (tipo) {
            case "valido":
                return {
                    "nome": `${faker.commerce.productName()}`,
                    "preco": faker.commerce.price(),
                    "descricao": `${faker.commerce.productDescription()}`,
                    "quantidade": faker.datatype.number()
                }
            case "invalido":
                return {
                    "nome": "Logitech MX Vertical",
                    "preco": 470,
                    "descricao": "Mouse",
                    "quantidade": 381
                }     
            default:
                console.error("Tipo de produto não existe!")
        }
    }
}