/// <reference types="cypress" />
import Factory from '../dynamics/factory'
var bearer

describe('Testes na api serverest', () => {
    it('Deve trazer um usuário administrador para login (200)', () => {
      //  cy.buscarUsuarioAdmin().then( res => {
        //    cy.wrap({email: res.email, password: res.password}).as('usuarioParaLogin')
         //   // {"email": "fulano@qa.com", "password": "teste"}
        //})
       // cy.get('@usuarioParaLogin').then( user => {
           cy.fixture('loginCredentials').then((user)=>{
                cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
           })
        })
       // })
    })
    it('Deve dar status code(400)"Email e senha inválidos"', ()=>{
        cy.logarErrado().then(res=>{
            expect(res.status).to.equal(400)
        })

    })
    it('Deve dar status code(400)"Email em Branco"', ()=>{
        cy.fixture('loginCredentials').then((user)=>{
            cy.logar(user.emailEmBranco).then(res=>{
                expect(res.status).to.equal(400)
                expect(res.body).property('email').to.equal('email não pode ficar em branco')
            })
        })

    })
    it('Deve Cadastrar um usuário (201)"', ()=>{
        let usuario = Factory.gerarUsuarioBody()

        cy.cadastrarUsuario(usuario).then(res=>{
            expect(res.status).to.equal(201)
            expect(res.body).to.have.property('message', 'Cadastro realizado com sucesso')
        })
    })

    it('Deve tentar Cadastrar um usuário ja cadastrado (400)"', ()=>{
        cy.fixture('loginCredentials').then((user)=>{
            cy.cadastrarUsuario(user.usuarioJaCadastrado).then(res=>{
                expect(res.status).to.equal(400)
            })

        })
    })

    it('Deve cadastrar um produto com Sucesso (201)', () =>{
        let produto = Factory.gerarProdutoBody()

        cy.cadastrarProduto(bearer,produto).then(res=>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.all.keys('message', '_id')
        })
    })
    it('Deve tentar Cadastrar um produto ja cadastrado (400)"', ()=>{
        cy.fixture('loginCredentials').then((user)=>{
            let produto = user.produtoJaCadastrado
            cy.cadastrarProduto(bearer,produto).then(res=>{
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('message')

            })

        })
    })
})

// Um cenário positivo e um negativo para os verbos e rotas: 
// POST: /login => o caso negativo
// POST: /usuarios e o caso negativo
// POST: /produtos e o caso negativo