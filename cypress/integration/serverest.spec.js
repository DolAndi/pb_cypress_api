/// <reference types="cypress" />

import Factory from "../dynamics/factory"

describe("Teste na api rest", () => {

  //cenário positivo de login
  it("Deve realizar o login com sucesso", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.valido).then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("authorization");
        let bearer = res.body.authorization;
      });
    });
  });

  //cenário negativo de login - email inválido
  it("Não deve realizar login  - email inválido", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.emailInvalido).then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.be.equal("email deve ser um email válido");
      });
    });
  });

 //cenário negativo de login - senha inválida
 it("Não deve realizar login  - senha inválida", () => {
  cy.fixture("loginCredentials").then((user) => {
    cy.logar(user.senhaInvalida).then((res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("email");
      expect(res.body.email).to.be.equal("email é obrigatório");
      expect(res.body).to.have.property("password");
      expect(res.body.password).to.be.equal("password é obrigatório");
    });
  });
});

  //cenário negativo de login - sem senha
  it("Não deve realizar login - sem senha", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.semSenha).then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("password");
        expect(res.body.password).to.be.equal("password é obrigatório");
      });
    });
  });

  //cenário negativo de login - sem email
  it("Não deve realizar login - sem email", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.semEmail).then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.be.equal("email é obrigatório");
      });
    });
  });

  //cenário negativo de login - senha em branco
  it("Não deve realizar login - senha em branco", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.senhaEmBranco).then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("password");
        expect(res.body.password).to.be.equal("password não pode ficar em branco");
      });
    });
  });

  //cenário negativo de login - email em branco
  it("Não deve realizar login - email em branco", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.emailEmBranco).then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.be.equal("email não pode ficar em branco");
      });
    });
  });

  //cenário negativo de login - email e senha em branco
  it("Não deve realizar login", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.emailESenhaEmBranco).then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.be.equal("email não pode ficar em branco"); 
        expect(res.body).to.have.property("password");
        expect(res.body.password).to.be.equal("password não pode ficar em branco");
      });
    });
  });

//cenário negativo de login - sem email e sem senha
it("Não deve realizar login - sem email e sem senha", () => {
  cy.fixture("loginCredentials").then((user) => {
    cy.logar(user.semEmailESenha).then((res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("email");
      expect(res.body.email).to.be.equal("email é obrigatório"); 
      expect(res.body).to.have.property("password");
      expect(res.body.password).to.be.equal("password é obrigatório");
    });
  });
});

  //cenário positivo POST/usuários (cadastro)
  it("Deve cadastrar usuário", () => {
    cy.fixture("cadastrarUser").then((user) => {
    cy.cadastrarUsuario(user.userNaoCadastrado).then((res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Cadastro realizado com sucesso");
      expect(res.body).to.have.property("_id");
    });
  });
});

  //cenário nagetivo POST/usuários (cadastro)
  it("Não deve cadastrar usuário", () => {
    cy.fixture("cadastrarUser").then((user) => {
    cy.cadastrarUsuario(user.userCadastrado).then((res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Este email já está sendo usado");
      expect(res.body).to.not.have.property("_id");
    });
  });
});

  //cenário positivo de POST/produtos (cadastrar)
  let produto = Factory.bodyProduto()

  it("Deve cadastrar produto com sucesso", () => {
    cy.cadastrarProduto(bearer, produto).then((res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Cadastro realizado com sucesso");
      expect(res.body).to.have.property("_id");
    });
  });

  //cenário negativo de POST/produtos (cadastrar) - 400 - já existe produto com esse nome
  let produtoA = {
    "nome": "Logitech MX Vertical",
    "preco": 470,
    "descricao": "Mouse",
    "quantidade": 382,
    "_id": "BeeJh5lz3k6kSIzA"
  }
  
  it("Não deve cadastrar produto com sucesso - já existe produto com esse nome", (bearer) => {
    cy.cadastrarProduto(bearer, produtoA).then((res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Já existe produto com esse nome");
      expect(res.body).to.not.have.property("_id");
    });
  });

  //cenário negativo de POST/produtos (cadastrar) - 401 - token ausente, inválido, expirado ou user não existe mais
  it("Não deve cadastrar produto com sucesso - já existe produto com esse nome", (bearer) => {
    cy.cadastrarProduto(bearer, produto).then((res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal(
        "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
      );
      expect(res.body).to.not.have.property("_id");
    });
  });

  //cenário negativo de POST/produtos (cadastrar) - 403 - rota esclusiva pra adm
  it("Não deve cadastrar produto com sucesso - Rota exclusiva para administradores", (bearer) => {
    cy.cadastrarProduto(bearerErr, produto).then((res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Rota exclusiva para administradores");
      expect(res.body).to.not.have.property("_id");
    });
  });

  it("Deve realizar teste de contrato na rota get/produtos", () => {
    cy.buscarProdutos().then(res => {
      expect(res.status).to.be.equal(200)
      cy.validarContrato(res, "get_produtos", 200).then(validacao => {
        expect(validacao).to.be.equal('Contrato validado!')
      })

    })
  })

});
