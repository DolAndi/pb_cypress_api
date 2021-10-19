// ***********************************************
/// <reference types="cypress" />
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('BuscarUserAdmin',() => { 
    cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false//se receber um erro ele continua os testes
    }).then(res =>{
        expect(res.status).to.be.equal(200)
        expect(res.body).to.have.property('quantidade')
        expect(res.body.usuarios).to.be.a('array')
        for(var i = 0; i < res.body.usuarios.length; i++){
            if(res.body.usuarios[i].administrador == "true"){
                return res.body.usuarios[i]
            }
            console.log('lista>>>',res.body.usuarios[i]);
        }
    })
 })

 Cypress.Commands.add('logar', usuarios =>{
     return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: true,
        body: usuario
     })
 })