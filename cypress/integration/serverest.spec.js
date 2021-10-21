/// <reference types="cypress" />
import Factory from "../dynamics/factory"
var bearer 
var tokenSemAdm 

describe('Teste dna api serverest', () => {

     it('deve verificar login valido e varios logins invalidos ', () => {
        let gerarUsuariosValidoNoAdm = Factory.gerarUsuariosValidoNoAdm()

        cy.cadastrarUsuario(gerarUsuariosValidoNoAdm).then(res => {
            console.log(res.body)
        })

       cy.fixture('loginCredentials').then(user => {

           cy.logar(user.valido).then(res => {
               expect(res.status).to.be.equal(200);
               expect(res.body).has.property('authorization')
               bearer = res.body.authorization

               cy.logar(user.validoNoAdm).then(res => {
                expect(res.status).to.be.equal(200);
                expect(res.body).has.property('authorization')
                tokenSemAdm = res.body.authorization

                
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
})

    it('cadastrar usuario corretamente deve possuir status 201 e propriedade message e _id ', () =>{
        let usuarioValido = Factory.gerarUsuariosValido()
        

        cy.cadastrarUsuario(usuarioValido).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).has.property('_id')
        })
    })

    it('cadastrar usuario existente deve possuir status 400 e propriedade message', () =>{
        
        let usuarioInvalido = Factory.gerarUsuariosInvalido()
        cy.cadastrarUsuario(usuarioInvalido).then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message').to.be.equal('Este email já está sendo usado')
        })
    })

    it('cadastrar produto corretamente deve possuir status 201 e propriedade message e _id  ', () =>{
        
        
        let produto = Factory.gerarProdutoBody(); 
        cy.cadastrarProduto(bearer, produto).then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body).has.property('message').equal('Cadastro realizado com sucesso')
           expect(res.body).to.have.property('_id')
        })
    })

        it('cadastrar produto com falhas e retornar status 400 e se posui a propriedade message', () =>{
            let produtoExistente = Factory.produtoExistente();let produtoNomeVazio = Factory.produtoNomeVazio()
            let produtoDescricaoVazio = Factory.produtoDescricaoVazio(); let produtoSemNome = Factory.produtoSemNome()
    
        cy.cadastrarProduto(bearer, produtoExistente).then(res =>{
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message').equal('Já existe produto com esse nome')
        })
        cy.cadastrarProduto(bearer, produtoNomeVazio).then(res =>{
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('nome').equal('nome não pode ficar em branco')
        })
        cy.cadastrarProduto(bearer, produtoDescricaoVazio).then(res =>{
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('descricao').equal('descricao não pode ficar em branco')
        })
        cy.cadastrarProduto(bearer, produtoSemNome).then(res =>{
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('nome').equal('nome é obrigatório')
        })

    })


    /// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//               TESTES DE VALIDAÇÃO DE CONTRATOS
    /// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    
    it('deve realizar o validação de contrato de GET /produtos', () =>{
        cy.buscarProdutos().then(res =>{
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, "get_produtos", 200).then(validacao =>{
                expect(validacao).to.be.equal('Contrato valido')
            }) 
            
        })
    })

    it('deve realizar o validação de contrato POST /produtos', () =>{
        let produto = Factory.gerarProdutoBody(); let produtoExistente = Factory.produtoExistente();
        
    
        cy.cadastrarProduto(bearer, produto).then(res =>{
            expect(res.status).to.be.equal(201)
            
            cy.validarContrato(res, "post_produtos", 201).then(validacao =>{
                expect(validacao).to.be.equal('Contrato valido')
            })
        })

        cy.cadastrarProduto(bearer, produtoExistente).then(res =>{
            expect(res.status).to.be.equal(400);

            cy.validarContrato(res, "post_produtos", 400).then(validacao =>{
                expect(validacao).to.be.equal('Contrato valido')
                })
            }) 
            cy.cadastrarProduto("bearer", produtoExistente).then(res =>{
                expect(res.status).to.be.equal(401);
    
                cy.validarContrato(res, "post_produtos", 401).then(validacao =>{
                    expect(validacao).to.be.equal('Contrato valido')
                    })
                })
            cy.cadastrarProduto(tokenSemAdm, produto).then(res =>{
                expect(res.status).to.be.equal(403)
                
                cy.validarContrato(res, "post_produtos", 403).then(validacao =>{
                    expect(validacao).to.be.equal('Contrato valido') 
                })
            })

    })

    
    it('deve realizar o validação de contrato de GET /usuarios', () =>{
        cy.buscarUsuarios().then(res =>{
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, "get_usuarios", 200).then(validacao =>{
                expect(validacao).to.be.equal('Contrato valido')
            }) 
            
        })
    })

    
    it('deve realizar o validação de contrato de POST /usuarios', () =>{
        let usuarioValido = Factory.gerarUsuariosValido()
        let usuarioInvalido = Factory.gerarUsuariosInvalido()
        

        cy.cadastrarUsuario(usuarioInvalido).then(res => {
            expect(res.status).to.be.equal(400);
        
            cy.validarContrato(res, "post_usuarios", 400).then(validacao =>{
                expect(validacao).to.be.equal('Contrato valido')
            }) 
        })

        cy.cadastrarUsuario(usuarioValido).then(res => {
            expect(res.status).to.be.equal(201);
        
            cy.validarContrato(res, "post_usuarios", 201).then(validacao =>{
                expect(validacao).to.be.equal('Contrato valido')
            }) 
        })
    })

   
    it('deve realizar o validação de contrato de POST /login', () =>{
        cy.fixture('loginCredentials').then(user => {
            cy.logar(user.valido).then(res => {
                expect(res.status).to.be.equal(200);
                cy.validarContrato(res, "post_login", 200).then(validacao =>{
                    expect(validacao).to.be.equal('Contrato valido')
    
            }) 
        })
    
            cy.logar(user.emailEmBranco).then(res => {
                expect(res.status).to.be.equal(400);
                cy.validarContrato(res, "post_login", 400).then(validacao =>{
                    expect(validacao).to.be.equal('Contrato valido')

        }) 
    })
    })
})

})
