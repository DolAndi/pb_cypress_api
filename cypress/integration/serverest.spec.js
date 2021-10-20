/// <reference types="cypress" />

import Factory from '../dynamics/factory.js'

var bearer

describe('Testes na api serverest', () => {
    it('Deve trazer um usuário administrador para login', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).has.property('message').to.be.equal('Login realizado com sucesso')
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
            })
        })
    })

    it('Deve verificar possíveis falhas ao tentar logar no sistema', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.loginInvalido(user.emailEmBranco).then( res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('email')
                expect(res.body.email).to.be.equal('email não pode ficar em branco')
            })

            cy.loginInvalido(user.senhaEmBranco).then( res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('password')
                expect(res.body.password).to.be.equal('password não pode ficar em branco')
            })

            cy.loginInvalido(user.semCampoEmail).then( res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('email')
                expect(res.body.email).to.be.equal('email é obrigatório')
            })

            cy.loginInvalido(user.semCampoSenha).then( res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('password')
                expect(res.body.password).to.be.equal('password é obrigatório')
            })
        })
    })

    /**********************************************************************************************/

    it('Deve cadastrar um novo usuário, e verificar suas propriedades',() =>{
        
        let usuarioNovo = Factory.gerarNovoUsuario()

        cy.cadastroUsuario(usuarioNovo).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message')
            expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).has.property('_id')
        })
    })

    it('Deve verificar possíveis falhas ao tentar cadastrar um novo usuário', () =>{
        cy.fixture('cadastroCredentials').then((user) => {
            cy.cadastrarUsuarioInvalido(user.nomeEmBranco).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('message')        
            })
            
            cy.cadastrarUsuarioInvalido(user.emailEmBranco).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('message')        
            })

            cy.cadastrarUsuarioInvalido(user.semCampoEmail).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('message')        
            })

            cy.cadastrarUsuarioInvalido(user.senhaEmBranco).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('message')        
            })
        
            cy.cadastrarUsuarioInvalido(user.semCampoSenha).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('message')        
            })
        })    
    })

    /**********************************************************************************************/

    it('Deve cadastrar produto com sucesso e verificar suas propriedades ', () =>{
        let produto = Factory.gerarProdutoBory()

        cy.cadastrarProduto(bearer, produto).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message')
            expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
        })
    })

    it('Deve cadastrar um produto com nome já existente no sistema, e verificar suas propriedades', () =>{
        cy.produtoEmUso(bearer).then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message')
            expect(res.body.message).to.be.equal('Já existe produto com esse nome')
        })
    })
    
})