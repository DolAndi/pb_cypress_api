/// <reference types="cypress" />

Cypress.Commands.add('buscarUsuarioAdmin', () => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false //se recenber um 4xx não vai parar 
    }).then( res => {
        expect(res.status).to.be.equal(200)
        for (var i = 0; i < res.body.usuarios.length; i++) {
            if(res.body.usuarios[i].administrador === "true"){
                return res.body.usuarios[i]
            }

        }
    })
})