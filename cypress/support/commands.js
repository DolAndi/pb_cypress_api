///<reference types="cypress" />

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

Cypress.Commands.add('loginInvalido', () => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: false,
        body:{
            "email": "aleatorio@qa.com",
            "password": "aleatorio"
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
Cypress.Commands.add('cadastrarProduto', (bearer) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/produtos`,
        failOnStatusCode: false,
        body:{
            "nome": "batata colorida",
            "preco": 445,
            "descricao": "unicorn",
            "quantidade": 3
        },
        headers:{
            Authorization : bearer
        }
    })
})
Cypress.Commands.add('cadastrarUsuario', () => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body:{
            "nome": "ninguém",
            "email": "ninguem@qa.com.br",
            "password": "ninguem",
            "administrador": "true"
        }
    })
})