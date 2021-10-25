/// <reference types="cypress" />

import Ajv from "ajv"
const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

Cypress.Commands.add("validarContrato", (res, schema, status) => {
    cy.fixture(`schema/${schema}/${status}.json`).then( schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)
        if(!valid){
            var errors = ""
            for(let each in validate.errors){
                let err = validate.errors[each]
                errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}` //o que deveria ser           
            }
        throw new Error("Contrato inválido, por favor verifique!" + errors)
        }
        return "Contrato validado!"
    })
})

Cypress.Commands.add("buscarProdutos", () => {
    cy.request({
        method: "GET",
        url: `${Cypress.env("base_url")}/produtos`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add("logar", usuario => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/login`,
        failOnStatusCode: false,
        body: usuario
    })
})

Cypress.Commands.add("cadastrarUsuario", (usuario) =>{
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/usuarios`,
        failOnStatusCode: false,
        body: usuario
    })
})

Cypress.Commands.add("cadastrarProduto", (bearer, produto) =>{
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/produtos`,
        failOnStatusCode: false,
        body: produto,
          headers: {Authorization: bearer}
    })
})

Cypress.Commands.add("buscarProdutos", () =>{
    return cy.request({
        method: "GET",
        url: `${Cypress.env("base_url")}/produtos`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add("buscarProdutoId", (id) =>{
    return cy.request({
        method: "GET",
        url: `${Cypress.env("base_url")}/produtos/${id}`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add("buscarUsuarios", () =>{
    return cy.request({
        method: "GET",
        url: `${Cypress.env("base_url")}/usuarios`,
        failOnStatusCode: false
    })
})

Cypress.Commands.add("buscarUsuariosId", (id) =>{
    return cy.request({
        method: "GET",
        url: `${Cypress.env("base_url")}/usuarios/${id}`,
        failOnStatusCode: false
    })
})