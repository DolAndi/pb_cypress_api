/// <reference types="cypress" />

import Factory from "../dynamics/factory.js"

var bearer

describe("Testes na API ServeRest", () => {

    it("Deve trazer um usuario valido e uma sequencia de invalidos", () => {
        cy.fixture("loginCredentials").then((user) => {
            cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property("authorization")
                bearer = res.body.authorization
            })
            cy.logar(user.emailEmBranco).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property("email").to.be.equal("email não pode ficar em branco")
            })
            cy.logar(user.semCampoEmail).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property("email").to.be.equal("email é obrigatório")
            })
            cy.logar(user.senhaEmBranco).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('password').to.be.equal("password não pode ficar em branco")
            })
            cy.logar(user.semCampoSenha).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property("password").to.be.equal("password é obrigatório")
            })
        })
    })
    it("Deve efetuar um cadastro com status code 201 e deve invalidar outro com status code 400", () =>{
        let usuarioValido = Factory.gerarUsuarioValido()
        let usuarioInvalido = Factory.gerarUsuarioInvalido()

        cy.cadastrarUsuario(usuarioValido).then(res => {
            expect(res.status).to.be.equal(201);
        })
        cy.cadastrarUsuario(usuarioInvalido).then(res => {
            expect(res.status).to.be.equal(400);
        })
    })
    it("Deve cadastrar produto corretamente possuindo status code 201 e exibir propriedade message", () =>{
        let produto = Factory.gerarProduto()

        cy.cadastrarProduto(bearer, produto).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property("message").equal("Cadastro realizado com sucesso")
        })
    })
    it("Deve realizar teste de contrato sobre a requisição GET na rota /produto", () => {
        cy.buscarProdutos().then( res => {
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, "get_produtos", 200).then(validacao => { //res = resposta da api, nome da pasta na schema, nome do arquivo json
                expect(validacao).to.be.equal("Contrato validado!")
            })
        })
    })
})