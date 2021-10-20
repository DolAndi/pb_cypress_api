/// <reference types="cypress" />


describe('testes de api serverest', () => { 
    it('Deve trazer um usuário administrador para login', () => { 
        cy.buscarUsuarioAdmin().then( usuario => { 
            cy.wrap({email: usuario.email, password: usuario.password}).as("usuarioParaLogin")
            //{email: "fulano@qa.com", "password": "teste"}   
        })


        cy.get('@usuarioParaLogin').then(user => {
            cy.logar(user).then( res => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property("authorization")
            })

        })
    })
})