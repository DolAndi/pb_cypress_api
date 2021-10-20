/// <reference types="cypress" />

Cypress.Commands.add('buscarUsuarioAdmin', () => { 
    cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnSatusCode: false  //quando receber 4xx ele para a automação
    }).then( res => {
        expect(res.status).to.be.equal(200)
        expect(res.body).to.have.property('quantidade')
        expect(res.body.usuarios).to.be.a('array')
        for(var i = 0; i < res.body.usuarios.length; i++) {
            if (res.body.usuarios[i].administrador === "true"){
                return res.body.usuarios[i]
            }
        }
    })
 })

 Cypress.Commands.add('logar', usuario => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/login`,
        failOnSatusCode: true,
        body: usuario
    })
 })
 
 Cypress.Commands.add('naoLogar', () => {
    return cy.request({
            method: 'POST',
            url: `${Cypress.env('base_url')}/login`,
            failOnStatusCode: false,
            body: {
                "email": "piriri@qa.com",
                "password": "teste"
              }
    })
 })

 Cypress.Commands.add('cadastrarUsuario', () => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: {
            "nome": "Fulanito",
            "email": "fulanitobe@qa.com.br",
            "password": "teste",
            "administrador": "true"
          }
    })
})

Cypress.Commands.add('naoCadastrarUsuario', () => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: {
            "nome": "Fulanito",
            "email": "fulanitog@qa.com.br",
            "password": "teste",
            "administrador": "true"
          }
    })
})

Cypress.Commands.add('cadastrarProduto', (bearer) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: {
            "nome": "Teenage Dream Deluxe Edition",
            "preco": 60,
            "descricao": "CD",
            "quantidade": 480
          },
          headers: {
              Authorization: bearer
            }
    })
})

Cypress.Commands.add('naoCadastrarProduto', (bearer) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: {
            "nome": "Teenage Dream Deluxe Edition",
            "preco": 60,
            "descricao": "CD",
            "quantidade": 480
          },
          headers: {
              Authorization: bearer
            }
    })
})