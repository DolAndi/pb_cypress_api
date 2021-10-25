/// <reference types="cypress" />

import Factory from '../dynamics/factory'

var bearer = ''

describe('Teste serverest', () => {
    it('Deve buscar um usuário administrador para login', () => {
        cy.buscarUsuarioAdmin().then( res => {
            cy.wrap({email: res.email, password: res.password}).as('usuarioParaLogin')
        })
        cy.get('@usuarioParaLogin').then( user => {
            cy.logar(user).then( res => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization  
            })

        })    
    })

    it('Deve dar erro ao logar com email vazio', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.emailEmBranco).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('email').to.be.equal('email não pode ficar em branco')
            })
        })
    })

    it('Deve dar erro ao logar sem senha', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.semCampoSenha).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('password').to.be.equal('password é obrigatório')
            })
        })
    })

    it('Deve dar erro ao logar sem email', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.semCampoEmail).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('email').to.be.equal('email é obrigatório')
            })
        })
    })

    it('Deve dar erro ao logar com senha em branco', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.senhaEmBranco).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('password').to.be.equal('password não pode ficar em branco')
            })

        })
    })
   

    it('Deve cadastrar produto' , () => {

        let produto = Factory.gerarProdutoBody()

        cy.cadastrarProduto(bearer, produto).then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
        })
    })

    it('Deve realizar teste de contrato sobre a requisição get na rota produtos', () => {
        cy.buscarProdutos().then( res => {
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, "get_produtos", 200). then( validacao => {
                expect(validacao).to.be.equal('Contrato Validado!')
            })
            //res= resposta, nome da pasta schema, nome do arquivo json
        })
    })

    it('Deve realizar teste de contrato sobre a requisição post na rota produtos', () => {
        let produto = Factory.gerarProdutoBody()
        
        cy.cadastrarProduto(bearer, produto).then( res => {
            expect(res.status).to.be.equal(201)
            cy.validarContrato(res, "post_produtos", 201). then( validacao => {
                expect(validacao).to.be.equal('Contrato Validado!')
            })
            //res= resposta, nome da pasta schema, nome do arquivo json
        })
    })

})
