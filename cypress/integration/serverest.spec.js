/// <reference types="cypress" />

import Factory from "../dynamics/factory"

var bearer

describe('teste na api serverest', () => {
    it('deve trazer um usuario adminsitrador para login', () => {
        //cy.buscarUsuarioAdmin().then( res => {
        //   cy.wrap({email: res.email, password: res.password}).as('usuarioParaLogin')
        //})
        //cy.get('@usuarioParaLogin').then( user => {}

        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.valido).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
            })

        })
    })

    it('deve cadastrar um produto valido com sucesso', () => {

        let produto = Factory.gerarProdutoBody()

        cy.cadastrarProduto(bearer, produto).then ( res => {
            expect(res.status).to.equal(201)
            expect(res.body).to.have.all.keys('message', '_id')

        })

    })

    it('Deve realizar um login sem informar o email', () => {
        cy.fixture('loginCredentials').then((user) =>{
            cy.logar(user.semEmail).then(res => {
                expect(res.status).to.equal(400)
            })
        })
    })

    it('Deve realizar um login sem informar a senha', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.semSenha).then(res =>{
                expect(res.status).to.equal(400)
            })
        })
    })

    it('Deve realizar um login com a senha incorreta', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.senhaInvalida).then(res =>{
                expect(res.status).to.equal(401)

            })
        })
    })

    //it('Deve cadastrar um produto invalido', () => {
        //cy.fixture('cadastrarProduto').then(res => {

        //})
        


    it('Deve realizar teste de contrato sobre a requisição GET na rota/produto', () => {
        cy.buscarProdutos().then( res => {
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res,'get_produtos', 200).then( validacao =>{
                expect(validacao).to.be.equal('contrato validado!')
            })
        })
    })

})

