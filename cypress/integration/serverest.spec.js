/// <reference types="cypress" />

var bearer

describe('Testes na api serverest', () => {
    it('Deve trazer um usuário administrador para login', () => {
        cy.buscarUsuarioAdmin().then( res => {
            cy.wrap({email: res.email, password: res.password}).as('usuarioParaLogin')
            // {"email": "fulano@qa.com", "password": "teste"}
        })
        cy.get('@usuarioParaLogin').then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
            })
        })
    })
    it('Deve dar status code(400)"Email e/ou senha inválidos"', ()=>{
        cy.logarErrado().then(res=>{
            expect(res.status).to.equal(400)
        })

    })

    it('Deve cadastrar um novo carrinho com sucesso', () => {
        cy.criarCarrinho(bearer)
    })
})

// Um cenário positivo e um negativo para os verbos e rotas: 
// POST: /login => o caso negativo
// POST: /usuarios
// POST: /produtos