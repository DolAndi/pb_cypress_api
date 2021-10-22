/// <reference types="cypress" />
import Factory from "../dynamics/factory"
var bearer; var tokenSemAdm;var idProduto;var idUsuario

/// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//               TESTES DE LOGIN
    /// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
describe('Teste dna api serverest', () => {

     it('deve verificar login valido com status code 200 ', () => {
        let gerarUsuariosValidoNoAdm = Factory.gerarUsuariosValidoNoAdm();let gerarUsuariosValidoStandart = Factory.gerarUsuariosValidoStandart()

        cy.cadastrarUsuario(gerarUsuariosValidoNoAdm).then(res => {
        })
        cy.cadastrarUsuario(gerarUsuariosValidoStandart).then(res => {// cadastrando o usuario standart valido por que estou usando 
                                                                      // o server rest online as vezes ele é excluido
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

                    
            })
        })
        })
    })

    it('deve verificar logins invalidos coM status code 400 ', () => {
        cy.fixture('loginCredentials').then(user => {

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


     /// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//               TESTES DE USUARIOS
    /// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    })
    it('deve cadastrar usuario valido deve possuir status 201 e propriedade message e _id ', () =>{
        let usuarioValido = Factory.gerarUsuariosValido()
        

        cy.cadastrarUsuario(usuarioValido).then(res => {
            expect(res.status).to.be.equal(201);
            idUsuario = res.body._id
            expect(res.body).has.property('message').to.be.equal('Cadastro realizado com sucesso')
            expect(res.body).has.property('_id')
        })
    })
    
    it(' deve buscar usuario por id verificando se possui status 200 ', () =>{
        cy.buscarUsuariosPorId(idUsuario).then(res => {
            expect(res.status).to.be.equal(200);
            
        
        })
    })

    it('deve cadastrar usuario existente deve possuir status 400 e propriedade message', () =>{
        
        let usuarioInvalido = Factory.gerarUsuariosInvalido()
        cy.cadastrarUsuario(usuarioInvalido).then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body).has.property('message').to.be.equal('Este email já está sendo usado')
        })
    })
/// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//               TESTES DE PRODUTOS
    /// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    it('deve cadastrar produto valido deve possuir status 201 e propriedade message e _id  ', () =>{
        
        
        let produto = Factory.gerarProdutoBody(); 

        cy.cadastrarProduto(bearer, produto).then(res => {
            expect(res.status).to.be.equal(201);
            idProduto = res.body._id
            expect(res.body).has.property('message').equal('Cadastro realizado com sucesso')
           expect(res.body).to.have.property('_id')
        })
    })
    it('deve buscar produtos e se possui status code 200', () => {
        cy.buscarProdutos().then(res => {
            expect(res.status).to.equal(200)
        })
    })

    it('ceve buscar produto por id verificar se possui status code 200 ', () =>{
        cy.buscarProdutoPorId(idProduto).then(res => {
            expect(res.status).to.be.equal(200);

        })
    })

        it('deve cadastrar produtos invalidos e retornar status 400 e se possui a propriedade messageou, nome ou descricao', () =>{
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
//               TESTES DE VALIDAÇÃO DE CONTRATOS PRODUTOS
    /// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    


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
    it('deve validar GET /produtos ', () => {

        cy.buscarProdutoPorId(idProduto).then(res => {
            expect(res.status).to.be.equal(200);        
        
        cy.validarContrato(res, "get_produtos_id", 200).then(validacao =>{
            expect(validacao).to.be.equal('Contrato valido') 
        })
    })
    })



    it('validar contrato GET/produtos/_id ', () =>{
        cy.buscarProdutoPorId(idProduto).then(res => {
            expect(res.status).to.be.equal(200);
            cy.validarContrato(res, "get_produtos_id", 200).then(validacao =>{
                expect(validacao).to.be.equal('Contrato valido') 
            })
        })
        cy.buscarProdutoPorId('idProduto').then(res => {
            expect(res.status).to.be.equal(400);
            cy.validarContrato(res, "get_produtos_id", 400).then(validacao =>{
                expect(validacao).to.be.equal('Contrato valido') 
            })
        })
        
    })
/// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//               TESTES DE VALIDAÇÃO DE CONTRATOS DE USUARIOS
    /// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    
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

    it('validar contrato GET /usuarios/_id', () => {
        cy.buscarUsuariosPorId(idUsuario).then(res => {
            expect(res.status).to.be.equal(200);
            cy.validarContrato(res, "get_usuarios_id", 200).then(validacao =>{
                expect(validacao).to.be.equal('Contrato valido') 
            })
        
        })
        cy.buscarUsuariosPorId("idUsuario").then(res => {
            expect(res.status).to.be.equal(400);
            cy.validarContrato(res, "get_usuarios_id", 400).then(validacao =>{
                expect(validacao).to.be.equal('Contrato valido') 
            })
        
        })
    })

   /// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//               TESTES DE VALIDAÇÃO DE CONTRATOS DE LOGIN
    /// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
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
