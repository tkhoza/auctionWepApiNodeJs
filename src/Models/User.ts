export class User {

    constructor(){
        this.id = -1;
        this.email = '';
        this.password = '';
        this.firstName='';
        this.lastName = '';
        this.token = '';
    }

    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}