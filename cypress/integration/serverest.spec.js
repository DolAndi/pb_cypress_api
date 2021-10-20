/// <reference types="cypress" />

import Factory from "../dynamics/factory.js"

var bearer

describe("Testes na API ServeRest", () => {

    it("Deve trazer um usuário administrador para login", () => {
        cy.fixture("loginCredentials").then((user) => {
            cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property("authorization")
                bearer = res.body.authorization
            })
        })
    })
    it("Deve possuir status code 401 email em branco", () =>{
        cy.fixture("loginCredentials").then((user) => {
            cy.logar(user.emailEmBranco).then( res => {
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property("authorization")
                bearer = res.body.authorization
            })
        })
    })
    it("Deve cadastrar o usuario possuindo status code 201 e propriedade message", () =>{
        cy.cadastrarUsuario().then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property("message").to.be.equal("Cadastro realizado com sucesso")
        })
    })

    it("Deve cadastrar usuario existente(falhando) possuindo status code 400 e a propriedade message", () =>{
        cy.cadastrarErro().then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property("message").to.be.equal("Este email já está sendo usado")
        })
    })
    it("Deve cadastrar produto possuindo status 201 e propriedade message", () =>{

        let produto = Factory.gerarCorProduto

        cy.cadastrarProduto(bearer).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property("message").equal("Cadastro realizado com sucesso")
        })
    })
    it("Deve dar erro no cadastro de produto possuindo status code 400", () =>{
        cy.cadastrarProdutoErro(bearer).then(res => {
            expect(res.status).to.be.equal(400);
        })
    })
    //it("Deve cadastrar um novo carrinho", () => {
    //    cy.cadastroCarrinho(bearer)
    //})
})





