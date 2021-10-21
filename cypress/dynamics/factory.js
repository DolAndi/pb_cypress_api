const faker = require('faker');



const name = faker.commerce.productName();
const email = faker.internet.exampleEmail();

export default class Factory {
    
    static gerarProdutoCompleto() {
        return{
            
            "nome": name,
            "preco": faker.datatype.number({ min: 1}),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number({ min: 1}),
        }
    }
    
    static gerarUsuarioCompleto() {
        return{ 

            "nome": faker.name.findName(),
            "email": email,
            "password": faker.internet.password(),
            "administrador": faker.datatype.boolean().toString(), //true ou false => "true" or "false"
        }
    }
}