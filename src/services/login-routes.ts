import {Request, Response} from 'express';
import { validateEmailAndPassword, findUserIdForEmail } from './users';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const RSA_PRIVATE_KEY = fs.readFileSync('src/services/keys/private.key');

export const loginRoute = async (req: Request, res: Response) => {

  const email = req.body.email,
        password = req.body.password;

  if (validateEmailAndPassword(email, password)) {
     let userId : any = await findUserIdForEmail(email);

      console.log(userId);
      
       const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
              algorithm: 'RS256',
             expiresIn: 120,
              subject: userId,
          });

        // send the JWT back to the user
        res.status(200).json({
          idToken: jwtBearerToken, 
          expiresIn: 120
         });
        // TODO - multiple options available                              
  }
  else {
      // send status 401 Unauthorized
      res.sendStatus(401); 
  }
}
