/// <reference types="cypress" />

import Ajv from 'ajv'

//all errors os erros encontrados mostra e não pare
//verbose tras junto com a validacao tras uma mensagem
//strict 


const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

    Cypress.Commands.add('validarContrato', (res, schema, status)=> {
        cy.fixture(`schema/${schema}/${status}.json`).then( schema => {
            const validate = ajv.compile(schema)
            const valid = validate(res.body)
            
            if(!valid){ // caso valid seja falso
                    var errors = ''
                    for(let each in validate.errors){
                        let err = validate.errors[each]
                        errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}` // Diz oque deu problema // err.message manda uma mensagem deveria ser ... 
                }
                throw new Error('Contrato inválido, por favor verifique!' + errors)
            }
            return 'Contrato validado!'
        })    
    })

    Cypress.Commands.add('buscarProdutos', () => {
        return cy.request({
            method: 'GET',
            url: `${Cypress.env('base_url')}/produtos`,
            failOnStatusCode: false
        })
    })

/*Aqui eu declaro comando que são globais */

    Cypress.Commands.add('cadastrarUsuario', bodyVar => {
        cy.log("Cadastrando Usuario: " + JSON.stringify(bodyVar))
        return cy.request({
            method: 'POST',
            url: `${Cypress.env('base_url')}/usuarios`,
            failOnStatusCode: false,
            body: bodyVar
        })
})

    Cypress.Commands.add('cadastrarProduto', (bodyVar, tokenLogin) => {
        cy.log("Cadastrando Produto: " + JSON.stringify(bodyVar))
        return cy.request({
            method: 'POST',
            url: `${Cypress.env('base_url')}/produtos`,
            failOnStatusCode: false,
            body: bodyVar,
            headers: {Authorization:tokenLogin}
        })
    })

    Cypress.Commands.add('fazerLogin_wrapTokenLogin', bodyVar => {
        cy.log("Fazendo Login: " + JSON.stringify(bodyVar))
        cy.request({
            method: 'POST',
            url: `${Cypress.env('base_url')}/login`,
            failOnStatusCode: false,
            body: bodyVar
        }).then(res => {
            //cy.log(res)
            const token = res.body.authorization             // (Eduardo roeu a roupa).split(" ") => [Eduardo, roeu, a, roupa]
                                                             // (Eduardo roeu a roupa).split(" ")[1] => roeu
            //cy.log(token)
            cy.wrap(token).as('tokenLogin') //Declarei variavel global(alises)
        })
    })

    Cypress.Commands.add('fazerLogin', bodyVar => {
        cy.log("Fazendo Login: " + JSON.stringify(bodyVar))
        return cy.request({
            method: 'POST',
            url: `${Cypress.env('base_url')}/login`,
            failOnStatusCode: false,
            body: bodyVar
        })
    })

