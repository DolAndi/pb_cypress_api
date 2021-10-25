/// <reference types="cypress" />
import Factory from '../dynamics/factory'
var bearer

describe('Testes de Login:', () => {
    it('Deve trazer um usuário administrador para login (200)', () => {
      //  cy.buscarUsuarioAdmin().then( res => {
        //    cy.wrap({email: res.email, password: res.password}).as('usuarioParaLogin')
         //   // {"email": "fulano@qa.com", "password": "teste"}
        //})
       // cy.get('@usuarioParaLogin').then( user => {
           cy.fixture('loginCredentials').then((user)=>{
                cy.logar(user.valido).then( res => {
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
                cy.validarContrato(res, 'post_login', 200).then( validacao=>{
                    expect(validacao).to.be.equal('Contrato validado!')
                })

           })
        })
    })
    it('Deve dar status code(400)"Email e senha inválidos"', ()=>{
        cy.logarErrado().then(res=>{
            expect(res.status).to.equal(400)
            cy.validarContrato(res, 'post_login', 400).then( validacao=>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
        

    })
    it('Deve dar status code(400)"Email em Branco"', ()=>{
        cy.fixture('loginCredentials').then((user)=>{
            cy.logar(user.emailEmBranco).then(res=>{
                expect(res.status).to.equal(400)
                expect(res.body).property('email').to.equal('email não pode ficar em branco')
                cy.validarContrato(res, 'post_login', 400).then( validacao=>{
                    expect(validacao).to.be.equal('Contrato validado!')
                })
            })
        })

    })
})
describe("Testes de Usuario:", ()=>{
    it('Deve Cadastrar um usuário (201)"', ()=>{
        let usuario = Factory.gerarUsuarioBody()

        cy.cadastrarUsuario(usuario).then(res=>{
            expect(res.status).to.equal(201)
            expect(res.body).to.have.property('message', 'Cadastro realizado com sucesso')
            cy.validarContrato(res, 'post_usuario', 201).then( validacao=>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
        
    })

    it('Deve tentar Cadastrar um usuário ja cadastrado (400)"', ()=>{
        cy.fixture('loginCredentials').then((user)=>{
            cy.cadastrarUsuario(user.usuarioJaCadastrado).then(res=>{
                expect(res.status).to.equal(400)
                cy.validarContrato(res, 'post_usuario', 400).then( validacao=>{
                    expect(validacao).to.be.equal('Contrato validado!')
                })
            })

        })
    })

    it('Deve Deletar um Usuario', ()=>{
        let usuario = Factory.gerarUsuarioBody()

        cy.cadastrarUsuario(usuario).then(res=>{
            expect(res.status).to.equal(201)
            expect(res.body).to.have.property('message', 'Cadastro realizado com sucesso')
            const ID = res.body._id
            cy.validarContrato(res, 'post_usuario', 201).then( validacao=>{
                expect(validacao).to.be.equal('Contrato validado!')
                cy.DeletarUsuarioPorId(ID).then(res=>{
                    expect(res.status).to.equal(200)
                })
            })
        })
    })
    it('Deve Buscar um Usuario', ()=>{
        let usuario = Factory.gerarUsuarioBody()

        cy.cadastrarUsuario(usuario).then(res=>{
            expect(res.status).to.equal(201)
            expect(res.body).to.have.property('message', 'Cadastro realizado com sucesso')
            const ID = res.body._id
            cy.validarContrato(res, 'post_usuario', 201).then( validacao=>{
                expect(validacao).to.be.equal('Contrato validado!')
                cy.BuscarUsuarioPorId(ID).then(res=>{
                    expect(res.status).to.equal(200)
                })
            })
        })
    })
})
describe("testes de Produto:", ()=>{

    it('Deve cadastrar um produto com Sucesso (201)', () =>{
        let produto = Factory.gerarProdutoBody()

        cy.cadastrarProduto(bearer,produto).then(res=>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.all.keys('message', '_id')
            cy.validarContrato(res, 'post_produto', 201).then( validacao=>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })


    it('Deve tentar Cadastrar um produto ja cadastrado (400)"', ()=>{
        cy.fixture('loginCredentials').then((user)=>{
            let produto = user.produtoJaCadastrado
            cy.cadastrarProduto(bearer,produto).then(res=>{
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('message')
                cy.validarContrato(res, 'post_produto', 401).then( validacao=>{
                    expect(validacao).to.be.equal('Contrato validado!')
                })

            })

        })
    })
    it('Deve Buscar um produto)', () =>{
        let produto = Factory.gerarProdutoBody()

        cy.cadastrarProduto(bearer,produto).then(res=>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.all.keys('message', '_id')
            cy.validarContrato(res, 'post_produto', 201).then( validacao=>{
                expect(validacao).to.be.equal('Contrato validado!')
                const ID = res.body._id
                cy.BuscarProdutoPorId(ID).then(res=>{
                    expect(res.status).to.equal(200)
                })
            })
        })
    })
    
    it('Deve realizar teste de contrato sobre a requisição GET na rota /produto', ()=>{
        cy.buscarProdutos().then(res =>{
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, 'get_produtos', 200).then( validacao=>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })
})