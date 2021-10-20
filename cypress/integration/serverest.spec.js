/// <reference types="cypress" />

import Factory from '../dynamics/factory'

let bearer = ""

describe('testes de api serverest', () => {
    it('Deve realizar o login', () => { 
        cy.buscarUsuarioAdmin().then( usuario => { 
            cy.wrap({email: usuario.email, password: usuario.password}).as("usuarioParaLogin")
            //{email: "fulano@qa.com", "password": "teste"}   
        })
    
        cy.get('@usuarioParaLogin').then(user => {
            cy.logar(user).then( res => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property("authorization")
                bearer = res.body.authorization
             })
        })
    })

    it('Não deve realizar o login caso o email ou senha estejam em branco', () => { 
        cy.fixture('example.json').then(usuario => {
            cy.logar(usuario.emBranco).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.not.have.property("authorization")
                expect(res.body).to.not.have.property("message")
            })
        })
    })

    it('Deve cadastrar um novo produto', () => {

        let produto = Factory.gerarProduto()

        cy.cadastrarProduto(bearer, produto).then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property("message")
            expect(res.body).to.have.property("_id")         
        })
    })

    it('Não deve cadastrar um produto já existente', () => {
        cy.buscarProduto().then( product => { 
            cy.wrap({nome: product.nome, preco: product.preco, descricao: product.descricao, quantidade: product.quantidade}).as("produtoExistente")  
        })
        cy.get('@produtoExistente').then(produto => {
            cy.cadastrarProduto(bearer, produto).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.not.have.property("_id")
                expect(res.body.message).to.be.equal("Já existe produto com esse nome")         
            })
        })
    })

    it('Deve cadastrar um novo usuario', () => {

        let user = Factory.gerarUsuario()

        cy.cadastrarUsuario(user).then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property("message")
            expect(res.body).to.have.property("_id")
            expect(res.body.message).to.be.equal("Cadastro realizado com sucesso")         
        })
    })

    it('Não deve cadastrar um usuario ja existente', () => {
        cy.buscarUsuario().then( usuario => { 
            cy.wrap({nome: usuario.nome, email: usuario.email, password: usuario.password, administrador: usuario.administrador}).as("usuarioExistente")  
        })

        cy.get('@usuarioExistente').then(user => {
            cy.cadastrarUsuario(user).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.not.have.property("_id")
                expect(res.body.message).to.be.equal("Este email já está sendo usado")         
            })
        })
    })
})
