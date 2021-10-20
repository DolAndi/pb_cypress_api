///<reference types="cypress" />

 Cypress.Commands.add('logar', usuario => {
     return cy.request({
         method: 'POST',
         url: `${Cypress.env('base_url')}/login`,
         failOnStatusCode: false,
         body: usuario
     })
 })

Cypress.Commands.add('cadastrarUsuario', (usuario) =>{
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: usuario

    })
})


Cypress.Commands.add('cadastrarProduto', (bearer, produto) =>{
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: produto,
          headers: {Authorization: bearer}

    })
})