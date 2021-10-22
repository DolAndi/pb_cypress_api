import Factory from '../dynamics/factory.js'; 

<reference types="cypress" />



var bearer

describe('Testes na api serverest', () => {


///Teste POST Login
    it.only('Deve logar em um usuario valido', () => {

        cy.fixture('loginCredentials').then((user) =>{
            cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('message', 'bearer')
                bearer = res.body.authorization
            cy.validarContrato(res, "post_login", 200).then( valid => {
                if(expect(valid).to.be.true) 
                    cy.log("Validado contrato!")
            })
        })
            
    })

     it('Deve logar em um usuario invalido', () => {

        cy.fixture('loginCredentials').then((user) =>{
            cy.logar(user.emailEmBranco).then( res => {
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                bearer = res.body.authorization
            cy.validarContrato(res, "post_login",400).then( valid => {
                if(expect(valid).to.be.true) 
                    cy.log("Validado contrato!")
            })
        })
            
    })


    it('Deve trazer um usuário inválido de um json e realizar login com falha', () => {
        cy.fixture('failCredentials').then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.be.equal('Email e/ou senha inválidos')
            cy.validarContrato(res, "post_login", 400).then( valid => {
                if(expect(valid).to.be.true) 
                    cy.log("Validado contrato!")
            })
        })
    })


///Teste POST Produto

    it('Deve cadastrar um produto já cadastrado', () => {
        cy.fixture('productCredentials').then(res => {
            cy.cadastrarProduto(bearer,produto.productInvalid).then(res =>{
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
            cy.validarContrato(res, "post_produto", 400).then( valid => {
                if(expect(valid).to.be.true) 
                    cy.log("Validado contrato!")
            })

        })
    })
    it.only('Deve cadastrar um novo produto com sucesso', () => {
        cy.cadastrarProduto(bearer).then(res  =>{
            let produto = Factory.gerarProdutoBody
            cy.cadastrarProduto(bearer,produto).then(res =>{
                expect(res.status).to.equal(201)
                expect(res.body).to.have.property('message', '_id')
             cy.validarContrato(res, "post_produto", 201).then( valid => {
                if(expect(valid).to.be.true) 
                    cy.log("Validado contrato!")
            })

        })
    })

// Teste POST Usuario
    it('Deve cadastrar um user já cadastrado', () => {
        cy.fixture('userCredentials').then(res => {
            cy.cadastrarUsuario(usuarios.userInvalid).then(res =>{
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
            cy.validarContrato(res, "post_usuarios", 400).then( valid => {
                if(expect(valid).to.be.true) 
                    cy.log("Validado contrato!")
            })

        })
    })
    it.only('Deve cadastrar um novo user com sucesso', () => {
        cy.cadastrarUsuario(usuarios).then(res  =>{
            let usuarios = Factory.gerarUserBody
            cy.cadastrarUsuario(usuarios).then(res =>{
                expect(res.status).to.equal(201)
                expect(res.body).to.have.property('message', '_id')
            cy.validarContrato(res, "post_usuarios", 201).then( valid => {
                if(expect(valid).to.be.true) 
                    cy.log("Validado contrato!")
            })

        })
    })

}) 

///Teste POST Carrinho
    it.only('Deve cadastrar carrinho valido', () => {

        cy.fixture('carrinhoCredentials').then((produto) =>{
            cy.cadastrarCarrinho(produto.produtoValido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('message', '_id')
                bearer = res.body.authorization
            cy.validarContrato(res, "post_carrinho", 200).then( valid => {
                if(expect(valid).to.be.true) 
                    cy.log("Validado contrato!")
            })
        })
            
    })

     it.only('Deve cadastrar um carrinho invalido', () => {

        cy.fixture('carrinhoCredentials').then((produto) =>{
            cy.cadastrarCarrinho(produto.produtoSemId).then( res => {
                expect(res.status).to.equal(400)
                expect(res.body).to.have.property('message')
                bearer = res.body.authorization
            cy.validarContrato(res, "post_carrinho", 400).then( valid => {
                if(expect(valid).to.be.true) 
                    cy.log("Validado contrato!")
            })
        })
            
    })



   
    it.only('Deve realizar teste de contrato sobre a requisição POST na rota /produto', () => {
        let produto = Factory.retornaProduto("valido")
        cy.cadastrarProduto(produto, bearer).then( res => {
            expect(res.status).to.equal(201)
            cy.validarContrato(res, "post_produto", 201).then( valid => {
                if(expect(valid).to.be.true) 
                    cy.log("Validado contrato!")
            })
        })
    })

