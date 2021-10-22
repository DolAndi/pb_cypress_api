/// <reference types="cypress" />

import Factory from "../dynamics/factory";
import Names from "../dynamics/names";

var bearer = '';
var bearerErr = '';

describe("Teste na api rest", () => {

  //cenário positivo de listar os produtos
  it("Deve realizar teste de contrato na rota get/produtos", () => {
    cy.buscarProduto().then((res) => {
      expect(res.status).to.be.equal(200);
      cy.validarContrato(res, "get_produtos", 200).then((validacao) => {
        expect(validacao).to.be.equal("Contrato validado!");
      });
    });
  });

    //cenário positivo de listar os produtos por id - falta ajustes
  it("Deve realizar teste de contrato na rota get/produtos/id", () => {
    cy.buscarProduto().then((res) => {
      expect(res.status).to.be.equal(200);
      cy.validarContrato(res, "get_produtos_id", 200).then((validacao) => {
        expect(validacao).to.be.equal("Contrato validado!");
      });
    });
  });

  //cenário positivo de login
  it("Deve realizar o login com sucesso - usuário com bearer válido", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.valido).then((res) => {
        expect(res.status).to.equal(200);
        cy.validarContrato(res, "post_login", 200).then((validacao) => {
          expect(validacao).to.equal("Contrato validado!");
          bearer = res.body.authorization;
        });
      });
    });
  });

  it("Deve realizar o login com sucesso - usuário com bearer inválido", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.userSemAdm).then((res) => {
        expect(res.status).to.equal(200);
        cy.validarContrato(res, "post_login", 200).then((validacao) => {
          expect(validacao).to.equal("Contrato validado!");
          bearerErr = res.body.authorization;
        });
      });
    });
  });

  //cenário negativo de login - email inválido
  it("Não deve realizar login  - email inválido", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.emailInvalido).then((res) => {
        expect(res.status).to.equal(400);
        cy.validarContrato(res, "post_login", 400).then((validacao) => {
          expect(validacao).to.be.equal("Contrato validado!");
        });
      });
    });
  });

  //cenário negativo de login - senha inválida
  it("Não deve realizar login  - senha inválida", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.senhaInvalida).then((res) => {
        expect(res.status).to.equal(400);
        cy.validarContrato(res, "post_login", 400).then((validacao) => {
          expect(validacao).to.be.equal("Contrato validado!");
        });
      });
    });
  });

  //cenário negativo de login - sem senha
  it("Não deve realizar login - está sem senha", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.semSenha).then((res) => {
        expect(res.status).to.equal(400);
        cy.validarContrato(res, "post_login", 400).then((validacao) => {
          expect(validacao).to.be.equal("Contrato validado!");
        });
      });
    });
  });

  //cenário negativo de login - sem email
  it("Não deve realizar login - está sem email", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.semEmail).then((res) => {
        expect(res.status).to.equal(400);
        cy.validarContrato(res, "post_login", 400).then((validacao) => {
          expect(validacao).to.be.equal("Contrato validado!");
        });
      });
    });
  });

  //cenário negativo de login - senha em branco
  it("Não deve realizar login - campo senha em branco", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.senhaEmBranco).then((res) => {
        expect(res.status).to.equal(400);
        cy.validarContrato(res, "post_login", 400).then((validacao) => {
          expect(validacao).to.be.equal("Contrato validado!");
        });
      });
    });
  });

  //cenário negativo de login - email em branco
  it("Não deve realizar login - campo email em branco", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.emailEmBranco).then((res) => {
        expect(res.status).to.equal(400);
        cy.validarContrato(res, "post_login", 400).then((validacao) => {
          expect(validacao).to.be.equal("Contrato validado!");
        });
      });
    });
  });

  //cenário negativo de login - email e senha em branco
  it("Não deve realizar login - email e senha estão com campo em branco", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.emailESenhaEmBranco).then((res) => {
        expect(res.status).to.equal(400);
        cy.validarContrato(res, "post_login", 400).then((validacao) => {
          expect(validacao).to.be.equal("Contrato validado!");
        });
      });
    });
  });

  //cenário negativo de login - sem email e sem senha
  it("Não deve realizar login - está sem email e sem senha", () => {
    cy.fixture("loginCredentials").then((user) => {
      cy.logar(user.semEmailESenha).then((res) => {
        expect(res.status).to.equal(400);
        cy.validarContrato(res, "post_login", 400).then((validacao) => {
          expect(validacao).to.be.equal("Contrato validado!");
        });
      });
    });
  });

  //cenário positivo POST/usuários (cadastro)
  it("Deve cadastrar usuário com sucesso", () => {
    let usuario = Names.bodyCadastro();

    cy.fixture("cadastrarUser").then(() => {
      cy.cadastrarUsuario(usuario).then((res) => {
        expect(res.status).to.equal(201);
        cy.validarContrato(res, "post_usuarios", 201).then((validacao) => {
          expect(validacao).to.be.equal("Contrato validado!");
        });
      });
    });
  });

  //cenário nagetivo POST/usuários (cadastro)
  it("Não deve cadastrar usuário", () => {
    cy.fixture("cadastrarUser").then((user) => {
      cy.cadastrarUsuario(user.userCadastrado).then((res) => {
        expect(res.status).to.equal(400);
        cy.validarContrato(res, "post_usuarios", 400).then((validacao) => {
          expect(validacao).to.be.equal("Contrato validado!");
        });
      });
    });
  });

  //cenário positivo de POST/produtos (cadastrar)
  let produto = Factory.bodyProduto();

  it("Deve cadastrar produto com sucesso", () => {
    cy.cadastrarProduto(bearer, produto).then((res) => {
      expect(res.status).to.equal(201);
      cy.validarContrato(res, "post_produtos", 201).then((validacao) => {
        expect(validacao).to.be.equal("Contrato validado!");
      });
    });
  });

  //cenário negativo de POST/produtos (cadastrar) - 400 - já existe produto com esse nome - não está passando no teste
  let produtoSamsung = {
    "nome": "Samsung 60 polegadas",
    "preco": 5240,
    "descricao": "TV",
    "quantidade": 49977,
    "_id": "K6leHdftCeOJj8BJ"
  };

  it("Não deve cadastrar produto com sucesso - já existe produto com esse nome", (bearer) => {
    cy.cadastrarProduto(bearer, produtoSamsung).then((res) => {
      expect(res.status).to.equal(400);
      cy.validarContrato(res, "post_produtos", 400).then((validacao) => {
        expect(validacao).to.be.equal("Contrato validado!");
      });
    });
  });

  //cenário negativo de POST/produtos (cadastrar) - 401 - token ausente, inválido, expirado ou user não existe mais
  it("Não deve cadastrar produto com sucesso - já existe produto com esse nome", (bearer) => {
    bearer = ''
    cy.cadastrarProduto(bearer, produto).then((res) => {
      expect(res.status).to.equal(401);
      cy.validarContrato(res, "post_produtos", 401).then((validacao) => {
        expect(validacao).to.be.equal("Contrato validado!");
        setTimeout(3000)
        done();
      });
    });
  });

  //cenário negativo de POST/produtos (cadastrar) - 403 - rota esclusiva pra adm
  it("Não deve cadastrar produto com sucesso - rota exclusiva para administradores", (bearer) => {
    cy.cadastrarProduto(bearerErr, produto).then((res) => {
      expect(res.status).to.equal(403);
      cy.validarContrato(res, "post_produtos", 403).then((validacao) => {
        expect(validacao).to.be.equal("Contrato validado!");
        setTimeout(3000)
        done();
      });
    });
  });
});
