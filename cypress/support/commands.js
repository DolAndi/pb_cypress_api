/// <reference types="cypress"/>


Cypress.Commands.add("buscarADM", () => {
    cy.request({
        method: "GET",
        url: `${Cypress.env("base_url")}/usuarios`,
        failOnStatusCode: false
    }).then( res => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.have.property("quantidade")
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
        failOnStatusCode: false,
        body: usuario
    })
})

Cypress.Commands.add("criarProduto", (bearer, produto) => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/produtos`,
        failOnStatusCode: false,
        header: {Authorization: bearer},
        body: produto

    })
})

Cypress.Commands.add("cadastrarCarrinho", (bearer, produto) => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("base_url")}/carrinho`,
        failOnStatusCode: false,
        headers: {Authorization: bearer.replace("bearer", "")},
    })
})
