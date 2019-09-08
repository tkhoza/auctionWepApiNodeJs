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
