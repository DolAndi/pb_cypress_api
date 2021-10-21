/// <reference types="cypress" />

import Factory from '../dynamics/factory.js'


let bearer


describe('Testes na api serverest', () => {
    // it('Deve trazer um usuário admin para login', () => {
    //     // cy.buscarUsuarioAdmin().then(usuario => {
    //     //     cy.wrap({email: usuario.email, password: usuario.password}).as('usuarioParaLogin')
    //     //     //{email: "fulano@qa.com", "password": teste}
    //     // })
    //     cy.fixture('loginCredentials').then( user => {          //forma usando fixtures
    //         cy.logar(user.valido).then( res => {
    //             expect(res.status).to.be.equal(200)
    //             expect(res.body).to.have.property('authorization')
    //             bearer = res.body.authorization
    //         })
    //     })
    // })


    it('Deve trazer um usuário admin para login', () => {
        cy.fixture('loginCredentials').then( user => {         
            cy.logar(user.valido).then( res => {
                expect(res.status).to.be.equal(200)
                cy.validarContrato(res, "post_login", 200).then(validacao => {  //res = resposta da API, nome da pasta na schema, nome do arquivo JSON
                expect(validacao).to.be.equal('Contrato validado')
                bearer = res.body.authorization
                })
            })
        })
    })

    
    //////////////login negativo


    // it('Deve logar com email com valor inteiro e retornar erro 400', () => {
    //     cy.fixture('loginCredentials').then( user => {
    //         cy.logarErrado(user.emailNumero).then( res => {
    //             //console.log(res)
    //             expect(res.status).to.be.equal(400)
    //         })
    //     })
    // })


    it('Deve logar com email inválido e retornar erro 400', () => {
        cy.fixture('loginCredentials').then( user => {
            cy.logar(user.invalido400).then( res => {
                //console.log(res)
                expect(res.status).to.be.equal(400)
                //console.log(res.status)
                cy.validarContrato(res, "post_login/fail_email", 400).then(validacao => {  
                    expect(validacao).to.be.equal('Contrato validado')
                })
            })
        })
    })

    it('Deve logar com email válido mas não cadastrado e retornar erro 401', () => {
        cy.fixture('loginCredentials').then( user => {
            cy.logar(user.invalido401).then( res => {
                //console.log(res)
                expect(res.status).to.be.equal(401)
                //console.log(res.status)
                cy.validarContrato(res, "post_login/fail_email", 401).then(validacao => {  
                    expect(validacao).to.be.equal('Contrato validado')
                })
            })
        })
    })

    /** cy.validarContrato(res, "post_login/fail_email", 400) */

    //////////////post /usuarios positivo



    // it('Deve cadastrar um produto com sucesso e retornar o status code 201', () => {
    //     let usuario = Factory.gerarUsuarioBody();
        
    //     //console.log('Usuario>>>', usuario)
    //     cy.cadastrarUsuario(usuario).then( res => {
    //         //console.log(res)
    //         expect(res.status).to.be.equal(201)
    //     })
    // })

    it('Deve cadastrar um usuário com sucesso e retornar o status code 201', () => {
            //let usuario = Factory.gerarUsuarioBody();
            cy.wrap(Factory.gerarUsuarioBody()).as('usuario')

            cy.get('@usuario').then( usuario => {
                cy.cadastrarUsuarioContrato(usuario).then( res => {
                    //console.log(usuario)
                    expect(res.status).to.be.equal(201)
                    cy.validarContrato(res, "post_usuarios", 201).then(validacao => {  
                        expect(validacao).to.be.equal('Contrato validado')
                    })
                })
            } )

            
            //console.log('Usuario>>>', usuario)
            
        })

    
   
    //////////////post /usuarios negativo

    it('Deve tentar cadastrar um usuário com email já cadastrado e retornar o status code 400', () => {
        //let usuario = Factory.usuarioEmailJaCadastrado();
        cy.wrap(Factory.usuarioEmailJaCadastrado()).as('jaCadastrado')

        cy.get('@jaCadastrado').then( usuario => {
            cy.cadastrarUsuarioJaExistente(usuario).then( res => {
                //console.log(usuario)
                expect(res.status).to.be.equal(400)
                cy.validarContrato(res, "post_usuarios", 400).then(validacao => {  
                    expect(validacao).to.be.equal('Contrato validado')
            })
        })
    })

})



    // it('Deve tentar cadastrar um usuário com caracteres inválidos', () => {
    //     cy.fixture('loginCredentials').then( user => {
    //         cy.cadastrarUsuarioInvalido(user.caracteresInvalidos).then( res => {
    //             //console.log(res)
    //             expect(res.status).to.be.equal(400)
    //             expect(user.caracteresInvalidos.nome).to.be.a('number')
    //         })
    //     })
    // })


    
    it('Deve tentar cadastrar um usuário com caracteres inválidos', () => {
        cy.fixture('loginCredentials').then( user => {
            cy.cadastrarUsuarioInvalido(user.caracteresInvalidos).then( res => {
                //console.log(res)
                expect(res.status).to.be.equal(400)
                cy.validarContrato(res, "post_usuarios/invalidChar", 400).then(validacao => {  
                    expect(validacao).to.be.equal('Contrato validado')
                })
            })
        })

    })




    //////////////post /produtos positivo

    it('Deve cadastrar um produto com sucesso e retornar o status code 201', () => {
        let produto = Factory.gerarProdutoBody();
        
        //console.log('AAAAAAAAAAAA', produto)
        cy.cadastrarProduto(bearer, produto).then( res => {
            expect(res.status).to.be.equal(201)
            cy.validarContrato(res, "post_produtos", 201).then(validacao => {  
                expect(validacao).to.be.equal('Contrato validado')
            })
        })
    })



    //////////////post /produtos negativo
    
    it('Deve tentar um produto já existente e retornar o status code 400', () => {
        cy.fixture('loginCredentials').then( user => {
            cy.cadastrarProdutoJaExistente(bearer, user.produtoJaCadastrado).then( res => {
                //console.log(res)
                expect(res.status).to.be.equal(400)
                cy.validarContrato(res, "post_produtos", 400).then(validacao => {  
                    expect(validacao).to.be.equal('Contrato validado')
                })
            })
        })
    })


    it('Deve tentar cadastrar um produto válido com token inválido e retornar o status code 401 ', () => {
        let produto = Factory.gerarProdutoBody();
        let bearer = 123;
        
        //console.log('AAAAAAAAAAAA', produto)
        cy.cadastrarProdutoTokenInvalido(bearer, produto).then( res => {
            expect(res.status).to.be.equal(401)
            cy.validarContrato(res, "post_produtos", 401).then(validacao => {  
                expect(validacao).to.be.equal('Contrato validado')
            })
        })
    })
    

    it('Deve tentar cadastrar um produto com caracteres inválidos', () => {
        let produto = Factory.gerarProdutoInvalido();
        
        //console.log('AAAAAAAAAAAA', produto)
        cy.cadastrarCaracteresInvalidos(bearer, produto).then( res => {
            expect(res.status).to.be.equal(400)
            cy.validarContrato(res, "post_produtos/invalidChar", 400).then(validacao => {  
                expect(validacao).to.be.equal('Contrato validado')
            })
        })
    })

    
///////////// Aula 21/10 Exemplo:                **Todos os códigos comentados são de aulas anteriores (acabei apagando alguns pra não me atrapalhar)



    it('Deve realizar um teste de contrato GET /produtos', () => {
        cy.buscarProdutos().then( res  => {
            expect(res.status).to.be.equal(200)
            cy.validarContrato(res, "get_produtos", 200).then( validacao => {   //res = resposta da API, nome da pasta na schema, nome do arquivo JSON
            expect(validacao).to.be.equal('Contrato validado')
            })
        })
    })






})
    




