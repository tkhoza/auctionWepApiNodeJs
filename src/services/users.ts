//@ts-ignore
import db from "../connection/db";
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import {Request, Response} from 'express';

const RSA_PRIVATE_KEY = fs.readFileSync('src/services/keys/private.key');

/* get method for fetch all users. */
export const getAllUsers = (_req: any, res: any) => {
  var sql = "SELECT * FROM users";
  db.query(sql, function (err: Error, data: any) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json(data)
  })
}

/*get method for fetch single user*/
export const getUserById = (req: any, res: any) => {
  var id = req.params.id;

  if (!id) {
    return res.status(500).send({ error: 'Unknown ID!' })
  }

  var sql = `SELECT * FROM users WHERE id=${id}`;

  db.query(sql, function (err: Error, data: any) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    
    res.json(data[0])
  })
};


export function validateEmailAndPassword(email: string, password: string){
  //Lets go into our database and check if we really have this user.

  var sql = `SELECT * FROM users WHERE email=${email} AND  password=${password} `;

  db.query(sql, function (err: Error, data: any) {
    if (err) {
      return false;
    }

    if(data == null)
    {
      return false;
    }

    return true;
  })

  return true;
}

export const loginRoute = async (req: Request, res: Response) => {
  const email = req.body.email,
  password = req.body.password;
 
  if (!email || !password) {
    return res.status(500).send({ error: 'Wrong email/Password!' })
  }

  var stirngEmail= "\"" + email + "\"";
  var stirngPwd= "\"" + password + "\"";

  var sql = `SELECT * FROM users WHERE email=${stirngEmail} AND password=${stirngPwd}`;

  db.query(sql, function (err: Error, data: any) {
      if (err) {
        return  res.status(500);
      }
   
      if (data[0] != null) {
          const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'HS256',
                expiresIn: 120,
                subject: 'login',
            });
        // send the JWT back to the user
        return res.status(200).json({
                expiresIn: 120,
                token:jwtBearerToken,
                user: data[0]
            });                         
    }
    else {
        // send status 401 Unauthorized
        return res.status(200).send({ error: 'NotFound!' });
    }
  })

  return res;
}


export const registerRoute = async (req: Request, res: Response) => { 

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date +' '+time;

  var statement1 = 'INSERT INTO users (name, surname,phone, email, password,created_at)'
  var statement2 = 'VALUES (' + '"' + req.body.firstName + '","'+ req.body.lastName+ '","'+ req.body.phone + '","'+ req.body.email + '","'+ req.body.password + '","'+ dateTime+ '")'; 
 
  var sql =  statement1 + statement2;

   db.query(sql, function (err: Error, data: any) {

    if (err) {
      return res.status(500).send({ error: err.message });
    }

    if (data.affectedRows != 0) {
        let user = getUserByEmail(req.body.email);
        console.log(user);

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'HS256',
            expiresIn: 120,
            subject: "registered",
        });

        return res.status(200).json({
                expiresIn: 120,
                token:jwtBearerToken,
                user: data[0]
        });                         
    }
    else {
        return res.status(500).send({ error: 'Failed to register user!' });
    }
  })

  return res;
}

export const getUserByEmail = async (email:string) => {
  if (!email) {
    return 'Unknown email!';
  }

  var sql = `SELECT * FROM users WHERE email=${email}`;

 var res = await db.query(sql, function (err: Error, data: any) {
    if (err) {
      return err.message;
    }
    
    return data[0];

  })

  return res;
};
