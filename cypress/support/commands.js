/// <reference types="cypress" />

Cypress.Commands.add("BuscarUSER_ADM", () => {
    cy.request({
        method: "GET",
        url: `${Cypress.env("base_url")}/usuarios`,
        failOnStatusCode: false //Receber um 4XX para automação, caso TRUE.
    }).then( res => {

        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.have.property("quantidade")
        expect(res.body.usuarios).to.be.a("array")

        for(var i = 0; i < res.body.usuarios.length; i++) {
            if(res.body.usuarios[i].administrador === "true") {
                return res.body.usuarios[i]
            }
        }
    })
})

Cypress.Commands.add("logar", usuario => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/login`,
        failOnStatusCode: true,
        body: usuario
    })
})

Cypress.Commands.add("RealizarLogin_INVALIDO", () => {
    cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/login`,
        failOnStatusCode: false,
        user: {email: "fulano@qa.com", password: "null"}
    })
})

Cypress.Commands.add("criarProduto", () => {
    cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/produtos`,
        failOnStatusCode: false,
        produtos: {
            nome: "Testeando",
            preco: 1,
            descricao: "Teste já perdi a conta do qual",
            quantidade: 99
        }
    })
})

Cypress.Commands.add("cadastarCarrinho", (bearer, produto) => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/carrinho`,
        failOnStatusCode: true,
        body: 
            produto [{"idProduto": "BeeJh5lz3k6kSIzA"}, {"idProduto": "AAAAAAAAAAAAA"}],
            headers: { Authorization: bearer.replace("bearer", "")}
    })
})

//Fazer exemplos de "isso" falhando e dando certo
//post usuarios e produto to
//post carrinho
//get login com falha ok?
