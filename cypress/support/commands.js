/// <reference types="cypress" />

Cypress.Commands.add('buscarUsuarioAdmin', () => { 
    cy.request({
        method: "GET",
        url: `${Cypress.env("base_url")}/usuarios`,
        failOnStatusCode: false //Receber um 4xx ele não irá parar a automação

    }).then( res => {
        expect(res.status).to.be.equal(200)
        expect(res.body).to.have.property("quantidade")
        expect(res.body.usuarios).to.be.a("array")

        for(var i = 0; i < res.body.usuarios.length; i++) {
            if(res.body.usuarios[i].administrador == "false"){
                return res.body.usuarios[i]
            }
        }
    })
})
Cypress.Commands.add("logar", usuario => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/login`,
        failOnStatusCode: false,
        body: usuario
    })
})
Cypress.Commands.add("logarErro", () => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: false,
        body: usuario
    })
})
Cypress.Commands.add("cadastrarUsuario", () =>{
    return cy.request({
        method: "POST",
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: {
            "nome": "Fulano da Silva",
            "email": "emailmaluquinho42@qa.com.br",
            "password": "teste",
            "administrador": "true"
          }
    })
})
Cypress.Commands.add("cadastrarErro", () =>{
    return cy.request({
        method: "POST",
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: {
            "nome": "Fulano da Silva",
            "email": "beltrano@qa.com.br",
            "password": "teste",
            "administrador": "true"
          }
    })
})
Cypress.Commands.add("cadastrarProduto", (bearer) =>{
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: produto,
          headers: {Authorization: bearer}
    })
})
Cypress.Commands.add("cadastrarProdutoErro", (bearer) =>{
    return cy.request({
        method: "POST",
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: produto,
          headers: {Authorization: bearer}
    })
})