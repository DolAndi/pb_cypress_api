/// <reference types="cypress" />

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
