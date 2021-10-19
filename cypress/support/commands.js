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
        for(var i = 0; i < res.body.usuarios.lenght; i++) {
            if(res.body.usuarios[i].administrador === 'true' ){
                cy.log(res.body.usuarios[i])
                return res.body.usuarios[i]
            }
        }

    })

})
Cypress.Commands.add('logar', usuario => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('base_url')}/usuarios`,
        failOnStatusCode: false,
        body: usuario
    })
})