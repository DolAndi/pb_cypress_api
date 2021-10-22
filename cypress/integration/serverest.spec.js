/// <reference types="cypress" />

import Factory from '../dynamics/factory.js'

var bearer
var produtoID, usuarioID

describe('Testes na api serverest', () => {

    //  /login
    it('Deve trazer um usuário administrador para login e realizar teste de contrato', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).has.property('message').to.be.equal('Login realizado com sucesso')
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
                cy.validarContrato(res, "post_login", 200).then( validacao =>{
                    expect(validacao).to.be.equal('Contrato validado!')
                })
            })
        })
    })

    it('Deve realizar logins com falhas e realizar teste de contrato', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.loginInvalido(user.invalido).then( res => {
                expect(res.status).to.be.equal(401);        //Documentação - status 400, porém acredito que esteja errada
                expect(res.body).has.property('message')
                expect(res.body.message).to.be.equal('Email e/ou senha inválidos')
                cy.validarContrato(res, "post_login", 400).then( validacao =>{
                    expect(validacao).to.be.equal('Contrato validado!')
                })
            })

            cy.loginInvalido(user.emailEmBranco).then( res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('email')
                expect(res.body.email).to.be.equal('email não pode ficar em branco')
                cy.validarContrato(res, "post_login/email_embranco", 400).then( validacao =>{
                    expect(validacao).to.be.equal('Contrato validado!')
                })
            })

            cy.loginInvalido(user.senhaEmBranco).then( res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('password')
                expect(res.body.password).to.be.equal('password não pode ficar em branco')
                cy.validarContrato(res, "post_login/senha_embranco", 400).then( validacao =>{
                    expect(validacao).to.be.equal('Contrato validado!')
                })
            })

            cy.loginInvalido(user.semCampoEmail).then( res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('email')
                expect(res.body.email).to.be.equal('email é obrigatório')
                cy.validarContrato(res, "post_login/sem_campo_email", 400).then( validacao =>{
                    expect(validacao).to.be.equal('Contrato validado!')
                })
            })

            cy.loginInvalido(user.semCampoSenha).then( res => {
                expect(res.status).to.be.equal(400);
                expect(res.body).has.property('password')
                expect(res.body.password).to.be.equal('password é obrigatório')
                cy.validarContrato(res, "post_login/sem_campo_senha", 400).then( validacao =>{
                    expect(validacao).to.be.equal('Contrato validado!')
                })
            })
        })
    })


    /**********************************************************************************************/


    //  /usuarios
    it('Deve realizar a listagem de usuarios cadastrados no sistema e realizar teste de contrato', () =>{
        cy.listarUsuarios().then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).has.property("quantidade")
            expect(res.body).has.property("usuarios")
            cy.validarContrato(res, "get_usuarios", 200).then( validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })

    it('Deve realizar o cadastro do usuário com sucesso e realizar teste de contrato',() =>{
        let usuarioNovo = Factory.gerarNovoUsuario("valido")
    
        cy.cadastroUsuario(usuarioNovo).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message')
            expect(res.body.message).to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).has.property('_id')
            usuarioID = res.body._id
            cy.validarContrato(res, "post_usuarios", 201).then( validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })

    it('Deve realizar cadastro de usuário já cadastrado no sistema e realizar teste de contrato', () =>{
        let usuarioNovo = Factory.gerarNovoUsuario("invalido")
    
        cy.cadastroUsuario(usuarioNovo).then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message') 
            cy.validarContrato(res, "post_usuarios", 400).then( validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })

    it('Deve buscar usuários pelo seu ID e realizar teste de contrato', () =>{
        cy.buscarUsuariosID(usuarioID).then(res => {
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, "get_usuarios_id", 200).then( validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })


    /**********************************************************************************************/
    

    //  /produtos
    it('Deve realizar a listagem de produtos cadastrados no sistema e realizar teste de contrato', () =>{
        cy.listarProdutos().then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).has.property("quantidade")
            cy.validarContrato(res, "get_produtos", 200).then( validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })

    it('Deve realizar cadastro de produto com sucesso e realizar teste de contrato', () =>{
        let produto = Factory.gerarProdutoBody("valido")
        
        cy.cadastrarProduto(bearer, produto).then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).has.property('message').equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
            produtoID = res.body._id
            cy.validarContrato(res, "post_produtos", 201).then( validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })

    it('Deve realizar cadastro de produto já cadastrado e realizar teste de contrato', () =>{       
        let produto = Factory.gerarProdutoBody("invalido")
        
        cy.cadastrarProduto(bearer, produto).then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message').equal('Já existe produto com esse nome')
            cy.validarContrato(res, "post_produtos", 400).then( validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })

    it('Deve buscar produtos pelo seu ID e realizar teste de contrato', () =>{
        cy.buscarProdutosID(produtoID).then(res => {
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, "get_produtos_id", 200).then( validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })


    /**********************************************************************************************/


    //  /carrinhos
    it('Deve realizar a listagem de carrinhos cadastrados no sistema e realizar teste de contrato', () =>{
        cy.listarCarrinhos().then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).has.property("quantidade")
            expect(res.body).has.property("carrinhos")
            /*cy.validarContrato(res, "get_carrinhos", 200).then( validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
            })*/
        })
    })
})