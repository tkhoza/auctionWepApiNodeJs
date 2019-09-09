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
