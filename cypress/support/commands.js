/// <reference types="cypress" />

Cypress.Commands.add('buscarUsuarioAdmin', () => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false //Se receber um 4xx ele não irá parar a automação
    }).then( res => {

        expect(res.status).to.be.equal(200)
        expect(res.body).to.have.property('quantidade')
        expect(res.body.usuarios).to.be.a('array')

        for(var i = 0; i < res.body.usuarios.length; i++) {
            if(res.body.usuarios[i].administrador === "true"){
                return res.body.usuarios[i]
            }
        }
    })
})

Cypress.Commands.add('logar', usuario => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: true,
        body: usuario
    })
})

Cypress.Commands.add('loginInvalido', () => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: false,
        body: {
            "email": "usuarioinexistente@qa.com",
            "password": "inexistente"
          }
    })
})

/************************************************************************/

Cypress.Commands.add('cadastroUsuario', () =>{
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: {
            "nome": "Carlos Teste",
            "email": "carlosteste@qa.com.br",
            "password": "teste",
            "administrador": "true"
          }

    })
})

Cypress.Commands.add('cadastrarUsuarioInvalido', () =>{
    return cy.request({
        method: 'POST',
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

/************************************************************************/

Cypress.Commands.add('cadastrarProduto', (bearer) =>{
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: {
            "nome": "Lápiz azul",
            "preco": 400,
            "descricao": "Lapis",
            "quantidade": 400
          },
          headers: {Authorization: bearer}

    })
})

Cypress.Commands.add('produtoEmUso', (bearer) =>{
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: {
            "nome": "Lápiz azul",
            "preco": 400,
            "descricao": "Lapis",
            "quantidade": 400
          },
          headers: {Authorization: bearer}

    })
})
