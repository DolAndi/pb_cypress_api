/// <reference types="cypress" />
import Ajv from 'ajv'

const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

Cypress.Commands.add('validarContrato', (res, schema, status) => {
    cy.fixture(`schema/${schema}/${status}.json`).then( schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)

        if(!valid){
            var errors = ''
            for( let each in validate.errors){
                let err = validate.errors[each]
                errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}` // indica o q deu problema, e o segundo o q deveria ser 
            }
            throw new Error('Contrato invalido, por favor verifique!' + errors)
            //Cypress.runner.stop()
        }        
        return 'contrato validado!'
    })
})

Cypress.Commands.add('buscarProdutos', () =>{
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('buscarUsuarioAdmin', () => { 
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios `,
        failOnStatusCode: false
    }).then(res =>{

        expect(res.status).to.be.equal(200)
        expect(res.body).to.have.property('quantidade')
        expect(res.body.usuarios).to.be.a('array')
        expect(res.body).to.have.property('usuarios')

        for(var i = 0; i < res.body.usuarios.length; i++){
            if(res.body.usuarios[i].administrator === 'true'){
                return res.body.usuarios[i] 
            } 
        }
    })
})

Cypress.Commands.add('logar', usuario => {
    return  cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/login `,
        failOnStatusCode: false,
        body: usuario
    })
})

Cypress.Commands.add('cadastrar Carrinho', (bearer, produto) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/carrinho`,
        failOnStatusCode: true,
        body: produto,
        headers:{
            Authorization: bearer.replace('bearer', '')
        }
    })
})

Cypress.Commands.add('cadastrarProduto', (bearer, produto) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: produto,
        headers:{
            Authorization: bearer      
        }
    })
})