/// <reference types="cypress" />
import Factory from '../fixtures/factory'
var bearer

describe('Testes na api serverest', () => {

    it.only('Deve trazer um usuário administrador e realizar login com sucesso', () => {
        cy.buscarUsuarioAdmin().then( res => {
            cy.wrap({email: res.email, password: res.password}).as('usuarioParaLogin')
        })
        cy.get('@usuarioParaLogin').then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
            })
        })
    })

    it('Deve trazer um usuário inválido de um json e realizar login com falha', () => {
        cy.fixture('failCredenciais').then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.equal(401)
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.be.equal('Email e/ou senha inválidos')
            })
        })
    })

    it.only('Deve realizar teste de contrato sobre a requisição POST na rota /produto', () => {
        let produto = Factory.retornaProduto("valido")
        cy.cadastrarProduto(produto, bearer).then( res => {
            expect(res.status).to.equal(201)
            cy.validarContrato(res, "post-produto", 201).then( valid => {
                if(expect(valid).to.be.true) cy.log("Validado contrato!")
            })
        })
    })

})

// Um cenário positivo e um negativo para os verbos e rotas: 
// POST: /login => o caso negativo
// POST: /usuarios
// POST: /produtos