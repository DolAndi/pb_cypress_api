import faker from "faker"

export default class Factory {

    static geradorDeEmails() {
        return {
            "nome": `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`,
            "email": `${faker.internet.email()}`,
            "password": `${faker.internet.password()}`,
            "administrador": `${faker.datatype.boolean()}`
        }
    }
}
