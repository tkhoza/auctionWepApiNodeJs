//@ts-ignore
import db from "../connection/db";

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

/*export function findUserIdForEmail(email: string): Observable<string> {
 
  email = "\"" + email +"\"";
  var sql = `SELECT * FROM users WHERE email=${email}`;

  db.query(sql, function (err: Error, data: any) {
    if (err) {
     // console.log(err);
      return null;
    }
    
    let id = data[0].id.toString();
    //console.log(id);
    return id;
  })
};*/

/*export const findUserIdForEmail = (req: any, res: any) => {
  var email = req.body.email;
  email = "\"" + email +"\"";

  if (!email) {
    return res.status(500).send({ error: 'Unknown ID!' })
  }

  var sql = `SELECT * FROM users WHERE email=${email}`;

  return db.query(sql, function (err: Error, data: any) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: 'Something failed!' })
    }
    return data[0];
    //res.json(data[0])
  })
};*/

export function findUserIdForEmail(email: string) : any {

 // const result = await db.query('SELECT * from users WHERE email = ?', [email]). 
  /*if (!result[0].length < 1) {
    throw new Error('Post with this id was not found');

  }*/

  email = "\"" + email +"\"";
  var sql = `SELECT * FROM users WHERE email=${email}`;

   db.query(sql, function (err: Error, data: any){
    if (err) {
      console.log(err);
      //res.status(500).send({ error: 'Something failed!' })
    }
    console.log(data)
    return data;
    //res.json(data[0])
  })
}

getFromTable: function(table, callback) {
  db.query('SELECT * FROM '+ table +';', function(err, result) {
    if(err) 
      // execute the callback for a null result and an error.
      callback(err, null);
    else if( !result )
      callback(new Error('Error bij het ophalen van foto\'s'),null);
    else
      // execute the callback on the result
      callback(null, result);
    }.bind(this));
  }
