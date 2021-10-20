
/// <reference types="cypress" />

// ***********************************************
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


Cypress.Commands.add('buscarUsuarioAdmin', () => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false   //false impede de parar o teste caso receba um 4xx
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
});



Cypress.Commands.add('logar', usuario => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: false,
        body: usuario
    })
})


Cypress.Commands.add('logarErrado', usuario => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: false,
        body: usuario
    }).then( res => {
        expect(res.body).to.have.property('email')
        })
})


// Cypress.Commands.add('cadastrarCarrinho', (bearer, produto) => {
//     return cy.request({
//         method: 'POST',
//         url: `${Cypress.env('base_url')}/carrinho`,
//         failOnStatusCode: true,
//         body: produto,
//         headers: {
//             Authorization: bearer.replace('bearer', '')
//         }
//     })
// })


Cypress.Commands.add('cadastrarUsuario', usuario => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: usuario
        }).then( res => {
            //console.log(res.body)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
        })
})



Cypress.Commands.add('cadastrarUsuarioJaExistente', usuario => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: usuario
        }).then( res => {
            //console.log(res.body)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.be.equal('Este email já está sendo usado')
        })
})


Cypress.Commands.add('cadastrarUsuarioInvalido', usuario => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: usuario
        }).then( res => {
            //console.log(res.body)
            expect(res.body).to.have.all.keys('nome', 'email', 'administrador' )
            expect(res.body.nome).to.be.equal('nome deve ser uma string')
            expect(res.body.email).to.be.equal('email deve ser um email válido')
            expect(res.body.administrador).to.be.equal("administrador deve ser 'true' ou 'false'")
        })
})



Cypress.Commands.add('cadastrarProduto', (bearer, produto) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: produto,
        headers: 
        {Authorization: bearer}
       
    }).then( res => {
        //console.log(res.body)
        //console.log(produto)
        expect(res.body).to.have.all.keys('message', '_id')
        expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')
        expect(res.body._id).to.have.lengthOf(16)
    })
})


Cypress.Commands.add('cadastrarProdutoJaExistente', (bearer, produto) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: produto,
        headers: 
        {Authorization: bearer}
       
    }).then( res => {
        //console.log(res.body)
        //console.log(produto)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.equal('Já existe produto com esse nome')
    })
})


Cypress.Commands.add('cadastrarProdutoTokenInvalido', (bearer, produto) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: produto,
        headers: 
        {Authorization: bearer}
       
    }).then( res => {
        //console.log(res.body)
        //console.log(produto)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
})


Cypress.Commands.add('cadastrarCaracteresInvalidos', (bearer, produto) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body: produto,
        headers: 
        {Authorization: bearer}
       
    }).then( res => {
        //console.log(res.body)
        //console.log(produto)
        expect(res.body).to.have.property('preco')
        expect(res.body).to.have.property('quantidade')
        expect(res.body.preco).to.be.equal('preco deve ser um número')
        expect(res.body.quantidade).to.be.equal('quantidade deve ser um número')
    })
})