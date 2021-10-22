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
