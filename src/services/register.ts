import {Request, Response} from 'express';
import { User } from '../Models/User';
import {createUser} from './users';

export function registerRoute(req: Request, res: Response) {
     let user = new User();

     user.email = req.body.email;
     user.password = req.body.password;
     user.firstName = req.body.firstName;
     user.lastName = req.body.lastName;
     user.phone = req.body.phone;

    if (user.email !== '' && user.password !== '') {
         let results = createUser(user); 
         return res.send({ error: false, data: results, message: 'New user has been created successfully.' });  
    }
     else {
        // send status 400 null object
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
}