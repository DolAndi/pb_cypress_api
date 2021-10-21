import faker from 'faker'


export default class Factory{

    static gerarProdutoBody() {
        return{
        "nome": `Caneta ${faker.commerce.color()}`,
        "preco": faker.commerce.price(),
        "descricao": "A caneta é um instrumento utilizado para aplicar tinta sobre uma superfície, normalmente de papel, com o objetivo de formar desenhos ou palavras escritas. Ao longo da história, diferentes materiais foram utilizados na fabricação de canetas, tais como junco, penas, osso e metais. estereografica ", 
        "quantidade":   '3'
        }
    }


}