const faker = require('faker');



//const name = faker.commerce.productName();
const email = faker.internet.exampleEmail();

export default class Factory {
    
    static gerarProdutoErrado() {
        return{
            
            "nome": 'name',
            "preco": faker.datatype.number({ min: 1}),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number({ min: 1}),
        }
    }

    static gerarProdutoExistente(){
        return {
            
            "nome": "Logitech MX Vertical",
            "preco": 470,
            "descricao": "Mouse",
            "quantidade": 381
              
        }
    }

    static gerarProdutoCorreto() {
        return{
            
            "nome": `${faker.commerce.productName()}`,
            "preco": faker.datatype.number({ min: 1}),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number({ min: 1}),
        }
    }
    
    
    static gerarUsuarioEmailFixo() {
        return{ 

            "nome": faker.name.findName(),
            "email": "Loyce.Lebsack@example.net",
            "password": faker.internet.password(),
            "administrador": faker.datatype.boolean().toString(), //true ou false => "true" or "false"
        }
    }

    static gerarUsuarioCompleto() {
        return{ 

            "nome": faker.name.findName(),
            "email": faker.internet.exampleEmail(),
            "password": faker.internet.password(),
            "administrador": faker.datatype.boolean().toString(), //true ou false => "true" or "false"
        }
    }

    static gerarLogin() {
        return{
            "email": "Jennie.Emmerich11@example.net",
            "password": "VSu6cXsmrTSw3CN",
        }
    }

    static gerarLoginEmailOuSenhaInv() {
        return{
            "email": "Fulano@qa.com",
            "password": "123",
        }
    }
}