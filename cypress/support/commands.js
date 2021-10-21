/// <reference types="cypress" />

import Ajv from "ajv";

const ajv = new Ajv({allErrors: true, verbose: true, scrict: false})

Cypress.Commands.add("validarContrato", (res, schema, status) => {
  cy.fixture(`schema/${schema}/${status}.json`).then(schema => {
    const validate = ajv. compile(schema)
    const valid = validate(res.body)
    
    if(!valid){
      var errors = ''
      for (let each in validate.errors) {
        let err = validate.errors[each]
        errors += `\n ${err.instancePath} ${err.message}, but receive ${typeof err.data}`
      }
      throw new Error('Contrato inválido, verificar os seguintes erros: ' + errors)
      //Cypress.runner.stop()
    }
    return true
  })
})

Cypress.Commands.add("buscarUserAdm", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("base_url")}/usuarios`,
    failOnStatusCode: false,
  }).then((res) => {
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("quantidade");
    expect(res.body.usuarios).to.be.a("array");

    for (let i = 0; i < res.body.usuarios.length; i++) {
      if (res.body.usuarios[i].administrador === "true") {
        return res.body.usuarios[i];
      }
    }
  });
});

Cypress.Commands.add("logar", (usuario) => {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("base_url")}/login`,
    failOnStatusCode: false,
    body: usuario,
  });
});

Cypress.Commands.add("cadastrarCarrinho", (bearer, produto) => {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("base_url")}/carrinho`,
    failOnStatusCode: false,
    body: produto,
    headers: {
      Authorization: bearer,
    },
  });
});

Cypress.Commands.add("cadastrarProduto", (bearer, produto) => {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("base_url")}/produtos`,
    failOnStatusCode: false,
    body: produto,
    headers: {
      Authorization: bearer,
    },
  });
});

Cypress.Commands.add("cadastrarUsuario", (usuario) => {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("base_url")}/usuarios`,
    failOnStatusCode: false,
    body: usuario
  });
});


Cypress.Commands.add("buscarProduto", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("base_url")}/produtos`,
    failOnStatusCode: false
  })
})
