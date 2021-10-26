/// <reference types="cypress" />

describe("login SwagLabs", ()=>{
    beforeEach(()=>{
        cy.visit('/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get(`[id='login-button']`).click()
    })
    it('Deve logar o swagLabs com sucesso',()=>{
        cy.visit('/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get(`[id='login-button']`).click()
        
    })
    it('Deve logar o swagLabs sem usuario',()=>{
        cy.visit('/')
        cy.get('#password').type('secret_sauce')
        cy.get(`[id='login-button']`).click()
        cy.get(`[class='error-button']`).click()
        
    })
    it('Deve logar o swagLabs sem senha',()=>{
        cy.visit('/')
        cy.get('#user-name').type('standard_user')
        cy.get(`[id='login-button']`).click()
        cy.get(`[class='error-button']`).click()
        
    })

})
describe("testes de carrinho", ()=>{
    beforeEach(()=>{
        cy.visit('/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get(`[id='login-button']`).click()
    })

    it('Deve adicionar um produto ao carrinho',()=>{
        cy.url().should('contain', '/inventory.html')
        cy.get(`[id='add-to-cart-sauce-labs-backpack']`).click()
    })
    it.only('Deve confirmar o produto no carrinho',()=>{
        cy.get(`[id='add-to-cart-sauce-labs-backpack']`).click()
    })
})