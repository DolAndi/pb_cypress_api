/// <reference types="cypress" />

describe('testes na api sererest', () =>{ 
    it('Deve trazer um usuário admin para login', ()=>{ 
        cy.BuscarUserAdmin().then( usuario =>{
            cy.wrap({email: usuario.email, password: usuario}).as('usuarioParaLogin')
        })
        cy.get('@usuarioParaLogin').then(user =>{
            cy.logar(user).then(res =>{
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property('authorizaton')
            })
        })

    })
})