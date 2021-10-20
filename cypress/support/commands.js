/// <reference types="cypress" />


 Cypress.Commands.add('buscarUsuarioAdmin', (email, password) => { 
    cy.request({ 
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false //receber um 4xx ele para a automação

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
     cy.request({
         method: 'POST',
         url: `${Cypress.env('base_url')}/login`,
         failOnStatusCode: true,
         body: usuario
     })
 })


 
 Cypress.Commands.add('CadastrarCarrinho', (bearer,produto) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/carrinho`,
        failOnStatusCode: true,
        body: produto,
        headers: {
            Authorization: bearer.replace('bearer', '')
        }
    })
})


Cypress.Commands.add('loginInvalido', () => { 
    return cy.request({ 
        method: 'POST',
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: false,
        body: {
            "email": "joaozinho@qa.com",
            "password": "1234"
        }
    })
})

//************************************************************************************************ */

Cypress.Commands.add('cadastrarUsuario', () => { 
    return cy.request({ 
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: {
            "nome": "Fulano da Silva",
            "email": "teste1234@qa.com.br", //mudar a cada teste para funcionar
            "password": "teste",
            "administrador": "true"
        }
    })
})

Cypress.Commands.add('cadastrarUsuarioIncorreto', () => { 
    return cy.request({ 
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: {
            "nome": "Fulano da Silva",
            "email": "teste1234@qa.com.br", // incorreto pois já existe um usuário igual
            "password": "teste",
            "administrador": "true"
        }
    })
})

//************************************************************************************************ */
Cypress.Commands.add('cadastrarProdutoCorreto', (bearer) => { 
    return cy.request({ 
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: {
            "nome": "Bicicleta Sense", //mudar a cada teste para passar
            "preco": 4000,
            "descricao": "Bike aro 29, 24 marchas",
            "quantidade": 5
        },
        headers: {Authorization: bearer}
    })
})


Cypress.Commands.add('cadastrarProdutoIncorreto', () => { 
    return cy.request({ 
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: {
            "nome": "Bicicleta Houston", //mudar a cada teste para passar
            "preco": 3600,
            "descricao": "Bike aro 29, 21 marchas",
            "quantidade": 2
        },
    })
})


