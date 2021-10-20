/// <reference types="cypress" />

describe("Teste na api rest", () => {
  //cenário positivo de login
  it("Deve trazer um usuário administrador para login", () => {
    cy.buscarUserAdm().then((res) => {
      cy.wrap({ email: res.email, password: res.password }).as(
        "usuarioParaLogin"
      );
    });
    cy.get("@usuarioParaLogin").then((user) => {
      cy.logar(user).then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("authorization");
        let bearer = res.body.authorization;
      });
    });
  });

  //cenário negativo de login - dificuldade
  it("Não deve realizar login", () => {
    cy.buscarUserAdm().then((res) => {
      cy.wrap({ email: res.email, password: res.password }).as(
        "usuarioParaLogin"
      );
    });
    cy.get("@usuarioParaLogin").then((user) => {
      cy.logar(user).then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Email e/ou senha inválidos");
      });
    });
  });

  //cenário positivo POST/usuários (cadastro)
  it("Deve cadastrar usuário", () => {
    cy.cadastrarUsuario().then((res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Cadastro realizado com sucesso");
      expect(res.body).to.have.property("_id");
    });
  });

  //cenário nagetivo POST/usuários (cadastro)
  it("Não deve cadastrar usuário", () => {
    cy.cadastrarUsuario().then((res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Este email já está sendo usado");
      expect(res.body).to.not.have.property("_id");
    });
  });

  //cenário positivo de POST/produtos (cadastrar)
  it("Deve cadastrar produto com sucesso", (bearer) => {
    cy.cadastrarProduto().then((res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Cadastro realizado com sucesso");
      expect(res.body).to.have.property("_id");
    });
  });

  //cenário negativo de POST/produtos (cadastrar) - 400 - já existe produto com esse nome
  it("Não deve cadastrar produto com sucesso - já existe produto com esse nome", (bearer) => {
    cy.cadastrarProduto().then((res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Já existe produto com esse nome");
      expect(res.body).to.not.have.property("_id");
    });
  });

  //cenário negativo de POST/produtos (cadastrar) - 401 - token ausente, inválido, expirado ou user não existe mais
  it("Não deve cadastrar produto com sucesso - já existe produto com esse nome", (bearer) => {
    cy.cadastrarProduto().then((res) => {
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal(
        "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
      );
      expect(res.body).to.not.have.property("_id");
    });
  });

  //cenário negativo de POST/produtos (cadastrar) - 403 - rota esclusiva pra adm
  it("Não deve cadastrar produto com sucesso - já existe produto com esse nome", (bearer) => {
    cy.cadastrarProduto().then((res) => {
      expect(res.status).to.equal(403);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Rota exclusiva para administradores");
      expect(res.body).to.not.have.property("_id");
    });
  });

  //   it('Deve cadastrar um novo carrinho com sucesso', () => {
  //     cy.criarCarrinho(bearer)
  // })
});
