
/// <reference types="cypress" />
import faker from 'faker';
import Factory from '../dynamics/factory'

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

//------------------------------------------------------------------------------------------------
//                                           //validações de contratos
//------------------------------------------------------------------------------------------------
it('Deve realizar teste de contrato sobre a requisição POST na rota /produto - Cadastro com sucesso', () => {
    getToken("true")

    let product = Factory.gerarProdutoCorreto();
    
    console.log(product)
    cy.get('@tokenLogin').then(tokenLogin => {
    cy.cadastrarProduto(product, tokenLogin).then(res => {
        expect(res.status).to.be.equal(201)
        cy.validarContrato(res, "post_produtos", 201).then(validacao => {
            expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })
})

it('Deve realizar teste de contrato sobre a requisição POST na rota /produto - Já existe produto com esse nome', () => {
    getToken("true")

    let product = Factory.gerarProdutoExistente();
    
    console.log(product)
    cy.get('@tokenLogin').then(tokenLogin => {
    cy.cadastrarProduto(product, tokenLogin).then(res => {
        expect(res.status).to.be.equal(400)
        cy.validarContrato(res, "post_produtos", 400).then(validacao => {
            expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })
})

it('Deve realizar teste de contrato sobre a requisição POST na rota /produto - Token ausente, inválido ou expirado', () => {
    getToken("true")

    let product = Factory.gerarProdutoCorreto();
    
    console.log(product)
    cy.get('@tokenLogin').then(tokenLogin => {
    cy.cadastrarProduto(product, 'tokenLogin').then(res => {
        expect(res.status).to.be.equal(401)
        cy.validarContrato(res, "post_produtos", 401).then(validacao => {
            expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })
})

it('Deve realizar teste de contrato sobre a requisição POST na rota /produto - Rota exclusiva para administradores', () => {
    getToken("false")

    let product = Factory.gerarProdutoCorreto();
    
    console.log(product)
    cy.get('@tokenLogin').then(tokenLogin => {
    cy.cadastrarProduto(product, tokenLogin).then(res => {
        expect(res.status).to.be.equal(403)
        cy.validarContrato(res, "post_produtos", 403).then(validacao => {
            expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })
})

})