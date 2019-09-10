//@ts-ignore
import db from "../connection/db";
import { User } from '../Models/User';

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

export function findUserIdForEmail(email: string)
{
  var sql = `SELECT * FROM users WHERE email=${email}`;

  db.query(sql, function (err: Error, data: any) {
    if (err) {
      return false;
    }
   
    if(data == null)
    {
      return false;
    }

    return data.id;
  })
}

export function createUser(user:User){

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date +' '+time;

  var statement1 = 'INSERT INTO users (name, surname,phone, email, password,created_at)'
  var statement2 = 'VALUES (' + '"' + user.firstName + '","'+ user.lastName+ '","'+ user.phone + '","'+ user.email + '","'+ user.password + '","'+ dateTime+ '")'; 
 
  var sql =  statement1 + statement2;

   db.query(sql, function (err: Error, data: any) {
    if (err) {
      return null;
    }

    return data;
  })
}