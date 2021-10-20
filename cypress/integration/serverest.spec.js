/// <reference types="cypress" />

import Factory from '../dynamics/factory.js'


let bearer


describe('Testes na api serverest', () => {
    it('Deve trazer um usuário admin para login', () => {
        // cy.buscarUsuarioAdmin().then(usuario => {
        //     cy.wrap({email: usuario.email, password: usuario.password}).as('usuarioParaLogin')
        //     //{email: "fulano@qa.com", "password": teste}
        // })
        cy.fixture('loginCredentials').then( user => {          //forma usando fixtures
            cy.logar(user.valido).then( res => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
            })
        })
    })

    
    //////////////login negativo


    it('Deve logar com email com valor inteiro e retornar erro 400', () => {
        cy.fixture('loginCredentials').then( user => {
            cy.logarErrado(user.emailNumero).then( res => {
                //console.log(res)
                expect(res.status).to.be.equal(400)
                expect(user.emailNumero.email).to.be.a('number')
            })
        })
    })


    //////////////post /usuarios positivo

    it('Deve cadastrar um produto com sucesso e retornar o status code 201', () => {
        let usuario = Factory.gerarUsuarioBody();
        
        //console.log('Usuario>>>', usuario)
        cy.cadastrarUsuario(usuario).then( res => {
            //console.log(res)
            expect(res.status).to.be.equal(201)
        })
    })

    
   
    //////////////post /usuarios negativo

    it('Deve tentar cadastrar um usuário com email já cadastrado e retornar o status code 400', () => {
        let usuario = Factory.usuarioEmailJaCadastrado();

        //console.log('Usuario>>>', usuario)
        cy.cadastrarUsuarioJaExistente(usuario).then( res => {
            //console.log(res)
            expect(res.status).to.be.equal(400)
        })
    })



    it('Deve tentar cadastrar um usuário com caracteres inválidos', () => {
        cy.fixture('loginCredentials').then( user => {
            cy.cadastrarUsuarioInvalido(user.caracteresInvalidos).then( res => {
                //console.log(res)
                expect(res.status).to.be.equal(400)
                expect(user.caracteresInvalidos.nome).to.be.a('number')
            })
        })
    })




    //////////////post /produtos positivo

    it('Deve cadastrar um produto com sucesso e retornar o status code 201', () => {
        let produto = Factory.gerarProdutoBody();
        
        //console.log('AAAAAAAAAAAA', produto)
        cy.cadastrarProduto(bearer, produto).then( res => {
            expect(res.status).to.be.equal(201)
        })
    })



    //////////////post /produtos negativo
    
    it('Deve tentar um produto já existente e retornar o status code 400', () => {
        cy.fixture('loginCredentials').then( user => {
            cy.cadastrarProdutoJaExistente(bearer, user.produtoJaCadastrado).then( res => {
                //console.log(res)
                expect(res.status).to.be.equal(400)
            })
        })
    })


    it('Deve tentar cadastrar um produto válido com token inválido e retornar o status code 401 ', () => {
        let produto = Factory.gerarProdutoBody();
        let bearer = 123;
        
        //console.log('AAAAAAAAAAAA', produto)
        cy.cadastrarProdutoTokenInvalido(bearer, produto).then( res => {
            expect(res.status).to.be.equal(401)
        })
    })
    

    it('Deve tentar cadastrar um produto com caracteres inválidos', () => {
        let produto = Factory.gerarProdutoInvalido();
        
        //console.log('AAAAAAAAAAAA', produto)
        cy.cadastrarCaracteresInvalidos(bearer, produto).then( res => {
            expect(produto.preco).to.be.a('string')
            expect(produto.quantidade).to.be.a('string')
            expect(res.status).to.be.equal(400)
        })
    })






})
    




