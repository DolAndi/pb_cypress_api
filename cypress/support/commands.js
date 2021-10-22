/// <reference types="cypress" />
import Ajv from 'ajv'
const ajv = new Ajv({allErrors: true, verbose: true, strict: false})


Cypress.Commands.add('buscarUsuarioAdmin', () => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios?administrador=true`,
        failOnStatusCode: false, //se receber um 4xx não vai parar 
    }).then( res => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("quantidade")
        expect(res.body.usuarios).to.be.a("array")

        for (var i = 0; i < res.body.usuarios.length; i++) {
           
            return res.body.usuarios[i]    
            
        }
    });
});

Cypress.Commands.add("logar", (user) => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/login`,
        failOnStatusCode: false,
        body: user,
    });
});
  
Cypress.Commands.add("cadastrarCarrinho", (bearer, produto) => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/carrinho`,
        failOnStatusCode: false,
        body: produto,
        headers: {
        Authorization: bearer,
        },
    });
});
  
Cypress.Commands.add("cadastrarProduto", (bearer, produto) => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/produtos`,
        failOnStatusCode: false,
        body: produto,
        headers: {
        Authorization: bearer,
        },
    });
});
  
Cypress.Commands.add("cadastrarUsuario", (usuario) => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/usuarios`,
        failOnStatusCode: false,
        body: usuario
    });
})

Cypress.Commands.add('validarContrato', (res, schema, status) => {
    cy.fixture(`schema/${schema}/${status}.json`).then( schema => {
        const validate = ajv.compile(schema)
        const valid = validate (res.body)

        if(!valid){
            var errors = ''
            for(let each in validate.errors){
                let err = validate.errors[each]
                errors += `\n ${err.instancePath} ${err.message}, but receive ${typeof err.data}`
            }
            throw new Error('Contrato invalidado, verifique por favor' + errors)
            //cypress.runner.stop()
        }
        return 'Contrato Validado!'
    })
})

Cypress.Commands.add('buscarProdutos', () => {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
    })
})