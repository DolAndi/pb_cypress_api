/// <reference types="cypress" />

describe('Testes na api serverest', () => {
    it('Deve trazer um usuário admin para login', () => {
        cy.buscarUsuarioAdmin().then(usuario => {
            cy.wrap({email: usuario.email, password: usuario.password}).as('usuarioParaLogin')
            cy.wrap({email: 1512544, password: usuario.password}).as('usuarioParaLoginErrado')
            //{email: "fulano@qa.com", "password": teste}
        })
        cy.get('@usuarioParaLogin').then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property('authorization')
                let bearer = res.body.authorization
            })
        })
    })

    it('Deve logar com email com valor inteiro e retornar erro 400', () => {
        cy.buscarUsuarioAdmin().then(usuario => {
            cy.wrap({email: "1512544", password: usuario.password}).as('usuarioParaLoginErrado')
            //{email: "fulano@qa.com", "password": teste}
        })

        cy.get('@usuarioParaLoginErrado').then( user => {
            cy.logarErrado(user).then( res => {
                console.log(res)
                expect(res.status).to.be.equal(400)
            })
        })
    })



})
