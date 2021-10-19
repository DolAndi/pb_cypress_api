/// <reference types="cypress" />
var bearer 
describe('Teste dna api serverest', () => {
    it('deve fazer o login com um usuario administrador', () => {
       cy.buscarUsuarioAdmin().then(usuario => {
           cy.wrap({email:usuario.email, password:usuario.password}).as('usuarioParaLogin')
           
       })
       cy.get('@usuarioParaLogin').then(user => {
           cy.logar(user).then(res => {
               expect(res.status).to.be.equal(200);
               expect(res.body).has.property('authorization')
               bearer = res.body.authorization
               console.log(bearer)
           })
       })
    })


    it('Login com email errado deve possuir status 401 e propriedade message', () =>{
        cy.logarErrado().then(res => {
            expect(res.status).to.be.equal(401);
            expect(res.body).has.property('message').to.be.equal('Email e/ou senha inválidos')
        })
    })


    it('cadastrar usuario existente deve possuir status 400 e propriedade message', () =>{
        cy.cadastrarUsuarioErrado().then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message').to.be.equal('Este email já está sendo usado')
        })
    })

    it('cadastrar usuario corretamente deve possuir status 201 e propriedade message e _id', () =>{
        cy.cadastrarUsuario().then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).has.property('_id')
        })
    })


    it('cadastrar produto com nome igual e retornar status 400 e se posui a propriedade message', () =>{
        cy.cadastrarProdutoErrado(bearer).then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message').equal('Já existe produto com esse nome')
        })
    })



    it('cadastrar produto corretamente deve possuir status 201 e propriedade message e _id ', () =>{
        cy.cadastrarProduto(bearer).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message').equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
        })
    })




})


