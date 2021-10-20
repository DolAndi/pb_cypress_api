import Factory from '../dynamics/factory.js'; 

<reference types="cypress" />



var bearer

describe('Testes na api serverest', () => {


///Teste POST Login
    it.only('Deve logar em um usuario valido', () => {

        cy.fixture('loginCredentials').then((user) =>{
            cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
            })
        })
            
    })

     it('Deve logar em um usuario invalido', () => {

        cy.fixture('loginCredentials').then((user) =>{
            cy.logar(user.emailEmBranco).then( res => {
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                bearer = res.body.authorization
            })
        })
            
    })

///Teste POST Produto

    it('Deve cadastrar um produto já cadastrado', () => {
        cy.cadastrarProduto(bearer).then(res  =>{
            let produto = {
                "nome":"Caneta branca"
                "preço":470
                "descrição":"caneta"
                "quantidade": 301
            }
            cy.cadastrarProduto(bearer,produto).then(res =>{
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
            })

        })
    })
    it.only('Deve cadastrar um novo produto com sucesso', () => {
        cy.cadastrarProduto(bearer).then(res  =>{
            let produto = Factory.gerarProdutoBody
            cy.cadastrarProduto(bearer,produto).then(res =>{
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('message', '_id')
            })

        })
    })

// Teste POST Usuario
    it('Deve cadastrar um user já cadastrado', () => {
        cy.cadastrarUsuario(usuarios).then(res  =>{
            let usuarios = {
                    "nome": "Fulano da Silva",
                    "email": "beltrano@qa.com.br",
                    "password": "teste",
                    "administrador": "true"               
            }
            cy.cadastrarUsuario(usuarios).then(res =>{
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
            })

        })
    })
    it.only('Deve cadastrar um novo user com sucesso', () => {
        cy.cadastrarUsuario(usuarios).then(res  =>{
            let usuarios = Factory.gerarUserBody
            cy.cadastrarUsuario(usuarios).then(res =>{
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('message', '_id')
            })

        })
    })

})

///Teste POST Carrinho
    it.only('Deve cadastrar carrinho valido', () => {

        cy.fixture('carrinhoCredentials').then((produto) =>{
            cy.cadastrarCarrinho(produto.produtoValido).then( res => {
                expect(res.status).to.equal(201)
                expect(res.body).to.have.property('message', '_id')
                bearer = res.body.authorization
            })
        })
            
    })

     it.only('Deve cadastrar um carrinho invalido', () => {

        cy.fixture('carrinhoCredentials').then((produto) =>{
            cy.cadastrarCarrinho(produto.produtoSemId).then( res => {
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                bearer = res.body.authorization
            })
        })
            
    })