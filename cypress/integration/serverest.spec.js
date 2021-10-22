
/// <reference types="cypress" />

const faker = require('faker');

import Factory from '../dynamics/factory'


describe('Teste com POST usuarios', () => {
    

    it('Deve cadastrar um usuario - Cenário feliz', () => {
        
        const usuario = Factory.gerarUsuarioCompleto()

        cy.cadastrarUsuario(usuario).then(res => {
            //cy.log(res)
            expect(res.status).to.have.equal(201)
            expect(res.body.message).to.equal("Cadastro realizado com sucesso")
            expect(res.body).to.have.property("_id")
        })
    })


    it('Deve cadastrar um usuario - Email já em uso - Cenário triste', () => {
        
        const usuario = Factory.gerarUsuarioCompleto()

        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).to.have.equal(400)
            expect(res.body.message).to.equal("Este email já está sendo usado")
            expect(res.body).to.not.have.property("_id")
        })
    })
})

describe("Teste com POST produtos", () => {
    const getToken = (isAdmin) => {
        const user = {
            nome: faker.name.findName(),
            email: faker.internet.exampleEmail(),
            password: faker.internet.password(),
            administrador: isAdmin
        }
        cy.cadastrarUsuario(user)
        const login = {
            email: user.email,
            password: user.password
        } 
        cy.fazerLogin_wrapTokenLogin(login)
    }
  

    it("Deve cadastrar um produto - Cenário feliz", () => {
        getToken("true")
        
        const produto = Factory.gerarProdutoCorreto()

        cy.get('@tokenLogin').then(tokenLogin => {
            cy.cadastrarProduto(produto,tokenLogin).then(res => {
                //cy.log(res)
                expect(res.status).to.equal(201)
                expect(res.body.message).to.equal('Cadastro realizado com sucesso')
                expect(res.body).to.have.property('_id')
            })
        })
        
    })


    it("Deve cadastrar um produto - Já existe produto com esse nome - Cenário triste", () => {
        getToken("true")

        const produto = Factory.gerarProdutoErrado()
            
        cy.get('@tokenLogin').then(tokenLogin => {
            cy.cadastrarProduto(produto,tokenLogin).then(res => {
                //cy.log(res)
                expect(res.status).to.equal(400)
                expect(res.body).to.has.property('message').to.be.equal("Já existe produto com esse nome")
                expect(res.body).to.not.have.property('_id')
            })
        })
    })
    

    it("Deve cadastrar um produto - Token ausente ou inválido - Cenário triste", () => {
        
        const produto = Factory.gerarProdutoCorreto()

        cy.cadastrarProduto(produto, 'tokenInvalido').then(res => {
            //cy.log(res)
            expect(res.status).to.equal(401)
            expect(res.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            expect(res.body).to.not.have.property('_id')
        })
    })

    it("Deve cadastrar um produto - Rota exclusiva para administradores - Cenário triste", () => {
        getToken("false")

        const produto = Factory.gerarProdutoCorreto()

        cy.get('@tokenLogin').then(tokenLogin => {
            cy.cadastrarProduto(produto,tokenLogin).then(res => {
                //cy.log(res)
                expect(res.status).to.equal(403)
                expect(res.body.message).to.equal('Rota exclusiva para administradores')
                expect(res.body).to.not.have.property('_id')
            })
        })
    })

    it('Deve realizar teste de contrato sobre a requisição GET na rota /produto', () => {
        cy.buscarProdutos().then( res => {
            expect(res.status).to.equal(200)
            cy.validarContrato(res, "get_produtos", 200).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
            })
            // res = resposta da api / get_produtos é o nome da pasta do próprio schema / e o 200 é o nome do arquivo json
        })
    })

    it('Deve realizar teste de contrato sobre a requisição POST na rota /produto', () => {
        cy.cadastrarProduto().then( res => {
            expect(res.status).to.equal(201)
            cy.validarContrato(res, "post_produtos", 201).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })


    it('Deve realizar teste de contrato sobre a requisição POST na rota /produto - Já existe produto com esse nome', () => {
        cy.cadastrarProduto().then( res => {
            expect(res.status).to.equal(400)
            cy.validarContrato(res, "post_produtos", 400).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })

    it('Deve realizar teste de contrato sobre a requisição POST na rota /produto - Token ausente, inválido ou expirado', () => {
        cy.cadastrarProduto().then( res => {
            expect(res.status).to.equal(401)
            cy.validarContrato(res, "post_produtos", 401).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })

    it('Deve realizar teste de contrato sobre a requisição POST na rota /produto - Rota exclusiva para administradores', () => {
        cy.cadastrarProduto().then( res => {
            expect(res.status).to.equal(403)
            cy.validarContrato(res, "post_produtos", 403).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })

})

describe('Testes com POST login', () => {
    it('Fazer Login - Cenário Feliz', () => {

        //cy.cadastrarUsuario(user)

        cy.fixture('credenciaisParaLogin').then( json => {

            //console.log('email >>',json.emailComSenhaValidos.email)
            //console.log('password >>',json.emailComSenhaValidos.password)
            //console.log('Objeto para login >>', { email: json.emailComSenhaValidos.email, password: json.emailComSenhaValidos.password})

            cy.wrap({ email: json.emailComSenhaValidos.email, password: json.emailComSenhaValidos.password}).as('Crendenciais')
            cy.get('@Crendenciais').then(usuarios => {
                cy.fazerLogin(usuarios).then(res => {
                    expect(res.status).to.equal(200)
                    expect(res.body.message).to.equal('Login realizado com sucesso')
                    expect(res.body).to.have.property('authorization')
                    expect(res.body.authorization).to.not.be.null
                    expect(res.body.authorization).to.be.a('string')
                })
            })
        })

    })
    
        it('Fazer Login - Cenário triste', () => {
            
            //cy.cadastrarUsuario(user)
    
            cy.fixture('credenciaisParaLogin').then( json => {

                //console.log('email >>',json.emailInvalido.email)
                //console.log('password >>',json.emailInvalido.password)
                //console.log('Objeto para login >>', { email: json.emailInvalido.email, password: json.emailInvalido.password})

                cy.wrap({ email: json.emailInvalido.email, password: json.emailInvalido.password}).as('Crendenciais')
                cy.get('@Crendenciais').then(user => {
                    cy.fazerLogin(user).then(res => {
                        expect(res.status).to.eq(400)
                        expect(res.body.email).to.equal("email deve ser um email válido") //Não ta seguindo pradão de body.message | messagem não está igual swagger
                        expect(res.body).to.not.have.property('authorization')
                    })
                })
                
            })
        })
    
    it('Fazer Login - Senha inválida - Cenário triste', () => {
       
            //cy.cadastrarUsuario(user)

        cy.fixture('credenciaisParaLogin').then( json => {

            //console.log('email >>> ', json.senhaInvalida.email)
            //console.log('password >>> ', json.senhaInvalida.password)
            //console.log('Objeto para login >>', { email: json.senhaInvalida.email, password: json.senhaInvalida.password})

            cy.wrap({ email: json.senhaInvalida.email, password: json.senhaInvalida.password}).as('Crendenciais')
            cy.get('@Crendenciais').then(user => {
                cy.fazerLogin(user).then(res => {
                    expect(res.status).to.equal(401) // Não segue a doc do swagger
                    expect(res.body.message).to.equal('Email e/ou senha inválidos')
                    expect(res.body).to.not.have.property('authorization')
                })
            })
        })
    })

    it('Deve realizar teste de contrato sobre a requisição POST na rota /login', () => {
        cy.fixture('credenciaisParaLogin').then( json => {
        cy.wrap({ email: json.emailComSenhaValidos.email, password: json.emailComSenhaValidos.password}).as('Crendenciais')
        cy.get('@Crendenciais').then(user => {
        cy.fazerLogin().then( res => {
            expect(res.status).to.equal(200)
            cy.log(res.body)
            cy.validarContrato(res, "post_produtos", 200).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
                    })
                 })
            })
        })
    })
})
