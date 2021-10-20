/// <reference types="cypress" />


describe('teste na api serverest', () => {
    it('deve trazer um usuario adminsitrador para login', () => {
        cy.buscarUsuarioAdmin().then( res => {
            cy.wrap({email: res.email, password: res.password}).as('usuarioParaLogin')
        })
        cy.get('@usuarioParaLogin').then( user => {
            cy.logar(user).then(res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('authorization')
            })

        }) 
    })
})