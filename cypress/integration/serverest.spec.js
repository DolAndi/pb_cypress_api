/// <reference types="cypress" />

let bearer = ""


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
                bearer = res.body.authorization
         })
    })
})

    it('Não deve realizar o login caso o email ou senha sejam inválidos', () => { 
        cy.loginInvalido().then( res => {
            expect(res.status).to.be.equal(401) // na documentação diz que deveria ser 400...
            expect(res.body).to.not.have.property("authorization")
            expect(res.body.message).to.be.equal("Email e/ou senha inválidos")
        })
    })

    it('Deve cadastrar um novo produto', () => {
        cy.cadastrarProduto(bearer).then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property("message")
            expect(res.body).to.have.property("_id")         
        })
    })

    it('Não deve cadastrar um produto com o mesmo nome', () => {
        cy.cadastrarProduto(bearer).then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.not.have.property("_id")
            expect(res.body.message).to.be.equal("Já existe produto com esse nome")         
        })
    })

    it('Deve cadastrar um novo usuario', () => {
        cy.cadastrarUsuario().then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property("message")
            expect(res.body).to.have.property("_id")
            expect(res.body.message).to.be.equal("Cadastro realizado com sucesso")         
        })
    })

    it('Não deve cadastrar um usuario ja existente', () => {
        cy.cadastrarUsuario().then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.not.have.property("_id")
            expect(res.body.message).to.be.equal("Este email já está sendo usado")         
        })
    })
})


