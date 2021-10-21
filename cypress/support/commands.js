///<reference types="cypress" />
import Ajv from 'ajv'
const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

Cypress.Commands.add('validarContrato', (res, schema, status) => {
    cy.fixture(`schema/${schema}/${status}.json`).then(schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)
        if(!valid){
            var errors = ''
            for(let each in validate.errors){
                let err = validate.errors[each]
                errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}`
            }
            throw new Error('Contrato inválido, por favor verifique!' + errors)
        }
        return 'Contrato válidado!'
    })
})

Cypress.Commands.add('buscarUsuarioAdmin', () => { 
    cy.request({ 
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false // 4xx ele não irá parar a automação
    }).then( res => { 

            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('quantidade')
            expect(res.body.usuarios).to.be.a('array')

        //let listaUsuarios = res.body.usuarios

        for(var i = 0; i < res.body.usuarios.length; i++) {
            if(res.body.usuarios[i].administrador === 'true' ){
                return res.body.usuarios[i]
            }
        }
    })
})

Cypress.Commands.add('logar', usuario => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: false,
        body: usuario,
    })
})

Cypress.Commands.add('cadastrarProduto', (bearer, produto) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: produto,
        headers:{
            Authorization : bearer
        }
    })
})

Cypress.Commands.add('cadastrarUsuario', (user) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: user
    })
})

Cypress.Commands.add('buscarProduto', () => { 
    cy.request({ 
        method: 'GET',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false // 4xx ele não irá parar a automação
    }).then( res => { 
        for(var i = 0; i < res.body.produtos.length; i++) {
            return res.body.produtos[i]
        }
    })
    
Cypress.Commands.add('buscarUsuario', () => { 
    cy.request({ 
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false // 4xx ele não irá parar a automação
    }).then( res => { 
        for(var i = 0; i < res.body.usuarios.length; i++) {
            return res.body.usuarios[i]
        }
    })
})

Cypress.Commands.add('buscarProdutos', () => { 
    cy.request({ 
        method: 'GET',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false // 4xx ele não irá parar a automação
    })
})

Cypress.Commands.add('buscarUsuarios', () => { 
    cy.request({ 
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false // 4xx ele não irá parar a automação
    })
})


})


    