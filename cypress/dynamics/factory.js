import faker from "faker" //${faker.commerce.color}()

export default class Factory {

    static gerarCorProduto() {

        return {
            "nome": `Lapis ${faker.commerce.color}()`,
            "preco": 7,
            "descricao": "lapis colorido",
            "quantidade": 20
        }
    }
}