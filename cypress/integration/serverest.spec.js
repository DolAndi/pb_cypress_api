/// <reference types="cypress" />

var bearer

describe('Testes na api serverest', () => {
    it('Deve trazer um usuário administrador para login', () => {
        cy.buscarUsuarioAdmin().then( usuario => {
            cy.wrap({email: usuario.email, password: usuario.password}).as('usuarioParaLogin')
            //{"email": "fulano@qa.com", "password": "teste"}
        })
        cy.get('@usuarioParaLogin').then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
                console.log(bearer)
            })
        })
    })

    it('Tentativa de Login com senha errada deve retornar o status 401 e ter propriedade message', () => {
        cy.loginInvalido().then(res => {
            expect(res.status).to.be.equal(401)
            expect(res.body).has.property('message').to.be.equal('Email e/ou senha inválidos')
        })
    })

    //************************************************************************************************ */

    it('Tentativa de cadastrar usuário corretamente deve retornar o status 201 e ter as propriedades message e _id', () => {
        cy.cadastrarUsuario().then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).has.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).has.property('_id')
        })
    })

    it('Tentativa de cadastrar usuário incorretamente deve retornar o status 400 e ter a propriedade message,', () => {
        cy.cadastrarUsuarioIncorreto().then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).has.property('message').to.be.equal('Este email já está sendo usado')
        })
    })
    
//************************************************************************************************ */

    it('Tentativa de cadastrar produto corretamente deve retornar o status 201 e ter as propriedades message e _id,', () => {
        cy.cadastrarProdutoCorreto(bearer).then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).has.property('message').equal('Cadastro realizado com sucesso')
            expect(res.body).has.property('_id')
        })
    })

    it('Tentativa de cadastrar produto incorretamente sem o Token de Acesso, deve retornar o status 401 e ter a propriedade message', () => {
        cy.cadastrarProdutoIncorreto(bearer).then(res => {
            expect(res.status).to.be.equal(401)
            expect(res.body).has.property('message').equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

















})






// Um cenário positivo e um negativo para os verbos e rotas:
// POST: /Login => caso negativo OK
// POST: /usuarios OK 
//POST: /produtos OK
