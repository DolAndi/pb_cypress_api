import faker from 'faker'

export default class factory{
    
    static gerarProdutoBody() {
        return {
            "nome": `${faker.commerce.product()} ${faker.commerce.color()}`,
            "preco": faker.commerce.price(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number()
        }
    }

    static gerarProdutoSemNome() {
        return {
            "preco": faker.commerce.price(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number()
        }
    }

    static produtoExistente() {
        return {
            "nome": 'CD Supermcombo',
            "preco": 45,
            "descricao": "CD",
            "quantidade": 300
        }
    }

    static gerarUsuarioBody() {
        return {
                "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                "email": `${faker.internet.email()}`,
                "password": faker.internet.password(),
                "administrador": "true"
        }
    }

    static gerarUsuarioExistente() {
        return {
            "nome": "Fulano da Silva",
            "email": "beltrano@qa.com.br",
            "password": "teste",
            "administrador": "true"
        }
    }

    static usuarioSemAdmin() {
        return {
            "nome": "Fulanito da Silva",
            "email": "fulanosemadmin@qa.com",
            "password": "teste",
            "administrador": "false"
        }
    }
}

    
   


