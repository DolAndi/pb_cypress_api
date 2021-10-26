/// <reference types="cypress" />


describe('teste da barra de navegação', ()=>{
    beforeEach(()=>{
        cy.visit('/')
    })

    it('deve acessar a área "Channel"',()=>{
        cy.get(`[title='Channel']`).click()
        cy.url().should('contain', '/channel')
    })

    it('deve acessar a área "sobre mim"',()=>{
        cy.get(`[title='Sobre mim']`).click()
        cy.url().should('contain', '/sobre-mim')
    })

    it.only('deve acessar a área "contato"',()=>{
        cy.get(`[title='Contato']`).click()
        cy.url().should('contain', '/contato')
        cy.get('#8fd1-275a-ac3d-bb09').type('fulano')
    })

    it('deve acessar a área "serviços"',()=>{
        cy.get(`[title='Serviços']`).click()
        cy.url().should('contain', '/servicos')
    })

})