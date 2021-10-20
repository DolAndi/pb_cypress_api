/// <reference types="cypress" />
//TAREFA: UM CENARIO POSITIVO E UM NEGATIVO PARA OS VERBOS E ROTAS:
//POST: /login => O CASO NEGATIVO
//POST: /usuarios
//POST: /produtos

var bearer

describe("Testes na API ServeRest", () => {

    it("Deve trazer um usuário administrador para login", () => {
        cy.buscarUsuarioAdmin().then( usuario => {
            cy.wrap({email: usuario.email, password: usuario.password}).as("usuarioParaLogin")
            //{email: "fulano@qa.com", password: "teste"}
        })
        cy.get("@usuarioParaLogin").then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property("authorization")
                bearer = res.body.authorization
            })
        })
    })
    it("Deve possuir status code 401 no login errado", () =>{
        cy.logarErro().then(res => {
            expect(res.status).to.be.equal(401);
        })
    })
    it("Deve cadastrar o usuario possuindo status code 201 e propriedade message", () =>{
        cy.cadastrarUsuario().then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message').to.be.equal('Cadastro realizado com sucesso')
        })
    })

    it("Deve cadastrar usuario existente(falhando) possuindo status code 400 e a propriedade message", () =>{
        cy.cadastrarErro().then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property("message").to.be.equal("Este email já está sendo usado")
        })
    })
    it("Deve cadastrar produto possuindo status 201 e propriedade message", () =>{
        cy.cadastrarProduto(bearer).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property("message").equal("Cadastro realizado com sucesso")
        })
    })
    it("Deve dar erro no cadastro de produto possuindo status code 400", () =>{
        cy.cadastrarProdutoErrado(bearer).then(res => {
            expect(res.status).to.be.equal(400);
        })
    })
    //it("Deve cadastrar um novo carrinho", () => {
    //    cy.cadastroCarrinho(bearer)
    //})
})





