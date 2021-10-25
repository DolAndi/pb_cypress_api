/// <reference types="cypress" />

import Factory from "../dynamics/factory.js"

var bearer

describe("Testes na API ServeRest", () => {

//LOGIN

    it("Deve trazer um usuario valido e uma sequencia de invalidos", () => {
        cy.fixture("loginCredentials").then((user) => {
            cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property("authorization")
                bearer = res.body.authorization
            })
            cy.logar(user.emailEmBranco).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property("email").to.be.equal("email não pode ficar em branco")
            })
            cy.logar(user.semCampoEmail).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property("email").to.be.equal("email é obrigatório")
            })
            cy.logar(user.senhaEmBranco).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('password').to.be.equal("password não pode ficar em branco")
            })
            cy.logar(user.semCampoSenha).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property("password").to.be.equal("password é obrigatório")
            })
        })
    })

//USUARIOS

    it("Deve efetuar um cadastro valido com status code 201 e propriedade message", () => {
        let usuarioValido = Factory.gerarUsuarioValido()

        cy.cadastrarUsuario(usuarioValido).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property("message").to.be.equal("Cadastro realizado com sucesso")
            expect(res.body).has.property("_id")
        })
    })

    it("Deve efetuar um cadastro invalido com status code 400", () => {
        let usuarioInvalido = Factory.gerarUsuarioInvalido()

        cy.cadastrarUsuario(usuarioInvalido).then(res => {
            expect(res.status).to.be.equal(400);
        })
    })

    it("Deve buscar usuario por id e verificar status code 200", () =>{
        cy.buscarUsuariosId(idUsuario).then(res => {
            expect(res.status).to.be.equal(200);
        })
    })

//PRODUTOS

    it("Deve cadastrar produto corretamente possuindo status code 201 e exibir propriedade message", () => {

        let produto = Factory.gerarProduto()

        cy.cadastrarProduto(bearer, produto).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property("message").equal("Cadastro realizado com sucesso")
        })
    })

    it("Deve falhar o cadastro dos produtos possuindo status code 400", () => {

        let produtoExistente = Factory.produtoExistente();         
        let produtoSemDescricao = Factory.produtoSemDescricao();
        let produtoSemNome = Factory.produtoSemNome()

        cy.cadastrarProduto(bearer, produtoExistente).then(res =>{
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property("message").equal("Já existe produto com esse nome")
        })
        cy.cadastrarProduto(bearer, produtoSemNome).then(res =>{
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property("nome").equal("nome não pode ficar em branco")
        })
        cy.cadastrarProduto(bearer, produtoSemDescricao).then(res =>{
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property("descricao").equal("descricao não pode ficar em branco")
        })
    })
    it("Deve buscar produto por id e verificar status code 200", () =>{
        cy.buscarProdutoPorId(idProduto).then(res => {
            expect(res.status).to.be.equal(200);
        })
    })

    ///////////////////////
    //Validações Contratos
    ///////////////////////

    //validações em GET

    it("Deve realizar teste de contrato sobre a requisição GET /produtos", () => {
        cy.buscarProdutos().then( res => {
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, "get_produtos", 200).then(validacao => { //res = resposta da api, nome da pasta na schema, nome do arquivo json
                expect(validacao).to.be.equal("Contrato validado!")
            })
        })
    })

    it("Deve realizar teste de contrato sobre a requisição GET /usuarios", () =>{
        cy.buscarUsuarios().then(res =>{
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, "get_usuarios", 200).then(validacao =>{
                expect(validacao).to.be.equal("Contrato validado!")
            }) 
            
        })
    })

    //validações em POST

    it("Deve realizar teste de contrato sobre a requisição POST /produtos", () =>{
        let produto = Factory.gerarProduto(); let produtoExistente = Factory.produtoExistente();
        
        cy.cadastrarProduto(bearer, produto).then(res =>{
            expect(res.status).to.be.equal(201)
            cy.validarContrato(res, "post_produtos", 201).then(validacao =>{
                expect(validacao).to.be.equal("Contrato validado!")
            })
        })

        cy.cadastrarProduto(bearer, produtoExistente).then(res =>{
            expect(res.status).to.be.equal(400);
            cy.validarContrato(res, "post_produtos", 400).then(validacao =>{
                expect(validacao).to.be.equal("Contrato validado!")
                })
            }) 
    })

    it("Deve realizar teste de contrato sobre a requisição POST /usuarios", () =>{
        let usuarioValido = Factory.gerarUsuarioValido()
        let usuarioInvalido = Factory.gerarUsuarioInvalido()
        

        cy.cadastrarUsuario(usuarioInvalido).then(res => {
            expect(res.status).to.be.equal(400); 
            cy.validarContrato(res, "post_usuarios", 400).then(validacao =>{
                expect(validacao).to.be.equal("Contrato validado!")
            }) 
        })

        cy.cadastrarUsuario(usuarioValido).then(res => {
            expect(res.status).to.be.equal(201);
            cy.validarContrato(res, "post_usuarios", 201).then(validacao =>{
                expect(validacao).to.be.equal("Contrato validado!")
            }) 
        })
    })

    it("Deve realizar teste de contrato sobre a requisição POST /login", () =>{
        cy.fixture("loginCredentials").then(user => {
            cy.logar(user.valido).then(res => {
                expect(res.status).to.be.equal(200);
            cy.validarContrato(res, "post_login", 200).then(validacao =>{
                expect(validacao).to.be.equal("Contrato validado!")
            }) 
        })
    })    
})
})