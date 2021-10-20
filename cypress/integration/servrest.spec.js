/// <reference types="cypress" />

import Factory from '../dynamics/factory'

var bearer 

describe('Teste na api serverest', () => {
    it('Deve trazer um usuário administrador para login', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.valido).then( res => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
            })
        }) 
    })

    it('Deve dar erro ao logar com possíveis erros de credenciais', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.emailEmBranco).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('email').to.be.equal('email não pode ficar em branco')
            })

            cy.logar(user.semCampoSenha).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('password').to.be.equal('password é obrigatório')
            })

            cy.logar(user.semCampoEmail).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('email').to.be.equal('email é obrigatório')
            })

            cy.logar(user.senhaEmBranco).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('password').to.be.equal('password não pode ficar em branco')
            })

            cy.logar(user.semCampos).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('email').to.be.equal('email é obrigatório')
                expect(res.body).to.have.property('password').to.be.equal('password é obrigatório')
            })
        })
    })
    
    it('Deve cadastrar usuario' , () => {

        let usuario = Factory.gerarUsuarioBody()

        cy.cadastrarUsuario(usuario).then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
        })
    })

    it('Deve dar erro ao cadastrar usuário já cadastrado' , () => {

        let usuario = Factory.gerarUsuarioInvalido()

        cy.cadastrarUsuario(usuario).then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('message').to.be.equal('Este email já está sendo usado')
        })
    })
   

    it('Deve cadastrar produto' , () => {

        let produto = Factory.gerarProdutoBody()

        cy.cadastrarProduto(bearer, produto).then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
        })
    
    })

    it('Deve dar erro ao cadastrar produto sem nome' , () => {

        let produto = Factory.gerarProdutoSemNome()

        cy.cadastrarProduto(bearer, produto).then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('nome').to.be.equal('nome é obrigatório')
        })
    
    })
}) 


