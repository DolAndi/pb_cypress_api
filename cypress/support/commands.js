/// <reference types="cypress" />

Cypress.Commands.add("buscarUserAdm", () => {
    cy.request({
        method: "GET",
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false
    }). then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body).to.have.property("quantidade")
        expect(res.body.usuarios).to.be.a("array")

        for (let i = 0; i < res.body.usuarios.length; i++) {
            if(res.body.usuarios[i].administrador === "true"){
                return res.body.usuarios[i];
            }
        }
    })
})

Cypress.Commands.add("logar", usuario => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env('base_url')}/login`,
        failOnStatusCode: true,
        body: usuario
    })
})