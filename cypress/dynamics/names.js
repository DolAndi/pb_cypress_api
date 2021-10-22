import faker from 'faker';

export default class Names{
    static bodyCadastro(){
        return{
            "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
            "email": `${faker.name.firstName()}@${faker.name.lastName()}com.br`,
            "password": "mestre",
            "administrador": "true"
        }
    }
}