
/// <reference types="cypress" />

const faker = require('faker');


describe('Teste com POST usuarios', () => {
    
    
    const email = faker.internet.exampleEmail(); // Pega da biblioteca faker

    it('Deve cadastrar um usuario - Cenário feliz', () => {
        const body = {
            nome: faker.name.findName(),
            email: email,
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString(), //true ou false => "true" or "false"
        }
        cy.cadastrarUsuario(body).then(res => {
            //cy.log(res)
            expect(res.status).to.have.equal(201)
            expect(res.body.message).to.equal("Cadastro realizado com sucesso")
            expect(res.body).to.have.property("_id")
        })
    })

    it('Deve cadastrar um usuario - Email já em uso - Cenário triste', () => {
        const body = {
            nome: faker.name.findName(),
            email: email,
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString(),
        }
        cy.cadastrarUsuario(body).then(res => {
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

    const name = faker.commerce.productName() + faker.datatype.number()   

    it("Deve cadastrar um produto - Cenário feliz", () => {
        getToken("true")
        const body = {
            nome: name,
            preco: faker.datatype.number({ min: 1}),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.datatype.number({ min: 1}),
        }
        cy.get('@tokenLogin').then(tokenLogin => {
            cy.cadastrarProduto(body,tokenLogin).then(res => {
                //cy.log(res)
                expect(res.status).to.equal(201)
                expect(res.body.message).to.equal('Cadastro realizado com sucesso')
                expect(res.body).to.have.property('_id')
            })
        })
        
    })

    it("Deve cadastrar um produto - Já existe produto com esse nome - Cenário triste", () => {
        getToken("true")
        const body = {
            nome: name,
            preco: faker.datatype.number({ min: 1}),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.datatype.number({ min: 1}),
        }

        cy.get('@tokenLogin').then(tokenLogin => {
            cy.cadastrarProduto(body,tokenLogin).then(res => {
                //cy.log(res)
                expect(res.status).to.equal(400)
                expect(res.body.message).to.equal('Já existe produto com esse nome')
                expect(res.body).to.not.have.property('_id')
            })
        })
    })

    it("Deve cadastrar um produto - Token ausente ou inválido - Cenário triste", () => {
        const body = {
            nome: faker.commerce.productName(),
            preco: faker.datatype.number({ min: 1}),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.datatype.number({ min: 1}),
        }
        cy.cadastrarProduto(body, 'tokenInvalido').then(res => {
            //cy.log(res)
            expect(res.status).to.equal(401)
            expect(res.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            expect(res.body).to.not.have.property('_id')
        })
    })
    it("Deve cadastrar um produto - Rota exclusiva para administradores - Cenário triste", () => {
        getToken("false")
        const body = {
            nome: faker.commerce.productName(),
            preco: faker.datatype.number({ min: 1}),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.datatype.number({ min: 1}),
        }
        cy.get('@tokenLogin').then(tokenLogin => {
            cy.cadastrarProduto(body,tokenLogin).then(res => {
                //cy.log(res)
                expect(res.status).to.equal(403)
                expect(res.body.message).to.equal('Rota exclusiva para administradores')
                expect(res.body).to.not.have.property('_id')
            })
        })
    })
})

describe('Testes com POST login', () => {
    it('Fazer Login - Cenário Feliz', () => {
        const user = {
            nome: faker.name.findName(),
            email: faker.internet.exampleEmail(),
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString()
        }
        cy.cadastrarUsuario(user)
        const login = {
            email: user.email,
            password: user.password
        } 
        cy.fazerLogin(login).then(res => {
            expect(res.status).to.equal(200)
            expect(res.body.message).to.equal('Login realizado com sucesso')
            expect(res.body).to.have.property('authorization')
            expect(res.body.authorization).to.not.be.null
            expect(res.body.authorization).to.be.a('string')
        })

    })
    it('Fazer Login - Email inválido - Cenário triste', () => {
        const login = {
            email: "fulanoqa.com.br",
            password: "123"
        } 
        cy.fazerLogin(login).then(res => {
            cy.log(res)
            expect(res.status).to.eq(400)
            expect(res.body.email).to.equal("email deve ser um email válido") //Não ta seguindo pradão de body.message | messagem não está igual swagger
            expect(res.body).to.not.have.property('authorization')
        })
    })
    it('Fazer Login - Senha inválida - Cenário triste', () => {
        const user = {
            nome: faker.name.findName(),
            email: faker.internet.exampleEmail(),
            password: faker.internet.password(),
            administrador: faker.datatype.boolean().toString()
        }
        cy.cadastrarUsuario(user)
        const login = {
            email: user.email,
            password: "123"
        } 
        cy.fazerLogin(login).then(res => {
            //cy.log(res)
            expect(res.status).to.equal(401) // Não segue a doc do swagger
            expect(res.body.message).to.equal('Email e/ou senha inválidos')
            expect(res.body).to.not.have.property('authorization')
        })
    })
})