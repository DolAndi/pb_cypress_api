/// <reference types="cypress" />
var bearer 

describe('Teste na api serverest', () => {
    it('Deve trazer um usuário administrador para login', () => {
        cy.buscarUsuarioAdmin().then( usuario => {
            cy.wrap({email: usuario.email, password: usuario.password}).as('usuarioParaLogin')
        })
        cy.get('@usuarioParaLogin').then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property('authorization')
                
            })
        })
    })
    it('Não deve realizar login', () => {
        cy.naoLogar().then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('message').to.be.equal('Email e/ou senha inválidos')
        })
    })
    it('Deve cadastrar usuario' , () => {
        cy.cadastrarUsuario().then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
        })
    })
    it('Não deve cadastrar usuario' , () => {
        cy.naoCadastrarUsuario().then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('message').to.be.equal('Este email já está sendo usado')
        })
    })

    it('Deve cadastrar produto' , () => {
        cy.cadastrarProduto(bearer).then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body.to.have.property('_id'))
        })
    
    })

    it('Não deve cadastrar produto' , () => {
        cy.naoCadastrarProduto(bearer).then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('message').to.be.equal('Já existe produto com esse nome')
        })
    
    })


}) 


