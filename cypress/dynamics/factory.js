
import faker from 'faker';

export default class Factory {

    static gerarProdutoBody(){
        
        return  {
            "nome": `${faker.commerce.product} da cor ${faker.commerce.color()} e tambem possui ${faker.commerce.productAdjective}`,  //tem que mudar o nome  toda a vez que testar pra passar no teste
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
    static gerarUsuariosValido(){
        return {
            "nome": "Fulano da Silva",
            "email": `Qa${faker.internet.email()}`, 
            "password": "teste",
            "administrador": "true"
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