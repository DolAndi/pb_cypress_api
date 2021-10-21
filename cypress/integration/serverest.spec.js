/// <reference types="cypress"/>

import Factory from "../dynamics/factory.js"

var bearer

describe("REDO do Zero dos Testes para API ServeRest", () => {
    describe("Testes para LOGIN/USUARIOS", () => {
        it("Deve trazer um usuário com direito ADM para login", () => {
            cy.fixture("loginCredentials").then((usuario) => {
                cy.logar(usuario.valido).then(res => {
                    expect(res.statusCode === 200);
                    expect(res.body).to.have.property("message");
                    expect(res.body).to.have.property("authorization");
                    
                    bearer = res.body.authorization
                })
            })
        })
    
        it("Deve trazer um usuário com erro de login - sem email", () => {
            cy.fixture("loginCredentials").then((usuario) => {
                cy.logar(usuario.emailNPreenchido).then(res => {
                    expect(res.statusCode === 400);
                    expect(res.body).to.have.property("email");
                    expect(res.body.email).to.equal("email não pode ficar em branco");
                })
            })
        })

    })

    describe("Testes para - PRODUTOS", () => {
        it("Deve validar a criação de um produto no sistema", () => {
            let produto = Factory.geradorDeProdutos()
        
            cy.criarProduto(bearer, produto).then ( res => {
                expect(res.statusCode === 201);
                expect(res.body).to.have.all.keys("message", "_id");
                expect(res.body.message).to.equal("Cadastro realizado com sucesso");
                })
            })
        })

        //
})
