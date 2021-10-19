///<reference types="cypress" />

Cypress.Commands.add('buscarUsuarioAdmin', () => { 
    cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false // receber error 400 para a automacao
    }).then(res => {

        expect(res.status).to.be.equal(200);
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
        body: {
            "email": "fulanoqnaoexiste@qa.com",
            "password": "teste"
          }
    })
})

Cypress.Commands.add('cadastrarUsuarioErrado', () =>{
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: {
            "nome": "Fulano da Silva",
            "email": "beltrano@qa.com.br",
            "password": "teste",
            "administrador": "true"
          }

    })
})


Cypress.Commands.add('cadastrarUsuario', () =>{
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: {
            "nome": "Fulano da Silva",
            "email": "emaildetesteparaisso@qa.com.br", // tem que mudar o email  toda a vez que testar pra passar no teste
            "password": "teste",
            "administrador": "true"
          }

    })
})

 Cypress.Commands.add('cadastrarProdutoErrado', (bearer) =>{
        return cy.request({
            method: 'POST',
            url: `${Cypress.env('base_url')}/produtos`,
            failOnStatusCode: false,
            body: {
                "nome": "Logite3ch MX Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381
              },
              headers: {Authorization: bearer}

        })
})
Cypress.Commands.add('cadastrarProduto', (bearer) =>{
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: {
            "nome": "caneta para amerela para test",  //tem que mudar o nome  toda a vez que testar pra passar no teste
            "preco": 470,
            "descricao": "Mouse",
            "quantidade": 381
          },
          headers: {Authorization: bearer}

    })
})