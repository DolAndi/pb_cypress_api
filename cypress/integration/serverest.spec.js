/// <reference types="cypress" />

var bearer

// Um cenário positivo e um negativo para os verbos e rotas: 
// POST: /login => o caso negativo
// POST: /usuarios
// POST: /produtos

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

    it('Deve mostrar status 401, se o e-mail e/ou senha forem inválidos', () => {
        cy.loginInvalido().then(res => {
        expect(res.status).to.be.equal(401);
        expect(res.body).has.property('message')
        expect(res.body.message).to.eql('Email e/ou senha inválidos')
        })
    })

    /************************************************************************/

    it('Deve cadastrar um novo usuário, e verificar suas propriedades',() =>{
        cy.cadastroUsuario().then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message')
            expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).has.property('_id')
        })
    })

    it('Deve cadastrar um usuário com email ja utilizado, e verificar suas propriedades', () =>{
        cy.cadastrarUsuarioInvalido().then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message')
            expect(res.body.message).to.be.equal('Este email já está sendo usado')
        })
    })

    /************************************************************************/

    it('Deve cadastrar produto com sucesso e verificar suas propriedades ', () =>{
        cy.cadastrarProduto(bearer).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message').equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
        })
    })

    it('cadastrar produto com nome já existente no sistema, e verificar suas propriedades', () =>{
        cy.produtoEmUso(bearer).then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message').equal('Já existe produto com esse nome')
        })
    })
    
})