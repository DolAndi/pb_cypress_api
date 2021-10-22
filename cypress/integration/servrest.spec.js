/// <reference types="cypress" />
import Factory from '../dynamics/factory'
var bearer 

describe('Testes na api serverest', () => {
    it('Deve trazer um usuário administrador para login', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.valido).then( res => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.have.property('authorization')
                bearer = res.body.authorization
            })
        }) 
    })

    it('Deve dar erro ao logar com possíveis erros de credenciais', () => {
        cy.fixture('loginCredentials').then((user) => {
            cy.logar(user.emailEmBranco).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('email').to.be.equal('email não pode ficar em branco')
            })

            cy.logar(user.semCampoSenha).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('password').to.be.equal('password é obrigatório')
            })

            cy.logar(user.semCampoEmail).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('email').to.be.equal('email é obrigatório')
            })

            cy.logar(user.senhaEmBranco).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('password').to.be.equal('password não pode ficar em branco')
            })

            cy.logar(user.semCampos).then( res => {
                expect(res.status).to.be.equal(400)
                expect(res.body).to.have.property('email').to.be.equal('email é obrigatório')
                expect(res.body).to.have.property('password').to.be.equal('password é obrigatório')
            })
        })
    })
    
    it('Deve cadastrar usuario' , () => {

        let usuario = Factory.gerarUsuarioBody()

        cy.cadastrarUsuario(usuario).then( res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).to.have.property('_id')
        })
    })

    it('Deve dar erro ao cadastrar usuário já cadastrado' , () => {

        let usuario = Factory.gerarUsuarioExistente()

        cy.cadastrarUsuario(usuario).then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('message').to.be.equal('Este email já está sendo usado')
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

    it('Deve dar erro ao cadastrar produto sem nome' , () => {

        let produto = Factory.gerarProdutoSemNome()

        cy.cadastrarProduto(bearer, produto).then( res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('nome').to.be.equal('nome é obrigatório')
        })
    
    })
})
describe('Validações de contrato', () => {
    it('Teste de contrato na requisição POST/login' , () => {
        cy.fixture("loginCredentials").then(user => {
            cy.logar(user.valido).then(res => {
                expect(res.status).to.be.equal(200);
            cy.validarContrato(res, "post_login", 200).then(validacao =>{
                expect(validacao).to.be.equal("Contrato validado!")
            }) 
        })
        cy.logar(user.senhaEmBranco).then(res => {
            expect(res.status).to.be.equal(400);
        cy.validarContrato(res, 'post_login', 400).then(validacao =>{
            expect(validacao).to.be.equal('Contrato validado!')
            }) 
        })
    })    
})

    it('Teste de contrato na requisição POST/usuarios', () => {
        let usuario = Factory.gerarUsuarioBody()
        let usuarioInvalido = Factory.gerarUsuarioExistente()

        cy.cadastrarUsuario(usuario).then( res => {
            expect(res.status).to.be.equal(201)
            cy.validarContrato(res, 'post_usuarios', 201).then(validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
             }) 
        })
        cy.cadastrarUsuario(usuarioInvalido).then( res => {
            expect(res.status).to.be.equal(400)
            cy.validarContrato(res, 'post_usuarios', 400).then(validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
             })   
        })
    })

    it('Teste de contrato na requisição GET/usuarios' , () => {
        cy.buscarUsuarios().then( res => {
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, 'get_usuarios', 200).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
        })
     })
})
    it('Teste de contrato na requisição POST/produtos' , () => {
        let produto = Factory.gerarProdutoBody()
        let produtoExistente = Factory.produtoExistente()

        cy.cadastrarProduto(bearer, produto).then(res => {
            expect(res.status).to.be.equal(201)       
            cy.validarContrato(res, 'post_produtos', 201).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
         })
    })
        cy.cadastrarProduto(bearer, produtoExistente).then( res => {
            expect(res.status).to.be.equal(400)
            cy.validarContrato(res, 'post_produtos', 400).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
        })
     })
        cy.cadastrarProduto(produto).then( res => {
            expect(res.status).to.be.equal(401)
            cy.validarContrato(res, 'post_produtos', 401).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
        })
    })
      // (tive ideias mirabolantes e nenhuma funcionou na execução deste teste)

         //cy.cadastrarProduto(bearer,produto).then( res => {
           //expect(res.status).to.be.equal(403)
           // cy.validarContrato(res, 'post_produtos', 403).then(validacao => {
              // expect(validacao).to.be.equal('Contrato validado!')
        //})
    //})     
})


    it('Teste de contrato na requisição GET/produtos' , () => {
        cy.buscarProdutos().then( res => {
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, 'get_produtos', 200).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })      
})
