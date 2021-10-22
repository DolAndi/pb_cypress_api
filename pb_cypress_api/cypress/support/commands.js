
/// <reference types="cypress" />
import Ajv from 'ajv';
const ajv = new Ajv({allErrors: true, verbose: true, strict: false})


Cypress.Commands.add('validarcontrato', (res, schema, status) =>{
    cy.fixture('schema/$(schema)/$(status).json').then (schema =>{
        const validate = ajv.compile(schema)
        const valid = validate(res.body)

        if(!valid){
            var errors = ''
            for(let each in validate.errors){
                let err = validate.errors[each]7
                errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}`
            }
            cy.log('What we are validating == ', res.body)
            throw new Error('Contract validation erros, please verify!' + errors)
            Cypress.runner.stop()
        }
        return true
    })
})

Cypress.Commands.add('buscarProdutos', () => {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false
    
    })
})

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

Cypress.Commands.add('cadastrarUsuario', (usuarios) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: true,
        body: usuarios
    })
})

Cypress.Commands.add('cadastrarProdutos', (bearer,produto) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: true,
        body: produto,
        headers: {
            Authorization: bearer.replace('bearer', '')
        }
    })
})