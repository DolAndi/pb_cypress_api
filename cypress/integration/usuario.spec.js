/// <reference types="cypress" />

import Factory from '../dynamics/factory'



describe('Teste com POST usuarios', () => {
    
    it('Deve cadastrar um usuario - Cenário feliz', () => {
        
        const usuario = Factory.gerarUsuarioCompleto()

        cy.cadastrarUsuario(usuario).then(res => {
            //cy.log(res)
            expect(res.status).to.have.equal(201)
            expect(res.body.message).to.equal("Cadastro realizado com sucesso")
            expect(res.body).to.have.property("_id")
        })
    })


    it('Deve cadastrar um usuario - Email já em uso - Cenário triste', () => {
        //Verificar se o email etá cadastrado
        
        const usuario = Factory.gerarUsuarioEmailFixo()

        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).to.have.equal(400)
            expect(res.body.message).to.equal("Este email já está sendo usado")
            expect(res.body).to.not.have.property("_id")
        })
    })
})

//
//                                        //Validações de contrato
//

    it('Deve realizar teste de contrato sobre a requisição POST na rota /usuarios - Cadastro com sucesso', () => {

    let usuario = Factory.gerarUsuarioCompleto();
    
    //console.log(product)

    
    cy.cadastrarUsuario(usuario).then(res => {
        expect(res.status).to.be.equal(201)
        cy.validarContrato(res, "post_usuarios", 201).then(validacao => {
            expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })

    it('Deve realizar teste de contrato sobre a requisição POST na rota /usuarios - E-mail já cadastrado', () => {

        let usuario = Factory.gerarUsuarioEmailFixo();
        
        //console.log(product)
    
        
        cy.cadastrarUsuario(usuario).then(res => {
            expect(res.status).to.be.equal(400)
            cy.validarContrato(res, "post_usuarios", 400).then(validacao => {
                expect(validacao).to.be.equal('Contrato validado!')
                })
            })
        })
