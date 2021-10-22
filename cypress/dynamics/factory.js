import faker from 'faker'

export default class factory {
    static gerarProdutoBody(tipo){
        switch(tipo){
            case "valido":
                return{
                    "nome": `${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.commerce.color()}`,
                    "preco": 400,
                    "descricao": `${faker.commerce.price()}`,
                    "quantidade": 400
                }      
            case "invalido":
                return{
                    "nome": "Logitech MX Vertical",
                    "preco": 470,
                    "descricao": "Mouse",
                    "quantidade": 381
                }     
            default:
                console.error("Tipo de produto não existe!")
            }   
    }
    
    static gerarNovoUsuario(tipo2){
        switch(tipo2){
            case "valido":    
                return{
                    "nome": `${faker.name.firstName()} Teste`,
                    "email":`${faker.name.firstName()}@qa.com`,
                    "password": "teste",
                    "administrador": "true"
                }
            case "invalido":
                return{
                    "nome": "Fulano da Silva",
                    "email": "beltrano@qa.com.br",
                    "password": "teste",
                    "administrador": "true"
                }
            }  
        }
    }
