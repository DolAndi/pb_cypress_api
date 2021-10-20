/// <reference types="cypress" />
import Factory from "../dynamics/factory"
var bearer 
describe('Teste dna api serverest', () => {

     it('deve verificar login valido e varios logins invalidos ', () => {

       cy.fixture('loginCredentials').then(user => {

           cy.logar(user.valido).then(res => {
               expect(res.status).to.be.equal(200);
               expect(res.body).has.property('authorization')
               bearer = res.body.authorization

                
               cy.logar(user.emailEmBranco).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('email').to.be.equal('email não pode ficar em branco')
               })
               
               cy.logar(user.senhaEmBranco).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('password').to.be.equal('password não pode ficar em branco')
               })

               cy.logar(user.semCampoEmail).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('email').to.be.equal('email é obrigatório')
                
               })
               cy.logar(user.semCampoSenha).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('password').to.be.equal('password é obrigatório')
               })
               cy.logar(user.semCampos).then(res =>{
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('password').to.be.equal('password é obrigatório')
                expect(res.body).has.property('email').to.be.equal('email é obrigatório')
               })

           })
       })
    })

    it('cadastrar usuario corretamente deve possuir status 201 e propriedade message e _id  e cadastrar usuario existente deve possuir status 400 e propriedade message', () =>{
        let usuarioValido = Factory.gerarUsuariosValido()
        let usuarioInvalido = Factory.gerarUsuariosInvalido()

        cy.cadastrarUsuario(usuarioValido).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).has.property('_id')
        })

        cy.cadastrarUsuario(usuarioInvalido).then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message').to.be.equal('Este email já está sendo usado')
        })
    })

    it('cadastrar produto corretamente deve possuir status 201 e propriedade message e _id e cadastrar produto com nome igual e retornar status 400 e se posui a propriedade message ', () =>{
        
        
        let produto = Factory.gerarProdutoBody()
        let produtoExistente = Factory.produtoExistente()

        cy.cadastrarProduto(bearer, produto).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message').equal('Cadastro realizado com sucesso')
           expect(res.body).to.have.property('_id')
        })

        cy.cadastrarProduto(bearer, produtoExistente).then(res =>{
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message').equal('Já existe produto com esse nome')
        })
    })
})


