/// <reference types="cypress"/>

import Factory from "../dynamics/factory.js"

var idUsuario
var carrinho
var bearer

describe("REDO do Zero dos Testes para API ServeRest", () => {
    describe("Testes para LOGIN", () => {
        it("Deve trazer um usuário com direito ADM para login", () => {
            cy.fixture("loginCredentials").then((usuario) => {
                cy.logar(usuario.valido).then(res => {
                    expect(res.statusCode === 200);
                    expect(res.body).to.have.property("message");
                    expect(res.body).to.have.property("authorization");
                    
                    bearer = res.body.authorization
                })
            })
        })

        it("Validar testes de contrato para login ADM", () => {
            cy.fixture("loginCredentials").then((usuario) => {
                cy.logar(usuario.valido).then(res =>{
                    expect(res.statusCode === 200);
                    cy.validarContrato(res, "post_login", 200).then( validacao => {
                        //res = resposta | pasta | arquivo .json
                        expect(validacao).to.be.equal("Contrato valido.")
                    })
                })
            })
        })

        it("Deve trazer um usuário com erro de login - SEM EMAIL*", () => {
            cy.fixture("loginCredentials").then((usuario) => {
                cy.logar(usuario.emailNPreenchido).then(res => {
                    expect(res.statusCode === 400);
                    expect(res.body).to.have.property("email");
                    expect(res.body.email).to.equal("email não pode ficar em branco");
                })
            })
        })

        it("Validar testes de contrato para login - SEM EMAIL*", () => {
            cy.fixture("loginCredentials").then((usuario) => {
                cy.logar(usuario.valido).then(res =>{
                    expect(res.statusCode === 400);
                    cy.validarContrato(res, "post_login", 400).then( validacao => {
                        //res = resposta | pasta | arquivo .json
                        expect(validacao).to.be.equal("Contrato valido.")
                    })
                })
            })
        })

    })

    describe("Testes para USUARIOS", () => {
        it("Deve validar a resposta de GET usuarios", () => {
            cy.listarUSERS().then( res => {
                expect(res.statusCode === 200);
            })
        })

        it("Deve pegar um id com a resposta de GET usuarios", () => {
            cy.fixture("loginCredentials").then((usuario) => {
                cy.pegarUserExpecifico(usuario.valido).then( res => {
                    expect(res.statusCode === 200);
                    expect(res.body.usuarios).to.be.a("array")
                    expect(res.body.usuarios[0]._id).to.be.a("string")
                    idUsuario = res.body.usuarios[0]._id
                })
            })
        })

        it("Validar testes de contrato da resposta de GET usuarios", () => {
            cy.listarUSERS().then( res => {
                expect(res.statusCode === 200);
                cy.validarContrato(res, "get_usuarios", 200).then ( validacao => {
                    expect(validacao).to.be.equal("Contrato valido.")
                })
            })
        })

    })

    describe("Testes para PRODUTOS", () => {
        it("Deve validar a criação (POST) de um produto no sistema", () => {
            let produto = Factory.geradorDeProdutos()
        
            cy.criarProduto(bearer, produto).then ( res => {
                expect(res.statusCode === 201);
                expect(res.body).to.have.all.keys("message", "_id");
                expect(res.body.message).to.equal("Cadastro realizado com sucesso");
                })
            })
        
        it("Validar testes de contrato sobre criar produto POST na rota dos produtos", () => {
            let produto = Factory.geradorDeProdutos()
            
            cy.criarProduto(bearer, produto).then( res => {
                expect(res.statusCode === 201)
                cy.validarContrato(res, "post_produtos", 201).then( validacao => {
                    //res = resposta | pasta | arquivo .json
                    expect(validacao).to.be.equal("Contrato valido.")
                })
            })
        })

        it("Validar testes de contrato sobre requesição GET na rota dos produtos", () => {
            cy.buscarProdutos().then( res => {
                expect(res.statusCode === 200)
                cy.validarContrato(res, "get_produtos", 200).then( validacao => {
                    //res = resposta | pasta | arquivo .json
                    expect(validacao).to.be.equal("Contrato valido.")
                })
            })
        })

    })

    describe("Testes para CARRINHO", () => {
        it("Deve utilizar GET para listar os todos os carrinhos disponiveis", () => {
            cy.buscarCarrinho().then (res => {
                expect(res.statusCode === 200)
                expect(res.body).to.have.all.keys("quantidade", "carrinhos")
                expect(res.body.carrinhos[0]).to.have.property("produtos")
                expect(res.body.carrinhos[0]).to.have.property("precoTotal")
                expect(res.body.carrinhos[0]).to.have.property("quantidadeTotal")
                expect(res.body.carrinhos[0]).to.have.property("idUsuario")
                expect(res.body.carrinhos[0]).to.have.property("_id")
                expect(res.body.carrinhos[0].produtos).to.be.a("array")
                expect(res.body.carrinhos[0].precoTotal).to.be.a("number")
                expect(res.body.carrinhos[0].quantidadeTotal).to.be.a("number")
                expect(res.body.carrinhos[0]._id).to.be.a("string")
                //expect(res.body.carrinhos[0].idUsusario).to.be.a("string")
            })
        })

    //!Second Fail
        //it("Deve utilizar GET para listar itens no carrinho do usuario requesitado", () => {
        //    cy.fixture("loginCredentials").then( usuario => {
        //        cy.pegarUserExpecifico(usuario.valido).then ( res => {
        //            idUsuario = res.body.usuarios[0]._id
        //            cy.wrap(carrinho[id, precoTotal, quantidadeTotal, idUsuario])
        //             cy.buscarCarrinho(cy.get(`.carrinho`).within(("$idUsuario"))).then ( res => {
        //                expect(res.statusCode === 200)
        //            })
        //        })
        //
        //    })
        //})
    //!First fail
            //cy.fixture("loginCredentials").then((usuario) => {
                //cy.pegarUserExpecifico(usuario.valido).then( res => {
                    //idUsuario = res.body.usuarios[0]._id;
                    ///carrinhoUsuario tem que ser um objeto com 4 itens _id*carrinho*, precoTotal, quantidadeTotal e idUsuario(iserir resultado acima) como faço isso!?
                    //cy.wrap("carrinhoUsuario": {_id: string, procoTotal: integer, quantidadeTotal: integer, idUsuario: idUsuario})
                    //cy.buscarCarrinho(cy.get("carrinhoUsuario")).then (res => {
                        //expect(res.statusCode === 200)


                    //})
                //'})
    })
})
