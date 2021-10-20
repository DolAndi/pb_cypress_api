import faker from 'faker';



export default class Factory{

	static gerarPrdutoBody (){
		 return  {
                "nome":"$(faker.commerce.product())$(faker.commmerce.color())"
                "preço":470
                "descrição":"$(faker.commerce.productDescrip)"
                "quantidade": 301
            }
	}

	static gerarUserBody(){
		return{
	        "nome": "$(faker.name.firstName()) $(faker.name.lastName())",
            "email": "$(faker.internet.email())",
            "password": "$(faker.internet.password())",
            "administrador": "true"  
		}
	}
}