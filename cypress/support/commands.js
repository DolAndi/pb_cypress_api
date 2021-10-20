/// <reference types="cypress" />
// -- This is a parent command --
//Cypress.Commands.add('login', (email, password) => { });
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
// -- This is a dual command --
//Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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
            if(res.body.usuarios[i].administrador == "true"){
                return res.body.usuarios[i]
            }
        }
    })
})
Cypress.Commands.add("logar", usuario => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/login`,
        failOnStatusCode: true,
        body: usuario
    })
})
Cypress.Commands.add("logarErro", () => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: false,
        body: {
            "email": "serginhomalandro@qa.com",
            "password": "teste"
          }
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
        body: {
            "nome": "caneta muito maluquinha",
            "preco": 23,
            "descricao": "canetovski",
            "quantidade": 13
          },
          headers: {Authorization: bearer}
    })
})
Cypress.Commands.add("cadastrarProdutoErro", (bearer) =>{
    return cy.request({
        method: "POST",
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: {
            "nome": "Razer Fone",
            "preco": 299,
            "descricao": "fone de ouvido",
            "quantidade": 12
          },
          headers: {Authorization: bearer}

    })
})