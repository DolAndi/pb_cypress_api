/// <reference types="cypress" />
import Factory from '../dynamics/factory'


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

//
//                                        //Validações de contrato
//
it('Deve realizar teste de contrato sobre a requisição POST na rota /login - Login realizado com sucesso', () => {

    let usuario = Factory.gerarUsuarioCompleto();
    
    //console.log(product)

    
    cy.fazerLogin(usuario).then(res => {
        expect(res.status).to.be.equal(200)
        cy.validarContrato(res, "post_login", 201).then(validacao => {
            expect(validacao).to.be.equal('Contrato validado!')
            })
        })
})

})