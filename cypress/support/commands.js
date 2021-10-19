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
Cypress.Commands.add('logarErrado', () => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: false,
        body:{
            email: 'errado',
            password: 'errado'
        }
    })
})

Cypress.Commands.add('cadastrarCarrinho', (bearer,produto) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/carrinho`,
        failOnStatusCode: true,
        body: produto,
        headers: {
            Authorization: bearer.replace('bearer', '')
        }
    })
})