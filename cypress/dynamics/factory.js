
import faker from 'faker';

export default class Factory {

    static gerarProdutoBody(){
        
        return  {
            "nome": `${faker.commerce.product} da linda cor ${faker.commerce.color()} e tambem possui ${faker.commerce.productAdjective}`,
            "preco": 470,
            "descricao": "Mouse",
            "quantidade": 381
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
    static produtoNomeVazio(){
        return  {
            "nome": "",
            "preco": 470,
            "descricao": "Mouse",
            "quantidade": 381
          }
    }
    static produtoDescricaoVazio(){
        return  {
            "nome": "Logitech MX Vertical",
            "preco": 470,
            "descricao": "",
            "quantidade": 381
          }
    }
    static produtoSemNome(){
        return  {
            "preco": 470,
            "descricao": "asdasd",
            "quantidade": 381
          }
    }
    static gerarUsuariosValido(){
        return {
            "nome": "Fulano da Silva",
            "email": `Qa${faker.internet.email()}`, 
            "password": "teste",
            "administrador": "true"
          }
    }
    static gerarUsuariosValidoNoAdm(){
        return {
            "nome": "Fulango da Silva",
            "email": `gabriel@qa.com.br`, 
            "password": "teste",
            "administrador": "false"
          }
    }

    static gerarUsuariosInvalido(){
        return {
            "nome": "Fulano da Silva",
            "email": "beltrano@qa.com.br",
            "password": "teste",
            "administrador": "true"
          }
    }
}