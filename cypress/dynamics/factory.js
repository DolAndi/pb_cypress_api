import faker from "faker" //${faker.commerce.color}()

export default class Factory {

    static gerarProduto() {

        return {
            "nome": `${faker.commerce.product} ${faker.commerce.color()}`,
            "preco": 920,
            "descricao": "produto valioso",
            "quantidade": 20
        }
    }
    
    static produtoExistente(){
        return  {
            "nome": "Logitech MX Vertical",
            "preco": 470,
            "descricao": "Mouse",
            "quantidade": 381
          }
    }

    static produtoSemNome(){
        return  {
            "nome": "",
            "preco": 470,
            "descricao": "Mouse",
            "quantidade": 381
          }
    }

    static produtoSemDescricao(){
        return  {
            "nome": "Logitech MX Vertical",
            "preco": 470,
            "descricao": "",
            "quantidade": 381
          }
    }

    static gerarUsuarioValido() {
        return {
            "nome": "Ciclano da Silva Oliveira Paixoes Soares da Lima dos Santos da Mesopotamia Oriental",
            "email": `${faker.internet.email()}`, 
            "password": "teste",
            "administrador": "true"
          }
    }

    static gerarUsuarioInvalido() {
        return {
            "nome": "Fulano da Silva",
            "email": "beltrano@qa.com.br",
            "password": "teste",
            "administrador": "true"
          }
    }
}